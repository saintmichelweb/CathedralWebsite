import {
  Entity, Column, PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  OneToMany
} from 'typeorm'
import { RecentEventsEntity } from './RecentEventsEntity'
import { HomePageWelcomeMessageEntity } from './HomePageWelcomeMessageEntity'

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
  filename!: string

  @Column({
    nullable: true,
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
    default: false
  })
  isActive!: boolean

  @Column({
    nullable: true,
    default: ''
  })
  bannerDescription_en!: string

  @Column({
    nullable: true,
    default: ''
  })
  bannerDescription_fr!: string

  @Column({
    nullable: true,
    default: ''
  })
  bannerDescription_rw!: string

  @CreateDateColumn()
  created_at!: Date

  @OneToMany(() => RecentEventsEntity || HomePageWelcomeMessageEntity, recentEvent => recentEvent.backgroundImage)
  connectedEvents!: RecentEventsEntity[]

}
