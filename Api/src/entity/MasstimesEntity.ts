import {
  Entity, Column, PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne
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

  @ManyToOne(() => LocationEntity, location => location.locationMassTimes)
  location!: LocationEntity

  @ManyToOne(() => LanguageEntity, language => language.languageMassTimes)
  language!: LanguageEntity

}
