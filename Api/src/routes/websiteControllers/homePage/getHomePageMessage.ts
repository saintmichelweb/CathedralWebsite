import { Request, Response } from "express";
import { AppDataSource } from "../../../database/dataSource";
import { HomePageWelcomeMessageEntity } from "../../../entity/HomePageWelcomeMessageEntity";
import logger from "../../../services/logger";

/* eslint-disable @typescript-eslint/explicit-function-return-type */
export async function getHomePageMessage(req: Request, res: Response) {
    try {
        const homePageWelcomeMessage = await AppDataSource.manager.find(HomePageWelcomeMessageEntity, {
            relations: ['images']
        })

        res.status(200).send({...homePageWelcomeMessage })
    } catch (error: any) {
        logger.error('Getting home page failed with error: %s', error)
        res.status(400).send({ success: false, message: error.message })
    }
}
