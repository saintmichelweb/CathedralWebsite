import { Response } from "express";
import { AppDataSource } from "../../database/dataSource";
import logger from "../../services/logger";
import { isUndefinedOrNull } from "../../utils/utils";
import { z } from "zod";
import { AuthRequest } from "../../types/express";
import { ImageEntity } from "../../entity/ImagesEntity";
import { CatholicActionEntity } from "../../entity/CatholicActionEntity";

const catholicActionSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: "Name is required" }),
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
  leader: z
    .string()
    .trim()
    .min(1, { message: "Leader name is required" }),
  telephone: z
    .string()
    .trim()
    .min(1, { message: "Leader Telephone is required" }),
  backgroundImageId: z
    .number()
    .nullable()
});

/**
 * @openapi
 * /catholic-actions:
 *   post:
 *     tags:
 *       - Catholic Actions
 *     security:
 *       - Authorization: []
 *     summary: Add a Catholic Actions
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Catholic Actions"
 *                 description: "Catholic Actions title"
 *               description:
 *                 type: string
 *                 example: "description"
 *                 description: "Catholic Actions description"
 *               backgroundImageId:
 *                 type: number
 *                 example: "description"
 *                 description: "Catholic Actions backgroundImageId"
 *     responses:
 *       200:
 *         description: Catholic Actions saved successfully
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
 *                   example: "Catholic Actions  saved successfully"
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
export async function postCatholicAction(req: AuthRequest, res: Response) {
  let portalUser = req.user;
  if (isUndefinedOrNull(portalUser)) {
    return res.status(401).send({ message: "Unauthorized!" });
  }

  const parsedBody = catholicActionSchema.safeParse(req.body)
  if (!parsedBody.success) {
    logger.error("Validation error: %o", parsedBody.error.issues);
    logger.error("Validation error: %o", req.body);
    return res.status(422).send({ message: "Validation error" });
  }

  const newCatholicActionRepository = AppDataSource.getRepository(CatholicActionEntity)

  try {
    const newCatholicAction = new CatholicActionEntity();
    newCatholicAction.name = parsedBody.data.name
    newCatholicAction.description_en = parsedBody.data.description_en
    newCatholicAction.description_fr = parsedBody.data.description_fr
    newCatholicAction.description_rw = parsedBody.data.description_rw
    newCatholicAction.leader = parsedBody.data.leader
    newCatholicAction.telephone = parsedBody.data.telephone
    newCatholicAction.isActive = true
    if (parsedBody.data.backgroundImageId) {
      const imageRepository = AppDataSource.getRepository(ImageEntity);
      const savedImage = await imageRepository.findOne({ where: { id: parsedBody.data.backgroundImageId } });
      if (savedImage) {
        newCatholicAction.backgroundImage = savedImage
      }
    }
    await newCatholicActionRepository.save(newCatholicAction)
    return res.status(201).send({ message: "Catholic Actions details added successfully" });
  } catch (error: any) {
    logger.error("Creating Catholic Actions failed: %s", error);
    res.status(500).send({ message: "Internal server error" });
  }
}
