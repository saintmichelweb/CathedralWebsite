import { PermissionsEnum } from '../types/permissions'

export const DefaultRoles = [
  {
    name: "Portal Super Admin",
    description: "Portal Super Admin Role",
  },
  {
    name: "Portal Admin",
    description: "Portal Admin Role",
    level: "Portal",
    permissions: [
      PermissionsEnum.CREATE_PORTAL_USERS,
      PermissionsEnum.VIEW_PORTAL_USERS,
      PermissionsEnum.VIEW_ROLES,
      PermissionsEnum.EDIT_PORTAL_USERS,
    ],
  },
]
