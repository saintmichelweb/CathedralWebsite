/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express'
// import { authenticateJWT } from '../middleware/authenticate';
import { getMassTimes } from './homePageControllers/getMassTimes'
import { getHomePageMessage } from './homePageControllers/getHomePageMessage'
import { getRecentEvents } from './homePageControllers/getRecentEvents'
import { getTopParishNewsAndNotices } from './homePageControllers/getTopParishNewsAndNotices'

const router = express.Router()

router.get('/homePage/message', getHomePageMessage)
router.get('/homePage/massTimes', getMassTimes)
router.get('/homePage/recentEvents', getRecentEvents)
router.get('/homePage/topParishNewsAndNotices', getTopParishNewsAndNotices)

export default router
