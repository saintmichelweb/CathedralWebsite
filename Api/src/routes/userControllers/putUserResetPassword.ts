import { type Response } from 'express'
import { AppDataSource } from '../../database/dataSource'
import {
  PortalUserStatus
} from '../../../../shared-lib'
import { comparePassword, hashPassword } from '../../utils/utils'
import { type AuthRequest } from '../../types/express'
import * as z from 'zod'
import { JwtTokenEntity } from '../../entity/JwtTokenEntity'
import logger from '../../services/logger'

const PutUserResetPasswordSchema = z.object({
  oldPassword: z.string().min(8, 'Password must contain at least 8 characters').nullable(),
  newPassword: z
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .refine((val) => /[a-z]/.test(val), {
      message: 'Password must contain at least one lowercase letter'
    })
    .refine((val) => /[A-Z]/.test(val), {
      message: 'Password must contain at least one uppercase letter'
    })
    .refine((val) => /[0-9]/.test(val), {
      message: 'Password must contain at least one digit'
    })
    .refine((val) => /[^a-zA-Z0-9]/.test(val), {
      message: 'Password must contain at least one special character'
    })
})

/**
 * @openapi
 * /users/reset-password:
 *   put:
 *     tags:
 *       - Portal Users
 *     summary: Reset Password
 *     security:
 *       - Authorization: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               oldPassword:
 *                 type: string
 *                 example: "password"
 *                 required: false
 *                 nullable: true
 *               newPassword:
 *                 type: string
 *                 example: "password"
 *     responses:
 *       200:
 *         description: Reset Password Successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Reset Password Successful"
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
export async function putUserResetPassword(req: AuthRequest, res: Response) {
  const portalUser = req.user

  /* istanbul ignore if  */
  if (portalUser == null) {
    return res.status(401).send({ message: 'Unauthorized' })
  }

  const result = PutUserResetPasswordSchema.safeParse(req.body)
  if (!result.success) {
    logger.error("Error, Validation error: %o", result)
    return res.status(422).send({ message: 'Validation error', errors: result.error.flatten() })
  }

  const { oldPassword, newPassword } = req.body

  if (oldPassword) {
    if (!await comparePassword(oldPassword, portalUser.password)) {
      return res.status(401).send({ message: 'Unauthorized' })
    }
  }
  
  if (portalUser.password && await comparePassword(newPassword, portalUser.password)) {
    return res.status(403).send({ message: 'Your new password is the same as the old password' })
  }

  try {
    const oldPasswordHash = portalUser.password
    portalUser.password = await hashPassword(newPassword)
    portalUser.password_created_at = new Date(Date.now())
    if (portalUser.status === PortalUserStatus.RESETPASSWORD) {
      portalUser.status = PortalUserStatus.ACTIVE
    }
    await AppDataSource.manager.save(portalUser)

    const token = req.token
    await AppDataSource.manager.delete(JwtTokenEntity, { token })

    return res.status(201).send({ message: 'Reset Password Successful' })
  } catch (error) /* istanbul ignore next */ {
    logger.error("Error in putUserResetPassword: %o", result)
    return res
      .status(500)
      .send({ message: "Internal server error!" })
  }
}
