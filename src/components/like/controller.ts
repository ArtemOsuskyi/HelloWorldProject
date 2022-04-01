import { Request, Response } from "express";
import {
  DuplicateLike,
  likeComment,
  likePost,
  NotLiked,
  unsetCommentLike,
  unsetPostLike,
} from "./service";
import { CommentNotFound } from "../comment/service";
import { PostNotFound } from "../post/service";

const setPostLike = async (req: Request, res: Response) => {
  const session = req.session;
  const postId = req.params.postid;
  if (session.authenticated) {
    await likePost(Number(postId), session.userId)
      .then((like) => {
        return res.status(200).json({ like });
      })
      .catch((e) => {
        if (e instanceof PostNotFound)
          return res.status(400).json({ message: e.message });
        if (e instanceof DuplicateLike)
          return res.status(400).json({ message: e.message });
        else {
          console.dir({ e }, { depth: null });
          return res.status(500).json({ message: "Something gone wrong" });
        }
      });
  } else return res.status(401).json({ message: "Unauthorized request" });
};

const removePostLike = async (req: Request, res: Response) => {
  const session = req.session;
  const postId = req.params.postid;
  if (session.authenticated) {
    await unsetPostLike(Number(postId), session.userId)
      .then((like) => {
        return res.status(200).json({ message: "Like removed", like });
      })
      .catch((e) => {
        if (e instanceof PostNotFound)
          return res.status(400).json({ message: e.message });
        else if (e instanceof NotLiked)
          return res.status(400).json({ message: e.message });
        else return res.status(500).json({ message: "Something gone wrong" });
      });
  } else return res.status(401).json({ message: "Unauthorized request" });
};

const setCommentLike = async (req: Request, res: Response) => {
  const session = req.session;
  const commentId = req.params.commentid;
  if (session.authenticated) {
    await likeComment(Number(commentId), session.userId)
      .then((like) => {
        return res.status(200).json({ like });
      })
      .catch((e) => {
        if (e instanceof CommentNotFound)
          return res.status(400).json({ message: e.message });
        if (e instanceof DuplicateLike)
          return res.status(400).json({ message: e.message });
        else {
          console.dir({ e }, { depth: null });
          return res.status(500).json(e.message);
        }
      });
  } else return res.status(401).json({ message: "Unauthorized request" });
};

const removeCommentLike = async (req: Request, res: Response) => {
  const session = req.session;
  const commentId = req.params.postid;
  if (session.authenticated) {
    await unsetCommentLike(Number(commentId), session.userId)
      .then((like) => {
        return res.status(200).json({ like });
      })
      .catch((e) => {
        if (e instanceof CommentNotFound)
          return res.status(400).json({ message: e.message });
        else if (e instanceof NotLiked)
          return res.status(400).json({ message: e.message });
        else return res.status(500).json({ message: "Something gone wrong" });
      });
  } else return res.status(401).json({ message: "Unauthorized request" });
};

export { setPostLike, removePostLike, setCommentLike, removeCommentLike };
