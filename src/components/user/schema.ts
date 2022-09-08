import z from "zod";

const phonePattern: RegExp =
  /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
const passPattern: RegExp = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/;

export const createUserSchema = z.object({
  body: z.object({
    name: z
      .string()
      .nonempty()
      .min(2, { message: "Name is too short" })
      .max(50, { message: "Name is too long" }),
    username: z.union([
      z.string().email(),
      z.string().regex(phonePattern, {
        message: "Username must be either an email or a phone number",
      }),
    ]),
    password: z.string().min(6).max(100).regex(passPattern, {
      message:
        "Password must contain at least 5 characters in both cases and at least 1 number",
    }),
  }),
});
