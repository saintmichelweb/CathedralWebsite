import { Request, Response } from "express";
import { AppDataSource } from "../../../database/dataSource";
import logger from "../../../services/logger";
import { isUndefinedOrNull } from "../../../utils/utils";
import { RecentEventsEntity } from "../../../entity/RecentEventsEntity";

/* eslint-disable @typescript-eslint/explicit-function-return-type */
export async function getRecentEvents(req: Request, res: Response) {
    try {
        const recentEvents = await AppDataSource.manager.find(RecentEventsEntity, {
            where: { isActive: true }
        })

        const responseRecentEvents = Object.values(recentEvents).map(recentEvent => ({
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


export async function getRecentEventById(req: Request, res: Response) {
    const recentEventId = Number(req.params.id)
    if (isUndefinedOrNull(recentEventId)) {
        return res.status(400).send({ message: 'recent event id not provided' })
    }

    try {
        const recentEvent = await AppDataSource.manager.find(RecentEventsEntity, {
            where: { id: recentEventId }
        })

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
            backgroundImage: recentEvent[0].backgroundImage,
            event_date: recentEvent[0].event_date
        }

        res.status(200).send({ data: responseRecentEvent })
    } catch (error: any) {
        logger.error('Getting home page failed with error: %s', error)
        res.status(400).send({ success: false, message: error.message })
    }
}