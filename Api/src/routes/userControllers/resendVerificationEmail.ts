import { Response } from 'express'
import path from 'path'
import dotenv from 'dotenv'
import { sendVerificationEmail } from '../../utils/sendEmail'
import { regenerateToken } from '../../utils/regenerateToken'
import { AuthRequest } from '../../types/express'
import logger from '../../services/logger'

/**
 * @openapi
 * /users/sendVerificationEmail:
 *   post:
 *     tags:
 *       - Portal Users
 *     security:
 *       - Authorization: []
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
 *       401:
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
 */

if (process.env.NODE_ENV === 'test') {
  dotenv.config({ path: path.resolve(process.cwd(), '.env.test'), override: true })
}

export async function resendVerificationEmail(req: AuthRequest, res: Response) {
  const userEmail = req.body.email
  const portalUser = req.user

  if (!userEmail) {
    return res.status(422).json({ message: 'Validation error, user email not found!' })
  }

  if (!portalUser) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  try {
    const newToken = await regenerateToken(userEmail)
    await sendVerificationEmail(userEmail, newToken)
    res.status(201).json({ message: 'Email Sent Successfully' })
  } catch (error) /* istanbul ignore next */ {
    logger.error("Error in resend verification email: %o", error)
    return res
      .status(500)
      .send({ message: "Internal server error!" })
  }
}
