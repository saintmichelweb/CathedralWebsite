import { Request, Response } from "express";
import { AppDataSource } from "../../database/dataSource";
import { HomePageWelcomeMessageEntity } from "../../entity/HomePageWelcomeMessageEntity";
import logger from "../../services/logger";
import { isUndefinedOrNull } from "../../utils/utils";

/* eslint-disable @typescript-eslint/explicit-function-return-type */
export async function getHomePageMessage(req: Request, res: Response) {
    // let portalUser = req.user
    // if (isUndefinedOrNull(portalUser)) {
    //     return res.status(401).send({ message: 'Unauthorized!' })
    // }

    try {
        const homePageWelcomeMessage = await AppDataSource.manager.find(HomePageWelcomeMessageEntity, {
            where: { isActive: true }
        })

        res.status(200).send({ data: homePageWelcomeMessage })
    } catch (error: any) {
        logger.error('Getting home page failed with error: %s', error)
        res.status(400).send({ success: false, message: error.message })
    }
}
