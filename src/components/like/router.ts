import * as express from "express";
import {
  removeCommentLike,
  removePostLike,
  setCommentLike,
  setPostLike,
} from "./controller";

const likesRouter = express.Router();

likesRouter
  .post("/post/:postid", setPostLike)
  .delete("/remove/post/:postid", removePostLike)
  .post("/comment/:commentid", setCommentLike)
  .delete("/remove/comment/:commentid", removeCommentLike);

export default likesRouter;
