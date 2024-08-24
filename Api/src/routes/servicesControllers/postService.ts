import { Response } from "express";
import { AppDataSource } from "../../database/dataSource";
import logger from "../../services/logger";
import { isUndefinedOrNull } from "../../utils/utils";
import { z } from "zod";
import { ServiceEntity } from "../../entity/ServiceEntity";
import { AuthRequest } from "../../types/express";
import { ImageEntity } from "../../entity/ImagesEntity";

const ServiceSchema = z.object({
  name_en: z
    .string()
    .trim()
    .min(1, { message: "Service name_en is required" }),
  name_fr: z
    .string()
    .trim()
    .min(1, { message: "Service name_fr is required" }),
  name_rw: z
    .string()
    .trim()
    .min(1, { message: "Service name_rw is required" }),
  description_en: z
    .string()
    .trim()
    .min(1, { message: "Service description_en is required" }),
  description_fr: z
    .string()
    .trim()
    .min(1, { message: "Service description_fr is required" }),
  description_rw: z
    .string()
    .trim()
    .min(1, { message: "Service description_rw is required" }),
  contact_person_name: z
    .string()
    .trim()
    .min(1, { message: "Service contact_person_name is required" }),
  contact_person_phone_number: z
    .string()
    .trim()
    .min(1, { message: "Service contact_person_phone_number is required" }),
  work_days: z
    .string()
    .trim()
    .min(1, { message: "Service start_date is required" }),
  work_hours: z
    .string()
    .trim()
    .min(1, { message: "Service end_date is required" }),
  backgroundImageId: z
    .number()
    .min(1, { message: "Service backgroundImage is required" }),
});

/**
 * @openapi
 * /services:
 *   post:
 *     tags:
 *       - Service
 *     security:
 *       - Authorization: []
 *     summary: Add a new Mass service
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               service:
 *                 type: string
 *                 example: "St Michael Parish"
 *                 description: "service of the Mass"
 *     responses:
 *       200:
 *         description: Service saved successfully
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
 *                   example: "Service saved successfully"
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
export async function postService(req: AuthRequest, res: Response) {
  let portalUser = req.user;
  if (isUndefinedOrNull(portalUser)) {
    return res.status(401).send({ message: "Unauthorized!" });
  }

  const parsedBody = ServiceSchema.safeParse(req.body)
  if (!parsedBody.success) {
    logger.error("Validation error: %o", parsedBody.error.issues);
    logger.error("Validation error: %o", req.body);
    return res.status(422).send({ message: "Validation error" });
  }

  const serviceRepository = AppDataSource.getRepository(ServiceEntity)
  try {
    const newService = new ServiceEntity();
    newService.name_en = parsedBody.data.name_en
    newService.name_fr = parsedBody.data.name_fr
    newService.name_rw = parsedBody.data.name_rw
    newService.description_en = parsedBody.data.description_en
    newService.description_fr = parsedBody.data.description_fr
    newService.description_rw = parsedBody.data.description_rw
    newService.contact_person_name = parsedBody.data.contact_person_name
    newService.contact_person_phone_number = parsedBody.data.contact_person_phone_number
    newService.work_days = parsedBody.data.work_days
    newService.work_hours = parsedBody.data.work_hours

    if (parsedBody.data.backgroundImageId) {
      const imageRepository = AppDataSource.getRepository(ImageEntity);
      const savedImage = await imageRepository.findOne({ where: { id: parsedBody.data.backgroundImageId } });
      if (savedImage) {
        newService.backgroundImage = savedImage
      }
    }
    await serviceRepository.save(newService)
    return res.status(201).send({ message: "Service created successfully" });
  } catch (error: any) {
    logger.error("Adding service failed with error: %s", error);
    res.status(400).send({ success: false, message: error.message });
  }
}
