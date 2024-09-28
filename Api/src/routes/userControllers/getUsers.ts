import { type Response } from 'express'
import { AppDataSource } from '../../database/dataSource'
import { PortalUserEntity } from '../../entity/PortalUserEntity'
import { readEnv } from '../../setup/readEnv'
import { Brackets } from 'typeorm'
import { encryptData } from 'typeorm-encrypted'
import { EncryptionTransformerObject } from '../../types/encryptionObject'
import { AuthRequest } from '../../types/express'
import logger from '../../services/logger'

/**
 * @openapi
 * tags:
 *   name: Portal Users
 *
 * /users:
 *   get:
 *     tags:
 *       - Portal Users
 *     security:
 *       - Authorization: []
 *     summary: GET Portal Users List
 *     responses:
 *       200:
 *         description: GET Portal Users List
 */

export async function getUsers(req: AuthRequest, res: Response) {
  const portalUser = req.user

  if (portalUser == null) {
    return res.status(401).send({ message: 'Unauthorized' })
  }

  try {
    const { status, all } = req.query
    const { page = 1, search } = req.query
    const limit = readEnv('PAGINATION_LIMIT', 10, true) as number

    if (isNaN(Number(page)) || Number(page) < 0) {
      return res.status(400).send({ message: 'Invalid pagination parameters' })
    }

    const queryBuilder = AppDataSource.getRepository(PortalUserEntity).createQueryBuilder('user')
      // .leftJoinAndSelect('user.role', 'role')
      // .where('role.name != :name', {name: 'Hub Super Admin'})
      // .leftJoinAndSelect('role.permissions', 'permissions')
      // .orderBy('user.created_at', 'DESC').addOrderBy('user.updated_at', 'DESC')

    if (typeof status === 'string' && status.length > 0) {
      queryBuilder.andWhere('user.status = :status', { status })
    }

    // if (!isNaN(Number(role)) && Number(role) > 0) {
    //   queryBuilder.andWhere('role.id = :role', { role: Number(role) })
    // }


    if (typeof search === 'string' && search.length > 0) {
      const encryptedSearch = encryptData(Buffer.from(search.trim()), EncryptionTransformerObject).toString('base64')
      queryBuilder.andWhere(
        new Brackets(qb => {
          qb.where('user.name LIKE :search', { search: `%${encryptedSearch}%` })
            .orWhere('user.email LIKE :search', { search: `%${encryptedSearch}%` })
            .orWhere('user.phone_number LIKE :search', { search: `%${encryptedSearch}%` })
        })
      )
    }

    const totalCount = await queryBuilder.getCount()
    const totalPages = Math.ceil(totalCount / limit)

    if (all !== 'true') {
      queryBuilder.skip((Number(page) - 1) * limit).take(limit)
    }



    let users = await queryBuilder
      .select([
        'user.id',
        'user.name',
        'user.email',
        'user.phone_number',
        'user.status',
        'user.position',
        'user.created_at',
        'user.updated_at'
      ])
      .getMany()

    // const flattenedUsers = users
    //   .map((user: PortalUserEntity) => ({
    //     ...user,
    //     role: {
    //       ...user.role,
    //       created_at: undefined,
    //       updated_at: undefined,
    //       permissions: user.role.permissions.map((permission) => permission.name)
    //     },
    //     password: undefined
    //   }))

    res.send({ message: 'List of users', users, totalPages })
  } catch (error) {
    logger.error("Error, on Forgot password: %o", error);
    res.status(500).send({ message: 'Internal Server Error' })
  }
}
