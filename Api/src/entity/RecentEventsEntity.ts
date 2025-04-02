import {
  Entity, Column, PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne
} from 'typeorm'
import { ImageEntity } from './ImagesEntity'

@Entity('recent_events')
export class RecentEventsEntity {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({
    nullable: false,
    length: 255
  })
  title_en!: string

  @Column({
    nullable: false,
    length: 255
  })
  title_fr!: string

  @Column({
    nullable: false,
    length: 255
  })
  title_rw!: string

  @Column({
    nullable: true,
    length: 255,
  })
  description_en!: string

  @Column({
    nullable: true,
    length: 255,
  })
  description_fr!: string

  @Column({
    nullable: true,
    length: 255,
  })
  description_rw!: string

  @Column({ nullable: true })
  event_date!: Date;

  @Column({
    nullable: false,
    default: false,
  })
  isActive!: boolean;

  @CreateDateColumn()
  created_at!: Date

  @ManyToOne(() => ImageEntity, (image: ImageEntity) => image.connectedEvents)
  backgroundImage!: ImageEntity

}
