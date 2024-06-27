import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm'

@Entity('currencies')
export class CurrencyEntity {
  @PrimaryColumn({ length: 3 })
    iso_code!: string

  @Column({ nullable: false, length: 255 })
    description!: string

}
