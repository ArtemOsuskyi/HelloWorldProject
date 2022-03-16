//TODO: realize services
import {Request, Response} from "express";
import {login, register} from "./service";


const signup = async (req: Request, res: Response) => {
    const {name, username, password} = req.body

    await register (name, username, password)
        //TODO: fix issue where Redis stores only one session, otherwise move session storage to main DB
        .then( () => {
            req.session['key'] = username
            const sessionMessage = req.session['key']
            console.log(sessionMessage)
            return res.status(200).json({message: "Signup successful"})
        })
        .catch()
}

const signin = async (req: Request, res: Response) => {
    const {login: username, password} = req.body

    await login(username, password)

    return res.status(200).json({message: "Login successful. Welcome!"})
    //TODO: complete login controller, append session to logged user
}

export { signup, signin }