import {
  Entity, Column, PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm'

@Entity('parish_history')
export class ParishHistoryEntity {
  @PrimaryGeneratedColumn()
  id!: number
  @Column({
    nullable: true,
    // length: 4096
  })

  history_en!: string
  @Column({
    nullable: true,
    // length: 4096
  })

  history_fr!: string
  @Column({
    nullable: true,
    // length: 4096
  })

  history_rw!: string
  @Column({
    nullable: true,
    // length: 4096
  })

  mission_en!: string
  @Column({
    nullable: true,
    // length: 4096
  })

  mission_fr!: string
  @Column({
    nullable: true,
    // length: 4096
  })

  mission_rw!: string
  @Column({
    nullable: true,
    // length: 4096
  })

  vision_en!: string
  @Column({
    nullable: true,
    // length: 4096
  })
  vision_fr!: string

  @Column({
    nullable: true,
    // length: 4096
  })

  vision_rw!: string
  @Column({
    nullable: true,
    // length: 4096
  })
  @CreateDateColumn()
  created_at!: Date

  @UpdateDateColumn()
  updated_at!: Date

}
