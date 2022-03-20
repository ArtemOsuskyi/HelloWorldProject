import * as express from "express";
import { signin, signout, signup } from "./controller";

const authRouter = express.Router();

authRouter
  .post("/register", signup)
  .post("/login", signin)
  .post("/logout", signout);

export default authRouter;
