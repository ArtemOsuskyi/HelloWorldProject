import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";
import {User} from "../user/model";
import {Post} from "../post/model";

@Entity()
export class Comment {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    text: string

    @Column()
    author: User

    @Column({name:"reply_post"})
    reply_post: Post

}
