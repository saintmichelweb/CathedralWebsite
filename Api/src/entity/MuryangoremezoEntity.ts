import {
    Entity, Column, PrimaryGeneratedColumn,
    CreateDateColumn,
    ManyToOne,
    UpdateDateColumn
  } from 'typeorm'
import { MpuzaEntity } from './MpuzaEntity'
  
  @Entity('muryangoremezo')
  export class MuryangoremezoEntity {
    @PrimaryGeneratedColumn()
    id!: number
  
    @Column({
      nullable: false,
      length: 255
    })
    title!: string
  
    @Column({
      nullable: false,
      length: 255
    })
    header!: string
  
    @Column({
      nullable: false,
      length: 255
    })
    phone!: string

    @CreateDateColumn()
    created_at!: Date

    @UpdateDateColumn()
    updated_at!: Date
  
    @ManyToOne(() => MpuzaEntity, (mpuza: MpuzaEntity) => mpuza.connectedMiryangoremezo)
    mpuza!: MpuzaEntity
  
  }
  