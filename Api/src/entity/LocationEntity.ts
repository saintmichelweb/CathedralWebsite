import {
    Entity, Column, PrimaryGeneratedColumn,
    CreateDateColumn,
    ManyToOne,
    OneToMany
  } from 'typeorm'
import { MassTimesEntity } from './MasstimesEntity'
import { OfficeHoursEntity } from './OfficeHoursEntity'
  
  @Entity('locations')
  export class LocationEntity {
    @PrimaryGeneratedColumn()
    id!: number
  
    @Column({
      nullable: false,
      length: 255,
      unique: true
    })
    location!: string
  
    @Column({
      nullable: false,
      default: false
    })
    isActive!: boolean

    @Column({
      nullable: false,
      default: false
    })
    isMassLocation!: boolean
    
    @CreateDateColumn()
    created_at!: Date
    
    @CreateDateColumn()
    updated_at!: Date

    @OneToMany(() => MassTimesEntity, (massTime: MassTimesEntity) => massTime.location)
    locationMassTimes!: MassTimesEntity[]

    @OneToMany(() => OfficeHoursEntity, (officeTime: OfficeHoursEntity) => officeTime.office_place)
    officeTimes!: OfficeHoursEntity[]
  
  }
  