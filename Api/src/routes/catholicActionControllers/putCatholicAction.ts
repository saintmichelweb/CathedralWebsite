import { Response } from "express";
import { AuthRequest } from "../../types/express";
import { AppDataSource } from "../../database/dataSource";
import logger from "../../services/logger";
import { isUndefinedOrNull } from "../../utils/utils";
import { z } from "zod";
import { ImageEntity } from "../../entity/ImagesEntity";
import { CatholicActionEntity } from "../../entity/CatholicActionEntity";

const CatholicActionSchema = z.object({
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
    .min(1, { message: "Leader is required" }),
  telephone: z
    .string()
    .trim()
    .min(1, { message: "Telephone is required" }),
  isActive: z.boolean(),
  backgroundImageId: z
    .number()
    .nullable()
});

/**
 * @openapi
 * /catholic-actions/{id}:
 *   put:
 *     tags:
 *       - Catholic Actions
 *     security:
 *       - Authorization: []
 *     summary: Update a Catholic Actions
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *            type: integer
 *         description: Catholic Actions ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description_en
 *               - description_fr
 *               - description_rw
 *               - leader
 *               - telephone
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Choir"
 *                 description: "Name of the choir"
 *               description_en:
 *                 type: string
 *                 example: "English description"
 *                 description: "Choir description in English"
 *               description_fr:
 *                 type: string
 *                 example: "Description en français"
 *                 description: "Choir description in French"
 *               description_rw:
 *                 type: string
 *                 example: "Ibisobanuro mu Kinyarwanda"
 *                 description: "Choir description in Kinyarwanda"
 *               leader:
 *                 type: string
 *                 example: "John Doe"
 *                 description: "Leader of the choir"
 *               telephone:
 *                 type: string
 *                 example: "+250788123456"
 *                 description: "Telephone number of the choir leader"
 *               backgroundImageId:
 *                 type: number
 *                 example: 101
 *                 nullable: true
 *                 description: "Optional background image ID"
 *               isActive:
 *                 type: boolean
 *                 example: true
 *                 description: "Whether the choir is active"
 *     responses:
 *       200:
 *         description: Catholic Actions saved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Catholic Actions updated successfully."
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
 *         description: Catholic Actions not found! 
 *       422:
 *         description: Validation error!
 *       500:
 *         description: Internal Server error!
 *
 */

/* eslint-disable @typescript-eslint/explicit-function-return-type */
export async function putCatholicAction(req: AuthRequest, res: Response) {
  let portalUser = req.user;
  if (isUndefinedOrNull(portalUser)) {
    return res.status(401).send({ message: "Unauthorized!" });
  }

  const parsedBody = CatholicActionSchema.safeParse(req.body);
  if (!parsedBody.success) {
    logger.error("Validation error: %o", parsedBody.error.issues);
    logger.error("Validation error: %o", req.body);
    return res.status(422).send({ message: "Validation error!" });
  }

  const CatholicActionRepository = AppDataSource.getRepository(CatholicActionEntity);
  try {
    const id = Number(req.params.id);
    const savedCatholicAction = await CatholicActionRepository.findOne({ where: { id } });

    if (savedCatholicAction === null) {
      return res.status(404).send({ message: "Catholic Actions does not exist!" });
    }

    if (parsedBody.data.name) {
      savedCatholicAction.name = parsedBody.data.name;
    }

    if (parsedBody.data.description_en) {
      savedCatholicAction.description_en = parsedBody.data.description_en;
    }

    if (parsedBody.data.description_fr) {
      savedCatholicAction.description_fr = parsedBody.data.description_fr;
    }

    if (parsedBody.data.description_rw) {
      savedCatholicAction.description_rw = parsedBody.data.description_rw;
    }
    
    if (parsedBody.data.leader) {
      savedCatholicAction.leader = parsedBody.data.leader;
    }

    if (parsedBody.data.telephone) {
      savedCatholicAction.telephone = parsedBody.data.telephone;
    }

    savedCatholicAction.isActive = parsedBody.data.isActive;

    if (parsedBody.data.backgroundImageId) {
      const imageRepository = AppDataSource.getRepository(ImageEntity);
      const savedImage = await imageRepository.findOne({ where: { id: parsedBody.data.backgroundImageId } });
      if (savedImage) {
        savedCatholicAction.backgroundImage = savedImage
      }
    }

    await CatholicActionRepository.save(savedCatholicAction);
    return res.status(201).send({ message: "Catholic Action updated successfully." });
  } catch (error: any) {
    logger.error("Updating Catholic Actions failed: %s", error);
    res.status(500).send({ success: false, message: "Internal server error!" });
  }
}
