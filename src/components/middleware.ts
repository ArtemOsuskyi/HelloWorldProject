import { NextFunction, Request, Response } from "express";
import z, { AnyZodObject, object } from "zod";

export const authSchema = z.object({
  body: object({
    username: z.string().nonempty(),
    password: z.string().nonempty(),
  }),
});

const validateRequest =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (e) {
      return res.status(400).json(e.errors);
    }
  };

export { validateRequest };
