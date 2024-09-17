import { Request, Response } from "express";
import { AppDataSource } from "../../database/dataSource";
import logger from "../../services/logger";
import { isUndefinedOrNull } from "../../utils/utils";
import { z } from "zod";
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
    .nullable()
});

/**
 * @openapi
 * /parishCommitteeCouncil/{id}:
 *   put:
 *     tags:
 *       - parishCommitteeCouncil
 *     security:
 *       - Authorization: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *            type: integer
 *         description: parishCommitteeCouncil ID
 *     summary: Update a Mass parishCommitteeCouncil
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
 *               isActive:
 *                 type: boolean
 *                 example: "false"
 *                 description: "Activation state of the parishCommitteeCouncil"
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
 *                   example: "parishCommitteeCouncil updated successfully."
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
 *         description: parishCommitteeCouncil not found! 
 *       422:
 *         description: Validation error!
 *       500:
 *         description: Internal Server error!
 *
 */

/* eslint-disable @typescript-eslint/explicit-function-return-type */
export async function putparishCommitteeCouncil(req: Request, res: Response) {
  let portalUser = req.user;
  if (isUndefinedOrNull(portalUser)) {
    return res.status(401).send({ message: "Unauthorized!" });
  }

  const parsedBody = parishCommitteeCouncilSchema.safeParse(req.body);
  if (!parsedBody.success) {
    logger.error("Validation error: %o", parsedBody.error.issues);
    logger.error("Validation error: %o", req.body);
    return res.status(422).send({ message: "Validation error!" });
  }

  const parishCommitteeCouncilRepository = AppDataSource.getRepository(ParishComitteCouncilEntity);
  try {
    const id = Number(req.params.id);
    const oldparishCommitteeCouncil = await parishCommitteeCouncilRepository.findOne({ where: { id } });
    if (oldparishCommitteeCouncil === null) {
      return res.status(404).send({ message: "parishCommitteeCouncil does not exist!" });
    }

    oldparishCommitteeCouncil.position_en = parsedBody.data.position_en
    oldparishCommitteeCouncil.position_fr = parsedBody.data.position_fr
    oldparishCommitteeCouncil.position_rw = parsedBody.data.position_rw
    oldparishCommitteeCouncil.telephone = parsedBody.data.telephone
    oldparishCommitteeCouncil.email = parsedBody.data.email
    oldparishCommitteeCouncil.description_en = parsedBody.data.description_en
    oldparishCommitteeCouncil.description_fr = parsedBody.data.description_fr
    oldparishCommitteeCouncil.description_rw = parsedBody.data.description_rw

    if (parsedBody.data.backgroundImageId) {
      const imageRepository = AppDataSource.getRepository(ImageEntity);
      const savedImage = await imageRepository.findOne({ where: { id: parsedBody.data.backgroundImageId } });
      if (savedImage) {
        oldparishCommitteeCouncil.backgroundImage = savedImage
      }
    }

    await parishCommitteeCouncilRepository.save(oldparishCommitteeCouncil);
    return res.status(201).send({ message: "parishCommitteeCouncil updated successfully." });
  } catch (error: any) {
    logger.error("Updating parishCommitteeCouncil failed: %s", error);
    res.status(500).send({ success: false, message: "Internal server error!" });
  }
}
