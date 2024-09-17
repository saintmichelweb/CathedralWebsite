import { Response } from "express";
import { AppDataSource } from "../../database/dataSource";
import logger from "../../services/logger";
import { AuthRequest } from "../../types/express";
import { ParishComitteCouncilEntity } from "../../entity/ParishComitteCouncilEntity";

// /**
//  * @openapi
//  * /parishCommitteeCouncil:
//  *   get:
//  *     tags:
//  *       - parishCommitteeCouncil
//  *     security:
//  *       - Authorization: []
//  *     parameters:
//  *      - in: query
//  *        name: isActive
//  *        schema:
//  *          type: boolean
//  *        required: false
//  *        description: Activity status of parishCommitteeCouncil
//  *     summary: get all Mass parishCommitteeCouncils
//  *     responses:
//  *       200:
//  *         description: Get parishCommitteeCouncil
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
export async function getWebsiteParishCommitteeCouncil(req: AuthRequest, res: Response) {
  const parishCommitteeCouncilRepository = AppDataSource.getRepository(ParishComitteCouncilEntity);
  const queryBuilder = parishCommitteeCouncilRepository.createQueryBuilder('parishCommitteeCouncils')
    .leftJoinAndSelect('parishCommitteeCouncils.backgroundImage', 'backgoundImage')

  try {
    const totalparishCommitteeCouncil = await queryBuilder.getMany()

    const responseCommitteeCouncil = Object.values(totalparishCommitteeCouncil).map(CommitteeCouncil => ({
      position: {
        position_en: CommitteeCouncil.position_en,
        position_fr: CommitteeCouncil.position_fr,
        position_rw: CommitteeCouncil.position_rw
      },
      description: {
        description_en: CommitteeCouncil.description_en,
        description_fr: CommitteeCouncil.description_fr,
        description_rw: CommitteeCouncil.description_rw
      },
      backgroundImage: CommitteeCouncil.backgroundImage?.imageUrl || null,
      names: CommitteeCouncil.names,
      email: CommitteeCouncil.email,
      telephone: CommitteeCouncil.telephone,
    }))
    return res.status(200).send({ message: "parishCommitteeCouncil retrieved successfully!", parishCommitteeCouncils: responseCommitteeCouncil });
  } catch (error: any) {
    logger.error("Getting parishCommitteeCouncil failed: %s", error);
    res.status(500).send({ success: false, message: "Internal server error!" });
  }
}
