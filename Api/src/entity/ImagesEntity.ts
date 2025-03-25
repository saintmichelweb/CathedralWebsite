import {
  Entity, Column, PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  OneToMany
} from 'typeorm'
import { RecentEventsEntity } from './RecentEventsEntity'
import { HomePageWelcomeMessageEntity } from './HomePageWelcomeMessageEntity'
import { CommissionEntity } from './CommissionEntity'
import { PriestsEntity } from './PriestsEntity'
import { ServiceEntity } from './ServiceEntity'
import { ParishComitteCouncilEntity } from './ParishComitteCouncilEntity'
import { ChoirEntity } from './ChoirEntity'
import { MpuzaEntity } from './MpuzaEntity'

@Entity('images')
export class ImageEntity {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({
    nullable: false,
    length: 255,
    unique: true
  })
  imageUrl!: string

  @Column({
    nullable: false,
    length: 255,
    unique: true
  })
  filename!: string

  @Column({
    nullable: true,
    length: 255,
    unique: true
  })
  imagePath!: string

  @Column({
    nullable: false,
    default: false
  })
  isBannerImage!: boolean

  @Column({
    nullable: false,
    default: false
  })
  isActive!: boolean

  @Column({
    nullable: true,
    default: ''
  })
  bannerDescription_en!: string

  @Column({
    nullable: true,
    default: ''
  })
  bannerDescription_fr!: string

  @Column({
    nullable: true,
    default: ''
  })
  bannerDescription_rw!: string

  @CreateDateColumn()
  created_at!: Date

  @OneToMany(() => RecentEventsEntity, (recentEvent: RecentEventsEntity) => recentEvent.backgroundImage)
  connectedEvents!: RecentEventsEntity[]

  @OneToMany(() => CommissionEntity, (commission: CommissionEntity) => commission.backgroundImage)
  connectedCommissions!: CommissionEntity[]

  @OneToMany(() => PriestsEntity, (priest: PriestsEntity) => priest.backgroundImage)
  connectedPriests!: PriestsEntity[]

  @OneToMany(() => ServiceEntity, (service: ServiceEntity) => service.backgroundImage)
  connectedServices!: ServiceEntity[]

  @OneToMany(() => ParishComitteCouncilEntity, (parishCommitteeMember: ParishComitteCouncilEntity) => parishCommitteeMember.backgroundImage)
  connectedCommitteeMembers!: ParishComitteCouncilEntity[]

  @OneToMany(() => HomePageWelcomeMessageEntity, (welcomeMessage: HomePageWelcomeMessageEntity) => welcomeMessage.backgroundImage)
  connectedWelcomeMessage!: HomePageWelcomeMessageEntity[]

  @OneToMany(() => ChoirEntity, (choir: ChoirEntity) => choir.backgroundImage)
  connectedChoir!: ChoirEntity[]

  @OneToMany(() => MpuzaEntity, (mpuza: MpuzaEntity) => mpuza.backgroundImage)
  connectedMpuzas!: MpuzaEntity[]

}
