import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("home_page")
export class HomePageWelcomeMessageEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: false, length: 255 })
  welcomeMessage!: string;

  @Column({
    nullable: false,
    // length: 255
    default: false,
  })
  isActive!: boolean;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}
