import {
  Entity, Column, PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany
} from 'typeorm'
import { LocationEntity } from './LocationEntity'
import { LanguageEntity } from './languageEntity'

@Entity('mass_times')
export class MassTimesEntity {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({
    nullable: true,
    length: 255,
  })
  day!: string

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

  @OneToMany(() => LocationEntity, location => location.locationMassTimes)
  location!: LocationEntity

  @OneToMany(() => LanguageEntity, language => language.languageMassTimes)
  language!: LanguageEntity

}
