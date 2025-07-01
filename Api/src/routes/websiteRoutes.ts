/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express'
import { getHomePageMessage } from './websiteControllers/homePage/getHomePageMessage'
import { getMassTimes } from './websiteControllers/homePage/getMassTimes'
import { getRecentEventById, getRecentEvents } from './websiteControllers/homePage/getRecentEvents'
import { getTopParishNewsAndNotices } from './websiteControllers/homePage/getTopParishNewsAndNotices'
import { getHomePageBannerImages } from './websiteControllers/homePage/getHomePageBannerImages'
import { getWebsiteOfficeHours } from './websiteControllers/getOfficeHours'
import { getWebsiteParishCommitteeCouncil } from './websiteControllers/getParishCouncilCommittee'
import { getWebsitePriests } from './websiteControllers/getPriests'
import { getWebsiteParishHistory } from './websiteControllers/getParishHistory'
import { getWebsiteServices } from './websiteControllers/getServices'
import { getWebsiteChoir } from './websiteControllers/getWebSiteChoirs'
import { getWebsiteCommissions } from './websiteControllers/getWebSiteCommissions'

const router = express.Router()

// Home page routes
router.get('/home-page/welcome-message', getHomePageMessage)
router.get('/home-page/mass-times', getMassTimes)
router.get('/home-page/recent-events', getRecentEvents)
router.get('/home-page/recent-events/:id', getRecentEventById)
router.get('/home-page/top-parish-news-and-notices', getTopParishNewsAndNotices)
router.get('/home-page/banner-images', getHomePageBannerImages)

//About page routes 
router.get('/about-page/priests', getWebsitePriests)
router.get('/about-page/committee-council', getWebsiteParishCommitteeCouncil)
router.get('/about-page/parish-history', getWebsiteParishHistory)


//Service page routes 
router.get('/services-page/office-hours', getWebsiteOfficeHours)
router.get('/services-page/services', getWebsiteServices)
router.get('/services-page/Choirs', getWebsiteChoir)
router.get('/services-page/commissions', getWebsiteCommissions)


export default router
