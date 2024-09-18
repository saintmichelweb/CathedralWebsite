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
router.get('/homePage/welcomeMessage', getHomePageMessage)
router.get('/homePage/massTimes', getMassTimes)
router.get('/homePage/recentEvents', getRecentEvents)
router.get('/homePage/recentEvents/:id', getRecentEventById)
router.get('/homePage/topParishNewsAndNotices', getTopParishNewsAndNotices)
router.get('/homePage/bannerImages', getHomePageBannerImages)

//About page routes 
router.get('/aboutPage/priests', getWebsitePriests)
router.get('/aboutPage/parishCommitteeCouncil', getWebsiteParishCommitteeCouncil)
router.get('/aboutPage/parish-history', getWebsiteParishHistory)


//Service page routes 
router.get('/services/office-hours', getWebsiteOfficeHours)
router.get('/services/services', getWebsiteServices)
router.get('/services/Choirs', getWebsiteChoir)
router.get('/services/commissions', getWebsiteCommissions)


export default router
