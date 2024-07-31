import {
    Entity, Column, PrimaryGeneratedColumn,
    CreateDateColumn,
    ManyToOne
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
    description!: string
  
    // @Column({ nullable: true })
    // event_date!: Date;
  
    // @Column({
    //   nullable: false,
    //   default: false,
    // })
    // isActive!: boolean;
  
    @CreateDateColumn()
    created_at!: Date
  
    @ManyToOne(() => ImageEntity, image => image.connectedEvents)
    backgroundImage!: ImageEntity
  
  }
  