import { Response } from "express";
import { AppDataSource } from "../../database/dataSource";
import logger from "../../services/logger";
import { isUndefinedOrNull } from "../../utils/utils";
import { AuthRequest } from "../../types/express";
import { OfficeHoursEntity } from "../../entity/OfficeHoursEntity";
import { LocationEntity } from "../../entity/LocationEntity";

// /**
//  * @openapi
//  * /office-hours:
//  *   get:
//  *     tags:
//  *       - Office Hours
//  *     security:
//  *       - Authorization: []
//  *     parameters:
//  *      - in: query
//  *        name: isActive
//  *        schema:
//  *          type: boolean
//  *        required: false
//  *        description: Activity status of officeHour
//  *     summary: get all Mass officeHours
//  *     responses:
//  *       200:
//  *         description: Get OfficeHours
//  *       401:
//  *         description: Invalid credentials
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 message:
//  *                   type: string
//  *                   example: "Invalid credentials"
//  *       500:
//  *         description: Internal Server error
//  *
//  */

/* eslint-disable @typescript-eslint/explicit-function-return-type */
export async function getWebsiteOfficeHours(req: AuthRequest, res: Response) {
    const officeHourRepository = AppDataSource.getRepository(OfficeHoursEntity);
    const queryBuilder = officeHourRepository.createQueryBuilder('office_hours')
        .leftJoinAndSelect('office_hours.office_place', 'office_place')

    const locationRepository = AppDataSource.getRepository(LocationEntity);
    const locationqueryBuilder = locationRepository.createQueryBuilder('locations')
        .where('locations.isMassLocation = :isMassLocation', { isMassLocation: 0 })
    const totalLocations = await locationqueryBuilder.getMany()

    try {
        const totalOfficeHours = await queryBuilder.getMany()

        const responseOfficeHours: any[] = []
        for (const location of totalLocations) {
            const locationOfficeTimes = totalOfficeHours.filter((officeTime) => officeTime.office_place.location === location.location).map(officeHour => ({
                day: {
                    day_en: officeHour.day_en,
                    day_fr: officeHour.day_fr,
                    day_rw: officeHour.day_rw
                },
                time: officeHour.time,
                location: officeHour.office_place.location
            }))

            if (locationOfficeTimes.length) {
                responseOfficeHours.push({
                    ofice: location.location,
                    content: locationOfficeTimes
                })
            }
        }

        return res.status(200).send({ message: "OfficeHours retrieved successfully!", officeHours: responseOfficeHours, numberOfPages: 2 });
    } catch (error: any) {
        logger.error("Getting officeHour failed: %s", error);
        res.status(500).send({ success: false, message: "Internal server error!" });
    }
}
