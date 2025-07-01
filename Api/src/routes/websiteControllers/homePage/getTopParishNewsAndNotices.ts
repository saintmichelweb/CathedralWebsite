import { Request, Response } from "express";
import { AppDataSource } from "../../../database/dataSource";
import logger from "../../../services/logger";
import { isUndefinedOrNull } from "../../../utils/utils";
import { TopNewsAndNoticesEntity } from "../../../entity/TopNewsAndNoticesEntity";

/**
 * @openapi
 * /home-page/top-parish-news-and-notices:
 *   get:
 *     tags:
 *       - Front-End
 *     summary: get all top parish news and notices
 *     responses:
 *       200:
 *         description: Get top parish news and notices successful
 *       500:
 *         description: Internal Server error
 *
 */

/* eslint-disable @typescript-eslint/explicit-function-return-type */
export async function getTopParishNewsAndNotices(req: Request, res: Response) {
    try {
        const topParishNewsAndNotices = await AppDataSource.manager.find(TopNewsAndNoticesEntity, {
            where: { isActive: true }
        })

        const responseNewsAndNotices = Object.values(topParishNewsAndNotices).map(newsAndNotice => ({
            title: {
                title_en: newsAndNotice.title_en,
                title_fr: newsAndNotice.title_fr,
                title_rw: newsAndNotice.title_rw
            },
            description: {
                description_en: newsAndNotice.description_en,
                description_fr: newsAndNotice.description_fr,
                description_rw: newsAndNotice.description_rw
            }
        }))
        res.status(200).send(responseNewsAndNotices)
    } catch (error: any) {
        logger.error('Getting home page failed with error: %s', error)
        res.status(400).send({ success: false, message: error.message })
    }
}
