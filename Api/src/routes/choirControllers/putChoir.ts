import { Response } from "express";
import { AuthRequest } from "../../types/express";
import { AppDataSource } from "../../database/dataSource";
import logger from "../../services/logger";
import { isUndefinedOrNull } from "../../utils/utils";
import { z } from "zod";
import { ImageEntity } from "../../entity/ImagesEntity";
import { ChoirEntity } from "../../entity/ChoirEntity";

const ChoirSchema = z.object({
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
 * /Choir:
 *   post:
 *     tags:
 *       - Choir
 *     security:
 *       - Authorization: []
 *     summary: Add a Choir
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
 *               - isActive
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
 *         description: Choir saved successfully
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
 *                   example: "Choir saved successfully"
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
export async function putChoir(req: AuthRequest, res: Response) {
  let portalUser = req.user;
  if (isUndefinedOrNull(portalUser)) {
    return res.status(401).send({ message: "Unauthorized!" });
  }

  const parsedBody = ChoirSchema.safeParse(req.body);
  if (!parsedBody.success) {
    logger.error("Validation error: %o", parsedBody.error.issues);
    logger.error("Validation error: %o", req.body);
    return res.status(422).send({ message: "Validation error!" });
  }

  const ChoirRepository = AppDataSource.getRepository(ChoirEntity);
  try {
    const id = Number(req.params.id);
    const savedChoir = await ChoirRepository.findOne({ where: { id } });
    if (savedChoir === null) {
      return res.status(404).send({ message: "Choir does not exist!" });
    }

    if (parsedBody.data.name) {
      savedChoir.name = parsedBody.data.name;
    }

    // if (parsedBody.data.title) {
    //   savedChoir.title = parsedBody.data.title;
    // }
    if (parsedBody.data.description_en) {
      savedChoir.description_en = parsedBody.data.description_en;
    }
    if (parsedBody.data.description_fr) {
      savedChoir.description_fr = parsedBody.data.description_fr;
    }
    if (parsedBody.data.description_rw) {
      savedChoir.description_rw = parsedBody.data.description_rw;
    }
    if (parsedBody.data.leader) {
      savedChoir.leader = parsedBody.data.leader;
    }
    if (parsedBody.data.telephone) {
      savedChoir.telephone = parsedBody.data.telephone;
    }
    
    savedChoir.isActive = parsedBody.data.isActive;

    if (parsedBody.data.backgroundImageId) {
      const imageRepository = AppDataSource.getRepository(ImageEntity);
      const savedImage = await imageRepository.findOne({ where: { id: parsedBody.data.backgroundImageId } });
      if (savedImage) {
        savedChoir.backgroundImage = savedImage
      }
    }

    await ChoirRepository.save(savedChoir);
    return res.status(201).send({ message: "Choir updated successfully." });
  } catch (error: any) {
    logger.error("Updating Choir failed: %s", error);
    res.status(500).send({ success: false, message: "Internal server error!" });
  }
}
