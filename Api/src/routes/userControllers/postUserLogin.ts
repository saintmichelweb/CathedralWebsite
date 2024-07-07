import bcrypt from 'bcrypt'
import { type Request, type Response } from 'express'
import * as z from 'zod'
import { AppDataSource } from '../../database/dataSource'
import { PortalUserEntity } from '../../entity/PortalUserEntity'
import logger from '../../services/logger'
import jwt from 'jsonwebtoken'
import { PortalUserStatus } from '../../../../shared-lib'
import { readEnv, readEnvAsBoolean } from '../../setup/readEnv'
import { JwtTokenEntity } from '../../entity/JwtTokenEntity'
import ms from 'ms'
import { comparePassword } from '../../utils/utils'

export const LoginFormSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(8),
})

const JWT_SECRET = readEnv('JWT_SECRET', 'secret') as string
const JWT_EXPIRES_IN = readEnv('JWT_EXPIRES_IN', '1d') as string
const JWT_EXPIRES_IN_MS = ms(JWT_EXPIRES_IN)

/**
 * @openapi
 * /users/login:
 *   post:
 *     tags:
 *       - Users
 *     summary: Authenticate a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "d1superadmin1@email.com"
 *                 description: "The email for login"
 *               password:
 *                 type: string
 *                 example: "password"
 *                 description: "The password for login in clear text"
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Login successful"
 *       422:
 *         description: Validation error
 *       400:
 *         description: Invalid credentials
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Invalid credentials"
 *
 */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
export async function postUserLogin(req: Request, res: Response) {
  try {
    LoginFormSchema.parse(req.body)
  } catch (err) {
    if (err instanceof z.ZodError) {
      logger.error('Validation error: %o', err)
      logger.error("Validation error: %o", req.body)
      return res.status(422).send({ message: 'Validation error' })
    }
  }

  try {
    const user = await AppDataSource.manager.findOne(PortalUserEntity, {
      where: { email: req.body.email }
    })
    logger.info('User %s login attempt.', req.body.email)
    
    
    if (user == null) {
      throw new Error('Invalid credentials')
    } else if (user.status === PortalUserStatus.UNVERIFIED) {
      throw new Error('User is not verified')
    } else if (user.status === PortalUserStatus.RESETPASSWORD) {
      throw new Error('User need to reset password')
    } else if (user.status === PortalUserStatus.DISABLED) {
      throw new Error('User is disabled')
    } else if (user.status !== PortalUserStatus.ACTIVE) {
      throw new Error('User needs to be active to login')
    }

    // TODO: check why bcrypt is failing
    // const passwordMatch = await bcrypt.compare(req.body.password, user.password)
    const passwordMatch = comparePassword(req.body.password, user.password)
    if (!passwordMatch) {
      throw new Error('Invalid credentials')
    }

    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN })
    const jwtTokenObj = AppDataSource.manager.create(JwtTokenEntity, {
      token,
      user,
      expires_at: new Date(Date.now() + JWT_EXPIRES_IN_MS),
      last_used: new Date()
    })
    await AppDataSource.manager.save(jwtTokenObj)
    res.status(200).send({ message: 'Login successful', token: token })
  } catch (error: any) {
    logger.error('User %s login failed: %s', req.body.email, error.message)
    res.status(400).send({ success: false, message: error.message })
  }
}
