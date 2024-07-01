import {
  Entity, Column, PrimaryGeneratedColumn,
  CreateDateColumn
} from 'typeorm'
import { EncryptionTransformer } from 'typeorm-encrypted'
import { EncryptionTransformerObject } from '../types/encryptionObject';

@Entity('otps')
export class OPTEntity {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({
    nullable: false,
    length: 255
  })
  email!: string

  @Column({
    nullable: true,
    length: 255,
    transformer: new EncryptionTransformer(EncryptionTransformerObject)
  })
  otp!: string

  @CreateDateColumn()
  issued_at!: Date

  @Column('datetime')
  expires_at!: Date

}
