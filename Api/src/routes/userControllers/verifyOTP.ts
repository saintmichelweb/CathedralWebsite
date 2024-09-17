import { OPTEntity } from '../../entity/OTPEntity'

import { AuthRequest } from '../../types/express'
import { Response } from 'express'
import logger from '../../utils/logger'
import { AppDataSource } from '../../database/dataSource'
import { PortalUserEntity } from '../../entity/PortalUserEntity'
import jwt from 'jsonwebtoken'
import { readEnv } from '../../setup/readEnv'
import ms from 'ms'
import { AuditActionType, AuditTrasactionStatus } from 'shared-lib'
import { audit } from '../../utils/audit'
import { JwtTokenEntity } from '../../entity/JwtTokenEntity'

const JWT_SECRET = readEnv('JWT_SECRET', 'secret') as string
const JWT_EXPIRES_IN = readEnv('JWT_EXPIRES_IN', '1d') as string
const INACTIVITY_LIMIT = readEnv('INACTIVITY_LIMIT', '15m') as string

const JWT_EXPIRES_IN_MS = ms(JWT_EXPIRES_IN)
const INACTIVITY_LIMIT_MS = ms(INACTIVITY_LIMIT)

export async function verifyOTP(req: AuthRequest, res: Response) {
  try {
    const userEmail = req.body.email
    const otp = req.body.otp
    if (!userEmail || !otp) {
      return res.status(400).send({ message: 'Email and OTP are required' })
    }
    const OTPEntityRepository = AppDataSource.getRepository(OPTEntity)
    const otpEntity = await OTPEntityRepository.findOne({ where: { email: userEmail } })
    if (otpEntity == null) {
      return res.status(404).send({ message: 'OTP not found' })
    }

    if (otp != otpEntity.otp) {
      logger.push({ email: userEmail, otp: otp }).info('OTP does not match')
      return res.status(404).send({ message: 'OTP does not match' })
    }
    if (Date.now() > otpEntity.expires_at.getTime()) {
      logger.push({ email: otpEntity.email }).info('OTP has expired')
      return res.status(404).send({ message: 'OTP has expired' })
    }
    // generate token and respond the same response as login
    const user = await AppDataSource.getRepository(PortalUserEntity).findOne({ where: { email: userEmail } })
    if (!user) {
      return res.status(404).send({ message: 'User not found' })
    }
    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN })

    const jwtTokenObj = AppDataSource.manager.create(JwtTokenEntity, {
      token,
      user,
      expires_at: new Date(Date.now() + JWT_EXPIRES_IN_MS),
      last_used: new Date(),
      limit_time: new Date(Date.now() + INACTIVITY_LIMIT_MS)
    })

    await AppDataSource.manager.save(jwtTokenObj)

    logger.push({ email: req.body.email }).info('User login successful.')
    audit(
      AuditActionType.ACCESS,
      AuditTrasactionStatus.SUCCESS,
      'postUserLogin',
      'User login successful',
      'PortalUserEntity',
      {},
      {},
      user
    )
    // delete the otp
    await OTPEntityRepository.delete({ email: userEmail })
    res.json({ success: true, message: 'Login successful', token: token})
  } catch (error: any) {
    audit(
      AuditActionType.ACCESS,
      AuditTrasactionStatus.FAILURE,
      'postUserLogin',
      'User login failed',
      'PortalUserEntity',
      {},
      { error: error.message },
      null
    )

    logger.push({ error, email:req.body.email }).error('user login failed, error in verifyOTP')
    res.status(400).send({ success: false, message: error.message })
  }
}
