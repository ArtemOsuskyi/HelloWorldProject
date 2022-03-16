import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "../user/model";
import {Post} from "../post/model";

@Entity()
export class Comment {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    text: string

    @ManyToOne( () => User)
    @JoinColumn()
    author: User

    @ManyToOne( () => Post)
    @JoinColumn({name:"reply_post"})
    reply_post: Post

}
