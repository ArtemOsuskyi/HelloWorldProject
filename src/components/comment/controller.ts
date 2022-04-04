import { Request, Response } from "express";
import { SessionData } from "express-session";
import {
  changeComment,
  CommentNotFound,
  deleteComment,
  findComment,
  newComment,
  NotOwnComment,
  showPostComments,
} from "./service";
import { findPost } from "../post/service";

const getPostComments = async (req: Request, res: Response) => {
  const session: SessionData = req.session;
  const id = parseInt(req.params.postid);
  const skip = parseInt(req.query.skip as string) || 0;
  const offset = parseInt(req.query.offset as string) || 30;
  if (session.authenticated) {
    await showPostComments(id, skip, offset).then(async (comments) => {
      return res.status(200).json({ comments });
    });
  } else return res.status(401).json({ message: "Unauthorized request" });
};

const createComment = async (req: Request, res: Response) => {
  const session: SessionData = req.session;
  const id = req.params.postid;
  const { text } = req.body;
  if (session.authenticated) {
    await findPost(Number(id))
      .then(async (post) => {
        await newComment(post.postId, text, session.userId).then((comment) => {
          return res.status(200).json({ message: "Comment posted", comment });
        });
      })
      .catch((e) => {
        if (e instanceof CommentNotFound)
          return res.status(400).json({ message: e.message });
        else return res.status(500).json({ message: e.message });
      });
  } else return res.status(401).json({ message: "Unauthorized request" });
};

const editComment = async (req: Request, res: Response) => {
  const session: SessionData = req.session;
  const id = req.params.commentid;
  const text = req.body;
  if (session.authenticated) {
    await findComment(Number(id))
      .then(async (comment) => {
        if (comment.author.userId === session.userId) {
          await changeComment(comment.commentId, text).then((comment) => {
            return res.status(200).json({ comment });
          });
        } else throw new NotOwnComment("Can't edit not your comment");
      })
      .catch((e) => {
        if (e instanceof CommentNotFound)
          return res.status(400).json({ message: e.message });
        else if (e instanceof NotOwnComment)
          return res.status(400).json({ message: e.message });
        else return res.status(500).json({ message: e.message });
      });
  } else return res.status(401).json({ message: "Unauthorized request" });
};

const removeComment = async (req: Request, res: Response) => {
  const session: SessionData = req.session;
  const id = req.params.commentid;
  if (session.authenticated) {
    await findComment(Number(id))
      .then(async (comment) => {
        if (comment.author.userId === session.userId) {
          const removedComment = comment;
          await deleteComment(comment.commentId).then(() => {
            return res.status(200).json({ removedComment });
          });
        } else throw new NotOwnComment("Can't edit not your comment");
      })
      .catch((e) => {
        if (e instanceof CommentNotFound)
          return res.status(400).json({ message: e.message });
        else if (e instanceof NotOwnComment)
          return res.status(400).json({ message: e.message });
        else return res.status(500).json({ message: e.message });
      });
  } else return res.status(401).json({ message: "Unauthorized request" });
};

export { getPostComments, createComment, editComment, removeComment };
