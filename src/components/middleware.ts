import { NextFunction, Request, Response } from "express";
import z from "zod";

const postSchema = z.object({
  title: z.string().min(3).max(200, { message: "Title is too long" }),
  text: z.string().min(3).max(2000, { message: "Text is too long" }),
});

const commentSchema = z.object({
  text: z.string().min(1).max(300, { message: "Comment is too long" }),
});

const validatePostBody = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { title, text } = req.body;
  try {
    postSchema.parse({
      title,
      text,
    });
    next();
  } catch (e) {
    return res.status(400).json({ message: e.errors });
  }
};

const validateCommentBody = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const text = req.body;
  try {
    commentSchema.parse(text);
    next();
  } catch (e) {
    return res.status(400).json({ message: e.errors });
  }
};

export { validatePostBody, validateCommentBody };
