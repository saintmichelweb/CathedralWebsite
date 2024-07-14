import { Request, Response } from "express";
import { AppDataSource } from "../../database/dataSource";
import logger from "../../services/logger";
import { isUndefinedOrNull } from "../../utils/utils";
import { z } from "zod";
import { LocationEntity } from "../../entity/LocationEntity";
import { MassTimesEntity } from "../../entity/MasstimesEntity";
import { LanguageEntity } from "../../entity/languageEntity";

const updateMassTimesSchema = z.object({
  language: z
    .number()
    .min(1, { message: "Language is required" }),
  location: z
    .number()
    .min(1, { message: "Location is required" }),
  day: z
    .string()
    .trim()
    .min(1, { message: "Time is required" }),
  time: z
    .string()
    .trim()
    .min(1, { message: "Time is required" }),
  isActive: z.boolean().nullable()
});

/**
 * @openapi
 * /mass-times/{id}:
 *   put:
 *     tags:
 *       - Mass Times
 *     security:
 *       - Authorization: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *            type: integer
 *         description: Mass time ID
 *     summary: Update a Mass Time
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               location:
 *                 type: number
 *                 example: 1
 *                 description: "location of the Mass"
 *               language:
 *                 type: number
 *                 example: 1
 *                 description: "language of the Mass"
 *               day:
 *                 type: string
 *                 example: "Sunday"
 *                 description: "day of the Mass"
 *               time:
 *                 type: string
 *                 example: "9 AM"
 *                 description: "time of the Mass"
 *               isActive:
 *                 type: boolean
 *                 example: "false"
 *                 description: "Activation state of the location"
 *     responses:
 *       200:
 *         description: Mass Time Update
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
 *                   example: "Mass Time updated successfully."
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
 *         description: not found! 
 *       422:
 *         description: Validation error!
 *       500:
 *         description: Internal Server error!
 *
 */

/* eslint-disable @typescript-eslint/explicit-function-return-type */
export async function putMassTimes(req: Request, res: Response) {
  let portalUser = req.user;
  if (isUndefinedOrNull(portalUser)) {
    return res.status(401).send({ message: "Unauthorized!" });
  }

  const parsedBody = updateMassTimesSchema.safeParse(req.body);
  if (!parsedBody.success) {
    logger.error("Validation error: %o", parsedBody.error.issues);
    logger.error("Validation error: %o", req.body);
    return res.status(422).send({ message: "Validation error!" });
  }

  const massTimeRepository = AppDataSource.getRepository(MassTimesEntity)
  const massLocationRepository = AppDataSource.getRepository(LocationEntity)
  const massLanguageRepository = AppDataSource.getRepository(LanguageEntity)

  try {
    const id = req.params.id;
    const oldMassTime = await massTimeRepository.findOne({ where: { id : parseInt(id) } });
    
    if (oldMassTime === null) {
      return res.status(404).send({ message: "Mass time does not exist!" });
    }
    const massLocation = await massLocationRepository.findOne({ where: { id: parsedBody.data.location } })
    const massLanguage = await massLanguageRepository.findOne({ where: { id: parsedBody.data.language } })

    if (massLanguage !== null && massLocation !== null) {
      oldMassTime.language = massLanguage
      oldMassTime.location = massLocation
    } else {
      return res.status(404).send({ message: "Location or Language does not exist!" });
    }

    if (parsedBody.data.isActive !== null && parsedBody.data.isActive !== undefined) {
      oldMassTime.isActive = parsedBody.data.isActive
    }

    if (parsedBody.data.day !== null && parsedBody.data.day !== undefined) {
      oldMassTime.day = parsedBody.data.day
    }

    if (parsedBody.data.time !== null && parsedBody.data.time !== undefined) {
      oldMassTime.time = parsedBody.data.time
    }

    await massTimeRepository.save(oldMassTime)
    return res.status(201).send({ message: "Mass time updated successfully" });
  } catch (error: any) {
    logger.error("Updating Mass time failed: %s", error);
    res.status(500).send({ success: false, message: "Internal server error!" });
  }
}
