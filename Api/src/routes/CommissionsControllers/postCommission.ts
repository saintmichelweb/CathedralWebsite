import { Response } from "express";
import { AppDataSource } from "../../database/dataSource";
import logger from "../../services/logger";
import { isUndefinedOrNull } from "../../utils/utils";
import { z } from "zod";
import { AuthRequest } from "../../types/express";
import { ImageEntity } from "../../entity/ImagesEntity";
import { CommissionEntity } from "../../entity/CommissionEntity";

const commissionSchema = z.object({
  name_en: z
    .string()
    .trim()
    .min(1, { message: "name_en is required" }),
  name_fr: z
    .string()
    .trim()
    .min(1, { message: "name_fr is required" }),
  name_rw: z
    .string()
    .trim()
    .min(1, { message: "name_rw is required" }),
  contact_person_name: z
    .string()
    .trim()
    .min(1, { message: "contact_person_name is required" }),
  contact_person_role: z
    .string()
    .trim()
    .min(1, { message: "contact_person_role is required" }),
  contact_person_phone_number: z
    .string()
    .trim()
    .min(1, { message: "contact_person_phone_number is required" }),
  contact_person_email: z
    .string()
    .trim()
    .min(1, { message: "contact_person_email is required" }),
  description_en: z
    .string()
    .trim()
    .min(1, { message: "Description is required" }),
  description_fr: z
    .string()
    .trim()
    .min(1, { message: "Description is required" }),
  description_rw: z
    .string()
    .trim()
    .min(1, { message: "Description is required" }),
  backgroundImageId: z
    .number()
    .nullable()
});

/**
 * @openapi
 * /commissions:
 *   post:
 *     tags:
 *       - Commission
 *     security:
 *       - Authorization: []
 *     summary: Add a Commission
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name_en
 *               - name_fr
 *               - name_rw
 *               - contact_person_name
 *               - contact_person_role
 *               - contact_person_phone_number
 *               - contact_person_email
 *               - description_en
 *               - description_fr
 *               - description_rw
 *             properties:
 *               name_en:
 *                 type: string
 *                 example: "English name"
 *                 description: "Community name in English"
 *               name_fr:
 *                 type: string
 *                 example: "Nom en français"
 *                 description: "Community name in French"
 *               name_rw:
 *                 type: string
 *                 example: "Izina mu Kinyarwanda"
 *                 description: "Community name in Kinyarwanda"
 *               contact_person_name:
 *                 type: string
 *                 example: "Jane Doe"
 *                 description: "Contact person's full name"
 *               contact_person_role:
 *                 type: string
 *                 example: "Community Leader"
 *                 description: "Role of the contact person"
 *               contact_person_phone_number:
 *                 type: string
 *                 example: "+250788000000"
 *                 description: "Phone number of the contact person"
 *               contact_person_email:
 *                 type: string
 *                 format: email
 *                 example: "jane@example.com"
 *                 description: "Email of the contact person"
 *               description_en:
 *                 type: string
 *                 example: "English description"
 *                 description: "Community description in English"
 *               description_fr:
 *                 type: string
 *                 example: "Description en français"
 *                 description: "Community description in French"
 *               description_rw:
 *                 type: string
 *                 example: "Ibisobanuro mu Kinyarwanda"
 *                 description: "Community description in Kinyarwanda"
 *               backgroundImageId:
 *                 type: number
 *                 nullable: true
 *                 example: 102
 *                 description: "Optional background image ID"
 *     responses:
 *       200:
 *         description: Community saved successfully
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
 *                   example: "Community saved successfully"
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
 */

/* eslint-disable @typescript-eslint/explicit-function-return-type */
export async function postCommission(req: AuthRequest, res: Response) {
  let portalUser = req.user;
  if (isUndefinedOrNull(portalUser)) {
    return res.status(401).send({ message: "Unauthorized!" });
  }

  const parsedBody = commissionSchema.safeParse(req.body)
  if (!parsedBody.success) {
    logger.error("Validation error: %o", parsedBody.error.issues);
    logger.error("Validation error: %o", req.body);
    return res.status(422).send({ message: "Validation error" });
  }


  const newCommissionRepository = AppDataSource.getRepository(CommissionEntity)

  try {
    const newCommission = new CommissionEntity();
    newCommission.name_en = parsedBody.data.name_en
    newCommission.name_fr = parsedBody.data.name_fr
    newCommission.name_rw = parsedBody.data.name_rw
    newCommission.description_en = parsedBody.data.description_en
    newCommission.description_fr = parsedBody.data.description_fr
    newCommission.description_rw = parsedBody.data.description_rw
    newCommission.contact_person_name = parsedBody.data.contact_person_name
    newCommission.contact_person_role = parsedBody.data.contact_person_role
    newCommission.contact_person_phone_number = parsedBody.data.contact_person_phone_number
    newCommission.contact_person_email = parsedBody.data.contact_person_email
    if (parsedBody.data.backgroundImageId) {
      const imageRepository = AppDataSource.getRepository(ImageEntity);
      const savedImage = await imageRepository.findOne({ where: { id: parsedBody.data.backgroundImageId } });
      if (savedImage) {
        newCommission.backgroundImage = savedImage
      }
    }
    await newCommissionRepository.save(newCommission)
    return res.status(201).send({ message: "Commission details added successfully" });
  } catch (error: any) {
    logger.error("Creating Commission failed: %s", error);
    res.status(500).send({ message: "Internal server error" });
  }
}
