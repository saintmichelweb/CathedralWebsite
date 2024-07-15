import { Request, Response } from "express";
import { AppDataSource } from "../../database/dataSource";
import logger from "../../services/logger";
import { isUndefinedOrNull } from "../../utils/utils";
import { MassTimesEntity } from "../../entity/MasstimesEntity";

/* eslint-disable @typescript-eslint/explicit-function-return-type */
export async function getMassTimes(req: Request, res: Response) {
    // let portalUser = req.user
    // if (isUndefinedOrNull(portalUser)) {
    //     return res.status(401).send({ message: 'Unauthorized!' })
    // }

    try {
        const masstimes = await AppDataSource.manager.find(MassTimesEntity, {
            where: { isActive: true }
        })
        res.status(200).send({ data: masstimes })
    } catch (error: any) {
        logger.error('Getting home page failed with error: %s', error)
        res.status(400).send({ success: false, message: error.message })
    }
}
