import { Response } from "express";
import { AppDataSource } from "../../database/dataSource";
import logger from "../../services/logger";
import { isUndefinedOrNull } from "../../utils/utils";
import { z } from "zod";
import { AuthRequest } from "../../types/express";
import { MassTimesEntity } from "../../entity/MasstimesEntity";
import { LanguageEntity } from "../../entity/languageEntity";
import { LocationEntity } from "../../entity/LocationEntity";

const massTimesSchema = z.object({
  language: z
    .number()
    .min(1, { message: "Language is required" }),
  location: z
    .number()
    .min(1, { message: "Location is required" }),
  day_en: z
    .string()
    .trim()
    .min(1, { message: "Time is required" }),
  day_fr: z
    .string()
    .trim()
    .min(1, { message: "Time is required" }),
  day_rw: z
    .string()
    .trim()
    .min(1, { message: "Time is required" }),
  time: z
    .string()
    .trim()
    .min(1, { message: "Time is required" }),
});

/**
 * @openapi
 * /mass-times:
 *   post:
 *     tags:
 *       - Mass Times
 *     security:
 *       - Authorization: []
 *     summary: Add a new Mass Time
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
 *               location:
 *                 type: string
 *                 example: "St Michel Parish"
 *                 description: "location of the Mass"
 *               day:
 *                 type: string
 *                 example: "Sunday 07 July 2024"
 *                 description: "day of the Mass"
 *               time:
 *                 type: string
 *                 example: "9 AM"
 *                 description: "time of the Mass"
 *     responses:
 *       200:
 *         description: Mass Time saved successfully
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
 *                   example: "Mass Time saved successfully"
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
export async function postMassTime(req: AuthRequest, res: Response) {
  let portalUser = req.user;
  if (isUndefinedOrNull(portalUser)) {
    return res.status(401).send({ message: "Unauthorized!" });
  }

  const parsedBody = massTimesSchema.safeParse(req.body)
    if (!parsedBody.success) {
      logger.error("Validation error: %o", parsedBody.error.issues);
      logger.error("Validation error: %o", req.body);
      return res.status(422).send({ message: "Validation error" });
    }

  const newMassTimeRepository = AppDataSource.getRepository(MassTimesEntity)
  const massLocationRepository =  AppDataSource.getRepository(LocationEntity)
  const massLanguageRepository =  AppDataSource.getRepository(LanguageEntity)

  
  try {
    const newMassTime = new MassTimesEntity();
    const massLocation =  await massLocationRepository.findOne({where: {id: parsedBody.data.location}})
    const massLanguage =  await massLanguageRepository.findOne({where: {id: parsedBody.data.language}})

    if ( massLanguage !== null && massLocation !== null) {
      newMassTime.language = massLanguage
      newMassTime.location = massLocation
    } else {
      return res.status(404).send({ message: "Location or Language does not exist!" });
    }

    newMassTime.day_en = parsedBody.data.day_en
    newMassTime.day_fr = parsedBody.data.day_fr
    newMassTime.day_rw = parsedBody.data.day_rw
    newMassTime.time = parsedBody.data.time
    newMassTime.isActive = true
    console.log('newMassTime', newMassTime)
    await newMassTimeRepository.save(newMassTime)
    return res.status(201).send({ message: "Mass Time saved successfully" });
  } catch (error: any) {
    logger.error("Creating Mass Times failed: %s", error);
    res.status(500).send({ success: false,  });
  }
}
