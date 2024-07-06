import { type Application } from 'express'
import user_routes from '../routes/userRoutes'
import location_routes from '../routes/locationRoutes'


export default function setupRoutes (app: Application): void {
  app.use('/api', user_routes)
  app.use('/api', location_routes)

  // Catch-all route to handle 404s
  app.use('*', (req, res) => {
    res.status(404).json({ message: 'Route not found' })
  })
}
