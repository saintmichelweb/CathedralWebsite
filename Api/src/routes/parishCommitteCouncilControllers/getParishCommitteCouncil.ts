import { Response } from "express";
import { AppDataSource } from "../../database/dataSource";
import logger from "../../services/logger";
import { isUndefinedOrNull } from "../../utils/utils";
import { AuthRequest } from "../../types/express";
import { ParishComitteCouncilEntity } from "../../entity/ParishComitteCouncilEntity";

/**
 * @openapi
 * /parishCommitteCouncil/all:
 *   get:
 *     tags:
 *       - ParishCommitteCouncil
 *     security:
 *       - Authorization: []
 *     parameters:
 *      - in: query
 *        name: isActive
 *        schema:
 *          type: boolean
 *        required: false
 *        description: Activity status of parishCommitteCouncil
 *     summary: get all Mass parishCommitteCouncils
 *     responses:
 *       200:
 *         description: Get ParishCommitteCouncil
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
export async function getParishCommitteCouncil(req: AuthRequest, res: Response) {
  const portalUser = req.user;
  const isActive = req.query.isActive
  if (isUndefinedOrNull(portalUser)) {
    return res.status(401).send({ message: "Unauthorized!" });
  }

  const parishCommitteCouncilRepository = AppDataSource.getRepository(ParishComitteCouncilEntity);
  const queryBuilder = parishCommitteCouncilRepository.createQueryBuilder('parishCommitteCouncils')

  try {
    const [totalParishCommitteCouncil, numberOfAllParishCommitteCouncil] = await queryBuilder.getManyAndCount()
    return res.status(200).send({ message: "ParishCommitteCouncil retrieved successfully!", parishCommitteCouncilsCount: numberOfAllParishCommitteCouncil, parishCommitteCouncils: totalParishCommitteCouncil, numberOfPages: 2 });
  } catch (error: any) {
    logger.error("Getting parishCommitteCouncil failed: %s", error);
    res.status(500).send({ success: false, message: "Internal server error!" });
  }
}
