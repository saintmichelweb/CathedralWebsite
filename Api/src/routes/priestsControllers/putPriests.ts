import { Response } from "express";
import { AuthRequest } from "../../types/express";
import { AppDataSource } from "../../database/dataSource";
import logger from "../../services/logger";
import { isUndefinedOrNull } from "../../utils/utils";
import { z } from "zod";
import { ImageEntity } from "../../entity/ImagesEntity";
import { PriestsEntity } from "../../entity/PriestsEntity";

const priestSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: "Name is required" }),
  title: z
    .string()
    .trim()
    .min(1, { message: "Title is required" }),
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
 * /priests/{id}:
 *   put:
 *     tags:
 *       - Priests
 *     security:
 *       - Authorization: []
 *     summary: Update a priest
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *            type: integer
 *         description: Priest ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Priest"
 *                 description: "Priest title"
 *               description:
 *                 type: string
 *                 example: "description"
 *                 description: "Priest description"
 *               backgroundImageId:
 *                 type: number
 *                 example: 1
 *                 description: "Id of the saved image entity"
 *     responses:
 *       200:
 *         description: Priest saved successfully
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
 *                   example: "Priest updated successfully."
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
 *         description: Recent Event not found! 
 *       422:
 *         description: Validation error!
 *       500:
 *         description: Internal Server error!
 *
 */

/* eslint-disable @typescript-eslint/explicit-function-return-type */
export async function putPriests(req: AuthRequest, res: Response) {
  let portalUser = req.user;
  if (isUndefinedOrNull(portalUser)) {
    return res.status(401).send({ message: "Unauthorized!" });
  }

  const parsedBody = priestSchema.safeParse(req.body);
  if (!parsedBody.success) {
    logger.error("Validation error: %o", parsedBody.error.issues);
    logger.error("Validation error: %o", req.body);
    return res.status(422).send({ message: "Validation error!" });
  }

  const priestsRepository = AppDataSource.getRepository(PriestsEntity);
  try {
    const id = Number(req.params.id);
    const savedPriest = await priestsRepository.findOne({ where: { id } });
    if (savedPriest === null) {
      return res.status(404).send({ message: "Recent Event does not exist!" });
    }

    if (parsedBody.data.name) {
      savedPriest.name = parsedBody.data.name;
    }

    if (parsedBody.data.title) {
      savedPriest.title = parsedBody.data.title;
    }
    if (parsedBody.data.description_en) {
      savedPriest.description_en = parsedBody.data.description_en;
    }
    if (parsedBody.data.description_fr) {
      savedPriest.description_fr = parsedBody.data.description_fr;
    }
    if (parsedBody.data.description_rw) {
      savedPriest.description_rw = parsedBody.data.description_rw;
    }

    if (parsedBody.data.backgroundImageId) {
      const imageRepository = AppDataSource.getRepository(ImageEntity);
      const savedImage = await imageRepository.findOne({ where: { id: parsedBody.data.backgroundImageId } });
      if (savedImage) {
        savedPriest.backgroundImage = savedImage
      }
    }

    await priestsRepository.save(savedPriest);
    return res.status(201).send({ message: "Priests updated successfully." });
  } catch (error: any) {
    logger.error("Updating priests failed: %s", error);
    res.status(500).send({ success: false, message: "Internal server error!" });
  }
}
