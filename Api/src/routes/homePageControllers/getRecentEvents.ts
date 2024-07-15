import { Request, Response } from "express";
import { AppDataSource } from "../../database/dataSource";
import logger from "../../services/logger";
import { isUndefinedOrNull } from "../../utils/utils";
import { RecentEventsEntity } from "../../entity/RecentEventsEntity";

/* eslint-disable @typescript-eslint/explicit-function-return-type */
export async function getRecentEvents(req: Request, res: Response) {
    // let portalUser = req.user
    // if (isUndefinedOrNull(portalUser)) {
    //     return res.status(401).send({ message: 'Unauthorized!' })
    // }

    try {
        const recentEvents = await AppDataSource.manager.find(RecentEventsEntity, {
            where: { isActive: true }
        })
        res.status(200).send({ data: recentEvents })
    } catch (error: any) {
        logger.error('Getting home page failed with error: %s', error)
        res.status(400).send({ success: false, message: error.message })
    }
}
