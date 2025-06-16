import { Request, Response } from "express";
import { AppDataSource } from "../../../database/dataSource";
import logger from "../../../services/logger";
import { CommunityEntity } from "../../../entity/CommunityEntity";
import { MpuzaEntity } from "../../../entity/MpuzaEntity";
import { MuryangoremezoEntity } from "../../../entity/MuryangoremezoEntity";

/**
 * @openapi
 * /about/communities:
 *   get:
 *     tags:
 *       - Website-Routes
 *     summary: get all Communities
 *     responses:
 *       200:
 *         description: Get Communities successful
 *       500:
 *         description: Internal Server error
 *
 */

/* eslint-disable @typescript-eslint/explicit-function-return-type */
export async function getWebsitecommunities(req: Request, res: Response) {
    const communityRepository = AppDataSource.getRepository(CommunityEntity);
    const queryBuilder = communityRepository.createQueryBuilder('community')
        .leftJoinAndSelect('community.mpuzas', 'mpuza')
        .leftJoinAndSelect('mpuza.backgroundImage', 'backgroundImage')
        .leftJoinAndSelect('mpuza.connectedMiryangoremezo', 'miryangoremezo')
        // .where('community.isActive = :isActive', { isActive: true })

    try {
        const totalcommunities = await queryBuilder.getMany()
        const responsecommunities = Object.values(totalcommunities).map(community => ({
            name : community.name,
            mpuzas: Object.values(community.mpuzas).map((mpuza: MpuzaEntity) => ({
                title: mpuza.title,
                leader: mpuza.leader,
                phone: mpuza.phone,
                description: {
                    description_en: mpuza.description_en,
                    description_fr: mpuza.description_fr,
                    description_rw: mpuza.description_rw
                },
                picture: mpuza.backgroundImage?.imageUrl || null,
                cebs: Object.values(mpuza.connectedMiryangoremezo).map((muryangoremezo: MuryangoremezoEntity) => ({
                    title: muryangoremezo.title,
                    header: muryangoremezo.header,
                    phone: muryangoremezo.phone,
                }))
            }))
        }))
        return res.status(200).send({ message: "communities retrieved successfully!", community: responsecommunities });
    } catch (error: any) {
        logger.error("Getting communities failed: %s", error);
        res.status(500).send({ success: false, message: "Internal server error!" });
    }
}
