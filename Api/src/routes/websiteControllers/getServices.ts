import { Response } from "express";
import { AppDataSource } from "../../database/dataSource";
import logger from "../../services/logger";
import { isUndefinedOrNull } from "../../utils/utils";
import { AuthRequest } from "../../types/express";
import { ServiceEntity } from "../../entity/ServiceEntity";

// /**
//  * @openapi
//  * /services/all:
//  *   get:
//  *     tags:
//  *       - Service
//  *     security:
//  *       - Authorization: []
//  *     parameters:
//  *      - in: query
//  *        name: isActive
//  *        schema:
//  *          type: boolean
//  *        required: false
//  *        description: Activity status of service
//  *     summary: get all Mass services
//  *     responses:
//  *       200:
//  *         description: Get Services
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
export async function getWebsiteServices(req: AuthRequest, res: Response) {
  const serviceRepository = AppDataSource.getRepository(ServiceEntity);
  const queryBuilder = serviceRepository.createQueryBuilder('services')
    .leftJoinAndSelect('services.backgroundImage', 'backgoundImage')

  try {
    const totalServices = await queryBuilder.getMany()
    const responseServices = Object.values(totalServices).map(service => ({
        description: {
          description_en: service.description_en,
          description_fr: service.description_fr,
          description_rw: service.description_rw
        },
        name: {
          name_en: service.name_en,
          name_fr: service.name_fr,
          name_rw: service.name_rw
        },
        backgroundImage: service.backgroundImage.imageUrl,
        contact_person_name: service.contact_person_name,
        contact_person_phone_number: service.contact_person_phone_number,
        work_days: service.work_days,
        work_hours: service.work_hours
      }))

    return res.status(200).send({ message: "Services retrieved successfully!", services: responseServices });
  } catch (error: any) {
    logger.error("Getting service failed: %s", error);
    res.status(500).send({ success: false, message: "Internal server error!" });
  }
}
