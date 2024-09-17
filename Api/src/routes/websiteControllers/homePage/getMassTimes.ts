import { Request, Response } from "express";
import { AppDataSource } from "../../../database/dataSource";
import logger from "../../../services/logger";
import { MassTimesEntity } from "../../../entity/MasstimesEntity";
import { LocationEntity } from "../../../entity/LocationEntity";
import { MassDaysEnum_EN } from "../../../../../shared-lib/src";

/* eslint-disable @typescript-eslint/explicit-function-return-type */
export async function getMassTimes(req: Request, res: Response) {
    try {
        const locationRepository = AppDataSource.getRepository(LocationEntity);
        const locationqueryBuilder = locationRepository.createQueryBuilder('locations')
            .where('locations.isMassLocation = :isMassLocation', { isMassLocation: 1 })

        const totalLocations = await locationqueryBuilder.getMany()

        const massTimesRepostory = AppDataSource.getRepository(MassTimesEntity);
        const queryBuilder = massTimesRepostory.createQueryBuilder('mass_time')
            .leftJoinAndSelect('mass_time.location', 'location')
            .leftJoinAndSelect('mass_time.language', 'language')
            .where('mass_time.isActive = :isActive', { isActive: true })
        const masstimes = await queryBuilder.getMany()

        const responseMassTimes: any[] = []
        for (const location of totalLocations) {
            const locationMassTimes: any[] = []
            Object.values(MassDaysEnum_EN).map(value => {
                const dayMasstimes = masstimes.filter((masstime) => masstime.day_en === value && masstime.location.location === location.location)
                const massTimesOfTheDay = []
                if (dayMasstimes.length) {
                    for (const dayMasstime of dayMasstimes) {
                        massTimesOfTheDay.push({
                            time: dayMasstime.time,
                            language: dayMasstime.language.language
                        })
                    }
                    locationMassTimes.push({
                        day: value,
                        times: massTimesOfTheDay
                    })
                }
            })

            if (locationMassTimes.length) {
                responseMassTimes.push({
                    tabTitle: location.location,
                    content: locationMassTimes
                })
            }
        }
        res.status(200).send({ data: responseMassTimes })
    } catch (error: any) {
        logger.error('Getting home page mass times failed with error: %s', error)
        res.status(400).send({ success: false, message: error.message })
    }
}


// export const MassTimeData: MassTime[] = [
//     {
//         id: 1,
//         tabTitle: "St Michel",
//         content: {
//             Sunday: [
//                 ["7 AM", "Kinyarwanda"],
//                 ["9 AM", "English"],
//                 ["11 AM", "Kinyarwanda"],
//                 ["5 PM", "French"]
//             ],
//             Monday_Friday: [
//                 ["7 AM", "Kinyarwanda"],
//                 ["12 AM", "English"]
//             ],
//             Saturday: [
//                 ["7 AM", "Kinyarwanda"],
//                 ["9 AM", "English"]
//             ]
//         }

//     },
//     {
//         id: 2,
//         tabTitle: "Notre Dame de Cîteaux",
//         content: {
//             Sunday: [
//                 // ["7 AM", "Kinyarwanda"],
//                 // ["9 AM", "English"],
//                 // ["11 AM", "Kinyarwanda"],
//                 ["5:00 PM", "French"]
//             ],
//             Monday_Friday: [
//                 ["6:30 AM", "Kinyarwanda"],
//                 ["5:30 AM", "Kinyarwanda"]
//             ],
//             Saturday: [
//                 ["7 AM", "Kinyarwanda"],
//                 ["5:00 PM", "English"]
//             ]
//         }

//     },
//     {
//         id: 3,
//         tabTitle: "Utunyoni",
//         content: {
//             Sunday: [
//                 // ["7 AM", "Kinyarwanda"],
//                 // ["9 AM", "English"],
//                 ["11 AM", "Kinyarwanda"],
//                 // ["5 PM", "French"]
//             ],
//             Monday_Friday: [
//                 ["7 AM", "Kinyarwanda"],
//                 ["12 PM", "Kinyarwanda"]
//             ],
//             Saturday: [
//                 ["7 AM", "Kinyarwanda"],
//                 ["5 PM", "Kinyarwanda"]
//             ]
//         }

//     }

// ]