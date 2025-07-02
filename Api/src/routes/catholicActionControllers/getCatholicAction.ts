import { Request, Response } from "express";
import { AppDataSource } from "../../database/dataSource";
import logger from "../../services/logger";
import { CatholicActionEntity } from "../../entity/CatholicActionEntity";
import { isUndefinedOrNull } from "../../utils/utils";
import { readEnv } from "../../setup/readEnv";

/**
 * @openapi
 * /catholic-actions:
 *   get:
 *     tags:
 *       - Catholic Actions
 *     summary: get all Catholic Actions
  *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: The page number
 *         minimum: 1
 *         example: 1
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: The search text
 *       - in: isActive
 *         name: is active
 *         schema:
 *           type: boolean
 *         description: if catholic_action is active.
 *     responses:
 *       200:
 *         description: Get Catholic Actions
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
export async function getAllCatholicActions(req: Request, res: Response) {
  const portalUser = req.user;
  const isActive = req.query.isActive
  const pageSize = Number(readEnv('PAGINATION_LIMIT', 10, true))
  const { page = 1 } = req.query
  const skip = (Number(page) - 1) * Number(pageSize)

  if (isUndefinedOrNull(portalUser)) {
    return res.status(401).send({ message: "Unauthorized!" });
  }

  if (isNaN(skip) || isNaN(Number(pageSize)) || skip < 0 || Number(pageSize) < 1) {
    return res.status(400).send({ message: 'Invalid pagination parameters' })
  }

  const CatholicActionRepository = AppDataSource.getRepository(CatholicActionEntity);
  const queryBuilder = CatholicActionRepository.createQueryBuilder('catholic_action')
    .leftJoinAndSelect('catholic_action.backgroundImage', 'backgoundImage')

  if (typeof isActive === 'string' && isActive.trim() !== '') {
    queryBuilder.where('catholic_action.isActive = :isActive', { isActive: isActive == 'true' ? 1 : 0 })
  }

  try {
    const totalCount = await queryBuilder.getCount()
    const totalPages = Math.ceil(totalCount / Number(pageSize))

    queryBuilder
      .orderBy('catholic_action.created_at', 'DESC')
      .skip(skip)
      .take(Number(pageSize))

    const totalCatholicActions = await queryBuilder.getMany()
    return res.status(200).send({ message: "Catholic Actions retrieved successfully!", catholicActions: totalCatholicActions, totalPages: totalPages });
  } catch (error: any) {
    logger.error("Getting Catholic Actions failed: %s", error);
    res.status(500).send({ success: false, message: "Internal server error!" });
  }
}
