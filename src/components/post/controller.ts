import { Request, Response } from "express";
import {
  changePost,
  createPost,
  deletePost,
  findPost,
  NotOwnPost,
  PostNotFound,
  shortenPosts,
  showAllPosts,
  showPost,
  showUserPosts,
} from "./service";
import { SessionData } from "express-session";

const getPost = async (req: Request, res: Response) => {
  const session: SessionData = req.session;
  const id = req.params.postid;
  if (session.authenticated) {
    await showPost(Number(id)).then((post) => {
      return res.status(200).json({ post });
    });
  } else return res.status(401).json({ message: "Unauthorized request" });
};

const getAllPosts = async (req: Request, res: Response) => {
  const session: SessionData = req.session;
  if (session.authenticated) {
    await showAllPosts().then((posts) => {
      const result = shortenPosts(posts);
      return res.status(200).json({ result });
    });
  } else return res.status(401).json({ message: "Unauthorized request" });
};

const getUserPosts = async (req: Request, res: Response) => {
  const session: SessionData = req.session;
  const id = req.params.userid;
  if (session.authenticated) {
    await showUserPosts(Number(id)).then(async (posts) => {
      const result = await shortenPosts(posts);
      return res.status(200).json({ result });
    });
  } else return res.status(401).json({ message: "Unauthorized request" });
};

const newPost = async (req: Request, res: Response) => {
  const session: SessionData = req.session;
  const { title, text } = req.body;
  if (session.authenticated) {
    await createPost(title, text, session.userId)
      .then((post) => {
        return res.status(200).json({ post });
      })
      .catch((error) => {
        if (error) return res.status(500).json({ message: error });
      });
  } else return res.status(401).json({ message: "Unauthorized request" });
};

const editPost = async (req: Request, res: Response) => {
  const session: SessionData = req.session;
  const id = req.params.postid;
  const { title, text } = req.body;
  if (session.authenticated) {
    await findPost(Number(id))
      .then(async (post) => {
        if (post.author.id === session.userId) {
          await changePost(Number(id), title, text).then((post) => {
            return res.status(200).json({ post });
          });
        } else throw new NotOwnPost("Can't delete not your post");
      })
      .catch((e) => {
        if (e instanceof PostNotFound)
          return res.status(400).json({ message: e.message });
        else if (e instanceof NotOwnPost)
          return res.status(400).json({ message: e.message });
        else return res.status(500).json({ message: "Something went wrong" });
      });
  } else return res.status(401).json({ message: "Unauthorized request" });
};

const removePost = async (req: Request, res: Response) => {
  const session: SessionData = req.session;
  const postid = req.params.postid;
  if (session.authenticated) {
    await findPost(Number(postid))
      .then(async (post) => {
        if (post.author.id === session.userId) {
          const removedPost = post;
          await deletePost(Number(postid)).then(() => {
            return res
              .status(200)
              .json({ message: "Post have been deleted", removedPost });
          });
        } else throw new NotOwnPost("Can't delete not your post");
      })
      .catch((e) => {
        if (e instanceof PostNotFound)
          return res.status(400).json({ message: e.message });
        else if (e instanceof NotOwnPost)
          return res.status(400).json({ message: e.message });
        else return res.status(500).json({ message: "Something went wrong" });
      });
  } else return res.status(401).json({ message: "Unauthorized request" });
};

export { getPost, getUserPosts, getAllPosts, newPost, editPost, removePost };
