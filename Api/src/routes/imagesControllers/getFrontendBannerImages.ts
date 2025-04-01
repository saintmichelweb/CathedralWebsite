import { Request, Response } from "express";
import { AppDataSource } from "../../database/dataSource";
import logger from "../../services/logger";
import { ImageEntity } from "../../entity/ImagesEntity";

/**
 * @openapi
 * /images/frontend:
 *   get:
 *     tags:
 *       - Images
 *     parameters:
 *      - in: query
 *        name: isBannerImage
 *        schema:
 *          type: boolean
 *        required: true
 *        description: Status of Image
 *     summary: Get all banner images for the frontend
 *     responses:
 *       200:
 *         description: Successfully retrieved banner images
 *       500:
 *         description: Internal Server error
 */

/* eslint-disable @typescript-eslint/explicit-function-return-type */
export async function getFrontendBannerImages(req: Request, res: Response) {
  const isBannerImage = req.query.isBannerImage;

  const ImageRepository = AppDataSource.getRepository(ImageEntity);
  const queryBuilder = ImageRepository.createQueryBuilder("images");

  // Check if the query parameter exists and filter accordingly
  if (isBannerImage !== null && isBannerImage !== undefined) {
    queryBuilder.where("images.isBannerImage = :isBannerImage", { isBannerImage: isBannerImage === "true" ? 1 : 0 });
  }

  try {
    const [bannerImages, bannerImagesCount] = await queryBuilder.getManyAndCount();

    // Return a success response with images and count
    return res.status(200).send({
      message: "Banner Images retrieved successfully!",
      bannerImagesCount,
      bannerImages,
    });
  } catch (error: any) {
    logger.error("Get Frontend Banner Images failed: %s", error);
    res.status(500).send({ success: false, message: "Internal server error!" });
  }
}
