/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express'
import { postUserLogin } from './userControllers/postUserLogin'
import { GetUserProfile } from './userControllers/getUserProfile'
import { authenticateJWT } from '../middleware/authenticate'
import { postUserLogout } from './userControllers/postUserLogout'
import { addUser } from './userControllers/addUserByAdmin'
import { putUserResetPassword } from './userControllers/putUserResetPassword'
import { editUser } from './userControllers/editUSer'

// /**
//  * @openapi
//  * /users:
//  *   get:
//  *     tags:
//  *       - Portal Users
//  *     security:
//  *       - Authorization: []
//  *     summary: GET Portal Users List
//  *     responses:
//  *       200:
//  *         description: GET Portal Users List
//  */

const router = express.Router()

router.get('/users/profile', authenticateJWT ,GetUserProfile)
router.post('/users/login', postUserLogin)
router.post('/users/logout', authenticateJWT, postUserLogout)
router.post('/users/add', authenticateJWT, addUser)
router.post('/users/reset-password', authenticateJWT, putUserResetPassword)
router.put('/users/:userId/edit', editUser)

export default router
