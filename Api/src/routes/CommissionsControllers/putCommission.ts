import { Response } from "express";
import { AuthRequest } from "../../types/express";
import { AppDataSource } from "../../database/dataSource";
import logger from "../../services/logger";
import { isUndefinedOrNull } from "../../utils/utils";
import { z } from "zod";
import { ImageEntity } from "../../entity/ImagesEntity";
import { CommissionEntity } from "../../entity/CommissionEntity";

const commissionSchema = z.object({
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
  backgroundImageId: z
    .number()
    .nullable()
});

/**
 * @openapi
 * /Commission/{id}:
 *   put:
 *     tags:
 *       - Commission
 *     security:
 *       - Authorization: []
 *     summary: Update a commission
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *            type: integer
 *         description: commission ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "commission"
 *                 description: "commission title"
 *               description:
 *                 type: string
 *                 example: "description"
 *                 description: "commission description"
 *               backgroundImageId:
 *                 type: number
 *                 example: 1
 *                 description: "Id of the saved image entity"
 *     responses:
 *       200:
 *         description: commission saved successfully
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
 *                   example: "commission updated successfully."
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
 *         description: Commission not found! 
 *       422:
 *         description: Validation error!
 *       500:
 *         description: Internal Server error!
 *
 */

/* eslint-disable @typescript-eslint/explicit-function-return-type */
export async function putCommission(req: AuthRequest, res: Response) {
  let portalUser = req.user;
  if (isUndefinedOrNull(portalUser)) {
    return res.status(401).send({ message: "Unauthorized!" });
  }

  const parsedBody = commissionSchema.safeParse(req.body);
  if (!parsedBody.success) {
    logger.error("Validation error: %o", parsedBody.error.issues);
    logger.error("Validation error: %o", req.body);
    return res.status(422).send({ message: "Validation error!" });
  }

  const CommissionRepository = AppDataSource.getRepository(CommissionEntity);
  try {
    const id = Number(req.params.id);
    const savedCommission = await CommissionRepository.findOne({ where: { id } });
    if (savedCommission === null) {
      return res.status(404).send({ message: "Commission does not exist!" });
    }

    if (parsedBody.data.name) {
      savedCommission.name = parsedBody.data.name;
    }

    // if (parsedBody.data.title) {
    //   savedCommission.title = parsedBody.data.title;
    // }
    if (parsedBody.data.description_en) {
      savedCommission.description_en = parsedBody.data.description_en;
    }
    if (parsedBody.data.description_fr) {
      savedCommission.description_fr = parsedBody.data.description_fr;
    }
    if (parsedBody.data.description_rw) {
      savedCommission.description_rw = parsedBody.data.description_rw;
    }

    if (parsedBody.data.backgroundImageId) {
      const imageRepository = AppDataSource.getRepository(ImageEntity);
      const savedImage = await imageRepository.findOne({ where: { id: parsedBody.data.backgroundImageId } });
      if (savedImage) {
        savedCommission.backgroundImage = savedImage
      }
    }

    await CommissionRepository.save(savedCommission);
    return res.status(201).send({ message: "Commission updated successfully." });
  } catch (error: any) {
    logger.error("Updating Commission failed: %s", error);
    res.status(500).send({ success: false, message: "Internal server error!" });
  }
}
