import {
    Entity, Column, PrimaryGeneratedColumn,
    CreateDateColumn,
    ManyToOne,
    OneToMany
  } from 'typeorm'
import { MassTimesEntity } from './MasstimesEntity'
import { RecentEventsEntity } from './RecentEventsEntity'
  
  @Entity('images')
  export class ImageEntity {
    @PrimaryGeneratedColumn()
    id!: number
  
    @Column({
      nullable: false,
      length: 255,
      unique: true
    })
    imageUrl!: string
  
    @Column({
      nullable: false,
      default: false
    })
    isActive!: boolean
    
    @CreateDateColumn()
    created_at!: Date
    
    @CreateDateColumn()
    updated_at!: Date

    @OneToMany(() => RecentEventsEntity, recentEvents => recentEvents.backgroungImageUrl)
    locationRecentEventss!: RecentEventsEntity[]
  
  }
  