import { type Response } from 'express'
import jwt from 'jsonwebtoken'
import { PortalUserEntity } from '../../entity/PortalUserEntity'
import { AppDataSource } from '../../database/dataSource'
import { PortalRoleEntity } from '../../entity/PortalRoleEntity'
import * as z from 'zod'
import { PortalUserStatus } from 'shared-lib'
import { sendVerificationEmail } from '../../utils/sendEmail'
import { type AuthRequest } from '../../types/express'
import { readEnv } from '../../setup/readEnv'
import { JwtTokenEntity } from '../../entity/JwtTokenEntity'
import ms from 'ms'
import logger from '../../services/logger'

const AddUserSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  position: z.string().trim().min(1, { message: "User position is required" }),
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
  // role: z.number().optional(),
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
 *               position:
 *                 type: string
 *                 example: "reception"
 *                 description: "the users position"
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

  if (portalUser == null) {
    return res.status(401).send({ message: 'Unauthorized' })
  }

    const userAccountCreator = await AppDataSource.manager.find(PortalUserEntity, {
      where: { created_by: { id: portalUser.id } }
    })

  const result = AddUserSchema.safeParse(req.body)
  if (!result.success) {
    logger.error("Validation error: %o", result.error.issues);
    logger.error("Validation error: %o", req.body);
    return res.status(422).send({ message: 'Validation error', errors: result.error.flatten() })
  }

  try {
    const { name, email, phone, position } = result.data
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions, @typescript-eslint/naming-convention

    // const roleRepository = AppDataSource.getRepository(PortalRoleEntity)
    // let roleObj: PortalRoleEntity | null
    // if( role) {
    //   roleObj = await roleRepository.findOne({ where: { id: role } })
    // } 
    // if (roleObj == null || roleObj.name === 'Hub Super Admin') {
    //   logger.error("Error, Role not found: %o", {});
    //   return res.status(400).send({ message: 'Invalid role.....' })
    // } 

    // check if email exists
    const existsEmail = await AppDataSource.manager.exists(PortalUserEntity, { where: { email } })
    if (existsEmail) {
      logger.error("Error, Email already assigned to a user: %o", existsEmail);
      return res.status(400).send({ message: 'Email already exists' })
    }

    const newUser = new PortalUserEntity()
    newUser.name = name
    newUser.email = email
    newUser.phone_number = phone
    newUser.status = PortalUserStatus.UNVERIFIED
    // newUser.role = roleObj
    newUser.created_by = portalUser

    // Start Transaction
    await AppDataSource.manager.transaction(async (transactionalEntityManager) => {
      await transactionalEntityManager.save(newUser)
      
      const token = jwt.sign({ id: newUser.id, email: newUser.email }, JWT_SECRET, { expiresIn: '1h' })

      const jwtTokenObj = transactionalEntityManager.create(JwtTokenEntity, {
        token,
        user: newUser,
        expires_at: new Date(Date.now() + ms('1h')),
        last_used: new Date()
      })

      await transactionalEntityManager.save(jwtTokenObj)
      try {
        sendVerificationEmail(newUser.email, token, '')
        await transactionalEntityManager.save(newUser)
      } catch (error: any) {
        logger.error("Error, Sending verification email : %o", error)
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
    logger.error("Error, failed to add new user : %o", error)
    res.status(500).send({ message: error })
  }
}
