import * as express from "express";
import { getPost, newPost, removePost } from "./controller";

const postsRouter = express.Router();

postsRouter
  .get("/:id", getPost)
  .post("/create", newPost)
  // .patch("/edit/:id", )
  .delete("/delete/:id", removePost);

export default postsRouter;
