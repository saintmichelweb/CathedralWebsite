import {
    Entity, Column, PrimaryGeneratedColumn,
    CreateDateColumn,
    ManyToOne,
    UpdateDateColumn
  } from 'typeorm'
  import { ImageEntity } from './ImagesEntity'
  
  @Entity('priests')
  export class PriestsEntity {
    @PrimaryGeneratedColumn()
    id!: number
  
    @Column({
      nullable: false,
      length: 255
    })
    name!: string
  
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
  
    @CreateDateColumn()
    created_at!: Date

    @UpdateDateColumn()
    updated_at!: Date
  
    @ManyToOne(() => ImageEntity, image => image.connectedEvents)
    backgroundImage!: ImageEntity
  
  }
  