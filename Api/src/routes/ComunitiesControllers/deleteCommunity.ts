import { Response } from "express";
import { AppDataSource } from "../../database/dataSource";
import logger from "../../services/logger";
import { isUndefinedOrNull } from "../../utils/utils";
import { AuthRequest } from "../../types/express";
import { CommunityEntity } from "../../entity/CommunityEntity";
import * as fs from 'fs'

/**
 * @openapi
 * /community/{id}:
 *   delete:
 *     tags:
 *       - Community
 *     security:
 *       - Authorization: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *            type: integer
 *         description: Community ID
 *     summary: delete a Mass community
 *     responses:
 *       200:
 *         description: Community deleted successfully
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
 *                   example: "Community deleted successfully"
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
 *       500:
 *         description: Internal Server error
 *
 */

/* eslint-disable @typescript-eslint/explicit-function-return-type */
export async function deleteCommunity(req: AuthRequest, res: Response) {
  let portalUser = req.user;
  if (isUndefinedOrNull(portalUser)) {
    return res.status(401).send({ message: "Unauthorized!" });
  }

  const communityRepository = AppDataSource.getRepository(CommunityEntity);
  try {
    const id = Number(req.params.id);
    const oldCommunity = await communityRepository.findOne({ where: { id } });

    if (oldCommunity === null) {
      return res.status(404).send({ message: "Community does not exist!" });
    }

    // if (oldCommunity.backgroundImage) {
    //   fs.unlinkSync(oldCommunity.backgroundImage.imagePath);
    // }

    await communityRepository.delete(oldCommunity.id);
    return res.status(201).send({ message: "Community deleted successfully!" });
  } catch (error: any) {
    logger.error("Deleting community failed: %s", error);
    res.status(500).send({ success: false, message: "Internal server error!" });
  }
}
