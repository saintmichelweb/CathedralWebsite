import { type Response } from 'express'
import logger from '../../utils/logger'
import { audit } from '../../utils/audit'
import jwt from 'jsonwebtoken'
import { PortalUserEntity } from '../../entity/PortalUserEntity'
import { AppDataSource } from '../../database/dataSource'
import { PortalRoleEntity } from '../../entity/PortalRoleEntity'
import * as z from 'zod'
import { AuditActionType, AuditTrasactionStatus, PortalRolesLevels, PortalUserStatus, PortalUserType } from 'shared-lib'
import { EmailVerificationTokenEntity } from '../../entity/EmailVerificationToken'
import { sendVerificationEmail } from '../../utils/sendEmail'
import { DFSPEntity } from '../../entity/DFSPEntity'
import { type AuthRequest } from '../../types/express'
import { readEnv } from '../../setup/readEnv'
import { JwtTokenEntity } from '../../entity/JwtTokenEntity'
import ms from 'ms'

const AddUserSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  phone: z
    .string()
    .length(10, { message: 'Phone number must have a length of 10 digits' })
    .refine((val) => val.startsWith('07'), {
      message: 'Phone number must start with 07'
    })
    .refine((val) => !isNaN(Number(val)), {
      message: 'Phone number must be 10 digits'
    })
    .refine((val) => parseInt(val) > 699999999, {
      message: 'Phone number must not contain a "."'
    }),
  role: z.number().optional(),
  dfsp_id: z.number().or(z.string()).optional()
})

const JWT_SECRET = readEnv('JWT_SECRET', '') as string

/**
 * @openapi
 * /users/add:
 *   post:
 *     tags:
 *       - Portal Users
 *     summary: Add a user by Admin
 *     security:
 *       - Authorization: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Test User"
 *                 description: "The name of the user"
 *               email:
 *                 type: string
 *                 example: "test1@email.com"
 *                 description: "The email for login"
 *               phone:
 *                 type: string
 *                 example: "0780000000"
 *                 description: "the users phone number"
 *               role:
 *                 type: number
 *                 example: 1
 *                 description: "The role of the user"
 *               dfsp_id:
 *                 type: number
 *                 example: 5
 *                 description: "The dfsp database id"
 *                 required: false
 *                 nullable: true
 *     responses:
 *       200:
 *         description: User created. And Verification Email Sent
 *       422:
 *         description: Validation error
 *       400:
 *         description: Invalid credentials
 */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
export async function addUser(req: AuthRequest, res: Response) {
  interface CustomError {
    response: any
    message: string
    error: any
  }

  let responseStatus: number
  let responseMessage: string
  let responseData: any
  const portalUser = req.user

  /* istanbul ignore if */
  if (portalUser == null) {
    return res.status(401).send({ message: 'Unauthorized' })
  }

  // Handle Hub Onboarding by Hub Super Admin
  if (portalUser.user_type === PortalUserType.HUB && portalUser.role.name === 'Hub Super Admin') {
    const userCountCreatedByHubSuperAdmin = await AppDataSource.manager.find(PortalUserEntity, {
      where: { created_by: { id: portalUser.id } }
    })

    // if (userCountCreatedByHubSuperAdmin.length >= 3) {
    //   return res.status(400).send({ message: 'Hub Super Admin can create only 3 users' })
    // }
  }

  const result = AddUserSchema.safeParse(req.body)
  if (!result.success) {
    audit(
      AuditActionType.ADD,
      AuditTrasactionStatus.FAILURE,
      'addUser',
      'User Creation failed',
      'PortalUserEntity',
      {},
      { error: result.error.flatten() },
      null
    )
    return res.status(422).send({ message: 'Validation error', errors: result.error.flatten() })
  }

  try {
    const { name, email, phone, role } = result.data
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions, @typescript-eslint/naming-convention
    const dfsp_id = Number(result.data.dfsp_id) || 0

    const roleRepository = AppDataSource.getRepository(PortalRoleEntity)
    const dfspRepository = AppDataSource.getRepository(DFSPEntity)

    let roleObj: PortalRoleEntity | null
    let dfsp_: any
    if(!dfsp_id && role) {
      roleObj = await roleRepository.findOne({ where: { id: role } })
    } else {
      dfsp_ = await dfspRepository.findOne({ where: { id: dfsp_id }, relations: ['role'] })
      roleObj = dfsp_.role
    }

    if (roleObj == null || roleObj.name === 'Hub Super Admin') {
      audit(
        AuditActionType.ADD,
        AuditTrasactionStatus.FAILURE,
        'addUser',
        'User Creation failed',
        'PortalUserEntity',
        {},
        {},
        null
      )
      return res.status(400).send({ message: 'Invalid role.....' })
    } else if (roleObj.name === 'Hub Admin' && portalUser.role.name !== 'Hub Super Admin') {
      return res.status(400).send({ message: 'Hub admin can only be created by Hub Super Admin' })
    }

    // check if email exists
    const existsEmail = await AppDataSource.manager.exists(PortalUserEntity, { where: { email } })
    if (existsEmail) {
      audit(
        AuditActionType.ADD,
        AuditTrasactionStatus.FAILURE,
        'addUser',
        'User Creation failed',
        'PortalUserEntity',
        {},
        {},
        null
      )
      return res.status(400).send({ message: 'Email already exists' })
    }

    // Find User Type from role
    let newUserType = PortalUserType.HUB
    if (!dfsp_id) {
      newUserType = PortalUserType.HUB
    } else {
      newUserType = PortalUserType.DFSP
    }

    const newUser = new PortalUserEntity()
    newUser.name = name
    newUser.email = email
    newUser.phone_number = phone
    newUser.user_type = newUserType
    newUser.status = PortalUserStatus.UNVERIFIED
    newUser.role = roleObj
    newUser.created_by = portalUser

    if (portalUser.dfsp !== null) {
      newUser.dfsp = portalUser.dfsp
    } else if (dfsp_id) {
      newUser.dfsp = dfsp_
    } else if (roleObj?.level === PortalRolesLevels.DFSP_ADMIN || roleObj?.level === PortalRolesLevels.DFSP_USER) {
      const dfsp = await AppDataSource.manager.findOne(DFSPEntity, {
        where: { id: dfsp_id }
      })
      if (dfsp == null) {
        audit(
          AuditActionType.ADD,
          AuditTrasactionStatus.FAILURE,
          'addUser',
          'User Creation failed: Invalid DFSP dfsp_id Not found',
          'PortalUserEntity',
          {},
          {},
          null
        )
        return res.status(400).send({ message: 'Invalid dfsp_id: DFSP Not found' })
      }
      newUser.dfsp = dfsp
    }

    // Start Transaction
    await AppDataSource.manager.transaction(async (transactionalEntityManager) => {
      await transactionalEntityManager.save(newUser)
      audit(
        AuditActionType.ADD,
        AuditTrasactionStatus.SUCCESS,
        'addUser',
        'User Created',
        'PortalUserEntity',
        {},
        { ...newUser },
        null
      )
      const token = jwt.sign({ id: newUser.id, email: newUser.email }, JWT_SECRET, { expiresIn: '1h' })

      const jwtTokenObj = transactionalEntityManager.create(JwtTokenEntity, {
        token,
        user: newUser,
        expires_at: new Date(Date.now() + ms('1h')),
        last_used: new Date()
      })

      await transactionalEntityManager.save(jwtTokenObj)
      await transactionalEntityManager.save(EmailVerificationTokenEntity, {
        user: newUser,
        token,
        email: newUser.email
      })
      try {
        sendVerificationEmail(newUser.email, token, roleObj.name)
        await transactionalEntityManager.save(newUser)
      } catch (error: any) {
        logger.push({ error }).error('The error in sending verification email is')
        await transactionalEntityManager.save(newUser)
        responseStatus = 200
        responseData = newUser
        responseMessage = 'User created. And Verification Email was not Sent'
      }
    })
    responseStatus = 201
    responseData = newUser
    responseMessage = 'User created. And Verification Email Sent'
    return res.status(responseStatus).send({ message: responseMessage, data: responseData })
  } catch (error) /* istanbul ignore next */ {
    audit(
      AuditActionType.ACCESS,
      AuditTrasactionStatus.FAILURE,
      'addUser',
      'User Creation failed',
      'PortalUserEntity',
      {},
      {},
      null
    )

    logger.push({ error }).error('Error in addUser')
    res.status(500).send({ message: error })
  }
}
