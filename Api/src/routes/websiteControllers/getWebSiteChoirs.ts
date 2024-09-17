import { Request, Response } from "express";
import { AppDataSource } from "../../database/dataSource";
import logger from "../../services/logger";
import { ChoirEntity } from "../../entity/ChoirEntity";

// /**
//  * @openapi
//  * /Choir:
//  *   get:
//  *     tags:
//  *       - Choir
//  *     summary: get all Choir
//  *     responses:
//  *       200:
//  *         description: Get Choir
//  *       401:
//  *         description: Invalid credentials
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 message:
//  *                   type: string
//  *                   example: "Invalid credentials"
//  *       500:
//  *         description: Internal Server error
//  *
//  */

/* eslint-disable @typescript-eslint/explicit-function-return-type */
export async function getWebsiteChoir(req: Request, res: Response) {
  const ChoirRepository = AppDataSource.getRepository(ChoirEntity);
  const queryBuilder = ChoirRepository.createQueryBuilder('Choir')
    .leftJoinAndSelect('Choir.backgroundImage', 'backgoundImage')

  try {
    const totalChoir = await queryBuilder.getMany()
    const responseChoirs = Object.values(totalChoir).map(choir => ({
      description: {
        description_en: choir.description_en,
        description_fr: choir.description_fr,
        description_rw: choir.description_rw
      },
      backgroundImage: choir.backgroundImage?.imageUrl || null,
      name: choir.name,
      leader: choir.leader,
      telephone: choir.telephone
    }))
    return res.status(200).send({ message: "Choir retrieved successfully!", Choir: responseChoirs });
  } catch (error: any) {
    logger.error("Getting Choir failed: %s", error);
    res.status(500).send({ success: false, message: "Internal server error!" });
  }
}
