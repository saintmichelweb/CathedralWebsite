import {
    Entity, Column, PrimaryGeneratedColumn,
    CreateDateColumn,
    OneToMany,
    UpdateDateColumn
  } from 'typeorm'
import { MpuzaEntity } from './MpuzaEntity'
  
  @Entity('community')
  export class CommunityEntity {
    @PrimaryGeneratedColumn()
    id!: number
  
    @Column({
      nullable: false,
      length: 255
    })
    name!: string

    @CreateDateColumn()
    created_at!: Date

    @UpdateDateColumn()
    updated_at!: Date
  
    @OneToMany(() => MpuzaEntity, (mpuza: MpuzaEntity) => mpuza.community)
    mpuzas!: MpuzaEntity
  
  }
  