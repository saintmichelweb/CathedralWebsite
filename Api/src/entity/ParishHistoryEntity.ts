import {
  Entity, Column, PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm'

@Entity('parish_history')
export class ParishHistoryEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    type: 'longtext',
    nullable: true,
  })
  history_en!: string;

  @Column({
    type: 'longtext',
    nullable: true,
  })
  history_fr!: string;

  @Column({
    type: 'longtext',
    nullable: true,
  })
  history_rw!: string;

  @Column({
    type: 'longtext',
    nullable: true,
  })
  mission_en!: string;

  @Column({
    type: 'longtext',
    nullable: true,
  })
  mission_fr!: string;

  @Column({
    type: 'longtext',
    nullable: true,
  })
  mission_rw!: string;

  @Column({
    type: 'longtext',
    nullable: true,
  })
  vision_en!: string;

  @Column({
    type: 'longtext',
    nullable: true,
  })
  vision_fr!: string;

  @Column({
    type: 'longtext',
    nullable: true,
  })
  vision_rw!: string;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}
