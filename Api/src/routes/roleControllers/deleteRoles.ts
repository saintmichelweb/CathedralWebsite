/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { type Response } from 'express'
import { AppDataSource } from '../../database/dataSource'
import logger from '../../services/logger'
import { type AuthRequest } from 'src/types/express'
import { PortalRoleEntity } from '../../entity/PortalRoleEntity'
import { AuditActionType, AuditTrasactionStatus } from 'shared-lib'
import { audit } from '../../utils/audit'

/**
 * @openapi
 * /roles/delete/{id}:
 *   get:
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

export async function deleteRole(req: AuthRequest, res: Response) {
    const portalUser = req.user;

    if (portalUser == null) {
        return res.status(401).send({ message: 'Unauthorized' });
    }

    const id = Number(req.params.id);
    if (isNaN(id) || id < 1) {
        logger.error('Invalid ID');
        audit(
            AuditActionType.ACCESS,
            AuditTrasactionStatus.FAILURE,
            'deleteRole',
            `Invalid ID: ${req.params.id}`,
            'PortalRoleEntity',
            {},
            {},
            portalUser
        );
        return res.status(422).send({ message: 'Invalid ID' });
    }

    try {
        const RoleRepository = AppDataSource.getRepository(PortalRoleEntity);
        const role = await RoleRepository.findOne({
            where: { id },
            relations: ['users'],
        });

        if (!role) {
            audit(
                AuditActionType.UPDATE,
                AuditTrasactionStatus.FAILURE,
                'deleteRole',
                'Role Not Found',
                'PortalRoleEntity',
                {},
                {},
                portalUser
            );
            return res.status(404).send({ message: 'Role does not exist' });
        }

        if (!role.users || role.users.length === 0) {
            await RoleRepository.remove(role);
        } else {
            audit(
                AuditActionType.UPDATE,
                AuditTrasactionStatus.FAILURE,
                'deleteRole',
                'Role has associated users',
                'PortalRoleEntity',
                {},
                {},
                portalUser
            );
            
            return res.status(400).send({
                message: 'Cannot delete role. Users are assigned to this role.',
                users: role.users.map(user => ({
                  id: user.id,
                  name: user.name,
                  email: user.email
                }))
            });
        }

        audit(
            AuditActionType.UPDATE,
            AuditTrasactionStatus.SUCCESS,
            'deleteRole',
            'Role deleted successfully',
            'PortalRoleEntity',
            {},
            {},
            portalUser
        );

        return res.send({ message: 'Role deleted successfully' });
    } catch (error) {
        logger.error(error);
        return res.status(500).send({ message: 'Internal Server Error' });
    }
}