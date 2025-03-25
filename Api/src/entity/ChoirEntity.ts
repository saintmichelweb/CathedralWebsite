import {
    Entity, Column, PrimaryGeneratedColumn,
    CreateDateColumn,
    ManyToOne,
    UpdateDateColumn
  } from 'typeorm'
  import { ImageEntity } from './ImagesEntity'
  
  @Entity('choirs')
  export class ChoirEntity {
    @PrimaryGeneratedColumn()
    id!: number
  
    @Column({
      nullable: false,
       type: 'longtext'
    })
    name!: string
  
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

    @Column({
      nullable: false,
       type: 'longtext'
    })
    leader!: string

    @Column({
      nullable: false,
       type: 'longtext'
    })
    telephone!: string
    
    @Column({
      nullable: false,
      default: false
    })
    isActive!: boolean
  
    @CreateDateColumn()
    created_at!: Date

    @UpdateDateColumn()
    updated_at!: Date
  
    @ManyToOne(() => ImageEntity, (image: ImageEntity) => image.connectedChoir)
    backgroundImage!: ImageEntity
  
  }
  