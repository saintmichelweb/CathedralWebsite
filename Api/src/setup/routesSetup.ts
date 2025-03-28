import { type Application } from 'express'
import website_routes from '../routes/websiteRoutes'
import user_routes from '../routes/userRoutes'
import location_routes from '../routes/locationRoutes'
import language_routes from '../routes/languageRoutes'
import recent_events_routes from '../routes/recentEventsRoutes'
import top_parish_news_and_notices_routes from '../routes/topNewsAndNoticesRoutes'
import mass_times_routes from '../routes/massTimesRoutes'
import image_routes from '../routes/imageRoutes'
import parish_history_routes from '../routes/parishHistoryRoutes'
import priests from '../routes/priestsRoutes'
import welcomeMessage from '../routes/welcomeMessage'
import services from '../routes/servicesRoutes'
import parishCommitteeCouncil from '../routes/parishCommitteeCouncilRoutes'
import commissions from '../routes/commissionsRoutes'
import officeHours from '../routes/officeHours'
import choirs from '../routes/choirsRoutes'



export default function setupRoutes (app: Application): void {
  app.use('/', website_routes)
  app.use('/api', user_routes)
  app.use('/api', location_routes)
  app.use('/api', language_routes)
  app.use('/api', recent_events_routes)
  app.use('/api', top_parish_news_and_notices_routes)
  app.use('/api', mass_times_routes)
  app.use('/api', image_routes)
  app.use('/api', image_routes)
  app.use('/api', parish_history_routes)
  app.use('/api', priests)
  app.use('/api', welcomeMessage)
  app.use('/api', services)
  app.use('/api', parishCommitteeCouncil)
  app.use('/api', commissions)
  app.use('/api', officeHours)
  app.use('/api', choirs)

  // Catch-all route to handle 404s
  app.use('*', (req, res) => {
    res.status(404).json({ message: 'Route not found' })
  })
}
