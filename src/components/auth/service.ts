import {getRepository} from "typeorm";
import {User} from "../user/model";

const register = async(name: string, login: string, password: string) => {
    const userRepository = getRepository(User)

    //TODO: proper register with validations, hashing and stuff
    const user = new User()
    user.login = login
    user.name = name
    user.password = password

    await userRepository.save(user)

}

export { register }