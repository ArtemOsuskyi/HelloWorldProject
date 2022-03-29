import * as express from "express";
import {
  createComment,
  editComment,
  getPostComments,
  removeComment,
} from "./controller";
import { validateCommentBody } from "../middleware";

const commentsRouter = express.Router();

commentsRouter
  .get("/:postid", getPostComments)
  .post("/create/:postid", validateCommentBody, createComment)
  .patch("/:commentid", validateCommentBody, editComment)
  .delete("/:commentid", removeComment);

export default commentsRouter;
