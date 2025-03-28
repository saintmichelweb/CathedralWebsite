/* eslint-disable @typescript-eslint/no-misused-promises */
import { type Application } from 'express'
import logger from '../services/logger'

export default function setupServer (
  app: Application,
  HOSTNAME: string,
  PORT: number,
  // tryInitializeMinio: () => Promise<void>,
  tryInitializeDatabase: () => Promise<void>
): void {
  app.listen(PORT, HOSTNAME, async () => {
    logger.info(`API is running on http://${HOSTNAME}:${PORT}/api`)
    logger.info(`Swagger API Documentation UI is running on http://${HOSTNAME}:${PORT}/docs`)

    // await tryInitializeMinio()
    await tryInitializeDatabase()
  })
}
