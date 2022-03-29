import { NextFunction, Request, Response } from "express";
import z from "zod";

const phonePattern: RegExp =
  /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
const passPattern: RegExp = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/;

const postSchema = z.object({
  title: z.string().min(3).max(200, { message: "Title is too long" }),
  text: z.string().min(3).max(2000, { message: "Text is too long" }),
});

const commentSchema = z.object({
  text: z.string().min(1).max(300, { message: "Comment is too long" }),
});

const userSchema = z.object({
  name: z
    .string()
    .nonempty()
    .min(2, { message: "Name is too short" })
    .max(50, { message: "Name is too long" }),
  username:
    z.string().email() ??
    z.string().regex(phonePattern, {
      message: "Username must be either an email or a phone number",
    }),
  password: z.string().min(6).max(100).regex(passPattern, {
    message:
      "Password must contain at least 5 characters in both cases and at least 1 number",
  }),
});

const authSchema = z.object({
  username: z.string().nonempty(),
  password: z.string().nonempty(),
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

const validateUserBody = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, username, password } = req.body;
  try {
    userSchema.parse({ name, username, password });
    next();
  } catch (e) {
    return res.status(400).json({ message: e.errors });
  }
};

const validateAuthBody = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, password } = req.body;
  try {
    authSchema.parse({ username, password });
    next();
  } catch (e) {
    return res.status(400).json({ message: e.errors });
  }
};

export {
  validatePostBody,
  validateCommentBody,
  validateUserBody,
  validateAuthBody,
};
