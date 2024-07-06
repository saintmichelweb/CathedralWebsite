import { Entity, Column, OneToMany, ManyToOne, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'
import { PortalUserStatus } from '../../../shared-lib/src'
import { JwtTokenEntity } from './JwtTokenEntity'
import { EncryptionTransformer } from "typeorm-encrypted"
import { EncryptionTransformerObject } from '../types/encryptionObject';

@Entity("portal_users")
export class PortalUserEntity {
  // password hashed
  @PrimaryGeneratedColumn()
  id!: number

  @Column({
    nullable: false,
    length: 255,
    transformer: new EncryptionTransformer(EncryptionTransformerObject),
  })
  name!: string

  @Column({
    nullable: true,
    length: 255,
    transformer: new EncryptionTransformer(EncryptionTransformerObject),
  })
  email!: string

  @Column({
    nullable: true,
    length: 255,
    transformer: new EncryptionTransformer(EncryptionTransformerObject),
  })
  phone_number!: string
  
  @Column({ nullable: true, length: 2048 })
  password!: string

  @Column({
    type: "simple-enum",
    enum: PortalUserStatus,
    nullable: false,
    default: PortalUserStatus.UNVERIFIED,
  })
  status!: PortalUserStatus

  @CreateDateColumn()
  created_at!: Date

  @UpdateDateColumn()
  updated_at!: Date

  @OneToMany(() => JwtTokenEntity, (jwtToken) => jwtToken.user)
  tokens!: JwtTokenEntity[]

  @OneToMany(() => PortalUserEntity, (user) => user.created_by)
  created_users!: PortalUserEntity[]

  @ManyToOne(() => PortalUserEntity, (user) => user.created_users)
  created_by!: PortalUserEntity
}
