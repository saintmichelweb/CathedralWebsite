import { Request, Response } from "express";
import { AppDataSource } from "../../database/dataSource";
import logger from "../../services/logger";
import { isUndefinedOrNull } from "../../utils/utils";
import { RecentEventsEntity } from "../../entity/RecentEventsEntity";
import * as fs from 'fs'

/**
 * @openapi
 * /recent-events/{id}:
 *   delete:
 *     tags:
 *       - Recent Events
 *     security:
 *       - Authorization: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *            type: integer
 *         description: Recent Event ID
 *     summary: delete a Recent Event
 *     responses:
 *       200:
 *         description: Recent Event deleted successfully
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
 *                   example: "Recent Event deleted successfully"
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
export async function deleteRecentEvent(req: Request, res: Response) {
  let portalUser = req.user;
  if (isUndefinedOrNull(portalUser)) {
    return res.status(401).send({ message: "Unauthorized!" });
  }

  const RecentEventRepository = AppDataSource.getRepository(RecentEventsEntity);
  try {
    const id = Number(req.params.id);
    const oldRecentEvent = await RecentEventRepository.findOne({ where: { id }, relations: ['backgroundImage'], });

    if (oldRecentEvent === null) {
      return res.status(404).send({ message: "Recent Event does not exist!" });
    }

    if (oldRecentEvent.backgroundImage) {  
        fs.unlinkSync(oldRecentEvent.backgroundImage.imagePath);
    }

    await RecentEventRepository.delete(oldRecentEvent.id);
    return res.status(201).send({ message: "Recent Event deleted successfully!" });
  } catch (error: any) {
    logger.error("Deleting Recent Event failed: %s", error);
    res.status(500).send({ success: false, message: "Internal server error!" });
  }
}
