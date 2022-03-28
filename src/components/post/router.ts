import * as express from "express";
import {
  editPost,
  getAllPosts,
  getPost,
  getUserPosts,
  newPost,
  removePost,
} from "./controller";
import { validatePostBody } from "../middleware";

const postsRouter = express.Router();

postsRouter
  .get("/", getAllPosts)
  .get("/:postid", getPost)
  .get("/user/:userid", getUserPosts)
  .post("/create", validatePostBody, newPost)
  .patch("/edit/:postid", validatePostBody, editPost)
  .delete("/delete/:postid", removePost);

export default postsRouter;
