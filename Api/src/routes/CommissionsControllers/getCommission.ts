import { Request, Response } from "express";
import { AppDataSource } from "../../database/dataSource";
import logger from "../../services/logger";
import { CommissionEntity } from "../../entity/CommissionEntity";

/**
 * @openapi
 * /commissions/all:
 *   get:
 *     tags:
 *       - Commission
 *     summary: get all Commission
 *     responses:
 *       200:
 *         description: Get Commission
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
export async function getAllCommissions(req: Request, res: Response) {
  // const portalUser = req.user;
  // const isActive = req.query.isActive
  // if (isUndefinedOrNull(portalUser)) {
  //   return res.status(401).send({ message: "Unauthorized!" });
  // }

  const CommissionRepository = AppDataSource.getRepository(CommissionEntity);
  const queryBuilder = CommissionRepository.createQueryBuilder('Commission')
    .leftJoinAndSelect('Commission.backgroundImage', 'backgroundImage')

  // if (isActive !==null && isActive !== undefined) {
  //   queryBuilder.where('recent_events.isActive = :isActive', {isActive: isActive? 1: 0})
  // }

  try {
    const totalCommission = await queryBuilder.getMany()
    return res.status(200).send({ message: "Commission retrieved successfully!", Commission: totalCommission });
  } catch (error: any) {
    logger.error("Getting Commission failed: %s", error);
    res.status(500).send({ success: false, message: "Internal server error!" });
  }
}
