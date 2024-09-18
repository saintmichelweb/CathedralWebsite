import { Response } from "express";
import { AppDataSource } from "../../database/dataSource";
import logger from "../../services/logger";
import { isUndefinedOrNull } from "../../utils/utils";
import { z } from "zod";
import { AuthRequest } from "../../types/express";
import { ImageEntity } from "../../entity/ImagesEntity";
import { ChoirEntity } from "../../entity/ChoirEntity";

const choirSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: "Name is required" }),
  // title: z
  //   .string()
  //   .trim()
  //   .min(1, { message: "Title is required" }),
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
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Choir"
 *                 description: "Choir title"
 *               description:
 *                 type: string
 *                 example: "description"
 *                 description: "Choir description"
 *               backgroundImageId:
 *                 type: number
 *                 example: "description"
 *                 description: "Choir backgroundImageId"
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
 *                   example: "Choir  saved successfully"
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
export async function postChoir(req: AuthRequest, res: Response) {
  let portalUser = req.user;
  if (isUndefinedOrNull(portalUser)) {
    return res.status(401).send({ message: "Unauthorized!" });
  }

  const parsedBody = choirSchema.safeParse(req.body)
  if (!parsedBody.success) {
    logger.error("Validation error: %o", parsedBody.error.issues);
    logger.error("Validation error: %o", req.body);
    return res.status(422).send({ message: "Validation error" });
  }


  const newChoirRepository = AppDataSource.getRepository(ChoirEntity)

  try {
    const newChoir = new ChoirEntity();
    newChoir.name = parsedBody.data.name
    // newChoir.title = parsedBody.data.title
    newChoir.description_en = parsedBody.data.description_en
    newChoir.description_fr = parsedBody.data.description_fr
    newChoir.description_rw = parsedBody.data.description_rw
    newChoir.leader = parsedBody.data.leader
    newChoir.telephone = parsedBody.data.telephone
    newChoir.isActive = true
    if (parsedBody.data.backgroundImageId) {
      const imageRepository = AppDataSource.getRepository(ImageEntity);
      const savedImage = await imageRepository.findOne({ where: { id: parsedBody.data.backgroundImageId } });
      if (savedImage) {
        newChoir.backgroundImage = savedImage
      }
    }
    await newChoirRepository.save(newChoir)
    return res.status(201).send({ message: "Choir details added successfully" });
  } catch (error: any) {
    logger.error("Creating Choir failed: %s", error);
    res.status(500).send({ message: "Internal server error" });
  }
}
