import { Response } from "express";
import { AppDataSource } from "../../database/dataSource";
import logger from "../../services/logger";
import { isUndefinedOrNull } from "../../utils/utils";
import { z } from "zod";
import { AuthRequest } from "../../types/express";
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
 * /parishCommitteCouncil:
 *   post:
 *     tags:
 *       - ParishCommitteCouncil
 *     security:
 *       - Authorization: []
 *     summary: Add a new Mass parishCommitteCouncil
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
 *                   example: "ParishCommitteCouncil saved successfully"
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
export async function postParishCommitteCouncil(req: AuthRequest, res: Response) {
  let portalUser = req.user;
  if (isUndefinedOrNull(portalUser)) {
    return res.status(401).send({ message: "Unauthorized!" });
  }

  const parsedBody = ParishCommitteCouncilSchema.safeParse(req.body)
  if (!parsedBody.success) {
    logger.error("Validation error: %o", parsedBody.error.issues);
    logger.error("Validation error: %o", req.body);
    return res.status(422).send({ message: "Validation error" });
  }

  const parishCommitteCouncilRepository = AppDataSource.getRepository(ParishComitteCouncilEntity)
  try {
    const newParishCommitteCouncil = new ParishComitteCouncilEntity();
    newParishCommitteCouncil.position_en = parsedBody.data.position_en
    newParishCommitteCouncil.position_fr = parsedBody.data.position_fr
    newParishCommitteCouncil.position_rw = parsedBody.data.position_rw
    newParishCommitteCouncil.telephone = parsedBody.data.telephone
    newParishCommitteCouncil.email = parsedBody.data.email
    newParishCommitteCouncil.description_en = parsedBody.data.description_en
    newParishCommitteCouncil.description_fr = parsedBody.data.description_fr
    newParishCommitteCouncil.description_rw = parsedBody.data.description_rw

    await parishCommitteCouncilRepository.save(newParishCommitteCouncil)
    return res.status(201).send({ message: "ParishCommitteCouncil created successfully" });
  } catch (error: any) {
    logger.error("Adding parishCommitteCouncil failed with error: %s", error);
    res.status(400).send({ success: false, message: error.message });
  }
}
