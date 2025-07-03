import { type Response } from 'express'
import { PortalUserEntity } from '../../entity/PortalUserEntity'
import { AppDataSource } from '../../database/dataSource'
import * as z from 'zod'
import { PortalUserStatus } from '../../../../shared-lib'
import { type AuthRequest } from '../../types/express'
import { readEnv } from '../../setup/readEnv'
import { sendVerificationEmail } from '../../utils/sendEmail'
import { JwtTokenEntity } from '../../entity/JwtTokenEntity'
import jwt from 'jsonwebtoken'
import ms from 'ms'
import logger from '../../services/logger'

const EditUserSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  position: z.string().trim().min(1, { message: "User position is required" }),
  status: z.string().trim().min(1, { message: "User status is required" }),
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

/**
 * @openapi
 * /users/{userId}/edit:
 *   patch:
 *     tags:
 *       - Users
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
 *               status:
 *                 type: string
 *                 example: "Active"
 *                 description: "The updated status of the user"
 *               email:
 *                 type: string
 *                 example: "updated1@email.com"
 *                 description: "The updated email for login"
 *               phone:
 *                 type: string
 *                 example: "0780000001"
 *                 description: "The updated user's phone number"
 *               position:
 *                 type: string
 *                 example: "Reception"
 *                 description: "The updated position of the user"
 *     responses:
 *       200:
 *         description: User updated
 *       422:
 *         description: Validation error
 *       401:
 *         description: Invalid credentials
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

const JWT_SECRET = readEnv('JWT_SECRET', 'secret') as string
export async function editUser(req: AuthRequest, res: Response) {
  const { userId } = req.params
  const portalUser = req.user

  // if (portalUser == null) {
  //   return res.status(401).send({ message: 'Unauthorized' })
  // }

  const result = EditUserSchema.safeParse(req.body)
  if (!result.success) {
    logger.error("Validation error: %o", result.error.issues);
    logger.error("Validation error: %o", req.body);
    return res.status(422).send({ message: 'Validation error', errors: result.error.flatten() })
  }

  try {
    const { name, email, phone, position, status } = result.data
    const userRepository = AppDataSource.getRepository(PortalUserEntity)
    // const roleRepository = AppDataSource.getRepository(PortalRoleEntity)

    const user = await userRepository.findOne({
      where: { id: parseInt(userId) }
      // relations: ['role']
    })

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    if (user.name === 'Portal Super Admin') {
      return res.status(404).send({ message: "Can not update SuperAdmin!" });
    }

    let newEmail = ''
    let newName = ''
    let newPhoneNumber = ''
    let newPosition = ''
    let newStatus = ''
    // let roleId: number | undefined | null

    if (name && name.trim() !== '' && name !== user.name) {
      newName = name
    }
    if (email && email.trim() !== '' && email !== user.email) {
      newEmail = email
    }
    if (phone && phone.trim() !== '' && phone !== user.phone_number) {
      newPhoneNumber = phone
    }
    if (position && position.trim() !== '') {
      newPosition = position
    }
    if (status && status.trim() !== '') {
      newStatus = status
    }

    if (newEmail === "" && newPhoneNumber === "" && newName === "" && newPosition === "") {
      return res.status(400).json({ message: 'You have made no changes' })
    }

    const emailBeforeUpdate = user?.email

    if (newEmail) {
      const existsEmail = await AppDataSource.manager.exists(PortalUserEntity, { where: { email } })
      if (existsEmail && email !== user.email) {
        logger.error("Email already exists: %o", existsEmail);
        return res.status(400).send({ message: 'Email already exists' })
      }
    }

    // save the user
    if (newName) user.name = newName
    if (newEmail) user.email = newEmail
    if (newPhoneNumber) user.phone_number = newPhoneNumber
    if (newPosition) user.position = newPosition
    if (newStatus) user.status = getStatus(newStatus)

    await AppDataSource.manager.transaction(async (transactionalEntityManager) => {
      await transactionalEntityManager.save(user)
      logger.debug("User update successfull: %o", user);
    })

    if (newEmail && newEmail !== emailBeforeUpdate) {
      await AppDataSource.getRepository(JwtTokenEntity).delete({ user: user })
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

      user.status = PortalUserStatus.UNVERIFIED
      await AppDataSource.getRepository(PortalUserEntity).save(user)
      // send the verification email
      await sendVerificationEmail(user.email, token)
    }

    return res.status(200).json({ message: 'User updated', data: user })
  } catch (error) /* istanbul ignore next */ {
    logger.error("Error editting user: %o", error);
    res.status(500).send({ message: "Internal server error!" })
  }
}


const getStatus = (newStatus: string): PortalUserStatus => {
  if (newStatus === PortalUserStatus.ACTIVE) {
    return PortalUserStatus.ACTIVE
  } else if (newStatus === PortalUserStatus.UNVERIFIED) {
    return PortalUserStatus.UNVERIFIED
  } else if (newStatus === PortalUserStatus.RESETPASSWORD) {
    return PortalUserStatus.RESETPASSWORD
  } else {
    return PortalUserStatus.DISABLED
  }
}