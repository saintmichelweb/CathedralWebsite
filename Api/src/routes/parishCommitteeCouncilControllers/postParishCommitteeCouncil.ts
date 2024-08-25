import { Response } from "express";
import { AppDataSource } from "../../database/dataSource";
import logger from "../../services/logger";
import { isUndefinedOrNull } from "../../utils/utils";
import { z } from "zod";
import { AuthRequest } from "../../types/express";
import { ParishComitteCouncilEntity } from "../../entity/ParishComitteCouncilEntity";
import { ImageEntity } from "../../entity/ImagesEntity";

const parishCommitteeCouncilSchema = z.object({
  names: z
    .string()
    .trim()
    .min(1, { message: "parishCommitteeCouncil day_en is required" }),
  position_en: z
    .string()
    .trim()
    .min(1, { message: "parishCommitteeCouncil position_en is required" }),
  position_fr: z
    .string()
    .trim()
    .min(1, { message: "parishCommitteeCouncil position_fr is required" }),
  position_rw: z
    .string()
    .trim()
    .min(1, { message: "parishCommitteeCouncil position_rw is required" }),
  telephone: z
    .string()
    .trim()
    .min(1, { message: "parishCommitteeCouncil office_place is required" }),
  email: z
    .string()
    .trim()
    .min(1, { message: "parishCommitteeCouncil time is required" }),
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
    .min(1, { message: "Service backgroundImage is required" }),
});

/**
 * @openapi
 * /parishCommitteeCouncil:
 *   post:
 *     tags:
 *       - parishCommitteeCouncil
 *     security:
 *       - Authorization: []
 *     summary: Add a new Mass parishCommitteeCouncil
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               parishCommitteeCouncil:
 *                 type: string
 *                 example: "St Michael Parish"
 *                 description: "parishCommitteeCouncil of the Mass"
 *     responses:
 *       200:
 *         description: parishCommitteeCouncil saved successfully
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
 *                   example: "parishCommitteeCouncil saved successfully"
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
export async function postparishCommitteeCouncil(req: AuthRequest, res: Response) {
  let portalUser = req.user;
  if (isUndefinedOrNull(portalUser)) {
    return res.status(401).send({ message: "Unauthorized!" });
  }

  const parsedBody = parishCommitteeCouncilSchema.safeParse(req.body)
  if (!parsedBody.success) {
    logger.error("Validation error: %o", parsedBody.error.issues);
    logger.error("Validation error: %o", req.body);
    return res.status(422).send({ message: "Validation error" });
  }

  const parishCommitteeCouncilRepository = AppDataSource.getRepository(ParishComitteCouncilEntity)
  try {
    const newparishCommitteeCouncil = new ParishComitteCouncilEntity();
    newparishCommitteeCouncil.names = parsedBody.data.names
    newparishCommitteeCouncil.position_en = parsedBody.data.position_en
    newparishCommitteeCouncil.position_fr = parsedBody.data.position_fr
    newparishCommitteeCouncil.position_rw = parsedBody.data.position_rw
    newparishCommitteeCouncil.telephone = parsedBody.data.telephone
    newparishCommitteeCouncil.email = parsedBody.data.email
    newparishCommitteeCouncil.description_en = parsedBody.data.description_en
    newparishCommitteeCouncil.description_fr = parsedBody.data.description_fr
    newparishCommitteeCouncil.description_rw = parsedBody.data.description_rw

    if (parsedBody.data.backgroundImageId) {
      const imageRepository = AppDataSource.getRepository(ImageEntity);
      const savedImage = await imageRepository.findOne({ where: { id: parsedBody.data.backgroundImageId } });
      if (savedImage) {
        newparishCommitteeCouncil.backgroundImage = savedImage
      }
    }

    await parishCommitteeCouncilRepository.save(newparishCommitteeCouncil)
    return res.status(201).send({ message: "parishCommitteeCouncil created successfully" });
  } catch (error: any) {
    logger.error("Adding parishCommitteeCouncil failed with error: %s", error);
    res.status(400).send({ success: false, message: error.message });
  }
}
