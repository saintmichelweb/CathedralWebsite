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
       type: 'longtext',
    })
    names!: string
  
    @Column({
      nullable: true,
       type: 'longtext',
    })
    position_en!: string
  
    @Column({
      nullable: true,
       type: 'longtext',
    })
    position_fr!: string
  
    @Column({
      nullable: true,
       type: 'longtext',
    })
    position_rw!: string

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

    @ManyToOne(() => ImageEntity, (image: ImageEntity) => image.connectedCommitteeMembers)
    backgroundImage!: ImageEntity
  
  }
  