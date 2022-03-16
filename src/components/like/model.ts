import {Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "../user/model";

@Entity()
export class Like {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne( () => User)
    @JoinColumn()
    user: User

    //TODO: more columns

}
