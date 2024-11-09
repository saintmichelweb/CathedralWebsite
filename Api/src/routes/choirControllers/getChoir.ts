import { Request, Response } from "express";
import { AppDataSource } from "../../database/dataSource";
import logger from "../../services/logger";
import { ChoirEntity } from "../../entity/ChoirEntity";
import { isUndefinedOrNull } from "../../utils/utils";
import { readEnv } from "../../setup/readEnv";

/**
 * @openapi
 * /Choir/all:
 *   get:
 *     tags:
 *       - Choir
 *     summary: get all Choir
 *     responses:
 *       200:
 *         description: Get Choir
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
export async function getAllChoir(req: Request, res: Response) {
  const portalUser = req.user;
  
  if (isUndefinedOrNull(portalUser)) {
    return res.status(401).send({ message: "Unauthorized!" });
  }
  
  // const isActive = req.query.isActive
  const pageSize = Number(readEnv('PAGINATION_LIMIT', 10, true))
  const {  page = 1 } = req.query
  const skip = (Number(page) - 1) * Number(pageSize)

  if (isNaN(skip) || isNaN(Number(pageSize)) || skip < 0 || Number(pageSize) < 1) {
    return res.status(400).send({ message: 'Invalid pagination parameters' })
  }

  const ChoirRepository = AppDataSource.getRepository(ChoirEntity);
  const queryBuilder = ChoirRepository.createQueryBuilder('Choir')
    .leftJoinAndSelect('Choir.backgroundImage', 'backgoundImage')

  // if (isActive !==null && isActive !== undefined) {
  //   queryBuilder.where('recent_events.isActive = :isActive', {isActive: isActive? 1: 0})
  // }

  try {
    const numberOfItems = await queryBuilder.getCount()
    const totalPages = Math.ceil(numberOfItems / pageSize)
    queryBuilder.skip(skip).take(pageSize)
    const totalChoir = await queryBuilder.getMany()
    return res.status(200).send({ message: "Choirs retrieved successfully!", choirs: totalChoir, totalPages });
  } catch (error: any) {
    logger.error("Getting Choir failed: %s", error);
    res.status(500).send({ success: false, message: "Internal server error!" });
  }
}
