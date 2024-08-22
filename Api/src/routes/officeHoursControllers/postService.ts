import { Response } from "express";
import { AppDataSource } from "../../database/dataSource";
import logger from "../../services/logger";
import { isUndefinedOrNull } from "../../utils/utils";
import { z } from "zod";
import { AuthRequest } from "../../types/express";
import { OfficeHoursEntity } from "../../entity/OfficeHoursEntity";

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
    .string()
    .trim()
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
 * /officeHours:
 *   post:
 *     tags:
 *       - OfficeHour
 *     security:
 *       - Authorization: []
 *     summary: Add a new Mass officeHours
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               officeHours:
 *                 type: string
 *                 example: "St Michael Parish"
 *                 description: "officeHours of the Mass"
 *     responses:
 *       200:
 *         description: OfficeHour saved successfully
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
 *                   example: "OfficeHour saved successfully"
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
export async function postOfficeHour(req: AuthRequest, res: Response) {
  let portalUser = req.user;
  if (isUndefinedOrNull(portalUser)) {
    return res.status(401).send({ message: "Unauthorized!" });
  }

  const parsedBody = OfficeHourSchema.safeParse(req.body)
  if (!parsedBody.success) {
    logger.error("Validation error: %o", parsedBody.error.issues);
    logger.error("Validation error: %o", req.body);
    return res.status(422).send({ message: "Validation error" });
  }

  const officeHoursRepository = AppDataSource.getRepository(OfficeHoursEntity)
  try {
    const newOfficeHour = new OfficeHoursEntity();
    newOfficeHour.day_en = parsedBody.data.day_en
    newOfficeHour.day_fr = parsedBody.data.day_fr
    newOfficeHour.day_rw = parsedBody.data.day_rw
    newOfficeHour.office_place = parsedBody.data.office_place
    newOfficeHour.time = parsedBody.data.time
    newOfficeHour.isActive = parsedBody.data.isActive

    await officeHoursRepository.save(newOfficeHour)
    return res.status(201).send({ message: "OfficeHour created successfully" });
  } catch (error: any) {
    logger.error("Adding officeHours failed with error: %s", error);
    res.status(400).send({ success: false, message: error.message });
  }
}
