import { OPTEntity } from '../../entity/OTPEntity'
import { AuthRequest } from '../../types/express'
import { Response } from 'express'
import { AppDataSource } from '../../database/dataSource'
import { PortalUserEntity } from '../../entity/PortalUserEntity'
import jwt from 'jsonwebtoken'
import { readEnv } from '../../setup/readEnv'
import ms from 'ms'
import { JwtTokenEntity } from '../../entity/JwtTokenEntity'
import logger from '../../services/logger'

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
      logger.error("Error, OTP does not matchr : %o", { email: userEmail, otp: otp })
      return res.status(404).send({ message: 'OTP does not match' })
    }
    if (Date.now() > otpEntity.expires_at.getTime()) {
      logger.info("Error, OTP has expired : %o", { email: userEmail, otp: otp })
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
    logger.info("Info, OTP Verification successful: %o", { email: req.body.email })
    // delete the otp
    await OTPEntityRepository.delete({ email: userEmail })
    res.json({ success: true, message: 'OTP Verification successful', token: token})
  } catch (error: any) {
    logger.error("Error, user OTP Verification failed, error in verifyOTP : %o", { error, email:req.body.email })
    res.status(500).send({ success: false, message: "Internal server error!" })
  }
}
