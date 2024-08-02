import { Request, Response } from "express";
import { AppDataSource } from "../../database/dataSource";
import logger from "../../services/logger";
import { isUndefinedOrNull } from "../../utils/utils";
import { MassTimesEntity } from "../../entity/MasstimesEntity";
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
  let portalUser = req.user;
  let isPortalRequest = req.query.isPortalRequest;
  let massLocation = req.query.massLocation;
  const massTimesRepository = AppDataSource.getRepository(MassTimesEntity);
  const queryBuilder = massTimesRepository.createQueryBuilder('mass_time')
    .leftJoinAndSelect('mass_time.location', 'location')
    .leftJoinAndSelect('mass_time.language', 'language')

  if (isPortalRequest) {
    if (isUndefinedOrNull(portalUser)) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
  } else {
    queryBuilder.where('mass_time.isActive = :isActive', { isActive: true })
  }

  try {
    const totalMassTimes = await queryBuilder.getMany()
    // if (!isPortalRequest && massLocation) {
    //   let responseMassTimes: UsersAppMassTimeResponse 
    //   const locationMassTimes = totalMassTimes.filter(massTime => massTime.location.location === massLocation)

    //   responseMassTimes = {
    //     location: massLocation.toString(),
    //     saturday: [],
    //     mondayToFriday: [],
    //     sunday: [],
    //   }

    //   locationMassTimes.map(massTime => {
    //     if (massTime.day === MassDaysEnum.WEEKDAYS) {
    //       responseMassTimes.mondayToFriday.push({
    //         language: massTime.language.language,
    //         time: massTime.time,
    //       })
    //     } else if (massTime.day === MassDaysEnum.SATURDAY) {
    //       responseMassTimes.saturday.push({
    //         language: massTime.language.language,
    //         time: massTime.time,
    //       })
    //     } else if (massTime.day === MassDaysEnum.SUNDAY) {
    //       responseMassTimes.sunday.push({
    //         language: massTime.language.language,
    //         time: massTime.time,
    //       })
    //     }
    //   })
    //   return res.status(200).send({ message: "Mass Times retrieved successfully!", data: responseMassTimes });
    // }
    return res.status(200).send({ message: "Mass Times retrieved successfully!", massTimes: totalMassTimes, numberOfPages: 2 });
  } catch (error: any) {
    logger.error("Get mass times failed: %s", error);
    res.status(500).send({ success: false, message: "Internal server error!" });
  }
}

interface UsersAppMassTimeResponse {
  location: string,
  saturday: massLanguageAndTime [],
  sunday: massLanguageAndTime[],
  mondayToFriday: massLanguageAndTime[]
}

interface massLanguageAndTime{
  language: string,
  time: string
}
