import * as express from "express";
import {
  getAllPosts,
  getPost,
  getUserPosts,
  newPost,
  removePost,
} from "./controller";

const postsRouter = express.Router();

postsRouter
  .get("/", getAllPosts)
  .get("/:postid", getPost)
  .get("/user/:userid", getUserPosts)
  .post("/create", newPost)
  // .patch("/edit/:id", )
  .delete("/delete/:postid", removePost);

export default postsRouter;
