import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";
import {User} from "../user/model";

@Entity()
export class Like {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    user: User

    //TODO: more columns

}
