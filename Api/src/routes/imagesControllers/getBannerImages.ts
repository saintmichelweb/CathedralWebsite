import { Request, Response } from "express";
import { AppDataSource } from "../../database/dataSource";
import logger from "../../services/logger";
import { isUndefinedOrNull } from "../../utils/utils";
import { LocationEntity } from "../../entity/LocationEntity";
import { LanguageEntity } from "../../entity/languageEntity";
import { ImageEntity } from "../../entity/ImagesEntity";

/**
 * @openapi
 * /images/all:
 *   get:
 *     tags:
 *       - Images
 *     security:
 *       - Authorization: []
 *     parameters:
 *      - in: query
 *        name: isBannerImage
 *        schema:
 *          type: boolean
 *        required: true
 *        description: Status of Image
 *     summary: get all banner images
 *     responses:
 *       200:
 *         description: Get images
 *       401:
 *         description: Invalid credentials
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid credentials"
 *       500:
 *         description: Internal Server error
 *
 */

/* eslint-disable @typescript-eslint/explicit-function-return-type */
export async function getBannerImages(req: Request, res: Response) {
  let portalUser = req.user;
  const isBannerImage = req.query.isBannerImage

  if (isUndefinedOrNull(portalUser)) {
    return res.status(401).send({ message: "Unauthorized!" });
  }

  const ImageRepostory = AppDataSource.getRepository(ImageEntity);
  const queryBuilder = ImageRepostory.createQueryBuilder('images')
  if (isBannerImage !== null && isBannerImage !== undefined) {
    queryBuilder.where('images.isBannerImage = :isBannerImage', { isBannerImage: isBannerImage === 'true' ? 1 : 0 })
  }

  try {
    const [totalBannerImages, numberOfAllBannerImages] = await queryBuilder.getManyAndCount()
    return res.status(200).send({ message: "Banner Images retrieved successfully!", bannerImagesCount: numberOfAllBannerImages, bannerImages: totalBannerImages });
  } catch (error: any) {
    logger.error("Get Banner Images failed: %s", error);
    res.status(500).send({ success: false, message: "Internal server error!" });
  }
}
