import z, { object } from "zod";

export const createCommentSchema = z.object({
  body: object({
    text: z.string().min(1).max(300, { message: "Comment is too long" }),
  }),
});
