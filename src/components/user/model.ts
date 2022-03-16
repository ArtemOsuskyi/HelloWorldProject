import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string

    @Column()
    username: string

    @Column()
    password: string

    // @OneToMany( () => Post, post = post.creator, {onUpdate: "CASCADE"})
    // post: Post

}
