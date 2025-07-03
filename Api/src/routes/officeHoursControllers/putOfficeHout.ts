import { Request, Response } from "express";
import { AppDataSource } from "../../database/dataSource";
import logger from "../../services/logger";
import { isUndefinedOrNull } from "../../utils/utils";
import { z } from "zod";
import { OfficeHoursEntity } from "../../entity/OfficeHoursEntity";
import { LocationEntity } from "../../entity/LocationEntity";

const OfficeHourSchema = z.object({
  day_en: z
    .string()
    .trim()
    .min(1, { message: "OfficeHour day_en is required" }),
  day_fr: z
    .string()
    .trim()
    .min(1, { message: "OfficeHour day_fr is required" }),
  day_rw: z
    .string()
    .trim()
    .min(1, { message: "OfficeHour day_rw is required" }),
  office_place: z
    .number()
    .min(1, { message: "OfficeHour office_place is required" }),
  time: z
    .string()
    .trim()
    .min(1, { message: "OfficeHour time is required" }),
  isActive: z
    .boolean()
});

/**
 * @openapi
 * /office-hours/{id}:
 *   put:
 *     tags:
 *       - Office Hours
 *     security:
 *       - Authorization: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *            type: integer
 *         description: OfficeHour ID
 *     summary: Update a Mass service
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
*             required:
 *               - day_en
 *               - day_fr
 *               - day_rw
 *               - office_place
 *               - time
 *               - isActive
 *             properties:
 *               day_en:
 *                 type: string
 *                 example: "Monday"
 *                 description: "Day of the week in English"
 *               day_fr:
 *                 type: string
 *                 example: "Lundi"
 *                 description: "Day of the week in French"
 *               day_rw:
 *                 type: string
 *                 example: "Kuwa Mbere"
 *                 description: "Day of the week in Kinyarwanda"
 *               office_place:
 *                 type: number
 *                 example: 2
 *                 description: "ID of the office place"
 *               time:
 *                 type: string
 *                 example: "08:00 - 17:00"
 *                 description: "Office hours time range"
 *               isActive:
 *                 type: boolean
 *                 example: "false"
 *                 description: "Activation state of the service"
 *     responses:
 *       200:
 *         description: OfficeHour saved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "OfficeHour updated successfully."
 *       401:
 *         description: Invalid credentials!
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid credentials!"
 *       404:
 *         description: OfficeHour not found! 
 *       422:
 *         description: Validation error!
 *       500:
 *         description: Internal Server error!
 *
 */

/* eslint-disable @typescript-eslint/explicit-function-return-type */
export async function putOfficeHour(req: Request, res: Response) {
  let portalUser = req.user;
  if (isUndefinedOrNull(portalUser)) {
    return res.status(401).send({ message: "Unauthorized!" });
  }

  const parsedBody = OfficeHourSchema.safeParse(req.body);
  if (!parsedBody.success) {
    logger.error("Validation error: %o", parsedBody.error.issues);
    logger.error("Validation error: %o", req.body);
    return res.status(422).send({ message: "Validation error!" });
  }

  const serviceRepository = AppDataSource.getRepository(OfficeHoursEntity);
  const locationRepository =  AppDataSource.getRepository(LocationEntity)
  try {
    const id = Number(req.params.id);
    const oldOfficeHour = await serviceRepository.findOne({ where: { id } });
    if (oldOfficeHour === null) {
      return res.status(404).send({ message: "OfficeHour does not exist!" });
    }

    const officeLocation =  await locationRepository.findOne({where: {id: parsedBody.data.office_place}})
     if ( officeLocation !== null ) {
      oldOfficeHour.office_place = officeLocation
    } else {
      return res.status(404).send({ message: "Office location does not exist!" });
    }
    oldOfficeHour.day_en = parsedBody.data.day_en
    oldOfficeHour.day_fr = parsedBody.data.day_fr
    oldOfficeHour.day_rw = parsedBody.data.day_rw
    // oldOfficeHour.office_place = parsedBody.data.office_place
    oldOfficeHour.time = parsedBody.data.time
    oldOfficeHour.isActive = parsedBody.data.isActive

    await serviceRepository.save(oldOfficeHour);
    return res.status(201).send({ message: "OfficeHour updated successfully." });
  } catch (error: any) {
    logger.error("Updating service failed: %s", error);
    res.status(500).send({ success: false, message: "Internal server error!" });
  }
}
