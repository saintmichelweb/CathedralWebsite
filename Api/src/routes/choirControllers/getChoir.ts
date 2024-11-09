import { Request, Response } from "express";
import { AppDataSource } from "../../database/dataSource";
import logger from "../../services/logger";
import { ChoirEntity } from "../../entity/ChoirEntity";
import { isUndefinedOrNull } from "../../utils/utils";
import { readEnv } from "../../setup/readEnv";
import { Brackets } from "typeorm";

/**
 * @openapi
 * /Choir/all:
 *   get:
 *     tags:
 *       - Choir
 *     summary: get all Choir
  *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: The page number
 *         minimum: 1
 *         example: 1
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: The search text
 *       - in: isActive
 *         name: is active
 *         schema:
 *           type: boolean
 *         description: if choir is active.
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
  // Pagination parameters
  const pag_limit = readEnv('PAGINATION_LIMIT', 10, true)
  const { page = 1, search, isActive } = req.query
  const skip = (Number(page) - 1) * Number(pag_limit)


  if (isNaN(skip) || isNaN(Number(pag_limit)) || skip < 0 || Number(pag_limit) < 1) {
    return res.status(400).send({ message: 'Invalid pagination parameters' })
  }

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
  const queryBuilder = ChoirRepository.createQueryBuilder('choir')
    .leftJoinAndSelect('choir.backgroundImage', 'backgoundImage')

  if (typeof isActive === 'string' && isActive.trim() !== '') {
    queryBuilder.where('choir.isActive = :isActive', { isActive: isActive == 'true' ? 1 : 0 })
  }

  if (typeof search === 'string' && search.trim() !== '') {
    // const encryptedSearch = encryptData(Buffer.from(search.trim()), EncryptionTransformerObject).toString('base64')
    queryBuilder
      .andWhere(new Brackets(qb => {
        qb.where('Choir.name LIKE :search', { search: `%${search}%` })
        .orWhere('Choir.leader LIKE :search', { search: `%${search}%` })
        .orWhere('Choir.telephone LIKE :search', { search: `%${search}%` })
        .orWhere('Choir.isActive LIKE :search', { search: `%${search}%` })
          // .orWhere('portal_user.phone_number LIKE :encryptedSearch', { encryptedSearch: `%${encryptedSearch}%` })
      }))
  }

  try {
    const totalCount = await queryBuilder.getCount()
    const totalPages = Math.ceil(totalCount / Number(pag_limit))
    
    // Add pagination
    queryBuilder
    .orderBy('audit.created_at', 'DESC')
    .skip(skip)
    .take(Number(pag_limit))
    
    const totalChoir = await queryBuilder.getMany()
    return res.status(200).send({ message: "Choir retrieved successfully!", choirs: totalChoir , totalPages: totalPages});
  } catch (error: any) {
    logger.error("Getting Choir failed: %s", error);
    res.status(500).send({ success: false, message: "Internal server error!" });
  }
}
