import { Request, Response } from "express";
import { AppDataSource } from "../../database/dataSource";
import logger from "../../services/logger";
import { isUndefinedOrNull } from "../../utils/utils";
import { LocationEntity } from "../../entity/LocationEntity";
import { LanguageEntity } from "../../entity/languageEntity";
import { ImageEntity } from "../../entity/ImagesEntity";
import { readEnv } from "../../setup/readEnv";

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

  const pageSize = Number(readEnv('PAGINATION_LIMIT', 10, true))
  const {  page = 1 } = req.query
  const skip = (Number(page) - 1) * Number(pageSize)

  if (isNaN(skip) || isNaN(Number(pageSize)) || skip < 0 || Number(pageSize) < 1) {
    return res.status(400).send({ message: 'Invalid pagination parameters' })
  }

  const ImageRepostory = AppDataSource.getRepository(ImageEntity);
  const queryBuilder = ImageRepostory.createQueryBuilder('images')

  if (isBannerImage !== null && isBannerImage !== undefined) {
    queryBuilder.where('images.isBannerImage = :isBannerImage', { isBannerImage: isBannerImage === 'true' ? 1 : 0 })
  }

  try {
    const [totalBannerImages, numberOfItems] = await queryBuilder.getManyAndCount()
    const totalPages = Math.ceil(numberOfItems / pageSize)
    return res.status(200).send({ message: "Banner Images retrieved successfully!", totalPages, bannerImages: totalBannerImages });
  } catch (error: any) {
    logger.error("Get Banner Images failed: %s", error);
    res.status(500).send({ success: false, message: "Internal server error!" });
  }
}
