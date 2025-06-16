import { Request, Response } from "express";
import { AppDataSource } from "../../database/dataSource";
import logger from "../../services/logger";
import { PriestsEntity } from "../../entity/PriestsEntity";

/**
 * @openapi
 * /aboutPage/priests:
 *   get:
 *     tags:
 *       - Website-Routes
 *     summary: get all Priests
 *     responses:
 *       200:
 *         description: Get Priests successful
 *       500:
 *         description: Internal Server error
 *
 */

/* eslint-disable @typescript-eslint/explicit-function-return-type */
export async function getWebsitePriests(req: Request, res: Response) {
const priestsRepository = AppDataSource.getRepository(PriestsEntity);
  const queryBuilder = priestsRepository.createQueryBuilder('priests')
    .leftJoinAndSelect('priests.backgroundImage', 'backgoundImage')

  try {
    const totalPriests = await queryBuilder.getMany()
    const responsePriests = Object.values(totalPriests).map(priest => ({
        description: {
          description_en: priest.description_en,
          description_fr: priest.description_fr,
          description_rw: priest.description_rw
        },
        backgroundImage: priest.backgroundImage?.imageUrl || null,
        name: priest.name,
        title: priest.title,
        // telephone: priest.telephone
      }))
    return res.status(200).send({ message: "Priests retrieved successfully!", priests: responsePriests });
  } catch (error: any) {
    logger.error("Getting priests failed: %s", error);
    res.status(500).send({ success: false, message: "Internal server error!" });
  }
}
