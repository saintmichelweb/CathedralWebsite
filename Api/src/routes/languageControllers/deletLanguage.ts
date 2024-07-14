import { Request, Response } from "express";
import { AppDataSource } from "../../database/dataSource";
import logger from "../../services/logger";
import { isUndefinedOrNull } from "../../utils/utils";
import { LocationEntity } from "../../entity/LocationEntity";
import { LanguageEntity } from "../../entity/languageEntity";

/**
 * @openapi
 * /language/{id}:
 *   delete:
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
 *     summary: delete a Mass language
 *     responses:
 *       200:
 *         description: Language deleted successfully
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
 *                   example: "Language deleted successfully"
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
 *       500:
 *         description: Internal Server error
 *
 */

/* eslint-disable @typescript-eslint/explicit-function-return-type */
export async function deleteLanguage(req: Request, res: Response) {
  let portalUser = req.user;
  if (isUndefinedOrNull(portalUser)) {
    return res.status(401).send({ message: "Unauthorized!" });
  }

  const languageRepository = AppDataSource.getRepository(LanguageEntity);
  try {
    const id = Number(req.params.id);
    const oldLanguage = await languageRepository.findOne({ where: { id } });
    if (oldLanguage === null) {
      return res.status(404).send({ message: "Language does not exist!" });
    }
    await languageRepository.delete(oldLanguage.id);
    return res.status(201).send({ message: "Language deleted successfully!" });
  } catch (error: any) {
    logger.error("Deleting language failed: %s", error);
    res.status(500).send({ success: false, message: "Internal server error!" });
  }
}
