import { Request, Response } from "express";
import { createPost } from "./service";
import { SessionData } from "express-session";

const getPost = async (req: Request, res: Response) => {
  //TODO: getPosts service
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

const removePost = async (req: Request, res: Response) => {
  //TODO: deletePost service
};

export { getPost, newPost, removePost };
