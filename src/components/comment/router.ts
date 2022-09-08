import * as express from "express";
import {
  createComment,
  editComment,
  getPostComments,
  removeComment,
} from "./controller";
import { validateRequest } from "../middleware";
import { createCommentSchema } from "./schema";

const commentsRouter = express.Router();

commentsRouter
  .get("/:postid", getPostComments)
  .post("/create/:postid", validateRequest(createCommentSchema), createComment)
  .patch("/:commentid", validateRequest(createCommentSchema), editComment)
  .delete("/:commentid", removeComment);

export default commentsRouter;
