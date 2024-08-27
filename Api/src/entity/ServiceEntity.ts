import {
    Entity, Column, PrimaryGeneratedColumn,
    CreateDateColumn,
    ManyToOne,
    UpdateDateColumn
  } from 'typeorm'
  import { ImageEntity } from './ImagesEntity'
  
  @Entity('services')
  export class ServiceEntity {
    @PrimaryGeneratedColumn()
    id!: number
  
    @Column({
      nullable: false,
      length: 255
    })
    name_en!: string
  
    @Column({
      nullable: false,
      length: 255
    })
    name_fr!: string
  
    @Column({
      nullable: false,
      length: 255
    })
    name_rw!: string
  
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
      nullable: true,
      length: 255,
    })
    contact_person_name!: string

    @Column({
      nullable: true,
      length: 255,
    })
    contact_person_phone_number!: string

    @Column({
      nullable: true,
      length: 255,
    })
    work_hours!: string

    @Column({
      nullable: true,
      length: 255,
    })
    work_days!: string
  
    @CreateDateColumn()
    created_at!: Date

    @UpdateDateColumn()
    updated_at!: Date
  
    @ManyToOne(() => ImageEntity, image => image.connectedServices)
    backgroundImage!: ImageEntity
  
  }
  