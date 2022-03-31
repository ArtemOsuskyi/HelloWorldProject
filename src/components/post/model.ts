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
import { Comment } from "../comment/model";
import { PolymorphicChildren } from "typeorm-polymorphic";
import { Like } from "../like/model";

@Entity({ name: "posts" })
export class Post {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column({
    type: "text",
  })
  text!: string;

  @ManyToOne((_type) => User, (user: User) => user.posts)
  @JoinColumn({ name: "author_id" })
  author!: User;

  @OneToMany((_type) => Comment, (comment: Comment) => comment.reply_post, {
    cascade: true,
    nullable: true,
  })
  comments?: Array<Comment>;

  @PolymorphicChildren(() => Like)
  adverts: Like;

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
