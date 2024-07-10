/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { type Response } from 'express'
import { AppDataSource } from '../../database/dataSource'
import logger from '../../services/logger'
import { type AuthRequest } from 'src/types/express'
import { PortalRoleEntity } from '../../entity/PortalRoleEntity'
import { PortalPermissionEntity } from '../../entity/PortalPermissionEntity'
import { audit } from '../../utils/audit'
import { AuditActionType, AuditTrasactionStatus, PortalRolesLevels } from 'shared-lib'
import { Brackets, In } from 'typeorm'
import { readEnv } from '../../setup/readEnv'
import { PermissionsEnum } from '../../types/permissions'

/**
 * @openapi
 * tags:
 *   name: Roles
 *
 * /roles:
 *   get:
 *     tags:
 *       - Roles
 *     security:
 *       - Authorization: []
 *     summary: GET Roles
 *     parameters:
 *      - in: query
 *        name: id
 *        schema:
 *          type: number
 *        required: false
 *        description: Numeric ID of the Role
 *      - in: query
 *        name: type
 *        schema:
 *          type: string
 *        required: false
 *        description: type of role ['Hub', 'DFSP', 'DFSP_USER']
 *     responses:
 *       200:
 *         description: GET Roles
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: The response message
 *                   example: OK
 *                 data:
 *                   type: array
 *                   description: The list of roles with their permissions and users
 *                   items:
 *                     type: object
 */
export async function getRoles (req: AuthRequest, res: Response) {

  const portalUser = req.user
  /* istanbul ignore next */
  if (portalUser == null) {
    return res.status(401).send({ message: 'Unauthorized' })
  }


  try {
    const { 
      page = 1,
      roleId,
      level,
      status,
      search,
      userEditDfspId,
      userEdit,
      all
     } = req.query
    const limit = readEnv('PAGINATION_LIMIT', 10, true) as number
    const skip = (Number(page) - 1) * Number(limit)

    if (isNaN(Number(skip)) ||  Number(skip) < 0) {
      return res.status(400).send({ message: 'Invalid pagination parameters' })
    }

    const RoleRepository = AppDataSource.getRepository(PortalRoleEntity)
    const PermsRepository = AppDataSource.getRepository(PortalPermissionEntity)

    const queryBuilder = RoleRepository.createQueryBuilder('portal_roles')
    
    queryBuilder
      .leftJoin('portal_roles.permissions', 'permissions')
      .orderBy('portal_roles.created_at', 'DESC')
      .addSelect(['portal_roles.*', 'permissions'])
      .where('portal_roles.name != :name', { name: 'Hub Super Admin' })
    

    if (roleId) {
      queryBuilder.andWhere({ id: roleId })
    }
    if (status !== null && status !== undefined) {
      queryBuilder.andWhere({
        status: status === 'Activated' ? '1' : '0'
      });
    }
    
    if (search) {
      queryBuilder.andWhere(
        new Brackets((qb) => {
          qb.where('portal_roles.name LIKE :search', { search: `%${search}%` })
          .orWhere('portal_roles.name LIKE :search', { search: `%${search}%` })
          .orWhere('portal_roles.description LIKE :search', { search: `%${search}%` })
          .orWhere('permissions.name LIKE :search', { search: `%${search}%` })
          .orWhere('portal_roles.dfspId LIKE :search', { search: `%${search}%` })
        })
      )
    }

    if (portalUser.dfsp) {
      const portalUserLevel = portalUser.role.level
      if(portalUserLevel === PortalRolesLevels.DFSP_ADMIN) {
        queryBuilder.andWhere({
          dfsp: portalUser.dfsp,
          level: In([PortalRolesLevels.DFSP_USER, PortalRolesLevels.DFSP_ADMIN])
        })
      }else {
        queryBuilder.andWhere({
          dfsp: portalUser.dfsp,
          level: In([PortalRolesLevels.DFSP_USER])
        })
      }
    } else if (!isNaN(Number(userEditDfspId)) && userEdit) { 
      queryBuilder.where('portal_roles.dfspId LIKE :dfspId', { dfspId: Number(userEditDfspId) })
    } else if (userEdit) {
      queryBuilder.andWhere({
        level: In([PortalRolesLevels.HUB_ADMIN, PortalRolesLevels.HUB_USER, PortalRolesLevels.HUB_REPORTING_USER])
      })
    }

    if(level){
      queryBuilder.andWhere({
        level: level
      })
    }

    const totalCount = await queryBuilder.getCount()
    const totalPages = Math.ceil(totalCount / Number(limit))

    if(all !== 'true') {
      queryBuilder
        .skip(skip)
        .take(Number(limit))
    }

    const roles = await queryBuilder.getMany()
    
    const permissions = await PermsRepository.find()

    /* eslint-disable-next-line */
    const flattenedRoles = roles.map(({ created_at, updated_at, ...role }) => ({
      ...role,
      permissions: role.permissions.map(permission => permission.name)
    }))

    const flattenedPermissions = permissions.map(permission => permission.name).filter(permission => permission !== PermissionsEnum.CREATE_HUB_ADMIN.name)

    audit(
      AuditActionType.ACCESS,
      AuditTrasactionStatus.SUCCESS,
      'getRoles',
      'GET List of Roles and associated permissions',
      'PortalRoleEntity',
      {}, {}, portalUser)

    res.send({ message: 'OK', data: flattenedRoles, permissions: flattenedPermissions, totalPages })
  } catch (e) /* istanbul ignore next */ {
    logger.error(e)
    res.status(500).send({ message: e })
  }
}



/**
 * @openapi
 * tags:
 *   name: Roles
 *
 * /roles/levels:
 *   get:
 *     tags:
 *       - Roles
 *     security:
 *       - Authorization: []
 *     summary: GET Role Levels
 *     responses:
 *       200:
 *         description: GET Role Levels
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: The response message
 *                   example: OK
 *                 data:
 *                   type: array
 *                   description: The list of role levels
 *                   items:
 *                     type: string
 */
export async function getRolesLevel (req: AuthRequest, res: Response) {
  const portalUser = req.user
  /* istanbul ignore next */
  if (portalUser == null) {
    return res.status(401).send({ message: 'Unauthorized' })
  }

  try {
    let PermittedRolesLevelsEnum: string[] = Object.values(PortalRolesLevels);

    switch (portalUser.role.level) {
      case PortalRolesLevels.HUB_SUPER_ADMIN:
        break;
      case PortalRolesLevels.HUB_ADMIN:
        PermittedRolesLevelsEnum = PermittedRolesLevelsEnum.filter(
          (item) => item !== PortalRolesLevels.DFSP_USER && item !== PortalRolesLevels.HUB_SUPER_ADMIN
        );
        break;
      case PortalRolesLevels.DFSP_ADMIN:
        PermittedRolesLevelsEnum = PermittedRolesLevelsEnum.filter(
          (item) => item === PortalRolesLevels.DFSP_USER
        );
        break;
      default:
        PermittedRolesLevelsEnum = [];
        break;
    }

    res.send({
      message: 'OK',
      data: PermittedRolesLevelsEnum
    });
  } catch (e) {
    logger.error(e)
    res.status(500).send({ message: e })
  }
}