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
       type: 'longtext'
    })
    name!: string

    @Column({
      nullable: false,
       type: 'longtext'
    })
    title!: string
  
    @Column({
      nullable: true,
       type: 'longtext',
    })
    description_en!: string
  
    @Column({
      nullable: true,
       type: 'longtext',
    })
    description_fr!: string
  
    @Column({
      nullable: true,
       type: 'longtext',
    })
    description_rw!: string
  
    @CreateDateColumn()
    created_at!: Date

    @UpdateDateColumn()
    updated_at!: Date
  
    @ManyToOne(() => ImageEntity, image => image.connectedPriests)
    backgroundImage!: ImageEntity
  
  }
  