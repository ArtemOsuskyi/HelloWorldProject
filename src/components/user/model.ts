import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Post } from "../post/model";
import { Comment } from "../comment/model";

@Entity({ name: "users" })
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt!: Date;

  @Column()
  name: string;

  @Column()
  username!: string;

  @Column()
  password: string;

  @OneToMany((_type) => Post, (post: Post) => post.author, {
    onUpdate: "CASCADE",
  })
  @JoinColumn()
  posts!: Array<Post>;

  @OneToMany((_type) => Comment, (comment: Comment) => comment.author, {
    onUpdate: "CASCADE",
  })
  @JoinColumn()
  comments!: Array<Comment>;
}
