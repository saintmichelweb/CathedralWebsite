import { Response } from 'express';
import { AppDataSource } from '../../database/dataSource';
import logger from '../../services/logger';
import { type AuthRequest } from 'src/types/express'
import { PortalRoleEntity } from '../../entity/PortalRoleEntity';
import { PortalUserEntity } from '../../entity/PortalUserEntity';
import { PortalRolesLevels } from 'shared-lib';


/**
 * @openapi
 * /{id}/roles:
 *   get:
 *     summary: Get user roles
 *     description: Retrieve roles for a specific user by ID.
 *     tags:
 *       - Roles
 *     security:
 *       - Authorization: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: User ID
 *     responses:
 *       200:
 *         description: Successful retrieval of user roles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   level:
 *                     type: string
 *       400:
 *         description: Bad request
 *       404:
 *         description: User or user role not found
 *       500:
 *         description: Internal server error
 */

export async function getUserRoles(req: AuthRequest, res: Response) {
    const userId = req.params.id;
    
    if (!userId) {
        return res.status(400).json({ message: 'User ID is required' });
    }
  
    try {
        const user = await AppDataSource.getRepository(PortalUserEntity).findOne({
            where: { id: parseInt(userId) },
            relations: ['role', 'dfsp']
        });
  
        if (!user || !user.role) {
            return res.status(404).json({ message: 'User or user role not found' });
        }

        let roles: any;
        if (user.role.level === PortalRolesLevels.HUB_ADMIN || user.role.level === PortalRolesLevels.HUB_USER || user.role.level === PortalRolesLevels.HUB_REPORTING_USER) {
            await AppDataSource.getRepository(PortalRoleEntity).find({
                where: { level: PortalRolesLevels.HUB_USER || PortalRolesLevels.HUB_REPORTING_USER || PortalRolesLevels.HUB_ADMIN }
            }).then((hubRoles) => {
                roles = hubRoles.filter((role: PortalRoleEntity) => role.name !== 'Hub Super Admin')
            })
        } else if (user.role.level === PortalRolesLevels.DFSP_ADMIN) {
            roles = [user.role]
        } else if (user.role.level === PortalRolesLevels.DFSP_USER) {
            if (!user.dfsp) {
                return res.status(404).json({ message: 'User DFSP not found' });
            }
            roles = await AppDataSource.getRepository(PortalRoleEntity).find({
                where: { level: PortalRolesLevels.DFSP_USER, dfsp: { id: user.dfsp.id } }
            });
        } else {
            return res.status(400).json({ message: 'Invalid role level' });
        }
  
        return res.status(200).json(roles);
    } catch (error) {
        logger.error('Error retrieving user roles', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
