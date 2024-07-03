/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express'
// import { authenticateJWT } from '../middleware/authenticate';
import { getMassTimes } from './homePageRoutes/getMassTimes'
import { getHomePageMessage } from './homePageRoutes/getHomePageMessage'
import { getRecentEvents } from './homePageRoutes/getRecentEvents'
import { getTopParishNewsAndNotices } from './homePageRoutes/getTopParishNewsAndNotices'


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

router.get('/homePage/message', getHomePageMessage)
router.get('/homePage/massTimes', getMassTimes)
router.get('/homePage/recentEvents', getRecentEvents)
router.get('/homePage/topParishNewsAndNotices', getTopParishNewsAndNotices)

export default router
