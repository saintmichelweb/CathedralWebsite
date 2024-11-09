import { Response } from "express";
import { AppDataSource } from "../../database/dataSource";
import logger from "../../services/logger";
import { AuthRequest } from "../../types/express";
import { ParishComitteCouncilEntity } from "../../entity/ParishComitteCouncilEntity";
import { isUndefinedOrNull } from "../../utils/utils";
import { readEnv } from "../../setup/readEnv";

/**
 * @openapi
 * /parishCommitteeCouncil/all:
 *   get:
 *     tags:
 *       - parishCommitteeCouncil
 *     security:
 *       - Authorization: []
 *     parameters:
 *      - in: query
 *        name: isActive
 *        schema:
 *          type: boolean
 *        required: false
 *        description: Activity status of parishCommitteeCouncil
 *     summary: get all Mass parishCommitteeCouncils
 *     responses:
 *       200:
 *         description: Get parishCommitteeCouncil
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
export async function getparishCommitteeCouncil(req: AuthRequest, res: Response) {
  const portalUser = req.user;
  const isActive = req.query.isActive

  if (isUndefinedOrNull(portalUser)) {
    return res.status(401).send({ message: "Unauthorized!" });
  }

  const pageSize = Number(readEnv('PAGINATION_LIMIT', 10, true))
  const { page = 1 } = req.query
  const skip = (Number(page) - 1) * Number(pageSize)

  if (isNaN(skip) || isNaN(Number(pageSize)) || skip < 0 || Number(pageSize) < 1) {
    return res.status(400).send({ message: 'Invalid pagination parameters' })
  }

  const parishCommitteeCouncilRepository = AppDataSource.getRepository(ParishComitteCouncilEntity);
  const queryBuilder = parishCommitteeCouncilRepository.createQueryBuilder('parishCommitteeCouncils')
    .leftJoinAndSelect('parishCommitteeCouncils.backgroundImage', 'backgoundImage')

  try {
    const numberOfItems = await queryBuilder.getCount()
    const totalPages = Math.ceil(numberOfItems / pageSize)
    queryBuilder.skip(skip).take(pageSize)
    const totalparishCommitteeCouncil = await queryBuilder.getMany() 
    return res.status(200).send({ message: "parishCommitteeCouncil retrieved successfully!", totalPages, parishCommitteeCouncils: totalparishCommitteeCouncil });
  } catch (error: any) {
    logger.error("Getting parishCommitteeCouncil failed: %s", error);
    res.status(500).send({ success: false, message: "Internal server error!" });
  }
}
