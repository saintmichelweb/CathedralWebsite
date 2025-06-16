import { Request, Response } from "express";
import { AppDataSource } from "../../../database/dataSource";
import logger from "../../../services/logger";
import { ImageEntity } from "../../../entity/ImagesEntity";

/**
 * @openapi
 * /homePage/bannerImages:
 *   get:
 *     tags:
 *       - Website-Routes
 *     summary: get all Banner Images
 *     responses:
 *       200:
 *         description: Get Banner Images successful
 *       500:
 *         description: Internal Server error
 *
 */

/* eslint-disable @typescript-eslint/explicit-function-return-type */
export async function getHomePageBannerImages(req: Request, res: Response) {
    try {
        const allImages = await AppDataSource.manager.find(ImageEntity, {
            where: { isBannerImage: true }
        })

        const homePageBannerImages = Object.values(allImages).map(BannerImage => ({
            description: {
                description_en: BannerImage.bannerDescription_en,
                description_fr: BannerImage.bannerDescription_fr,
                description_rw: BannerImage.bannerDescription_rw
            },
            image: BannerImage.imageUrl || null,
        }))
        res.status(200).send(homePageBannerImages)
    } catch (error: any) {
        logger.error('Getting home page banner images failed with error: %s', error)
        res.status(400).send({ success: false, message: error.message })
    }
}