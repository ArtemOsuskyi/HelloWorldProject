import { NextFunction, Request, Response } from "express";
import z from "zod";

const postSchema = z.object({
  title: z.string().min(3).max(200, { message: "Title is too long" }),
  text: z.string().min(3).max(2000, { message: "Text is too long" }),
});

export const validateBody = async (
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
