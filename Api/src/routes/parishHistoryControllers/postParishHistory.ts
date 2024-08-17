import { Response } from "express";
import { AppDataSource } from "../../database/dataSource";
import logger from "../../services/logger";
import { isUndefinedOrNull } from "../../utils/utils";
import { z } from "zod";
import { AuthRequest } from "../../types/express";
import { ParishHistoryEntity } from "../../entity/ParishHistoryEntity";

const massParishHistorySchema = z.object({
    parishHistory_en: z
        .string()
        .trim()
        .min(1, { message: "Parish History is required" }),
    parishHistory_fr: z
        .string()
        .trim()
        .min(1, { message: "Parish History is required" }),
    parishHistory_rw: z
        .string()
        .trim()
        .min(1, { message: "Parish History is required" }),
    mission_en: z
        .string()
        .trim()
        .min(1, { message: "Parish mission is required" }),
    mission_fr: z
        .string()
        .trim()
        .min(1, { message: "Parish mission is required" }),
    mission_rw: z
        .string()
        .trim()
        .min(1, { message: "Parish mission is required" }),
    vision_en: z
        .string()
        .trim()
        .min(1, { message: "Parish vision is required" }),
    vision_fr: z
        .string()
        .trim()
        .min(1, { message: "Parish vision is required" }),
    vision_rw: z
        .string()
        .trim()
        .min(1, { message: "Parish vision is required" }),
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
 *               parishHistory_en:
 *                 type: string
 *                 example: "history in English"
 *                 description: "Parish History of the Mass"
 *               parishHistory_fr:
 *                 type: string
 *                 example: "history in French"
 *                 description: "Parish History of the Mass"
 *               parishHistory_rw:
 *                 type: string
 *                 example: "history in Kinyarwanda"
 *                 description: "Parish History of the Mass"
 *               mission_en:
 *                 type: string
 *                 example: "history in English"
 *                 description: "Parish History of the Mass"
 *               mission_fr:
 *                 type: string
 *                 example: "history in French"
 *                 description: "Parish History of the Mass"
 *               mission_rw:
 *                 type: string
 *                 example: "history in Kinyarwanda"
 *                 description: "Parish History of the Mass"
 *               vision_en:
 *                 type: string
 *                 example: "history in English"
 *                 description: "Parish History of the Mass"
 *               vision_fr:
 *                 type: string
 *                 example: "history in French"
 *                 description: "Parish History of the Mass"
 *               vision_rw:
 *                 type: string
 *                 example: "history in Kinyarwanda"
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
            oldparishHistory.history_en = parsedBody.data.parishHistory_en
            oldparishHistory.history_fr = parsedBody.data.parishHistory_fr
            oldparishHistory.history_rw = parsedBody.data.parishHistory_rw
            oldparishHistory.mission_en = parsedBody.data.mission_en
            oldparishHistory.mission_fr = parsedBody.data.mission_fr
            oldparishHistory.mission_rw = parsedBody.data.mission_rw
            oldparishHistory.vision_en = parsedBody.data.vision_en
            oldparishHistory.vision_fr = parsedBody.data.vision_fr
            oldparishHistory.vision_rw = parsedBody.data.vision_rw
            await parishHistoryRepository.save(oldparishHistory)
        } else {
            newParishHistory.history_en = parsedBody.data.parishHistory_en
            newParishHistory.history_fr = parsedBody.data.parishHistory_fr
            newParishHistory.history_rw = parsedBody.data.parishHistory_rw
            newParishHistory.vision_en = parsedBody.data.vision_en
            newParishHistory.vision_fr = parsedBody.data.vision_fr
            newParishHistory.vision_rw = parsedBody.data.vision_rw
            newParishHistory.mission_en = parsedBody.data.mission_en
            newParishHistory.mission_fr = parsedBody.data.mission_fr
            newParishHistory.mission_rw = parsedBody.data.mission_rw
            await parishHistoryRepository.save(newParishHistory)
        }

        return res.status(201).send({ message: "Parish History, mission and vision saved successfully" });
    } catch (error: any) {
        logger.error("Saving Parish History, mission and vision failed: %s", error);
        res.status(500).send({ success: false, });
    }
}
