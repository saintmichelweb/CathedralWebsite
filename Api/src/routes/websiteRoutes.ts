/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express'
import { getHomePageMessage } from './websiteControllers/homePage/getHomePageMessage'
import { getMassTimes } from './websiteControllers/homePage/getMassTimes'
import { getRecentEventById, getRecentEvents } from './websiteControllers/homePage/getRecentEvents'
import { getTopParishNewsAndNotices } from './websiteControllers/homePage/getTopParishNewsAndNotices'
import { getHomePageBannerImages } from './websiteControllers/homePage/getHomePageBannerImages'
import { getAllPriests } from './priestsControllers/getPriests'


const router = express.Router()

// Home page routes
router.get('/homePage/welcomeMessage', getHomePageMessage)
router.get('/homePage/massTimes', getMassTimes)
router.get('/homePage/recentEvents', getRecentEvents)
router.get('/homePage/recentEvents/:id', getRecentEventById)
router.get('/homePage/topParishNewsAndNotices', getTopParishNewsAndNotices)
router.get('/homePage/bannerImages', getHomePageBannerImages)

//About page routes 
router.get('/aboutPage/priests', getAllPriests)


export default router
