import { Response } from "express";
import { AppDataSource } from "../../database/dataSource";
import logger from "../../services/logger";
import { isUndefinedOrNull } from "../../utils/utils";
import { AuthRequest } from "../../types/express";
import { OfficeHoursEntity } from "../../entity/OfficeHoursEntity";
import { readEnv } from "../../setup/readEnv";

/**
 * @openapi
 * /office-hours/all:
 *   get:
 *     tags:
 *       - Office Hours
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

  const pageSize = Number(readEnv('PAGINATION_LIMIT', 10, true))
  const { page = 1 } = req.query
  const skip = (Number(page) - 1) * Number(pageSize)

  if (isNaN(skip) || isNaN(Number(pageSize)) || skip < 0 || Number(pageSize) < 1) {
    return res.status(400).send({ message: 'Invalid pagination parameters' })
  }
  const officeHourRepository = AppDataSource.getRepository(OfficeHoursEntity);
  const queryBuilder = officeHourRepository.createQueryBuilder('office_hours')
    .leftJoinAndSelect('office_hours.office_place', 'office_place')

  try {
    const [totalOfficeHours, numberOfItems] = await queryBuilder.getManyAndCount()
    const totalPages = Math.ceil(numberOfItems / pageSize)
    return res.status(200).send({ message: "OfficeHours retrieved successfully!", totalPages, officeHours: totalOfficeHours });
  } catch (error: any) {
    logger.error("Getting officeHour failed: %s", error);
    res.status(500).send({ success: false, message: "Internal server error!" });
  }
}
