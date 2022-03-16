import {getRepository} from "typeorm";
import z from 'zod'
import * as bcrypt from 'bcrypt'
import {User} from "../user/model";

const phonePattern: RegExp = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/
const passPattern: RegExp = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/
const userSchema = z.object({
    name: z.string()
        .min(2, {message: "Name is too short"})
        .max(50, {message: "Name is too long"}),
    username: z.string().email() || z.string().regex(phonePattern, {message: "Username must be email or phone number"}),
    password: z.string()
        .min(6)
        .max(100)
        .regex(passPattern, {message: "Password must contain at least 5 characters in both cases and at least 1 number"})
})

const register = async(name: string, username: string, password: string) => {
    const userRepository = getRepository(User)

    const takenLogin = await userRepository.findOne( {username} )
    if(takenLogin) throw new idTaken("This login is already taken")

    const hashedPassword = await bcrypt.hash(password, 12)

    const user = userSchema.parse({
        name: name,
        username: username,
        password: hashedPassword
    })

    await userRepository.save(user)
}

const login = async (username: string, password: string) => {
    const userRepository = getRepository(User)

    const findUser = await userRepository.findOne( {username})
    if(!findUser) throw new loginOrPasswordInvalid("Username or password are invalid")

    const userPassword = findUser.password
    if(!bcrypt.compareSync(password, userPassword)) throw new loginOrPasswordInvalid("Username or password are invalid")

    return userSchema.parse({
        username: username,
        password: password
    })
}

export { register, login }

export class idTaken extends Error{
    constructor(message) {
        super(message);
        this.name = "IdTakenError"
    }
}

export class loginOrPasswordInvalid extends Error {
    constructor(message) {
        super(message);
        this.name = "LoginPasswordInvalidationError"
    }
}