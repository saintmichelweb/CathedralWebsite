import { Request, Response } from "express";
import { AppDataSource } from "../../database/dataSource";
import { HomePageWelcomeMessageEntity } from "../../entity/HomePageWelcomeMessageEntity";
import logger from "../../services/logger";
import { isUndefinedOrNull } from "../../utils/utils";
import { MassTimesEntity } from "../../entity/MasstimesEntity";

/* eslint-disable @typescript-eslint/explicit-function-return-type */
export async function GetMassTimes(req: Request, res: Response) {
    // let portalUser = req.user
    // if (isUndefinedOrNull(portalUser)) {
    //     return res.status(401).send({ message: 'Unauthorized!' })
    // }

    try {
        const masstimes = await AppDataSource.manager.findOne(MassTimesEntity, {
            where: { isActive: true }
        })
        console.log('homePage', masstimes)
        if (isUndefinedOrNull(masstimes)) {
            return res.status(404).send()
        }

        res.status(200).send({...masstimes})
    } catch (error: any) {
        logger.error('Getting home page failed with error: %s', error)
        res.status(400).send({ success: false, message: error.message })
    }
}
