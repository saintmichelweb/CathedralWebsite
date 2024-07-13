/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { type Response } from 'express'
import { AppDataSource } from '../../database/dataSource'
import logger from '../../services/logger'
import { type AuthRequest } from 'src/types/express'
import { PortalRoleEntity } from '../../entity/PortalRoleEntity'
import { PortalPermissionEntity } from '../../entity/PortalPermissionEntity'
import { In, QueryFailedError } from 'typeorm'
import { isUndefinedOrNull } from '../../utils/utils'
import { audit } from '../../utils/audit'
import { AuditActionType, AuditTrasactionStatus } from 'shared-lib'
/**
 * @openapi
 * /roles:
 *   post:
 *     tags:
 *       - Roles
 *     security:
 *       - Authorization: []
 *     summary: POST Role
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "DFSP Operator"
 *                 description: "The name of the role"
 *               description:
 *                 type: string
 *                 example: "DFSP Operator"
 *                 description: "The description of the role"
 *               roleLevel:
 *                 type: string
 *                 example: "DFSP"
 *                 description: "The level of the role"
 *               permissions:
 *                 type: array
 *                 items:
 *                   type: string
 *                   example: "View Merchants"
 *                   description: "The permissions for the role"
 *     responses:
 *       201:
 *         description: Role created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: The response message
 *                   example: Role created successfully
 *
 */
export async function postCreateRole (req: AuthRequest, res: Response) {
  const portalUser = req.user
  /* istanbul ignore if */
  if (portalUser == null) {
    return res.status(401).send({ message: 'Unauthorized' })
  }

  try {
    const RoleRepository = AppDataSource.getRepository(PortalRoleEntity)
    const PermsRepository = AppDataSource.getRepository(PortalPermissionEntity)

    const { name, description, roleLevel, permissions } = req.body
    if (isUndefinedOrNull(name) || name === '') {
      audit(AuditActionType.ADD, AuditTrasactionStatus.FAILURE,
        'postCreateRole',
        'Missing name field',
        'PortalRoleEntity',
        {}, { body: req.body }, portalUser
      )
      return res.status(400).send({ message: 'Missing name field' })
    }

    if (isUndefinedOrNull(description) || description === '') {
      audit(AuditActionType.ADD, AuditTrasactionStatus.FAILURE,
        'postCreateRole',
        'Missing description field',
        'PortalRoleEntity',
        {}, { body: req.body }, portalUser
      )
      return res.status(400).send({ message: 'Missing description field' })
    }

    if (isUndefinedOrNull(roleLevel) || roleLevel === '') {
      audit(AuditActionType.ADD, AuditTrasactionStatus.FAILURE,
        'postCreateRole',
        'Missing role level field',
        'PortalRoleEntity',
        {}, { body: req.body }, portalUser
      )
      return res.status(400).send({ message: 'Missing description field' })
    }

    if (isUndefinedOrNull(permissions) || permissions.length === 0) {
      audit(AuditActionType.ADD, AuditTrasactionStatus.FAILURE,
        'postCreateRole',
        'Missing permissions field',
        'PortalRoleEntity',
        {}, { body: req.body }, portalUser
      )
      return res.status(400).send({ message: 'Missing permissions field' })
    }

    if (!portalUser.dfsp) {
      const role = await RoleRepository.findOne({ where: { name } })
      if (role) {
        await audit(AuditActionType.ADD, AuditTrasactionStatus.FAILURE,
          'postCreateRole',
          'Role already exists',
          'PortalRoleEntity',
          {}, { body: req.body }, portalUser)
        return res.status(400).send({ message: 'Role already exists' })
      }
    }

    // check if permissions exist
    const perms = await PermsRepository.find({ where: { name: In(permissions) } })

    if (perms.length !== permissions.length) {
      audit(AuditActionType.ADD, AuditTrasactionStatus.FAILURE,
        'postCreateRole',
        'Invalid permissions',
        'PortalRoleEntity',
        {}, { permissions }, portalUser)
      return res.status(400).send({ message: 'Invalid permissions' })
    }
    
    for (const perm of perms) {
      if (!perm.levels.includes(roleLevel)) {
        await audit(AuditActionType.ADD, AuditTrasactionStatus.FAILURE,
          'postCreateRole',
          'Invalid permission for role level',
          'PortalRoleEntity',
          {}, { permissions }, portalUser)
        return res.status(400).send({ message: 'Invalid permission for role level' })
      }
    }

    const newRole = new PortalRoleEntity()
    newRole.name = name
    newRole.description = description
    newRole.level = roleLevel
    newRole.permissions = perms

    if (portalUser.dfsp) {
      newRole.dfsp = portalUser.dfsp;
    }

    await RoleRepository.save(newRole)

    audit(AuditActionType.ADD, AuditTrasactionStatus.SUCCESS,
      'postCreateRole',
      'Role created successfully',
      'PortalRoleEntity',
      {}, { role: newRole }, portalUser)

    return res.status(201).send({ message: 'Role created successfully' })
  } catch (e) /* istanbul ignore next */ {
    logger.error(e)
    if(e instanceof QueryFailedError) {
      if((e as any).code === 'ER_DUP_ENTRY') {
        await audit(AuditActionType.ADD, AuditTrasactionStatus.FAILURE,
          'postCreateRole',
          'Role already exists',
          'PortalRoleEntity',
          {}, { body: req.body }, portalUser)
        return res.status(400).send({ message: 'Role already exists' })
      }
    }
    await audit(AuditActionType.ADD, AuditTrasactionStatus.FAILURE,
      'postCreateRole',
      'Query Failed',
      'PortalRoleEntity',
      {}, { body: req.body }, portalUser)
    return res.status(500).send({ message: "Internal server error" })
  }
}

