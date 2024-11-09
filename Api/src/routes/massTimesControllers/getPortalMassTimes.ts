import { Request, Response } from "express";
import { AppDataSource } from "../../database/dataSource";
import logger from "../../services/logger";
import { isUndefinedOrNull } from "../../utils/utils";
import { MassTimesEntity } from "../../entity/MasstimesEntity";
import { readEnv } from "../../setup/readEnv";
// import { MassDaysEnum } from "../../../../shared-lib/src";

/**
 * @openapi
 * /mass-times/all:
 *   get:
 *     tags:
 *       - Mass Times
 *     security:
 *       - Authorization: []
 *     parameters:
 *      - in: query
 *        name: isPortalRequest
 *        schema:
 *          type: boolean
 *        required: false
 *        description: boolean representing is the request is from the portal
 *      - in: query
 *        name: massLocation
 *        schema:
 *          type: string
 *        required: false
 *        description: Location of Masses
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
  const portalUser = req.user;
  const massTimesRepository = AppDataSource.getRepository(MassTimesEntity);
  const queryBuilder = massTimesRepository.createQueryBuilder('mass_time')
    .leftJoinAndSelect('mass_time.location', 'location')
    .leftJoinAndSelect('mass_time.language', 'language')

  if (isUndefinedOrNull(portalUser)) {
    return res.status(401).send({ message: "Unauthorized!" });
  }

  const pageSize = Number(readEnv('PAGINATION_LIMIT', 10, true))
  const { page = 1 } = req.query
  const skip = (Number(page) - 1) * Number(pageSize)

  if (isNaN(skip) || isNaN(Number(pageSize)) || skip < 0 || Number(pageSize) < 1) {
    return res.status(400).send({ message: 'Invalid pagination parameters' })
  }

  try {
    const numberOfItems = await queryBuilder.getCount()
    const totalPages = Math.ceil(numberOfItems / pageSize)
    queryBuilder.skip(skip).take(pageSize).orderBy('mass_time.created_at', 'DESC')
    const totalMassTimes = await queryBuilder.getMany()  
    return res.status(200).send({ message: "Mass Times retrieved successfully!", massTimes: totalMassTimes, totalPages });
  } catch (error: any) {
    logger.error("Get mass times failed: %s", error);
    res.status(500).send({ success: false, message: "Internal server error!" });
  }
}

// interface UsersAppMassTimeResponse {
//   location: string,
//   saturday: massLanguageAndTime[],
//   sunday: massLanguageAndTime[],
//   mondayToFriday: massLanguageAndTime[]
// }

// interface massLanguageAndTime {
//   language: string,
//   time: string
// }
