import { Response } from "express";
import { AppDataSource } from "../../database/dataSource";
import logger from "../../services/logger";
import { isUndefinedOrNull } from "../../utils/utils";
import { LocationEntity } from "../../entity/LocationEntity";
import { AuthRequest } from "../../types/express";

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

  const locationRepository = AppDataSource.getRepository(LocationEntity);
  const queryBuilder = locationRepository.createQueryBuilder('locations')
  if (!isUndefinedOrNull(isActive) || !isUndefinedOrNull(isMassLocation)) {
    queryBuilder
      .where('locations.isMassLocation = :isMassLocation', { isMassLocation: isMassLocation === 'true' ? 1 : 0 })
      .andWhere('locations.isActive = :isActive', { isActive: isActive === 'true' ? 1 : 0 })
  }


  try {
    const [totalLocations, numberOfAllLocations] = await queryBuilder.getManyAndCount()
    return res.status(200).send({ message: "Locations retrieved successfully!", locationsCount: numberOfAllLocations, locations: totalLocations, numberOfPages: 2 });
  } catch (error: any) {
    logger.error("Getting location failed: %s", error);
    res.status(500).send({ success: false, message: "Internal server error!" });
  }
}
