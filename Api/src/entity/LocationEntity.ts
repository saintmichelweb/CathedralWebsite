import {
    Entity, Column, PrimaryGeneratedColumn,
    CreateDateColumn,
    ManyToOne
  } from 'typeorm'
import { MassTimesEntity } from './MasstimesEntity'
  
  @Entity('locations')
  export class LocationEntity {
    @PrimaryGeneratedColumn()
    id!: number
  
    @Column({
      nullable: false,
      length: 255,
      unique: true
    })
    location!: string
  
    @Column({
      nullable: false,
      default: false
    })
    isActive!: boolean
    
    @CreateDateColumn()
    created_at!: Date
    
    @CreateDateColumn()
    updated_at!: Date

    @ManyToOne(() => MassTimesEntity, massTime => massTime.location)
    locationMassTimes!: MassTimesEntity[]
  
  }
  