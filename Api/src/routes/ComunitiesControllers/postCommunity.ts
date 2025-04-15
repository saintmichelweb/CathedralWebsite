import { Response } from "express";
import { AppDataSource } from "../../database/dataSource";
import logger from "../../services/logger";
import { isUndefinedOrNull } from "../../utils/utils";
import { z } from "zod";
import { AuthRequest } from "../../types/express";
import { CommunityEntity } from "../../entity/CommunityEntity";

const communitySchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: "name is required" }),
});

/**
 * @openapi
 * /communities:
 *   post:
 *     tags:
 *       - Community
 *     security:
 *       - Authorization: []
 *     summary: Add a Community
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Community"
 *                 description: "Community name"
 *     responses:
 *       200:
 *         description: Community saved successfully
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
 *                   example: "Community  saved successfully"
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
export async function postCommunity(req: AuthRequest, res: Response) {
  let portalUser = req.user;
  if (isUndefinedOrNull(portalUser)) {
    return res.status(401).send({ message: "Unauthorized!" });
  }

  const parsedBody = communitySchema.safeParse(req.body)
  if (!parsedBody.success) {
    logger.error("Validation error: %o", parsedBody.error.issues);
    logger.error("Validation error: %o", req.body);
    return res.status(422).send({ message: "Validation error" });
  }


  const newCommunityRepository = AppDataSource.getRepository(CommunityEntity)

  try {
    const newCommunity = new CommunityEntity();
    newCommunity.name = parsedBody.data.name
    // if (parsedBody.data.backgroundImageId) {
    //   const imageRepository = AppDataSource.getRepository(ImageEntity);
    //   const savedImage = await imageRepository.findOne({ where: { id: parsedBody.data.backgroundImageId } });
    //   if (savedImage) {
    //     newCommunity.backgroundImage = savedImage
    //   }
    // }
    await newCommunityRepository.save(newCommunity)
    return res.status(201).send({ message: "Community details added successfully" });
  } catch (error: any) {
    logger.error("Creating Community failed: %s", error);
    res.status(500).send({ message: "Internal server error" });
  }
}
