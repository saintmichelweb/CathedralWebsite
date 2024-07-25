/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express'
// import { authenticateJWT } from '../middleware/authenticate';
import { getMassTimes } from './homePageControllers/getMassTimes'
import { getHomePageMessage } from './homePageControllers/getHomePageMessage'
import { getRecentEvents } from './homePageControllers/getRecentEvents'
import { getTopParishNewsAndNotices } from './homePageControllers/getTopParishNewsAndNotices'
import { getHomePageBannerImages } from './homePageControllers/getHomePageBannerImages'

const router = express.Router()

router.get('/homePage/welcomeMessage', getHomePageMessage)
router.get('/homePage/massTimes', getMassTimes)
router.get('/homePage/recentEvents', getRecentEvents)
router.get('/homePage/topParishNewsAndNotices', getTopParishNewsAndNotices)
router.get('/homePage/bannerImages', getHomePageBannerImages)

export default router
