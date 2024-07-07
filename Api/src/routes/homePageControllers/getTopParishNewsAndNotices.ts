import { Request, Response } from "express";
import { AppDataSource } from "../../database/dataSource";
import logger from "../../services/logger";
import { isUndefinedOrNull } from "../../utils/utils";
import { TopNewsAndNoticesEntity } from "../../entity/TopNewsAndNoticesEntity";

/* eslint-disable @typescript-eslint/explicit-function-return-type */
export async function getTopParishNewsAndNotices(req: Request, res: Response) {
    // let portalUser = req.user
    // if (isUndefinedOrNull(portalUser)) {
    //     return res.status(401).send({ message: 'Unauthorized!' })
    // }

    try {
        const topParishNewsAndNotices = await AppDataSource.manager.findOne(TopNewsAndNoticesEntity, {
            where: { isActive: true }
        })
        console.log('homePage', topParishNewsAndNotices)
        if (isUndefinedOrNull(topParishNewsAndNotices)) {
            return res.status(404).send()
        }

        res.status(200).send({...topParishNewsAndNotices})
    } catch (error: any) {
        logger.error('Getting home page failed with error: %s', error)
        res.status(400).send({ success: false, message: error.message })
    }
}
