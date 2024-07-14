import { Request, Response } from "express";
import { AppDataSource } from "../../database/dataSource";
import logger from "../../services/logger";
import { isUndefinedOrNull } from "../../utils/utils";
import { LocationEntity } from "../../entity/LocationEntity";
import { LanguageEntity } from "../../entity/languageEntity";

/**
 * @openapi
 * /language/all:
 *   get:
 *     tags:
 *       - Language
 *     security:
 *       - Authorization: []
 *     parameters:
 *      - in: query
 *        name: isActive
 *        schema:
 *          type: boolean
 *        required: false
 *        description: Activity status of language
 *     summary: get all Mass languages
 *     responses:
 *       200:
 *         description: Get Languages
 *       401:
 *         description: Invalid credentials
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid credentials"
 *       500:
 *         description: Internal Server error
 *
 */

/* eslint-disable @typescript-eslint/explicit-function-return-type */
export async function getLanguages(req: Request, res: Response) {
  let portalUser = req.user;
  const isActive = req.query.isActive
  if (isUndefinedOrNull(portalUser)) {
    return res.status(401).send({ message: "Unauthorized!" });
  }

  const languageRepository = AppDataSource.getRepository(LanguageEntity);
  const queryBuilder = languageRepository.createQueryBuilder('languages')
  if (isActive !==null && isActive !== undefined) {
    queryBuilder.where('languages.isActive = :isActive', {isActive: isActive? 1: 0})
  }

  try {
    const [totalLanguages, numberOfAllLanguages] = await queryBuilder.getManyAndCount()
    return res.status(200).send({ message: "Languages retrieved successfully!", languagesCount: numberOfAllLanguages, languages: totalLanguages });
  } catch (error: any) {
    logger.error("Get language failed: %s", error);
    res.status(500).send({ success: false, message: "Internal server error!" });
  }
}
