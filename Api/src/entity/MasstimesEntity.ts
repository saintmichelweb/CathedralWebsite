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
  massDay!: string

  @Column({
    nullable: false,
    length: 255
  })
  massTime!: string

  @Column({
    nullable: false,
    // length: 255
    default: false
  })
  isActive!: boolean

  @CreateDateColumn()
  created_at!: Date

}
