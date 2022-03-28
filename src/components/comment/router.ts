import * as express from "express";
import {
  createComment,
  editComment,
  getComment,
  removeComment,
} from "./controller";
import { validateCommentBody } from "../middleware";

const commentsRouter = express.Router();

commentsRouter
  .get("/:commentid", getComment)
  .post("/create/:postid", validateCommentBody, createComment)
  .patch("/:commentid", validateCommentBody, editComment)
  .delete("/:commentid", removeComment);

export default commentsRouter;
