import { Response } from "express";
import { AppDataSource } from "../../database/dataSource";
import logger from "../../services/logger";
import { isUndefinedOrNull } from "../../utils/utils";
import { AuthRequest } from "../../types/express";
import { ParishHistoryEntity } from "../../entity/ParishHistoryEntity";


// /**
//  * @openapi
//  * /parish-history:
//  *   get:
//  *     tags:
//  *       - Parish History
//  *     security:
//  *       - Authorization: []
//  *     summary: get Parish History
//  *     responses:
//  *       200:
//  *         description: Get Parish History
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
export async function getWebsiteParishHistory(req: AuthRequest, res: Response) {
    const parishHistoryRepository = AppDataSource.getRepository(ParishHistoryEntity)
    const parishHistoryQueueryBuilder = parishHistoryRepository.createQueryBuilder('parish_history')
    try {
        const parishHistoryEntries = await parishHistoryQueueryBuilder.getMany()
        // return res.status(201).send({ message: "Parish History retrieved successfully", parishHistory: parishHistoryEntries[0] });
        res.status(200).send({
            message: "Parish History retrieved successfully",
            parishHistory: {
                history: {
                    history_en: parishHistoryEntries[0].history_en,
                    history_fr: parishHistoryEntries[0].history_fr,
                    history_rw: parishHistoryEntries[0].history_rw
                },
                mission: {
                    mission_en: parishHistoryEntries[0].mission_en,
                    mission_fr: parishHistoryEntries[0].mission_fr,
                    mission_rw: parishHistoryEntries[0].mission_rw
                },
                vision: {
                    vision_en: parishHistoryEntries[0].vision_en,
                    vision_fr: parishHistoryEntries[0].vision_fr,
                    vision_rw: parishHistoryEntries[0].vision_rw
                },
            }
        })
    } catch (error: any) {
        logger.error("Creating Parish History failed: %s", error);
        res.status(500).send({ success: false, });
    }
}
