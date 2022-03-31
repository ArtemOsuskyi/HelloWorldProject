import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Post } from "../post/model";
import { Comment } from "../comment/model";
import { Like } from "../like/model";

@Entity({ name: "users" })
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  username!: string;

  @Column()
  password!: string;

  @OneToMany((_type) => Post, (post: Post) => post.author, {
    nullable: true,
    cascade: true,
  })
  posts: Array<Post>;

  @OneToMany((_type) => Comment, (comment: Comment) => comment.author, {
    nullable: true,
  })
  comments: Array<Comment>;

  @OneToMany((_type) => Like, (like: Like) => like.liker, {
    nullable: true,
  })
  likes: Array<Like>;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;
}
