import api from '../lib/axios'

// Home page
export const fetchHomeWelcomeMessage = async () => (await api.get('/home-page/welcome-message')).data
export const fetchHomeMassTimes = async () => (await api.get('/home-page/mass-times')).data
export const fetchHomeRecentEvents = async () => (await api.get('/home-page/recent-events')).data
export const fetchHomeRecentEventById = async (id) => (await api.get(`/home-page/recent-events/${id}`)).data
export const fetchHomeTopParishNewsAndNotices = async () => (await api.get('/home-page/top-parish-news-and-notices')).data
export const fetchHomeBannerImages = async () => (await api.get('/home-page/banner-images')).data

// About page
export const fetchAboutPriests = async () => (await api.get('/about-page/priests')).data
export const fetchAboutCommitteeCouncil = async () => (await api.get('/about-page/committee-council')).data
export const fetchAboutParishHistory = async () => (await api.get('/about-page/parish-history')).data

// Services page
export const fetchServicesOfficeHours = async () => (await api.get('/services-page/office-hours')).data
export const fetchServicesList = async () => (await api.get('/services-page/services')).data
export const fetchServicesChoirs = async () => (await api.get('/services-page/Choirs')).data
export const fetchServicesCommissions = async () => (await api.get('/services-page/commissions')).data

// About (additional)
export const fetchAboutCatholicActions = async () => (await api.get('/about/catholicActions')).data
export const fetchAboutCommunities = async () => (await api.get('/about/communities')).data

export default {
  fetchHomeWelcomeMessage,
  fetchHomeMassTimes,
  fetchHomeRecentEvents,
  fetchHomeRecentEventById,
  fetchHomeTopParishNewsAndNotices,
  fetchHomeBannerImages,
  fetchAboutPriests,
  fetchAboutCommitteeCouncil,
  fetchAboutParishHistory,
  fetchServicesOfficeHours,
  fetchServicesList,
  fetchServicesChoirs,
  fetchServicesCommissions,
  fetchAboutCatholicActions,
  fetchAboutCommunities,
}




