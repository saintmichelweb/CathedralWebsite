import { Request, Response } from "express";
import { AppDataSource } from "../../database/dataSource";
import logger from "../../services/logger";
import { isUndefinedOrNull } from "../../utils/utils";
import { RecentEventsEntity } from "../../entity/RecentEventsEntity";
import { readEnv } from "../../setup/readEnv";

/**
 * @openapi
 * /recent-events/all:
 *   get:
 *     tags:
 *       - Recent Events
 *     security:
 *       - Authorization: []
 *     parameters:
 *      - in: query
 *        name: isActive
 *        schema:
 *          type: boolean
 *        required: false
 *        description: Activity status of recent event
 *     summary: get all Mass recent events
 *     responses:
 *       200:
 *         description: Get Recent Events
 *       401:
 *         description: Invalid credentials
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid credentials"
 *       500:
 *         description: Internal Server error
 *
 */

/* eslint-disable @typescript-eslint/explicit-function-return-type */
export async function getAllRecentEvents(req: Request, res: Response) {
  const portalUser = req.user;
  // const isActive = req.query.isActive

  if (isUndefinedOrNull(portalUser)) {
    return res.status(401).send({ message: "Unauthorized!" });
  }

  const pageSize = Number(readEnv('PAGINATION_LIMIT', 10, true))
  const { page = 1 } = req.query
  const skip = (Number(page) - 1) * Number(pageSize)

  if (isNaN(skip) || isNaN(Number(pageSize)) || skip < 0 || Number(pageSize) < 1) {
    return res.status(400).send({ message: 'Invalid pagination parameters' })
  }

  const recentEventsRepository = AppDataSource.getRepository(RecentEventsEntity);
  const queryBuilder = recentEventsRepository.createQueryBuilder('recent_events')
    .leftJoinAndSelect('recent_events.backgroundImage', 'backgoundImage')

  // if (isActive !==null && isActive !== undefined) {
  //   queryBuilder.where('recent_events.isActive = :isActive', {isActive: isActive? 1: 0})
  // }

  try {
    const numberOfItems = await queryBuilder.getCount()
    const totalPages = Math.ceil(numberOfItems / pageSize)
    queryBuilder.skip(skip).take(pageSize).orderBy('recent_events.created_at', 'DESC')
    const totalRecentEvents = await queryBuilder.getMany() 
    return res.status(200).send({ message: "Recent Events retrieved successfully!", totalPages, recentEvents: totalRecentEvents });
  } catch (error: any) {
    logger.error("Getting recent events failed: %s", error);
    res.status(500).send({ success: false, message: "Internal server error!" });
  }
}
