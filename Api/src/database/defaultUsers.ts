import { readEnv } from "../setup/readEnv"

export const DefaultHubSuperAdmin = {
  email: readEnv('Portal_SUPERADMIN_EMAIL', '') as string,
  name: readEnv('Portal_SUPERADMIN_NAME', '') as string,
  password: readEnv('Portal_SUPERADMIN_PASSWORD', '') as string,
  phone_number: readEnv('Portal_SUPERADMIN_PHONE_NUMBER', '') as string,
}
