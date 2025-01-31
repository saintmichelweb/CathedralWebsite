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

  @Column({ type: "longtext", nullable: false })
  welcomeMessage_en!: string;

  @Column({ type: "longtext", nullable: false })
  welcomeMessage_fr!: string;

  @Column({ type: "longtext", nullable: false })
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
