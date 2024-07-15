import { Request, Response } from "express";
import { AppDataSource } from "../../database/dataSource";
import logger from "../../services/logger";
import { isUndefinedOrNull } from "../../utils/utils";
import { TopNewsAndNoticesEntity } from "../../entity/TopNewsAndNoticesEntity";

/**
 * @openapi
 * /top-news-and-notices/all:
 *   get:
 *     tags:
 *       - Top News And Notices
 *     security:
 *       - Authorization: []
 *     parameters:
 *      - in: query
 *        name: isActive
 *        schema:
 *          type: boolean
 *        required: false
 *        description: Activity status of top news and notices
 *     summary: get all top news and notices
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
export async function getAllTopParishNewsAndNotices(req: Request, res: Response) {
  const portalUser = req.user;
  // const isActive = req.query.isActive
  if (isUndefinedOrNull(portalUser)) {
    return res.status(401).send({ message: "Unauthorized!" });
  }

  const topParishNewsAndNoticesRepository = AppDataSource.getRepository(TopNewsAndNoticesEntity);
  const queryBuilder = topParishNewsAndNoticesRepository.createQueryBuilder('top_news_and_notices')

  // if (isActive !==null && isActive !== undefined) {
  //   queryBuilder.where('recent_events.isActive = :isActive', {isActive: isActive? 1: 0})
  // }

  try {
    const [totalTopParishNewsAndNotices, numberOfAllTopParishNewsAndNotices] = await queryBuilder.getManyAndCount()
    return res.status(200).send({ message: "Top News And Notices retrieved successfully!", topParishNewsAndNoticesCount: numberOfAllTopParishNewsAndNotices, topParishNewsAndNotices: totalTopParishNewsAndNotices, numberOfPages: 2 });
  } catch (error: any) {
    logger.error("Getting top news and notices failed: %s", error);
    res.status(500).send({ success: false, message: "Internal server error!" });
  }
}
