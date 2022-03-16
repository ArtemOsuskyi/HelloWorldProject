import * as express from 'express'
import {signin, signup} from "./controller";

const authRouter = express.Router()

authRouter
    .post('/register', signup)
    .post('/login', signin)

export default authRouter
