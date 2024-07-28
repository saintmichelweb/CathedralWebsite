import { Response } from "express";
import { AppDataSource } from "../../database/dataSource";
import logger from "../../services/logger";
import { isUndefinedOrNull } from "../../utils/utils";
import { z } from "zod";
import { AuthRequest } from "../../types/express";
import { ImageEntity } from "../../entity/ImagesEntity";
import { PriestsEntity } from "../../entity/PriestsEntity";

const recentEventSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: "Name is required" }),
  description: z
    .string()
    .trim()
    .min(1, { message: "Description is required" }),
  backgroungImageId: z
    .number()
    .nullable()
});

/**
 * @openapi
 * /priests:
 *   post:
 *     tags:
 *       - Priests
 *     security:
 *       - Authorization: []
 *     summary: Add a priest
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Priest"
 *                 description: "Priest title"
 *               description:
 *                 type: string
 *                 example: "description"
 *                 description: "Priest description"
 *               backgroungImageId:
 *                 type: number
 *                 example: "description"
 *                 description: "Priest backgroungImageId"
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
 *                   example: "Recent Event  saved successfully"
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
export async function postPriests(req: AuthRequest, res: Response) {
  let portalUser = req.user;
  if (isUndefinedOrNull(portalUser)) {
    return res.status(401).send({ message: "Unauthorized!" });
  }

  const parsedBody = recentEventSchema.safeParse(req.body)
  if (!parsedBody.success) {
    logger.error("Validation error: %o", parsedBody.error.issues);
    logger.error("Validation error: %o", req.body);
    return res.status(422).send({ message: "Validation error" });
  }


  const newPriestRepository = AppDataSource.getRepository(PriestsEntity)

  try {
    const newPriest = new PriestsEntity();
    newPriest.name = parsedBody.data.name
    newPriest.description = parsedBody.data.description

    if (parsedBody.data.backgroungImageId) {
      const imageRepository = AppDataSource.getRepository(ImageEntity);
      const savedImage = await imageRepository.findOne({ where: { id: parsedBody.data.backgroungImageId } });
      if (savedImage) {
        newPriest.backgroundImage = savedImage
      }
    }
    await newPriestRepository.save(newPriest)
    return res.status(201).send({ message: "Priest details added successfully" });
  } catch (error: any) {
    logger.error("Creating Priest failed: %s", error);
    res.status(500).send({ message: "Internal server error" });
  }
}
