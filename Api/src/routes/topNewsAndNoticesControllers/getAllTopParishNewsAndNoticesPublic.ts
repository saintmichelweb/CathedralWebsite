import { Request, Response } from "express";
import { AppDataSource } from "../../database/dataSource";
import logger from "../../services/logger";
import { TopNewsAndNoticesEntity } from "../../entity/TopNewsAndNoticesEntity";

/**
 * @openapi
 * /top-news-and-notices/all-public:
 *   get:
 *     tags:
 *       - Top News And Notices
 *     summary: Get all top news and notices for public access
 *     responses:
 *       200:
 *         description: Get Top News And Notices
 *       500:
 *         description: Internal Server error
 *
 */

/* eslint-disable @typescript-eslint/explicit-function-return-type */
export async function getAllTopParishNewsAndNoticesPublic(req: Request, res: Response) {
  const topParishNewsAndNoticesRepository = AppDataSource.getRepository(TopNewsAndNoticesEntity);
  const queryBuilder = topParishNewsAndNoticesRepository.createQueryBuilder('top_news_and_notices');

  try {
    const [totalTopParishNewsAndNotices, numberOfAllTopParishNewsAndNotices] = await queryBuilder.getManyAndCount();
    return res.status(200).send({
      message: "Top News And Notices retrieved successfully!",
      topParishNewsAndNoticesCount: numberOfAllTopParishNewsAndNotices,
      topParishNewsAndNotices: totalTopParishNewsAndNotices,
      numberOfPages: Math.ceil(numberOfAllTopParishNewsAndNotices / 10), // Example pagination calculation
    });
  } catch (error: any) {
    logger.error("Getting top news and notices failed: %s", error);
    res.status(500).send({ success: false, message: "Internal server error!" });
  }
}
