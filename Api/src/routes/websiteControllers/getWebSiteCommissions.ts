import { Request, Response } from "express";
import { AppDataSource } from "../../database/dataSource";
import logger from "../../services/logger";
import { CommissionEntity } from "../../entity/CommissionEntity";

// /**
//  * @openapi
//  * /commissions:
//  *   get:
//  *     tags:
//  *       - Commission
//  *     summary: get all Commission
//  *     responses:
//  *       200:
//  *         description: Get Commission
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
export async function getWebsiteCommissions(req: Request, res: Response) {
  const CommissionRepository = AppDataSource.getRepository(CommissionEntity);
  const queryBuilder = CommissionRepository.createQueryBuilder('Commission')
    .leftJoinAndSelect('Commission.backgroundImage', 'backgroundImage')

  try {
    const totalCommission = await queryBuilder.getMany()
    const responseCommission = Object.values(totalCommission).map(commission => ({
      title: {
        name_en: commission.name_en,
        name_fr: commission.name_fr,
        name_rw: commission.name_rw
      },
      description: {
        description_en: commission.description_en,
        description_fr: commission.description_fr,
        description_rw: commission.description_rw
      },
      backgroundImage: commission.backgroundImage.imageUrl,
      contact_person_name: commission.contact_person_name,
      contact_person_role: commission.contact_person_role,
      contact_person_email: commission.contact_person_email,
      contact_person_phone_number: commission.contact_person_phone_number
    }))

    return res.status(200).send({ message: "Commissions retrieved successfully!", commissions: responseCommission });
  } catch (error: any) {
    logger.error("Getting Commissions failed: %s", error);
    res.status(500).send({ success: false, message: "Internal server error!" });
  }
}
