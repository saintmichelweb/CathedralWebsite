import {
  Entity, Column, PrimaryGeneratedColumn,
  CreateDateColumn
} from 'typeorm'

@Entity('mass_times')
export class MassTimesEntity {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({
    nullable: false,
    length: 255
  })
  location!: string

  @Column({
    nullable: true,
    length: 255,
  })
  language!: string

  @Column({
    nullable: true,
    length: 255,
  })
  day!: string

  @Column({
    nullable: false,
    length: 255
  })
  time!: string

  @Column({
    nullable: false,
    // length: 255
    default: false
  })
  isActive!: boolean

  @CreateDateColumn()
  created_at!: Date

}
