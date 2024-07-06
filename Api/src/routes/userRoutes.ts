/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express'
import { postUserLogin } from './userControllers/postUserLogin'
import { GetUserProfile } from './userControllers/getUserProfile'
import { authenticateJWT } from '../middleware/authenticate'

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

export default router
