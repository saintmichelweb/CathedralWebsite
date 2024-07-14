import { Request, Response } from "express";
import { AppDataSource } from "../../database/dataSource";
import logger from "../../services/logger";
import { isUndefinedOrNull } from "../../utils/utils";
import { z } from "zod";
import { LanguageEntity } from "../../entity/languageEntity";

const LocationSchema = z.object({
  language: z.string().trim().min(1, { message: 'Language is required!' }),
  isActive: z.boolean(),
});

/**
 * @openapi
 * /language/{id}:
 *   put:
 *     tags:
 *       - Language
 *     security:
 *       - Authorization: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *            type: integer
 *         description: Language ID
 *     summary: Update a Mass language
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               language:
 *                 type: string
 *                 example: "St Michael Parish"
 *                 description: "language of the Mass"
 *               isActive:
 *                 type: boolean
 *                 example: "false"
 *                 description: "Activation state of the language"
 *     responses:
 *       200:
 *         description: Language saved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Language updated successfully."
 *       401:
 *         description: Invalid credentials!
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Invalid credentials!"
 *       404:
 *         description: Language not found! 
 *       422:
 *         description: Validation error!
 *       500:
 *         description: Internal Server error!
 *
 */

/* eslint-disable @typescript-eslint/explicit-function-return-type */
export async function putLanguage(req: Request, res: Response) {
  let portalUser = req.user;
  if (isUndefinedOrNull(portalUser)) {
    return res.status(401).send({ message: "Unauthorized!" });
  }

  const parsedBody = LocationSchema.safeParse(req.body);
  if (!parsedBody.success) {
    logger.error("Validation error: %o", parsedBody.error.issues);
    logger.error("Validation error: %o", req.body);
    return res.status(422).send({ message: "Validation error!" });
  }

  const languageRepository = AppDataSource.getRepository(LanguageEntity);
  try {
    const id = Number(req.params.id);
    const oldLocation = await languageRepository.findOne({ where: { id } });
    if (oldLocation === null) {
      return res.status(404).send({ message: "Language does not exist!" });
    }

    if (parsedBody.data.language) {
      oldLocation.language = parsedBody.data.language;
    }

    if (parsedBody.data.isActive !== null && parsedBody.data.isActive !== undefined) {
      oldLocation.isActive = parsedBody.data.isActive;
    }

    await languageRepository.save(oldLocation);
    return res.status(201).send({ message: "Language updated successfully." });
  } catch (error: any) {
    logger.error("Updating language failed: %s", error);
    res.status(500).send({ success: false, message: "Internal server error!" });
  }
}
