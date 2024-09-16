/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { type Response } from 'express'
import { AppDataSource } from '../../database/dataSource'
import { JwtTokenEntity } from '../../entity/JwtTokenEntity'
import { AuthRequest } from '../../types/express'
import logger from '../../services/logger'

/**
 * @openapi
 * tags:
 *   name: Users
 *
 * /users/logout:
 *   post:
 *     tags:
 *       - Users
 *     security:
 *       - Authorization: []
 *     summary: Logout
 *     responses:
 *       200:
 *         description: Logout Successful
 */

export async function postUserLogout(req: AuthRequest, res: Response) {
    const portalUser = req.user

    /* istanbul ignore if */
    if (portalUser == null) {
        return res.status(401).send({ message: 'Unauthorized' })
    }

    try {
        await AppDataSource.manager.delete(JwtTokenEntity, {
            user: portalUser,
            token: req.token
        })
        res.send({ message: 'Logout Successful' })
    } catch (error: any) {
        logger.error('User %s Logout failed: %s', req.body.email, error.message)
        res.status(500).send({ success: false, message: error.message })
    }

}