import * as express from "express";
import { signin, signout, signup } from "./controller";
import { authSchema, validateRequest } from "../middleware";
import { createUserSchema } from "../user/schema";

const authRouter = express.Router();

authRouter
  .post("/register", validateRequest(createUserSchema), signup)
  .post("/login", validateRequest(authSchema), signin)
  .post("/logout", signout);

export default authRouter;
