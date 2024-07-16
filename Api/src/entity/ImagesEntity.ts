import {
  Entity, Column, PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  OneToMany
} from 'typeorm'
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
    length: 255,
    unique: true
  })
  imagePath!: string

  @Column({
    nullable: false,
    default: false
  })
  isBannerImage!: boolean

  @Column({
    nullable: false,
    length: 255,
    default: 'N/A'
  })
  bannerDescription!: string

  @CreateDateColumn()
  created_at!: Date

  @OneToMany(() => RecentEventsEntity, recentEvents => recentEvents.backgroundImage)
  recentEvents!: RecentEventsEntity[]

}
