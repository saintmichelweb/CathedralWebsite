export interface Role {
  id: number
  name: string
  level: string
  description: string
  permissions: string[]
}

export interface RolesResponse {
  data: RoleInfo[]
  message: string
  permissions: string[]
}

export interface RoleLevelsResponse {
  data: Role[]
  message: string
}

export interface RoleInfo {
  id: number
  name: string
  description: string
  level: string
  status: number
  // created_at: string
  role_id: number
  permissions?: string[]
}

export interface RoleStatusUpdate {
  roleId: number
  status?: string
}