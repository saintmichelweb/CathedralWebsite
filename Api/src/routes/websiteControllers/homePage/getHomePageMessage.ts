import { Request, Response } from "express";
import { AppDataSource } from "../../../database/dataSource";
import { HomePageWelcomeMessageEntity } from "../../../entity/HomePageWelcomeMessageEntity";
import logger from "../../../services/logger";

/* eslint-disable @typescript-eslint/explicit-function-return-type */
export async function getHomePageMessage(req: Request, res: Response) {
    try {
        const welcomeMessageRepostory = AppDataSource.getRepository(HomePageWelcomeMessageEntity);
        const queryBuilder = welcomeMessageRepostory.createQueryBuilder('welcome_message')
            .leftJoinAndSelect('welcome_message.backgroundImage', 'backgroundImage')

        const homePageWelcomeMessage = await queryBuilder.getMany()
        

        res.status(200).send({ welcome_message: {
            welcome_message: {
                welcomeMessage_en: homePageWelcomeMessage[0].welcomeMessage_en,
                welcomeMessage_fr: homePageWelcomeMessage[0].welcomeMessage_fr,
                welcomeMessage_rw: homePageWelcomeMessage[0].welcomeMessage_rw
            },
            backgroundImag: homePageWelcomeMessage[0].backgroundImage.imageUrl
         } })
    } catch (error: any) {
        logger.error('Getting home page failed with error: %s', error)
        res.status(400).send({ success: false, message: error.message })
    }
}
