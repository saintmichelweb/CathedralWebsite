import {
  Entity, Column, PrimaryGeneratedColumn,
  CreateDateColumn
} from 'typeorm'

@Entity('top_news_and_notices')
export class TopNewsAndNoticesEntity {
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

  @Column({
    nullable: false,
    // length: 255
    default: false,
  })
  isActive!: boolean;

  @CreateDateColumn()
  created_at!: Date

}
