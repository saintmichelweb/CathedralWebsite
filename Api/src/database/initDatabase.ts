import { AppDataSource } from './dataSource'
import path from 'path'
import logger from '../services/logger'
import {
  CurrencyCodes,
  CurrencyDescriptions,
  PortalUserStatus
} from '../../../shared-lib'
import { hashPassword } from '../utils/utils'
import { PortalUserEntity } from '../entity/PortalUserEntity'
import { DefaultHubSuperAdmin } from './defaultUsers'
import { type DataSource } from 'typeorm'
import { CurrencyEntity } from '../entity/CurrencyEntity'

export const initializeDatabase = async (): Promise<void> => {
  logger.info('Connecting MySQL database...')

  await AppDataSource.initialize()
    .then(async () => {
      logger.info('MySQL Database Connection success.')

      // await seedCurrency(AppDataSource)
      
      await seedDefaultHubSuperAdmin(AppDataSource)
    })
    .catch((error) => {
      
      throw error
    })
}

export async function seedDefaultHubSuperAdmin (appDataSource: DataSource): Promise<void> {
  logger.info('Seeding Default Portal Super Admin...')

  const user = DefaultHubSuperAdmin
  const userEntity = await appDataSource.manager.findOne(
    PortalUserEntity,
    { where: { email: user.email } }
  )
  
  if (userEntity != null) {
    logger.info(`User ${user.email} already seeded. Skipping...`)
    return
  }
  
  const newUser = new PortalUserEntity()
  newUser.name = user.name
  newUser.email = user.email
  newUser.password = await hashPassword(user.password)
  newUser.phone_number = user.phone_number
  newUser.status = PortalUserStatus.ACTIVE
  await appDataSource.manager.save(newUser)
}

// export async function seedCurrency(appDataSource: DataSource): Promise<void> {
//   // skip if already seeded by checking size
//   // TODO: Is there a better way?
//   logger.info("Seeding Currency Codes...")
//   const alreadySeedSize = await appDataSource.manager.count(CurrencyEntity)
//   if (Object.keys(CurrencyCodes).length <= alreadySeedSize) {
//     logger.info("Currency Codes already seeded. Skipping...")
//     return
//   }

//   for (const currencyCode in CurrencyCodes) {
//     const currency = new CurrencyEntity()
//     currency.iso_code =
//       CurrencyCodes[currencyCode as keyof typeof CurrencyCodes]
//     currency.description =
//       CurrencyDescriptions[currencyCode as keyof typeof CurrencyDescriptions]
//     await appDataSource.manager.save(currency)
//   }
//   logger.info("Seeding Currency Codes... Done")
// }
