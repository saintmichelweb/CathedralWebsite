import {
    Entity, Column, PrimaryGeneratedColumn,
    CreateDateColumn
  } from 'typeorm'
  
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
  
  }
  