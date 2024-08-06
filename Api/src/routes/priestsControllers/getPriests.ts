import { Request, Response } from "express";
import { AppDataSource } from "../../database/dataSource";
import logger from "../../services/logger";
import { isUndefinedOrNull } from "../../utils/utils";
import { PriestsEntity } from "../../entity/PriestsEntity";

/**
 * @openapi
 * /priests/all:
 *   get:
 *     tags:
 *       - Priests
 *     summary: get all priests
 *     responses:
 *       200:
 *         description: Get Priests
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
export async function getAllPriests(req: Request, res: Response) {
  // const portalUser = req.user;
  // const isActive = req.query.isActive
  // if (isUndefinedOrNull(portalUser)) {
  //   return res.status(401).send({ message: "Unauthorized!" });
  // }

  const priestsRepository = AppDataSource.getRepository(PriestsEntity);
  const queryBuilder = priestsRepository.createQueryBuilder('priests')
    .leftJoinAndSelect('priests.backgroundImage', 'backgoundImage')

  // if (isActive !==null && isActive !== undefined) {
  //   queryBuilder.where('recent_events.isActive = :isActive', {isActive: isActive? 1: 0})
  // }

  try {
    const totalPriests = await queryBuilder.getMany()
    return res.status(200).send({ message: "Priests retrieved successfully!", priests: totalPriests });
  } catch (error: any) {
    logger.error("Getting priests failed: %s", error);
    res.status(500).send({ success: false, message: "Internal server error!" });
  }
}
