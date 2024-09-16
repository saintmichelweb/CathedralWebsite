import { type Response } from 'express'
import { type AuthRequest } from 'src/types/express'
import { AppDataSource } from '../../database/dataSource'
import { PortalUserEntity } from '../../entity/PortalUserEntity'
import { AuditActionType, AuditTrasactionStatus, PortalUserStatus } from 'shared-lib'
import { audit } from '../../utils/audit'
import { readEnv } from '../../setup/readEnv'
import logger from '../../utils/logger'
import { Brackets } from 'typeorm'
import { encryptData } from 'typeorm-encrypted'
import { EncryptionTransformerObject } from '../../setup/readEnv'

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

  /* istanbul ignore if */
  if (portalUser == null) {
    return res.status(401).send({ message: 'Unauthorized' })
  }

  try {
    const { status, role, dfsp, all } = req.query
    const { page = 1, search } = req.query
    const limit = readEnv('PAGINATION_LIMIT', 10, true) as number

    if (isNaN(Number(page)) || Number(page) < 0) {
      return res.status(400).send({ message: 'Invalid pagination parameters' })
    }

    const queryBuilder = AppDataSource.getRepository(PortalUserEntity).createQueryBuilder('user')
      .leftJoinAndSelect('user.role', 'role')
      .where('role.name != :name', {name: 'Hub Super Admin'})
      .leftJoinAndSelect('role.permissions', 'permissions')
      .leftJoinAndSelect('user.dfsp', 'dfsp')
      .orderBy('user.created_at', 'DESC').addOrderBy('user.updated_at', 'DESC')

    if (typeof status === 'string' && status.length > 0) {
      queryBuilder.andWhere('user.status = :status', { status })
    } else {
      queryBuilder.andWhere('user.status != :status', { status: PortalUserStatus.BLOCKED })
    }

    if (!isNaN(Number(role)) && Number(role) > 0) {
      queryBuilder.andWhere('role.id = :role', { role: Number(role) })
    }

    if (!isNaN(Number(dfsp)) && Number(dfsp) > 0) {
      queryBuilder.andWhere('dfsp.fspid = :dfsp', { dfsp: dfsp })
    }

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
    // DFSPs can only see their own users
    if (portalUser.dfsp) {
      queryBuilder.andWhere('user.dfsp.id = :dfsp', { dfsp: portalUser.dfsp.id })
    }

    const totalCount = await queryBuilder.getCount()
    const totalPages = Math.ceil(totalCount / limit)

    if(all !== 'true'){
      queryBuilder.skip((Number(page) - 1) * limit).take(limit)
    }
    
    let users = await queryBuilder.getMany()

    const flattenedUsers = users
      .map((user: PortalUserEntity) => ({
        ...user,
        role: {
          ...user.role,
          created_at: undefined,
          updated_at: undefined,
          permissions: user.role.permissions.map((permission) => permission.name)
        },
        password: undefined
      }))

    audit(
      AuditActionType.ACCESS,
      AuditTrasactionStatus.SUCCESS,
      'getUsers',
      'Get a list of users',
      'PortalUserEntity',
      {},
      {},
      portalUser
    )
  
    res.send({ message: 'List of users', data: flattenedUsers, totalPages })
  } catch (e) {
    logger.push({ error: e }).error('Error in getUsers')
    audit(
      AuditActionType.ACCESS,
      AuditTrasactionStatus.FAILURE,
      'getUsers',
      'Get a list of users',
      'PortalUserEntity',
      {},
      {},
      portalUser
    )
    res.status(500).send({ message: 'Internal Server Error' })
  }
}
