import {
    Entity, Column, PrimaryGeneratedColumn,
    CreateDateColumn,
    ManyToOne,
    OneToMany,
    UpdateDateColumn
} from 'typeorm'
import { ImageEntity } from './ImagesEntity'
import { MuryangoremezoEntity } from './MuryangoremezoEntity'
import { CommunityEntity } from './CommunityEntity'

@Entity('mpuza')
export class MpuzaEntity {
    @PrimaryGeneratedColumn()
    id!: number

    @Column({
        nullable: false,
        length: 255
    })
    title!: string

    @Column({
        nullable: false,
        length: 255
    })
    leader!: string

    @Column({
        nullable: false,
        length: 255
    })
    phone!: string

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

    @ManyToOne(() => ImageEntity, (image: ImageEntity) => image.connectedMpuzas)
    backgroundImage!: ImageEntity

    @ManyToOne(() => CommunityEntity, (image: CommunityEntity) => image.mpuzas)
    community!: CommunityEntity
    
    @OneToMany(() => MuryangoremezoEntity, (muryangoremezo: MuryangoremezoEntity) => muryangoremezo.mpuza)
    connectedMiryangoremezo!: MuryangoremezoEntity[]

}
