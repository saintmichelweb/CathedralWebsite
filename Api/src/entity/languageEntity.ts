import {
    Entity, Column, PrimaryGeneratedColumn,
    CreateDateColumn,
    ManyToOne,
    OneToMany
  } from 'typeorm'
import { MassTimesEntity } from './MasstimesEntity'
  
  @Entity('languages')
  export class LanguageEntity {
    @PrimaryGeneratedColumn()
    id!: number
  
    @Column({
      nullable: false,
      length: 255,
      unique: true
    })
    language!: string
  
    @Column({
      nullable: false,
      // length: 255
      default: false
    })
    isActive!: boolean
  
    @CreateDateColumn()
    created_at!: Date

    @CreateDateColumn()
    updated_at!: Date

    @OneToMany(() => MassTimesEntity, (massTime: MassTimesEntity) => massTime.language)
    languageMassTimes!: MassTimesEntity[]
  
  }
  