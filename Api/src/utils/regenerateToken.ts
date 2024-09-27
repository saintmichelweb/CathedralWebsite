import { AppDataSource } from '../database/dataSource'
import { JwtTokenEntity } from '../entity/JwtTokenEntity'
import jwt from 'jsonwebtoken'
import ms from 'ms'
import { PortalUserEntity } from '../entity/PortalUserEntity'
import dotenv from 'dotenv'
import { readEnv } from '../setup/readEnv'

const JWT_SECRET = readEnv('JWT_SECRET', 'secret') as string

export async function regenerateToken(email: string, portalUser: PortalUserEntity): Promise<string> {
  
  const portalUserRepository = AppDataSource.getRepository(PortalUserEntity)
  const jwtTokenRepository = AppDataSource.getRepository(JwtTokenEntity)

  // Find the existing email verification token
  const user = await portalUserRepository.findOne({ where: { email } })

  if (!user) {
    throw new Error('Token not found')
  }

  // Delete the existing tokens
  await jwtTokenRepository.delete({ user: user })

  // Generate a new token
  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' })

  // Save the new JWT token
  const jwtTokenObj = {
    token,
    user: user,
    expires_at: new Date(Date.now() + ms('1h')),
    last_used: new Date()
  }
  await jwtTokenRepository.save(jwtTokenObj)

  return token
}
