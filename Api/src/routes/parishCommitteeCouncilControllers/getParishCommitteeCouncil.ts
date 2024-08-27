import { Response } from "express";
import { AppDataSource } from "../../database/dataSource";
import logger from "../../services/logger";
import { isUndefinedOrNull } from "../../utils/utils";
import { AuthRequest } from "../../types/express";
import { ParishComitteCouncilEntity } from "../../entity/ParishComitteCouncilEntity";

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
  // const isActive = req.query.isActive
  // if (isUndefinedOrNull(portalUser)) {
  //   return res.status(401).send({ message: "Unauthorized!" });
  // }

  const parishCommitteeCouncilRepository = AppDataSource.getRepository(ParishComitteCouncilEntity);
  const queryBuilder = parishCommitteeCouncilRepository.createQueryBuilder('parishCommitteeCouncils')
    .leftJoinAndSelect('parishCommitteeCouncils.backgroundImage', 'backgoundImage')

  try {
    const [totalparishCommitteeCouncil, numberOfAllparishCommitteeCouncil] = await queryBuilder.getManyAndCount()
    return res.status(200).send({ message: "parishCommitteeCouncil retrieved successfully!", parishCommitteeCouncilsCount: numberOfAllparishCommitteeCouncil, parishCommitteeCouncils: totalparishCommitteeCouncil, numberOfPages: 2 });
  } catch (error: any) {
    logger.error("Getting parishCommitteeCouncil failed: %s", error);
    res.status(500).send({ success: false, message: "Internal server error!" });
  }
}
