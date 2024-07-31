import { Response } from "express";
import { AppDataSource } from "../../database/dataSource";
import logger from "../../services/logger";
import { isUndefinedOrNull } from "../../utils/utils";
import { AuthRequest } from "../../types/express";
import { ParishHistoryEntity } from "../../entity/ParishHistoryEntity";


/**
 * @openapi
 * /parish-history:
 *   get:
 *     tags:
 *       - Parish History
 *     security:
 *       - Authorization: []
 *     summary: get Parish History
 *     responses:
 *       200:
 *         description: Get Parish History
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
export async function getParishHistory(req: AuthRequest, res: Response) {
    let portalUser = req.user;
    if (isUndefinedOrNull(portalUser)) {
        return res.status(401).send({ message: "Unauthorized!" });
    }

    const parishHistoryRepository = AppDataSource.getRepository(ParishHistoryEntity)
    const parishHistoryQueueryBuilder = parishHistoryRepository.createQueryBuilder('parish_history')

    
    try {
        const parishHistoryEntries = await parishHistoryQueueryBuilder.getMany()
        return res.status(201).send({ message: "Parish History retrieved successfully", parishHistory: parishHistoryEntries[0] });
    } catch (error: any) {
        logger.error("Creating Parish History failed: %s", error);
        res.status(500).send({ success: false, });
    }
}
