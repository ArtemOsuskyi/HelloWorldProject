import z, { object } from "zod";

export const createPostSchema = z.object({
  body: object({
    title: z.string().min(3).max(200, { message: "Title is too long" }),
    text: z.string().min(3).max(2000, { message: "Text is too long" }),
  }),
});
