import {
  Entity, Column, PrimaryGeneratedColumn,
  CreateDateColumn
} from 'typeorm'

@Entity('top_parish_news_and_notices')
export class TopParishNewsAndNoticesEntity {
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
  //   nullable: false,
  //   length: 255
  // })
  // ImageUrl!: string

  // @Column({
  //   nullable: false,
  //   length: 255
  // })
  // slidingImageDescription!: string

  @CreateDateColumn()
  created_at!: Date

}
