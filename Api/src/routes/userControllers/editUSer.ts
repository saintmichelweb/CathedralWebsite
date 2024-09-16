import { type Response } from 'express'
import logger from '../../utils/logger'
import { audit } from '../../utils/audit'
import { PortalUserEntity } from '../../entity/PortalUserEntity'
import { AppDataSource } from '../../database/dataSource'
import { PortalRoleEntity } from '../../entity/PortalRoleEntity'
import * as z from 'zod'
import { AuditActionType, AuditTrasactionStatus, PortalRolesLevels, PortalUserStatus, PortalUserType } from 'shared-lib'
import { type AuthRequest } from '../../types/express'
import { readEnv } from '../../setup/readEnv'
import { sendVerificationEmail } from '../../utils/sendEmail'
import { EmailVerificationTokenEntity } from '../../entity/EmailVerificationToken'
import { JwtTokenEntity } from '../../entity/JwtTokenEntity'
import jwt from 'jsonwebtoken'
import ms from 'ms'

const EditUserSchema = z.object({
  name: z.string().min(1, { message: 'Name cannot be empty' }).optional(),
  email: z.string().email({ message: 'Invalid email address' }).min(1, { message: 'Email cannot be empty' }).optional(),
  phone: z
    .string()
    .length(10, { message: 'Phone number must have a length of 10 digits ' })
    .refine((val) => val.startsWith('07'), {
      message: 'Phone number must start with 07'
    })
    .refine((val) => !isNaN(Number(val)), {
      message: 'Phone number must be 10 digits'
    })
    .refine((val) => parseInt(val) > 699999999, {
      message: 'Phone number must not contain a "."'
    })
    .optional(),
  role: z.number().refine((val) => !isNaN(Number(val)), { message: 'Role cannot be empty' }),
  dfsp_id: z.number().or(z.string()).optional()
})

/**
 * @openapi
 * /users/{userId}/edit:
 *   patch:
 *     tags:
 *       - Portal Users
 *     summary: Edit a user by Admin
 *     security:
 *       - Authorization: []
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         description: The ID of the user to edit
 *         schema:
 *           type: number
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Updated User"
 *                 description: "The updated name of the user"
 *               email:
 *                 type: string
 *                 example: "updated1@email.com"
 *                 description: "The updated email for login"
 *               phone:
 *                 type: string
 *                 example: "0780000001"
 *                 description: "The updated user's phone number"
 *               role:
 *                 type: number
 *                 example: 1
 *                 description: "The updated role of the user"
 *               dfsp_id:
 *                 type: number
 *                 example: 5
 *                 description: "The updated dfsp database id"
 *                 required: false
 *                 nullable: true
 *     responses:
 *       200:
 *         description: User updated
 *       422:
 *         description: Validation error
 *       400:
 *         description: Invalid credentials
 *       404:
 *         description: User not found
 */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

const JWT_SECRET = readEnv('JWT_SECRET', 'secret') as string
export async function editUser(req: AuthRequest, res: Response) {
  const { userId } = req.params
  const portalUser = req.user

  /* istanbul ignore if */
  if (portalUser == null) {
    return res.status(401).send({ message: 'Unauthorized' })
  }
  const result = EditUserSchema.safeParse(req.body)
  if (!result.success) {
    audit(
      AuditActionType.EDIT,
      AuditTrasactionStatus.FAILURE,
      'editUser',
      'User update failed',
      'PortalUserEntity',
      {},
      { error: result.error.flatten() },
      null
    )
    return res.status(422).send({ message: 'Validation error', errors: result.error.flatten() })
  }

  try {
    const { name, email, phone, role } = result.data
    const userRepository = AppDataSource.getRepository(PortalUserEntity)
    const roleRepository = AppDataSource.getRepository(PortalRoleEntity)

    const user = await userRepository.findOne({
      where: { id: parseInt(userId) },
      relations: ['role']
    })

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    let newEmail = ''
    let newName = ''
    let newPhoneNumber = ''
    let roleId: number | undefined | null

    if (name && name.trim() !== '' && name !== user.name) {
      newName = name
    } 
    if (email && email.trim() !== '' && email !== user.email) {
      newEmail = email
    } 
    if (phone && phone.trim() !== '' && phone !== user.phone_number) {
      newPhoneNumber = phone
    } 
    if (role && role !== user.role.id) {
      roleId = role
    } 

    if(newEmail === "" && newPhoneNumber === "" && newName === "" && !roleId ) {
      return res.status(400).json({ message: 'You have made no changes' })
    }

    const emailBeforeUpdate = user?.email

    let roleObj

    if (roleId) {
      roleObj = await roleRepository.findOne({ where: { id: roleId } })
      if (roleObj == null || roleObj.level === PortalRolesLevels.HUB_SUPER_ADMIN ) {
        audit(
          AuditActionType.EDIT,
          AuditTrasactionStatus.FAILURE,
          'editUser',
          'User update failed',
          'PortalUserEntity',
          {},
          {},
          null
        )
        return res.status(400).send({ message: 'Invalid role' })
      }

      if (roleObj.level === PortalRolesLevels.HUB_ADMIN && portalUser.role.level !== PortalRolesLevels.HUB_SUPER_ADMIN) {
        return res.status(400).send({ message: 'Only Hub Super Admin can assign / unassign Hub Admin role' })
      }

      if (
        portalUser.role &&
        portalUser.role.level === PortalRolesLevels.DFSP_ADMIN &&
        roleObj.level &&
        ![PortalRolesLevels.DFSP_USER, PortalRolesLevels.DFSP_ADMIN].includes(roleObj.level)
      ) {
        return res.status(400).send({ message: 'You cannot change this role level' })
      }

      if (user.role && user.role.level === PortalRolesLevels.DFSP_ADMIN) {
        return res.status(400).send({ message: 'You cannot change role of DFSP Admin' })
      }

      if (portalUser.role && portalUser.role.level === PortalRolesLevels.DFSP_USER) {
        return res.status(400).send({ message: 'You cannot change this role level' })
      }

      if (portalUser.id === user.id) {
        return res.status(400).send({ message: 'Not allowed to change your role' })
      }
    }

    if (newEmail) {
      const existsEmail = await AppDataSource.manager.exists(PortalUserEntity, { where: { email } })
      if (existsEmail && email !== user.email) {
        audit(
          AuditActionType.EDIT,
          AuditTrasactionStatus.FAILURE,
          'editUser',
          'User update failed',
          'PortalUserEntity',
          {},
          {},
          null
        )
        return res.status(400).send({ message: 'Email already exists' })
      }
    }

    // save the user
    if (newName) user.name = newName
    if (newEmail) user.email = newEmail
    if (newPhoneNumber) user.phone_number = newPhoneNumber
    if (roleObj) user.role = roleObj

    await AppDataSource.manager.transaction(async (transactionalEntityManager) => {
      await transactionalEntityManager.save(user)
      audit(
        AuditActionType.EDIT,
        AuditTrasactionStatus.SUCCESS,
        'editUser',
        'User updated',
        'PortalUserEntity',
        {},
        { ...user },
        null
      )
    })

    if (newEmail && newEmail !== emailBeforeUpdate && emailBeforeUpdate !== user.email) {
      // delete token
      const emailVerificationToken = await AppDataSource.getRepository(EmailVerificationTokenEntity).findOne({
        where: { email: emailBeforeUpdate }
      })

      if (!emailVerificationToken) {
        return res.status(404).json({ message: 'Token not found' })
      }

      await AppDataSource.getRepository(EmailVerificationTokenEntity).delete({ token: emailVerificationToken.token })
      await AppDataSource.getRepository(JwtTokenEntity).delete({ token: emailVerificationToken.token })
      // generate new token
      const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' })

      // Storing the token in the database
      const jwtTokenObj = {
        token,
        user,
        expires_at: new Date(Date.now() + ms('1h')),
        last_used: new Date()
      }
      await AppDataSource.getRepository(JwtTokenEntity).save(jwtTokenObj)
      const emailVerificationObj = {
        user,
        token,
        email: user.email
      }
      await AppDataSource.getRepository(EmailVerificationTokenEntity).save(emailVerificationObj)
      user.status = PortalUserStatus.UNVERIFIED
      await AppDataSource.getRepository(PortalUserEntity).save(user)
      // send the verification email
      await sendVerificationEmail(user.email, token, user.role.name)
    }

    return res.status(200).json({ message: 'User updated', data: user })
  } catch (error) /* istanbul ignore next */ {
    audit(
      AuditActionType.EDIT,
      AuditTrasactionStatus.FAILURE,
      'editUser',
      'User update failed',
      'PortalUserEntity',
      {},
      {},
      null
    )

    logger.push(error).error('Error in editUser')
    res.status(500).send({ message: error })
  }
}
