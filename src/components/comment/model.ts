import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
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

  @Column({ name: "user_id", nullable: true })
  @ManyToOne(() => User, (user: User) => user.comments)
  @JoinColumn()
  author: User;

  @ManyToOne(() => Post, (post: Post) => post.comments)
  @JoinColumn({ name: "reply_post" })
  reply_post: Post;
}
