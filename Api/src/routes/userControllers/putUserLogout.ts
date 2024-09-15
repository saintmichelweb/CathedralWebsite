/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { type Response } from 'express'
import { AppDataSource } from '../../database/dataSource'
import { JwtTokenEntity } from '../../entity/JwtTokenEntity'
import { AuthRequest } from '../../types/express'

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

    await AppDataSource.manager.delete(JwtTokenEntity, {
        user: portalUser,
        token: req.token
    })

    res.send({ message: 'Logout Successful' })
}