import { Response } from "express";
import { AppDataSource } from "../../database/dataSource";
import logger from "../../services/logger";
import { isUndefinedOrNull } from "../../utils/utils";
import { z } from "zod";
import { AuthRequest } from "../../types/express";
import { ParishHistoryEntity } from "../../entity/ParishHistoryEntity";

const massParishHistorySchema = z.object({
    parishHistory: z
        .string()
        .trim()
        .min(1, { message: "Parish History Name is required" }),
});

/**
 * @openapi
 * /parish-history:
 *   post:
 *     tags:
 *       - Parish History
 *     security:
 *       - Authorization: []
 *     summary: Create/Update Parish History
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               parishHistory:
 *                 type: string
 *                 example: "history"
 *                 description: "Parish History of the Mass"
 *     responses:
 *       200:
 *         description: Location saved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Parish History saved successfully"
 *       401:
 *         description: Invalid credentials
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Invalid credentials"
 *       422:
 *         description: Validation error
 *       500:
 *         description: Internal Server error
 *
 */

/* eslint-disable @typescript-eslint/explicit-function-return-type */
export async function postParishHistory(req: AuthRequest, res: Response) {
    let portalUser = req.user;
    if (isUndefinedOrNull(portalUser)) {
        return res.status(401).send({ message: "Unauthorized!" });
    }

    const parsedBody = massParishHistorySchema.safeParse(req.body)
    if (!parsedBody.success) {
        logger.error("Validation error: %o", parsedBody.error.issues);
        logger.error("Validation error: %o", req.body);
        return res.status(422).send({ message: "Validation error" });
    }

    const parishHistoryRepository = AppDataSource.getRepository(ParishHistoryEntity)
    const parishHistoryQueueryBuilder = parishHistoryRepository.createQueryBuilder('parish_history')

    const parishHistoryEntries = await parishHistoryQueueryBuilder.getMany()

    try {
        const newParishHistory = new ParishHistoryEntity();

        if (parishHistoryEntries.length) {
            const oldparishHistory = parishHistoryEntries[0]
            oldparishHistory.history = parsedBody.data.parishHistory
            await parishHistoryRepository.save(oldparishHistory)
        } else {
            newParishHistory.history = parsedBody.data.parishHistory
            await parishHistoryRepository.save(newParishHistory)
        }

        return res.status(201).send({ message: "Parish History saved successfully" });
    } catch (error: any) {
        logger.error("Creating Parish History failed: %s", error);
        res.status(500).send({ success: false, });
    }
}
