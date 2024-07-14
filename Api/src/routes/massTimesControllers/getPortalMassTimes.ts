import { Request, Response } from "express";
import { AppDataSource } from "../../database/dataSource";
import logger from "../../services/logger";
import { isUndefinedOrNull } from "../../utils/utils";
import { MassTimesEntity } from "../../entity/MasstimesEntity";

/**
 * @openapi
 * /mass-times/all:
 *   get:
 *     tags:
 *       - Mass Times
 *     security:
 *       - Authorization: []
 *     summary: Get all mass times
 *     responses:
 *       200:
 *         description: Get Mass Times
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
export async function getPortalMassTimes(req: Request, res: Response) {
  let portalUser = req.user;
  if (isUndefinedOrNull(portalUser)) {
    return res.status(401).send({ message: "Unauthorized!" });
  }

  const massTimesRepository = AppDataSource.getRepository(MassTimesEntity);
  const queryBuilder = massTimesRepository.createQueryBuilder('mass_time')
    .leftJoinAndSelect('mass_time.location', 'location')
    .leftJoinAndSelect('mass_time.language', 'language')
  try {
    const [totalMassTimes, numberOfAllMassTimes] = await queryBuilder.getManyAndCount()
    return res.status(200).send({ message: "Mass Times retrieved successfully!", massTimesCount: numberOfAllMassTimes, massTimes: totalMassTimes, numberOfPages: 2 });
  } catch (error: any) {
    logger.error("Get mass times failed: %s", error);
    res.status(500).send({ success: false, message: "Internal server error!" });
  }
}
