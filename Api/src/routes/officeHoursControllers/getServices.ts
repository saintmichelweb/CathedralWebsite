import { Response } from "express";
import { AppDataSource } from "../../database/dataSource";
import logger from "../../services/logger";
import { isUndefinedOrNull } from "../../utils/utils";
import { AuthRequest } from "../../types/express";
import { ServiceEntity } from "../../entity/ServiceEntity";

/**
 * @openapi
 * /officeHour/all:
 *   get:
 *     tags:
 *       - Service
 *     security:
 *       - Authorization: []
 *     parameters:
 *      - in: query
 *        name: isActive
 *        schema:
 *          type: boolean
 *        required: false
 *        description: Activity status of officeHour
 *     summary: get all Mass officeHours
 *     responses:
 *       200:
 *         description: Get OfficeHours
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
export async function getOfficeHours(req: AuthRequest, res: Response) {
  const portalUser = req.user;
  const isActive = req.query.isActive
  if (isUndefinedOrNull(portalUser)) {
    return res.status(401).send({ message: "Unauthorized!" });
  }

  const officeHourRepository = AppDataSource.getRepository(ServiceEntity);
  const queryBuilder = officeHourRepository.createQueryBuilder('officeHours')

  try {
    const [totalOfficeHours, numberOfAllOfficeHours] = await queryBuilder.getManyAndCount()
    return res.status(200).send({ message: "OfficeHours retrieved successfully!", officeHoursCount: numberOfAllOfficeHours, officeHours: totalOfficeHours, numberOfPages: 2 });
  } catch (error: any) {
    logger.error("Getting officeHour failed: %s", error);
    res.status(500).send({ success: false, message: "Internal server error!" });
  }
}
