import {
  Entity, Column, PrimaryGeneratedColumn,
  CreateDateColumn
} from 'typeorm'

@Entity('recent_events')
export class RecentEventsEntity {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({
    nullable: false,
    length: 255
  })
  title!: string

  @Column({
    nullable: true,
    length: 255,
  })
  description!: string

  // @Column({
  //   nullable: true,
  //   length: 255
  // })
  // backgroungImageUrl!: string

  @Column({
    nullable: false,
    // length: 255
    default: false,
  })
  isActive!: boolean;

  @CreateDateColumn()
  created_at!: Date

}
