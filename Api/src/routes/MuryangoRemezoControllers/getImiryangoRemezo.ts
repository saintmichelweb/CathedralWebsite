import { Request, Response } from "express";
import { AppDataSource } from "../../database/dataSource";
import logger from "../../services/logger";
import { MuryangoremezoEntity } from "../../entity/MuryangoremezoEntity";
import { isUndefinedOrNull } from "../../utils/utils";
import { readEnv } from "../../setup/readEnv";

/**
 * @openapi
 * /muryangoremezo:
 *   get:
 *     tags:
 *       - Muryango Remezo
 *     summary: get all MuryangoRemezo
 *     responses:
 *       200:
 *         description: Get MuryangoRemezo
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
export async function getAllMiryangoRemezo(req: Request, res: Response) {
  const portalUser = req.user;
  // const isActive = req.query.isActive

  if (isUndefinedOrNull(portalUser)) {
    return res.status(401).send({ message: "Unauthorized!" });
  }

  const pageSize = Number(readEnv('PAGINATION_LIMIT', 10, true))
  const { page = 1 } = req.query
  const skip = (Number(page) - 1) * Number(pageSize)

  if (isNaN(skip) || isNaN(Number(pageSize)) || skip < 0 || Number(pageSize) < 1) {
    return res.status(400).send({ message: 'Invalid pagination parameters' })
  }

  const MuryangoRemezoRepository = AppDataSource.getRepository(MuryangoremezoEntity);
  const queryBuilder = MuryangoRemezoRepository.createQueryBuilder('muryangoremezo')
    .leftJoinAndSelect('muryangoremezo.backgroundImage', 'backgroundImage')

  // if (isActive !==null && isActive !== undefined) {
  //   queryBuilder.where('recent_events.isActive = :isActive', {isActive: isActive? 1: 0})
  // }

  try {
    const numberOfItems = await queryBuilder.getCount()
    const totalPages = Math.ceil(numberOfItems / pageSize)
    queryBuilder.skip(skip).take(pageSize).orderBy('MuryangoRemezo.created_at', 'DESC')
    const totalMuryangoRemezo = await queryBuilder.getMany()
    return res.status(200).send({ message: "MuryangoRemezo retrieved successfully!", communities: totalMuryangoRemezo, totalPages });
  } catch (error: any) {
    logger.error("Getting MuryangoRemezo failed: %s", error);
    res.status(500).send({ success: false, message: "Internal server error!" });
  }
}
