/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express'
import { GetHomePageMessage } from "./homePageRoutes/getHomePageMessage";
// import { authenticateJWT } from '../middleware/authenticate';

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

router.get('/homePage',
    // authenticateJWT, 
    GetHomePageMessage
)

export default router
