import { Request, Response } from "express";
import { AppDataSource } from "../../database/dataSource";
import logger from "../../services/logger";
import { ChoirEntity } from "../../entity/ChoirEntity";
import { isUndefinedOrNull } from "../../utils/utils";

/**
 * @openapi
 * /Choir/all:
 *   get:
 *     tags:
 *       - Choir
 *     summary: get all Choir
 *     responses:
 *       200:
 *         description: Get Choir
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
export async function getAllChoir(req: Request, res: Response) {
  const portalUser = req.user;
  const isActive = req.query.isActive
  if (isUndefinedOrNull(portalUser)) {
    return res.status(401).send({ message: "Unauthorized!" });
  }

  const ChoirRepository = AppDataSource.getRepository(ChoirEntity);
  const queryBuilder = ChoirRepository.createQueryBuilder('Choir')
    .leftJoinAndSelect('Choir.backgroundImage', 'backgoundImage')

  // if (isActive !==null && isActive !== undefined) {
  //   queryBuilder.where('recent_events.isActive = :isActive', {isActive: isActive? 1: 0})
  // }

  try {
    const totalChoir = await queryBuilder.getMany()
    return res.status(200).send({ message: "Choir retrieved successfully!", choirs: totalChoir });
  } catch (error: any) {
    logger.error("Getting Choir failed: %s", error);
    res.status(500).send({ success: false, message: "Internal server error!" });
  }
}
