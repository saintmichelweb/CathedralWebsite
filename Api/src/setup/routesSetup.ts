import { type Application } from 'express'
import user_routes from '../routes/userRoutes'
import location_routes from '../routes/locationRoutes'
import language_routes from '../routes/languageRoutes'
import recent_events_routes from '../routes/recentEventsRoutes'
import top_parish_news_and_notices_routes from '../routes/topNewsAndNoticesRoutes'


export default function setupRoutes (app: Application): void {
  app.use('/api', user_routes)
  app.use('/api', location_routes)
  app.use('/api', language_routes)
  app.use('/api', recent_events_routes)
  app.use('/api', top_parish_news_and_notices_routes)

  // Catch-all route to handle 404s
  app.use('*', (req, res) => {
    res.status(404).json({ message: 'Route not found' })
  })
}
