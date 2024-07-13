/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { type Response } from 'express'
import { AppDataSource } from '../../database/dataSource'
import logger from '../../services/logger'
import { type AuthRequest } from 'src/types/express'
import { PortalRoleEntity } from '../../entity/PortalRoleEntity'
import { PortalUserEntity } from '../../entity/PortalUserEntity';
import { PortalPermissionEntity } from '../../entity/PortalPermissionEntity'
import { In } from 'typeorm'
import { AuditActionType, AuditTrasactionStatus, PortalUserStatus } from 'shared-lib'
import { audit } from '../../utils/audit'
import { isUndefinedOrNull } from '../../utils/utils'
/**
 * @openapi
 * /roles/{id}:
 *   put:
 *     tags:
 *       - Roles
 *     security:
 *       - Authorization: []
 *     summary: Update Permissions for Role
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: number
 *        required: true
 *        description: Numeric ID of the Role
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
 *                   example: ["VIEW_MERCHANTS", "REJECT_MERCHANTS"]
 *                   description: "The permissions for the role"
 *     responses:
 *       200:
 *         description: Role Updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: The response message
 *                   example: OK
 */
export async function putRoleUpdatePermissions (req: AuthRequest, res: Response) {
  const portalUser = req.user
  /* istanbul ignore if */
  if (portalUser == null) {
    return res.status(401).send({ message: 'Unauthorized' })
  }

  const RoleRepository = AppDataSource.getRepository(PortalRoleEntity)
  const PermsRepository = AppDataSource.getRepository(PortalPermissionEntity)

  // const { permissions } = req.body
  const { name, description, roleLevel, permissions } = req.body

  const id = Number(req.params.id)
  if (isNaN(id) || id < 1) {
    logger.error('Invalid ID')
    audit(
      AuditActionType.ACCESS,
      AuditTrasactionStatus.FAILURE,
      'putRoleUpdatePermissions',
        `Invalid ID: ${req.params.id}`,
        'PortalRoleEntity',
        {}, {}, portalUser
    )
    res.status(422).send({ message: 'Invalid ID' })
    return
  }
  
  if (isUndefinedOrNull(name)) {
    audit(AuditActionType.ADD, AuditTrasactionStatus.FAILURE,
      'putRoleUpdatePermissions',
      'Missing name field',
      'PortalRoleEntity',
      {}, { body: req.body }, portalUser
    )
    return res.status(400).send({ message: 'Missing name field' })
  }

  if (isUndefinedOrNull(description)) {
    audit(AuditActionType.ADD, AuditTrasactionStatus.FAILURE,
      'putRoleUpdatePermissions',
      'Missing description field',
      'PortalRoleEntity',
      {}, { body: req.body }, portalUser
    )
    return res.status(400).send({ message: 'Missing description field' })
  }

  if (isUndefinedOrNull(roleLevel)) {
    audit(AuditActionType.ADD, AuditTrasactionStatus.FAILURE,
      'putRoleUpdatePermissions',
      'Missing role level field',
      'PortalRoleEntity',
      {}, { body: req.body }, portalUser
    )
    return res.status(400).send({ message: 'Missing Level field' })
  }


  if (isUndefinedOrNull(permissions)) {
    audit(AuditActionType.ADD, AuditTrasactionStatus.FAILURE,
      'putRoleUpdatePermissions',
      'Missing permissions field',
      'PortalRoleEntity',
      {}, { body: req.body }, portalUser
    )
    return res.status(400).send({ message: 'Missing permissions field' })
  }
  // check if role exist
  const role = await RoleRepository.findOne({ where: { id } })
  if (role == null) {
    audit(AuditActionType.UPDATE, AuditTrasactionStatus.FAILURE,
      'putRoleUpdatePermissions',
      'Role does not exist',
      'PortalRoleEntity',
      {}, { id }, portalUser)

    return res.status(404).send({ message: 'Role does not exist' })
  }

  role.name = name
  role.description = description
  role.level = roleLevel
  await RoleRepository.save(role)

  // check if permissions exist
  const perms = await PermsRepository.find({ where: { name: In(permissions) } })
  if (perms.length !== permissions.length) {
    audit(AuditActionType.UPDATE, AuditTrasactionStatus.FAILURE,
      'putRoleUpdatePermissions',
      'Invalid permissions. At least one of the permissions does not exist',
      'PortalRoleEntity',
      {}, { permissions }, portalUser)

    return res.status(400).send({ message: 'Invalid permissions. At least one of the permissions does not exist' })
  }

  try {
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
    role.permissions = perms
    await RoleRepository.save(role)

    audit(AuditActionType.UPDATE, AuditTrasactionStatus.SUCCESS,
      'putRoleUpdatePermissions',
      'Role updated successfully',
      'PortalRoleEntity',
      {}, { role }, portalUser)

    return res.send({ message: 'Role updated successfully' })
  } catch (e) /* istanbul ignore next */ {
    logger.error(e)
    res.status(500).send({ message: e })
  }
}


/**
 * @openapi
 * /roles/status/{id}:
 *   put:
 *     tags:
 *       - Roles
 *     security:
 *       - Authorization: []
 *     summary: Update status for Role
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: number
 *        required: true
 *        description: Numeric ID of the Role
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 example: "ACTIVATED"
 *                 description: "The status you are updating to"
 *     responses:
 *       200:
 *         description: Role status updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: The response message
 *                   example: OK
 */
export async function changeRoleStatus(req: AuthRequest, res: Response) {
  const portalUser = req.user;

  /* istanbul ignore if */
  if (portalUser == null) {
    return res.status(401).send({ message: 'Unauthorized' });
  }

  const id = Number(req.params.id);
  if (isNaN(id) || id < 1) {
    logger.error('Invalid ID');
    audit(
      AuditActionType.ACCESS,
      AuditTrasactionStatus.FAILURE,
      'changeRoleStatus',
      `Invalid ID: ${req.params.id}`,
      'PortalRoleEntity',
      {},
      {},
      portalUser
    );
    res.status(422).send({ message: 'Invalid ID' });
    return;
  }

  let { status } = req.body;

  if(status == 'ACTIVATED') {
    status = 1;
  } else if(status == 'DEACTIVATED') {
    status = 0;
  }

  if (isUndefinedOrNull(status)) {
    audit(
      AuditActionType.UPDATE,
      AuditTrasactionStatus.FAILURE,
      'changeRoleStatus',
      'Missing status field',
      'PortalRoleEntity',
      {},
      { body: req.body },
      portalUser
    );
    return res.status(400).send({ message: 'Missing status field' });
  }

  try {
    const RoleRepository = AppDataSource.getRepository(PortalRoleEntity);
    const role = await RoleRepository.findOne({
      where: { id },
      relations: ['users']
    });

    if (!role) {
      audit(
        AuditActionType.UPDATE,
        AuditTrasactionStatus.FAILURE,
        'changeRoleStatus',
        'Role Not Found',
        'PortalRoleEntity',
        {},
        { status },
        portalUser
      );

      return res.status(404).send({ message: 'Role does not exist' });
    }

    role.status = status;
    await RoleRepository.save(role);

    audit(
      AuditActionType.UPDATE,
      AuditTrasactionStatus.SUCCESS,
      'changeRoleStatus',
      'Role status updated successfully',
      'PortalRoleEntity',
      {},
      { status },
      portalUser
    );

    return res.send({ message: 'Role status updated successfully' });
  } catch (error) {
    logger.error(error);
    res.status(500).send({ message: error });
  }
}


/**
 * @openapi
 * /roles/block/{id}:
 *   put:
 *     tags:
 *       - Roles
 *     security:
 *       - Authorization: []
 *     summary: Update if whether Role users are blocked or not
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: number
 *        required: true
 *        description: Numeric ID of the Role
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               blockStatus:
 *                 type: string
 *                 example: True
 *                 description: "The block status"
 *     responses:
 *       200:
 *         description: User statuses updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: The response message
 *                   example: OK
 */
export async function changeRoleBlockStatus(req: AuthRequest, res: Response) {
  const portalUser = req.user;

  /* istanbul ignore if */
  if (portalUser == null) {
    return res.status(401).send({ message: 'Unauthorized' });
  }

  const id = Number(req.params.id);
  if (isNaN(id) || id < 1) {
    logger.error('Invalid ID');
    audit(
      AuditActionType.ACCESS,
      AuditTrasactionStatus.FAILURE,
      'changeRoleBlockStatus',
      `Invalid ID: ${req.params.id}`,
      'PortalRoleEntity',
      {},
      {},
      portalUser
    );
    res.status(422).send({ message: 'Invalid ID' });
    return;
  }

  let { blockStatus } = req.body;

  if (isUndefinedOrNull(blockStatus)) {
    audit(
      AuditActionType.UPDATE,
      AuditTrasactionStatus.FAILURE,
      'changeRoleBlockStatus',
      'Missing blockStatus field',
      'PortalRoleEntity',
      {},
      { body: req.body },
      portalUser
    );
    return res.status(400).send({ message: 'Missing blockStatus field' });
  }

  try {
    const RoleRepository = AppDataSource.getRepository(PortalRoleEntity);
    const UserRepository = AppDataSource.getRepository(PortalUserEntity);
    const role = await RoleRepository.findOne({
      where: { id },
      relations: ['users']
    });

    if (!role) {
      audit(
        AuditActionType.UPDATE,
        AuditTrasactionStatus.FAILURE,
        'changeRoleBlockStatus',
        'Role Not Found',
        'PortalRoleEntity',
        {},
        { blockStatus },
        portalUser
      );

      return res.status(404).send({ message: 'Role does not exist' });
    }

    logger.debug('blockStatus_: %o', blockStatus);

    role.blocked = blockStatus;
    await RoleRepository.save(role);

    if (blockStatus) {
      for (const user of role.users) {
        const userEntity = await UserRepository.findOne({ where: { id: user.id } });
        if(userEntity){
          if(userEntity.status == PortalUserStatus.ACTIVE) {
            userEntity.status = PortalUserStatus.BLOCKED;
          }
          await UserRepository.save(userEntity);
        }
      }
    } else {
      for (const user of role.users) {
        const userEntity = await UserRepository.findOne({ where: { id: user.id } });
        if(userEntity){
          if(userEntity.status == PortalUserStatus.BLOCKED) {
            userEntity.status = PortalUserStatus.ACTIVE;
          }
          await UserRepository.save(userEntity);
        }
      }
    }

    audit(
      AuditActionType.UPDATE,
      AuditTrasactionStatus.SUCCESS,
      'changeRoleBlockStatus',
      'Role blockStatus updated successfully',
      'PortalRoleEntity',
      {},
      { blockStatus },
      portalUser
    );

    return res.send({ message: 'User statuses updated successfully' });
  } catch (error) {
    logger.error(error);
    res.status(500).send({ message: error });
  }
}
