import {
    Entity, Column, PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne
  } from 'typeorm'
import { ImageEntity } from './ImagesEntity'
  
  @Entity('parish_committe_council')
  export class ParishComitteCouncilEntity {
    @PrimaryGeneratedColumn()
    id!: number
  
    @Column({
      nullable: true,
      length: 255,
    })
    names!: string
  
    @Column({
      nullable: true,
      length: 255,
    })
    position_en!: string
  
    @Column({
      nullable: true,
      length: 255,
    })
    position_fr!: string
  
    @Column({
      nullable: true,
      length: 255,
    })
    position_rw!: string

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
      length: 255
    })
    telephone!: string
  
    @Column({
      nullable: false,
      length: 255
    })
    email!: string
  
    @CreateDateColumn()
    created_at!: Date

    @UpdateDateColumn()
    updated_at!: Date

    @ManyToOne(() => ImageEntity, image => image.connectedCommitteeMembers)
    backgroundImage!: ImageEntity
  
  }
  