import { Response } from "express";
import { AppDataSource } from "../../database/dataSource";
import logger from "../../services/logger";
import { AuthRequest } from "../../types/express";
import { ParishComitteCouncilEntity } from "../../entity/ParishComitteCouncilEntity";

/**
 * @openapi
 * /about-page/committee-council:
 *   get:
 *     tags:
 *       - Front-End
 *     summary: get all committee council
 *     responses:
 *       200:
 *         description: Get committee council successful
 *       500:
 *         description: Internal Server error
 *
 */

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
    return res.status(200).send({ message: "parish-committee-council retrieved successfully!", parishCommitteeCouncils: responseCommitteeCouncil });
  } catch (error: any) {
    logger.error("Getting parish-committee-council failed: %s", error);
    res.status(500).send({ success: false, message: "Internal server error!" });
  }
}
