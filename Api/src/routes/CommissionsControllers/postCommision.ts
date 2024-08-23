import { Response } from "express";
import { AppDataSource } from "../../database/dataSource";
import logger from "../../services/logger";
import { isUndefinedOrNull } from "../../utils/utils";
import { z } from "zod";
import { AuthRequest } from "../../types/express";
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
 * /Commissions:
 *   post:
 *     tags:
 *       - Commissions
 *     security:
 *       - Authorization: []
 *     summary: Add a Commission
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Commission"
 *                 description: "Commission title"
 *               description:
 *                 type: string
 *                 example: "description"
 *                 description: "Commission description"
 *               backgroundImageId:
 *                 type: number
 *                 example: "description"
 *                 description: "Commission backgroundImageId"
 *     responses:
 *       200:
 *         description: Commission saved successfully
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
 *                   example: "Commission  saved successfully"
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
export async function postCommissions(req: AuthRequest, res: Response) {
  let portalUser = req.user;
  if (isUndefinedOrNull(portalUser)) {
    return res.status(401).send({ message: "Unauthorized!" });
  }

  const parsedBody = commissionSchema.safeParse(req.body)
  if (!parsedBody.success) {
    logger.error("Validation error: %o", parsedBody.error.issues);
    logger.error("Validation error: %o", req.body);
    return res.status(422).send({ message: "Validation error" });
  }


  const newCommissionRepository = AppDataSource.getRepository(CommissionEntity)

  try {
    const newCommission = new CommissionEntity();
    newCommission.name = parsedBody.data.name
    // newCommission.title = parsedBody.data.title
    newCommission.description_en = parsedBody.data.description_en
    newCommission.description_fr = parsedBody.data.description_fr
    newCommission.description_rw = parsedBody.data.description_rw
    if (parsedBody.data.backgroundImageId) {
      const imageRepository = AppDataSource.getRepository(ImageEntity);
      const savedImage = await imageRepository.findOne({ where: { id: parsedBody.data.backgroundImageId } });
      if (savedImage) {
        newCommission.backgroundImage = savedImage
      }
    }
    await newCommissionRepository.save(newCommission)
    return res.status(201).send({ message: "Commission details added successfully" });
  } catch (error: any) {
    logger.error("Creating Commission failed: %s", error);
    res.status(500).send({ message: "Internal server error" });
  }
}
