import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany, CreateDateColumn, UpdateDateColumn, JoinTable } from 'typeorm'
import { PortalPermissionEntity } from './PortalPermissionEntity'
import { PortalUserEntity } from './PortalUserEntity'

export enum PortalRolesStatus {
  ACTIVATED = 1,
  DECTIVATED = 0
}

@Entity('portal_roles')
export class PortalRoleEntity {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ nullable: false, length: 255 })
  name!: string

  @Column({ nullable: false, length: 255, default: '' })
  description!: string

  @ManyToMany(() => PortalPermissionEntity, permission => permission.roles)
  @JoinTable()
  permissions!: PortalPermissionEntity[]

  @OneToMany(() => PortalUserEntity, user => user.role)
  users!: PortalUserEntity[]

  @CreateDateColumn()
  created_at!: Date

  @UpdateDateColumn()
  updated_at!: Date

  @Column({
    type: 'simple-enum',
    enum: PortalRolesStatus,
    nullable: false,
    default: PortalRolesStatus.ACTIVATED
  })
  status!: string

  @Column({ nullable: true, default: 0 })
  blocked!: boolean
}
