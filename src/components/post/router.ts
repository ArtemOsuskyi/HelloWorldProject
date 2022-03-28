import * as express from "express";
import {
  editPost,
  getAllPosts,
  getPost,
  getUserPosts,
  newPost,
  removePost,
} from "./controller";
import { validateBody } from "./middleware";

const postsRouter = express.Router();

postsRouter
  .get("/", getAllPosts)
  .get("/:postid", getPost)
  .get("/user/:userid", getUserPosts)
  .post("/create", validateBody, newPost)
  .patch("/edit/:postid", validateBody, editPost)
  .delete("/delete/:postid", removePost);

export default postsRouter;
