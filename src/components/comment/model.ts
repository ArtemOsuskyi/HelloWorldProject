import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "../user/model";
import { Post } from "../post/model";
import { Like } from "../like/model";

@Entity({ name: "comments" })
export class Comment {
  @PrimaryGeneratedColumn({ name: "comment_id" })
  commentId!: number;

  @Column({
    type: "text",
  })
  text!: string;

  @ManyToOne(() => User, (user: User) => user.comments, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "author_id" })
  author!: User;

  @ManyToOne(() => Post, (post: Post) => post.comments, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "reply_post" })
  reply_post!: Post;

  @OneToMany(() => Like, (like: Like) => like.comment, {
    cascade: true,
    nullable: true,
  })
  likes: Array<Like>;

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
