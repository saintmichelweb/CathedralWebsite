import {
    Entity, Column, PrimaryGeneratedColumn,
    CreateDateColumn,
    OneToMany,
    ManyToOne,
    UpdateDateColumn
  } from 'typeorm'
import { LocationEntity } from './LocationEntity'
  
  @Entity('office_hours')
  export class OfficeHoursEntity {
    @PrimaryGeneratedColumn()
    id!: number
  
    // @Column({
    //   nullable: true,
    //   length: 255,
    // })
    // office_place!: string
  
    @Column({
      nullable: true,
      length: 255,
    })
    day_en!: string
  
    @Column({
      nullable: true,
      length: 255,
    })
    day_fr!: string
  
    @Column({
      nullable: true,
      length: 255,
    })
    day_rw!: string
  
    @Column({
      nullable: false,
      length: 255
    })
    time!: string
  
    @Column({
      nullable: false,
      // length: 255
      default: false
    })
    isActive!: boolean
  
    @CreateDateColumn()
    created_at!: Date

    @UpdateDateColumn()
    updated_at!: Date
  
    @ManyToOne(() => LocationEntity, location => location.officeTimes)
    office_place!: LocationEntity
  
    // @ManyToOne(() => LanguageEntity, language => language.languageMassTimes)
    // language!: LanguageEntity
  
  }
  