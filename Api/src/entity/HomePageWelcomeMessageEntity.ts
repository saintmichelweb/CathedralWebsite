import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from "typeorm";
import { ImageEntity } from "./ImagesEntity";

@Entity("welcome_message")
export class HomePageWelcomeMessageEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: false, length: 255 })
  welcomeMessage_en!: string;

  @Column({ nullable: false, length: 255 })
  welcomeMessage_fr!: string;

  @Column({ nullable: false, length: 255 })
  welcomeMessage_rw!: string;

  // @Column({
  //   nullable: false,
  //   // length: 255
  //   default: false,
  // })
  // isActive!: boolean;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @ManyToOne(() => ImageEntity, image => image.connectedWelcomeMessage)
  backgroundImage!: ImageEntity
}
