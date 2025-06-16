import { Request, Response } from "express";
import { AppDataSource } from "../../../database/dataSource";
import logger from "../../../services/logger";
import { CatholicActionEntity } from "../../../entity/CatholicActionEntity";

/**
 * @openapi
 * /about/catholicActions:
 *   get:
 *     tags:
 *       - Website-Routes
 *     summary: get all catholic Actions
 *     responses:
 *       200:
 *         description: Get catholic Actions successful
 *       500:
 *         description: Internal Server error
 *
 */

/* eslint-disable @typescript-eslint/explicit-function-return-type */
export async function getWebsitecatholicActions(req: Request, res: Response) {
    const catholicActionRepository = AppDataSource.getRepository(CatholicActionEntity);
    const queryBuilder = catholicActionRepository.createQueryBuilder('catholicAction')
        .leftJoinAndSelect('catholicAction.backgroundImage', 'backgoundImage')
        .where('catholicAction.isActive = :isActive', { isActive: true })

    try {
        const totalcatholicAction = await queryBuilder.getMany()
        const responsecatholicActions = Object.values(totalcatholicAction).map(catholicAction => ({
            description: {
                description_en: catholicAction.description_en,
                description_fr: catholicAction.description_fr,
                description_rw: catholicAction.description_rw
            },
            logo: catholicAction.backgroundImage?.imageUrl || null,
            name: catholicAction.name,
            leader: {
                name: catholicAction.leader,
                phone: catholicAction.telephone
            }
        }))
        return res.status(200).send({ message: "catholic Actions retrieved successfully!", catholicAction: responsecatholicActions });
    } catch (error: any) {
        logger.error("Getting catholic Actions failed: %s", error);
        res.status(500).send({ success: false, message: "Internal server error!" });
    }
}
