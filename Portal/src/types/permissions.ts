export interface Permission {
  id: number
  name: string
  description: string
  created_at: string
  updated_at: string
}

export interface PermissionsResponse {
  message: string
  permissions: string[]
}
