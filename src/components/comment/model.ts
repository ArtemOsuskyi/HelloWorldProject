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
import { Post } from "../post/model";

@Entity({ name: "comments" })
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "text",
  })
  text!: string;

  @ManyToOne(() => User, (user: User) => user.comments)
  @JoinColumn({ name: "author_id" })
  author!: User;

  @ManyToOne(() => Post, (post: Post) => post.comments)
  @JoinColumn({ name: "reply_post" })
  reply_post!: Post;

  @CreateDateColumn({
    name: "created_at",
    type: "timestamp without time zone",
  })
  createdAt?: Date;

  @UpdateDateColumn({
    name: "updated_at",
    type: "timestamp without time zone",
  })
  updatedAt?: Date;
}
