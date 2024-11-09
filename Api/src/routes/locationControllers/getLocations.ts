import { Response } from "express";
import { AppDataSource } from "../../database/dataSource";
import logger from "../../services/logger";
import { isUndefinedOrNull } from "../../utils/utils";
import { LocationEntity } from "../../entity/LocationEntity";
import { AuthRequest } from "../../types/express";
import { readEnv } from "../../setup/readEnv";

/**
 * @openapi
 * /location/all:
 *   get:
 *     tags:
 *       - Location
 *     security:
 *       - Authorization: []
 *     parameters:
 *      - in: query
 *        name: isActive
 *        schema:
 *          type: boolean
 *        required: false
 *        description: Activity status of location
 *      - in: query
 *        name: isMassLocation
 *        schema:
 *          type: boolean
 *        required: false
 *        description: Location is for Masses
 *     summary: get all Mass locations
 *     responses:
 *       200:
 *         description: Get Locations
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
export async function getLocations(req: AuthRequest, res: Response) {
  const portalUser = req.user;
  const isActive = req.query.isActive
  const isMassLocation = req.query.isMassLocation

  if (isUndefinedOrNull(portalUser)) {
    return res.status(401).send({ message: "Unauthorized!" });
  }

  const pageSize = Number(readEnv('PAGINATION_LIMIT', 10, true))
  const {  page = 1 } = req.query
  const skip = (Number(page) - 1) * Number(pageSize)

  if (isNaN(skip) || isNaN(Number(pageSize)) || skip < 0 || Number(pageSize) < 1) {
    return res.status(400).send({ message: 'Invalid pagination parameters' })
  }

  const locationRepository = AppDataSource.getRepository(LocationEntity);
  const queryBuilder = locationRepository.createQueryBuilder('locations')

  if (!isUndefinedOrNull(isActive) || !isUndefinedOrNull(isMassLocation)) {
    queryBuilder
      .where('locations.isMassLocation = :isMassLocation', { isMassLocation: isMassLocation === 'true' ? 1 : 0 })
      .andWhere('locations.isActive = :isActive', { isActive: isActive === 'true' ? 1 : 0 })
  }


  try {
    if ( req.query.page ) {
      const totalLocations = await queryBuilder.getMany()
      return res.status(200).send({ message: "Locations retrieved successfully!", totalPages: 1, languages: totalLocations });
    } else {
      const numberOfItems = await queryBuilder.getCount()
      const totalPages = Math.ceil(numberOfItems / pageSize)
      queryBuilder.skip(skip).take(pageSize)
      const totalLocations = await queryBuilder.getMany()  
      return res.status(200).send({ message: "Locations retrieved successfully!", totalPages, locations: totalLocations });
    }
  } catch (error: any) {
    logger.error("Getting location failed: %s", error);
    res.status(500).send({ success: false, message: "Internal server error!" });
  }
}
