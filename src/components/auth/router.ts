import * as express from "express";
import { signin, signout, signup } from "./controller";
import { validateAuthBody, validateUserBody } from "../middleware";

const authRouter = express.Router();

authRouter
  .post("/register", validateUserBody, signup)
  .post("/login", validateAuthBody, signin)
  .post("/logout", signout);

export default authRouter;
