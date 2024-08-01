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
      nullable: false,
      length: 4096
    })
    history_en!: string
  
    @Column({
      nullable: false,
      length: 4096
    })
    history_fr!: string
  
    @Column({
      nullable: false,
      length: 4096
    })
    history_rw!: string
  
    @CreateDateColumn()
    created_at!: Date
  
    @UpdateDateColumn()
    updated_at!: Date
  
  }
  