import { Request, Response } from "express";
import { AppDataSource } from "../../../database/dataSource";
import logger from "../../../services/logger";
import { isUndefinedOrNull } from "../../../utils/utils";
import { RecentEventsEntity } from "../../../entity/RecentEventsEntity";

/**
 * @openapi
 * /home-page/recent-events:
 *   get:
 *     tags:
 *       - Front-End
 *     summary: get all recent events
 *     responses:
 *       200:
 *         description: Get recent events successful
 *       500:
 *         description: Internal Server error
 *
 */

/* eslint-disable @typescript-eslint/explicit-function-return-type */
export async function getRecentEvents(req: Request, res: Response) {
    try {
        const recentEventsRepository = AppDataSource.getRepository(RecentEventsEntity);
        const queryBuilder = recentEventsRepository.createQueryBuilder('recent_events')
            .leftJoinAndSelect('recent_events.backgroundImage', 'backgroundImage')
            .where('recent_events.isActive = :isActive', { isActive: true });

        const recentEvents = await queryBuilder.getMany();

        const responseRecentEvents = Object.values(recentEvents).map(recentEvent => ({
            id: recentEvent.id,
            title: {
                title_en: recentEvent.title_en,
                title_fr: recentEvent.title_fr,
                title_rw: recentEvent.title_rw
            },
            description: {
                description_en: recentEvent.description_en,
                description_fr: recentEvent.description_fr,
                description_rw: recentEvent.description_rw
            },
            backgroundImage: recentEvent.backgroundImage?.imageUrl || null,
            event_date: recentEvent.event_date
        }))

        res.status(200).send({ data: responseRecentEvents })
    } catch (error: any) {
        logger.error('Getting recent events failed with error: %s', error)
        res.status(400).send({ success: false, message: error.message })
    }
}

/**
 * @openapi
 * /home-page/recent-events/:id:
 *   get:
 *     tags:
 *       - Front-End
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *            type: integer
 *         description: Service ID
 *     summary: get recent event by id 
 *     responses:
 *       200:
 *         description: Get recent event by id successful
 *       500:
 *         description: Internal Server error
 *
 */

export async function getRecentEventById(req: Request, res: Response) {
    const recentEventId = Number(req.params.id)
    if (isUndefinedOrNull(recentEventId)) {
        return res.status(400).send({ message: 'recent event id not provided' })
    }

    try {
        const recentEventsRepository = AppDataSource.getRepository(RecentEventsEntity);
        const queryBuilder = recentEventsRepository.createQueryBuilder('recent_events')
            .leftJoinAndSelect('recent_events.backgroundImage', 'backgroundImage')
            .where('recent_events.id = :id', { id: recentEventId });

        const recentEvent = await queryBuilder.getMany();

        if (!recentEvent.length) {
            return res.status(404).send({ message: 'recent event not found' })
        }

        const responseRecentEvent = {
            recent_event_title: {
                title_en: recentEvent[0].title_en,
                title_fr: recentEvent[0].title_fr,
                title_rw: recentEvent[0].title_rw
            },
            recent_event_Description: {
                description_en: recentEvent[0].description_en,
                description_fr: recentEvent[0].description_fr,
                description_rw: recentEvent[0].description_rw
            },
            backgroundImage: recentEvent[0].backgroundImage?.imageUrl || null,
            event_date: recentEvent[0].event_date
        }

        res.status(200).send({ data: responseRecentEvent })
    } catch (error: any) {
        logger.error('Getting home page failed with error: %s', error)
        res.status(400).send({ success: false, message: error.message })
    }
}