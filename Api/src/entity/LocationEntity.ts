import {
    Entity, Column, PrimaryGeneratedColumn,
    CreateDateColumn
  } from 'typeorm'
  
  @Entity('mass_times')
  export class LocationEntity {
    @PrimaryGeneratedColumn()
    id!: number
  
    @Column({
      nullable: false,
      length: 255,
      unique: true
    })
    location!: string
  
    // @Column({
    //   nullable: false,
    //   // length: 255
    //   default: false
    // })
    // isActive!: boolean
  
    @CreateDateColumn()
    created_at!: Date
  
  }
  