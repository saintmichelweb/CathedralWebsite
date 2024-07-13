/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { type Response } from 'express'
import { AppDataSource } from '../../database/dataSource'
import logger from '../../services/logger'
import { type AuthRequest } from 'src/types/express'
import { PortalRoleEntity } from '../../entity/PortalRoleEntity'
import { PortalPermissionEntity } from '../../entity/PortalPermissionEntity'
import { audit } from '../../utils/audit'
import { AuditActionType, AuditTrasactionStatus } from 'shared-lib'
import { Brackets, In } from 'typeorm'
import { exportRolesCSVFile } from '../../utils/CSVExports/exportRolesCSVFIle'
import { exportRolesExcelFile } from '../../utils/ExcelExports/exportRolesXlsxFile'

export async function getRolesExport(req: AuthRequest, res: Response) {
  const portalUser = req.user
  if (portalUser == null) {
    return res.status(401).send({ message: 'Unauthorized' })
  }

  try {
    const { page = 1, roleId, status, search, level, format } = req.query

    const RoleRepository = AppDataSource.getRepository(PortalRoleEntity)
    const PermsRepository = AppDataSource.getRepository(PortalPermissionEntity)

    const queryBuilder = RoleRepository.createQueryBuilder('portal_roles')

    queryBuilder
      .leftJoin('portal_roles.permissions', 'permissions')
      .orderBy('portal_roles.created_at', 'DESC')
      .addSelect(['portal_roles.*', 'permissions'])
      .where('portal_roles.name != :name', { name: 'Hub Super Admin' })

    if (roleId) {
      queryBuilder.andWhere({ id: roleId })
    }
    if (status !== null && status !== undefined) {
      queryBuilder.andWhere({
        status: status === 'Activated' ? '1' : '0'
      })
    }
    if (level) {
      queryBuilder.andWhere({
        level: level
      })
    }

    if (search) {
      queryBuilder.andWhere(
        new Brackets((qb) => {
          qb.where('portal_roles.name LIKE :search', { search: `%${search}%` })
            .orWhere('portal_roles.name LIKE :search', { search: `%${search}%` })
            .orWhere('portal_roles.description LIKE :search', { search: `%${search}%` })
            .orWhere('permissions.name LIKE :search', { search: `%${search}%` })
            .orWhere('portal_roles.dfspId LIKE :search', { search: `%${search}%` })
        })
      )
    }

    if (portalUser.dfsp) {
      queryBuilder.innerJoin('portal_roles.dfsp', 'dfsp')
      queryBuilder.andWhere('dfsp.id = :dfspId', { dfspId: portalUser.dfsp.id })
    }

    let roleType = req.query.type

    if (!portalUser.dfsp && !roleType) {
      queryBuilder.andWhere({
        level: In(['Hub', 'DFSP'])
      })
    } else if (!portalUser.dfsp && roleType) {
      queryBuilder.andWhere({
        level: roleType
      })
    }

    const roles = await queryBuilder.getMany()
    audit(
      AuditActionType.ACCESS,
      AuditTrasactionStatus.SUCCESS,
      'getRoles',
      'export List of Roles and associated permissions',
      'PortalRoleEntity',
      {},
      {},
      portalUser
    )
    const csvFile = format === 'xlsx' ? await exportRolesExcelFile(roles) : await exportRolesCSVFile(roles)
    if (csvFile) {
      if(format === 'xlsx'){
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
        res.setHeader('Content-Disposition', `attachment; filename=Roles_${new Date().toISOString()}.xlsx`)
      }else{
        res.setHeader('Content-Type', 'text/csv')
        res.setHeader('Content-Disposition', 'attachment; filename=roles.csv')
      }
      res.end(csvFile)
    } else {
      res.status(500).send({ message: 'Error exporting Roles CSV file' })
    }
  } catch (e) {
    logger.error(`Error exporting Roles CSV file: ${e}`)
    res.status(500).send({ message: 'Internal Server Error' })
  }
}
