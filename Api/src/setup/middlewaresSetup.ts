import { type Application } from 'express'
import helmet from 'helmet'
import morgan_config from './morganConfig'

export default function setupMiddlewares (app: Application): void {
  app.use(morgan_config)
  app.use(helmet())
}
