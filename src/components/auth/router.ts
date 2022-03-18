import * as express from "express";
import { logout, signin, signup } from "./controller";

const authRouter = express.Router();

authRouter
    .post('/register', signup)
    .post('/login', signin)
    .post('/logout', logout)

export default authRouter
