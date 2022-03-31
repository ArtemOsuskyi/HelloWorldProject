import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { PolymorphicChildInterface } from "typeorm-polymorphic/dist/polymorphic.interface";
import { PolymorphicParent } from "typeorm-polymorphic";
import { Post } from "../post/model";
import { Comment } from "../comment/model";
import { User } from "../user/model";

@Entity({ name: "likes" })
export class Like implements PolymorphicChildInterface {
  @PolymorphicParent(() => [Post, Comment])
  owner: Post | Comment;

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((_type) => User, (user: User) => user.likes)
  liker: User;

  @Column()
  entityId: number;

  @Column()
  entityType: string;
}
