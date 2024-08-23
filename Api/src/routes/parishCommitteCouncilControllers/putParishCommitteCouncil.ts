import { Request, Response } from "express";
import { AppDataSource } from "../../database/dataSource";
import logger from "../../services/logger";
import { isUndefinedOrNull } from "../../utils/utils";
import { z } from "zod";
import { ParishComitteCouncilEntity } from "../../entity/ParishComitteCouncilEntity";

const ParishCommitteCouncilSchema = z.object({
  names: z
    .string()
    .trim()
    .min(1, { message: "ParishCommitteCouncil day_en is required" }),
  position_en: z
    .string()
    .trim()
    .min(1, { message: "ParishCommitteCouncil position_en is required" }),
  position_fr: z
    .string()
    .trim()
    .min(1, { message: "ParishCommitteCouncil position_fr is required" }),
  position_rw: z
    .string()
    .trim()
    .min(1, { message: "ParishCommitteCouncil position_rw is required" }),
    telephone: z
    .string()
    .trim()
    .min(1, { message: "ParishCommitteCouncil office_place is required" }),
    email: z
    .string()
    .trim()
    .min(1, { message: "ParishCommitteCouncil time is required" }),
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
});

/**
 * @openapi
 * /parishCommitteCouncil/{id}:
 *   put:
 *     tags:
 *       - ParishCommitteCouncil
 *     security:
 *       - Authorization: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *            type: integer
 *         description: ParishCommitteCouncil ID
 *     summary: Update a Mass parishCommitteCouncil
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               parishCommitteCouncil:
 *                 type: string
 *                 example: "St Michael Parish"
 *                 description: "parishCommitteCouncil of the Mass"
 *               isActive:
 *                 type: boolean
 *                 example: "false"
 *                 description: "Activation state of the parishCommitteCouncil"
 *     responses:
 *       200:
 *         description: ParishCommitteCouncil saved successfully
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
 *                   example: "ParishCommitteCouncil updated successfully."
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
 *         description: ParishCommitteCouncil not found! 
 *       422:
 *         description: Validation error!
 *       500:
 *         description: Internal Server error!
 *
 */

/* eslint-disable @typescript-eslint/explicit-function-return-type */
export async function putParishCommitteCouncil(req: Request, res: Response) {
  let portalUser = req.user;
  if (isUndefinedOrNull(portalUser)) {
    return res.status(401).send({ message: "Unauthorized!" });
  }

  const parsedBody = ParishCommitteCouncilSchema.safeParse(req.body);
  if (!parsedBody.success) {
    logger.error("Validation error: %o", parsedBody.error.issues);
    logger.error("Validation error: %o", req.body);
    return res.status(422).send({ message: "Validation error!" });
  }

  const parishCommitteCouncilRepository = AppDataSource.getRepository(ParishComitteCouncilEntity);
  try {
    const id = Number(req.params.id);
    const oldParishCommitteCouncil = await parishCommitteCouncilRepository.findOne({ where: { id } });
    if (oldParishCommitteCouncil === null) {
      return res.status(404).send({ message: "ParishCommitteCouncil does not exist!" });
    }
    
    oldParishCommitteCouncil.position_en = parsedBody.data.position_en
    oldParishCommitteCouncil.position_fr = parsedBody.data.position_fr
    oldParishCommitteCouncil.position_rw = parsedBody.data.position_rw
    oldParishCommitteCouncil.telephone = parsedBody.data.telephone
    oldParishCommitteCouncil.email = parsedBody.data.email
    oldParishCommitteCouncil.description_en = parsedBody.data.description_en
    oldParishCommitteCouncil.description_fr = parsedBody.data.description_fr
    oldParishCommitteCouncil.description_rw = parsedBody.data.description_rw

    await parishCommitteCouncilRepository.save(oldParishCommitteCouncil);
    return res.status(201).send({ message: "ParishCommitteCouncil updated successfully." });
  } catch (error: any) {
    logger.error("Updating parishCommitteCouncil failed: %s", error);
    res.status(500).send({ success: false, message: "Internal server error!" });
  }
}
