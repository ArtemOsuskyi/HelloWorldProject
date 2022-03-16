import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "../user/model";

@Entity()
export class Post {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "timestamp without time zone"})
    created: Date

    @Column({name: "last_edited", type: "timestamp without time zone"})
    lastEdited: Date

    @Column()
    title: string

    @Column()
    text: string

    @ManyToOne( () => User)
    @JoinColumn({name: "creator_id"})
    creator: User
}
