import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Post } from "../post/model";
import { Comment } from "../comment/model";
import { User } from "../user/model";

@Entity({ name: "likes" })
export class Like {
  @PrimaryGeneratedColumn({ name: "like_id" })
  likeId!: number;

  @ManyToOne((_type) => Post, (post: Post) => post.likes, {
    onDelete: "CASCADE",
  })
  @JoinColumn()
  post: Post;

  @ManyToOne((_type) => Comment, (comment: Comment) => comment.likes, {
    onDelete: "CASCADE",
  })
  @JoinColumn()
  comment: Comment;

  @ManyToOne((_type) => User, (user: User) => user.likes, {
    onDelete: "CASCADE",
  })
  @JoinColumn()
  liker!: User;

  @Column()
  entityId: number;

  @Column()
  entityType: string;
}
