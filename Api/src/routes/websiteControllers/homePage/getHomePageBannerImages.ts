import { Request, Response } from "express";
import { AppDataSource } from "../../../database/dataSource";
import logger from "../../../services/logger";
import { ImageEntity } from "../../../entity/ImagesEntity";

/* eslint-disable @typescript-eslint/explicit-function-return-type */
export async function getHomePageBannerImages(req: Request, res: Response) {
    try {
        const allImages = await AppDataSource.manager.find(ImageEntity, {
            where: { isActive: true }
                })

        const homePageBannerImages = allImages.filter(image => image.isBannerImage)
        res.status(200).send({...homePageBannerImages })
    } catch (error: any) {
        logger.error('Getting home page banner images failed with error: %s', error)
        res.status(400).send({ success: false, message: error.message })
    }
}