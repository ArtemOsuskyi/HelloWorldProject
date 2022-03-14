import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import {Post} from "../post/model";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    login: string

    @Column()
    name: string

    @Column()
    password: string

    // @OneToMany( () => Post, post = post.creator, {onUpdate: "CASCADE"})
    // post: Post

}
