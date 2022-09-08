import * as express from "express";
import {
  editPost,
  getAllPosts,
  getPost,
  getUserPosts,
  newPost,
  removePost,
} from "./controller";
import { validateRequest } from "../middleware";
import { createPostSchema } from "./schema";

const postsRouter = express.Router();

postsRouter
  .get("/", getAllPosts)
  .get("/:postid", getPost)
  .get("/user/:userid", getUserPosts)
  .post("/create", validateRequest(createPostSchema), newPost)
  .patch("/edit/:postid", validateRequest(createPostSchema), editPost)
  .delete("/delete/:postid", removePost);

export default postsRouter;
