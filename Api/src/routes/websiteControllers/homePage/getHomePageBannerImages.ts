import { Request, Response } from "express";
import { AppDataSource } from "../../../database/dataSource";
import logger from "../../../services/logger";
import { ImageEntity } from "../../../entity/ImagesEntity";

/* eslint-disable @typescript-eslint/explicit-function-return-type */
export async function getHomePageBannerImages(req: Request, res: Response) {
    try {
        const allImages = await AppDataSource.manager.find(ImageEntity, {
            where: { isBannerImage: true }
        })

        const homePageBannerImages = Object.values(allImages).map(BannerImage => ({
            banner_Image_Description: {
                description_en: BannerImage.bannerDescription_en,
                description_fr: BannerImage.bannerDescription_fr,
                description_rw: BannerImage.bannerDescription_rw
            },
            image: BannerImage.imageUrl,
        }))
        res.status(200).send(homePageBannerImages)
    } catch (error: any) {
        logger.error('Getting home page banner images failed with error: %s', error)
        res.status(400).send({ success: false, message: error.message })
    }
}