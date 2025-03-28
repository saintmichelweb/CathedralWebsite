import {
    Entity, Column, PrimaryGeneratedColumn,
    CreateDateColumn,
    ManyToOne,
    UpdateDateColumn
  } from 'typeorm'
  import { ImageEntity } from './ImagesEntity'
  
  @Entity('commission')
  export class CommissionEntity {
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

    // @Column({
    //   nullable: false,
    //   length: 255
    // })
    // title!: string
  
    @Column({
      nullable: true,
      type: "longtext",
    })
    description_en!: string
  
    @Column({
      nullable: true,
      type: "longtext",
    })
    description_fr!: string
  
    @Column({
      nullable: true,
      type: "longtext",
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
    contact_person_role!: string

    @Column({
      nullable: true,
      length: 255,
    })
    contact_person_email!: string

    @Column({
      nullable: true,
      length: 255,
    })
    contact_person_phone_number!: string
  
    @CreateDateColumn()
    created_at!: Date

    @UpdateDateColumn()
    updated_at!: Date
  
    @ManyToOne(() => ImageEntity, image => image.connectedCommissions)
    backgroundImage!: ImageEntity
  
  }
  