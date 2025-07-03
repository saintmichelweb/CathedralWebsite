import { Response } from "express";
import { AuthRequest } from "../../types/express";
import { AppDataSource } from "../../database/dataSource";
import logger from "../../services/logger";
import { isUndefinedOrNull } from "../../utils/utils";
import { z } from "zod";
import { CommunityEntity } from "../../entity/CommunityEntity";

const communitySchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: "name is required" }),
});

/**
 * @openapi
 * /communities/{id}:
 *   put:
 *     tags:
 *       - Community
 *     security:
 *       - Authorization: []
 *     summary: Update a community
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *            type: integer
 *         description: community ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "community"
 *                 description: "community title"
 *     responses:
 *       200:
 *         description: community saved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "community updated successfully."
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
 *         description: Community not found! 
 *       422:
 *         description: Validation error!
 *       500:
 *         description: Internal Server error!
 *
 */

/* eslint-disable @typescript-eslint/explicit-function-return-type */
export async function putCommunity(req: AuthRequest, res: Response) {
  let portalUser = req.user;
  if (isUndefinedOrNull(portalUser)) {
    return res.status(401).send({ message: "Unauthorized!" });
  }

  const parsedBody = communitySchema.safeParse(req.body);
  if (!parsedBody.success) {
    logger.error("Validation error: %o", parsedBody.error.issues);
    logger.error("Validation error: %o", req.body);
    return res.status(422).send({ message: "Validation error!" });
  }

  const CommunityRepository = AppDataSource.getRepository(CommunityEntity);
  try {
    const id = Number(req.params.id);
    const savedCommunity = await CommunityRepository.findOne({ where: { id } });
    if (savedCommunity === null) {
      return res.status(404).send({ message: "Community does not exist!" });
    }

    if (parsedBody.data.name) {
      savedCommunity.name = parsedBody.data.name;
    }

    await CommunityRepository.save(savedCommunity);
    return res.status(201).send({ message: "Community updated successfully." });
  } catch (error: any) {
    logger.error("Updating Community failed: %s", error);
    res.status(500).send({ success: false, message: "Internal server error!" });
  }
}
