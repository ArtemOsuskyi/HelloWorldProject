import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "../user/model";

@Entity({ name: "posts" })
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ name: "created_at", type: "timestamp without time zone" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at", type: "timestamp without time zone" })
  updatedAt: Date;

  @Column()
  title: string;

  @Column({
    type: "text",
  })
  text: string;

  @Column({ name: "user_id" })
  userId: number;
  @ManyToOne((_type) => User, (user: User) => user.posts)
  @JoinColumn({ name: "author_id" })
  author: User;
}
