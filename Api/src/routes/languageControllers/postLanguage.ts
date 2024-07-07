import { Response } from "express";
import { AppDataSource } from "../../database/dataSource";
import logger from "../../services/logger";
import { isUndefinedOrNull } from "../../utils/utils";
import { z } from "zod";
import { LocationEntity } from "../../entity/LocationEntity";
import { AuthRequest } from "../../types/express";
import { LanguageEntity } from "../../entity/languageEntity";

const massLanguageSchema = z.object({
  language: z
    .string()
    .trim()
    .min(1, { message: "Language Name is required" }),
});

/**
 * @openapi
 * /language:
 *   post:
 *     tags:
 *       - Language
 *     security:
 *       - Authorization: []
 *     summary: Add a new Mass location
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               language:
 *                 type: string
 *                 example: "Kinyarwanda"
 *                 description: "language of the Mass"
 *     responses:
 *       200:
 *         description: Location saved successfully
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
 *                   example: "Language saved successfully"
 *       401:
 *         description: Invalid credentials
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
 *                   example: "Invalid credentials"
 *       422:
 *         description: Validation error
 *       500:
 *         description: Internal Server error
 *
 */

/* eslint-disable @typescript-eslint/explicit-function-return-type */
export async function postLanguage(req: AuthRequest, res: Response) {
  let portalUser = req.user;
  if (isUndefinedOrNull(portalUser)) {
    return res.status(401).send({ message: "Unauthorized!" });
  }

  const parsedBody = massLanguageSchema.safeParse(req.body)
    if (!parsedBody.success) {
      logger.error("Validation error: %o", parsedBody.error.issues);
      logger.error("Validation error: %o", req.body);
      return res.status(422).send({ message: "Validation error" });
    }

  const newLanguageRepository = AppDataSource.getRepository(LanguageEntity)
  try {
    const newLanguage = new LanguageEntity();
    newLanguage.language = parsedBody.data.language
    newLanguage.isActive = true
    await newLanguageRepository.save(newLanguage)
    return res.status(201).send({ message: "Language created successfully" });
  } catch (error: any) {
    logger.error("Creating Language failed: %s", error);
    res.status(500).send({ success: false,  });
  }
}
