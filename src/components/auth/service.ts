import { getRepository } from "typeorm";
import z from "zod";
import * as bcrypt from "bcrypt";
import { User } from "../user/model";
import { createClient } from "redis";
import { Session } from "express-session";

const phonePattern: RegExp =
  /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
const passPattern: RegExp = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/;
const userSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name is too short" })
    .max(50, { message: "Name is too long" })
    .optional(),
  username:
    z.string().email() ??
    z.string().regex(phonePattern, {
      message: "Username must be email or phone number",
    }),
  password: z.string().min(6).max(100).regex(passPattern, {
    message:
      "Password must contain at least 5 characters in both cases and at least 1 number",
  }),
});
const redisClient = createClient({
  host: "localhost",
  port: 6379,
});

const register = async (name: string, username: string, password: string) => {
  const userRepository = getRepository(User);
  const user = new User();
  user.name = name;
  user.username = username;

  const takenLogin = await userRepository.findOne({ username });
  if (takenLogin) throw new idTaken("This login is already taken");

  user.password = await bcrypt.hash(password, 12);

  const userCheck = userSchema.parse({
    name: user.name,
    username: user.username,
    password: user.password,
  });

  if (userCheck) await userRepository.save(user);
  return user;
};

const login = async (username: string, password: string) => {
  const userRepository = getRepository(User);

  const findUser = await userRepository.findOne({ username });
  if (!findUser)
    throw new loginOrPasswordInvalid("Username or password are invalid");

  const userPassword = findUser.password;
  if (!bcrypt.compareSync(password, userPassword))
    throw new loginOrPasswordInvalid("Username or password are invalid");

  return findUser;
};

const logout = (session: Session) => {
  redisClient.del(`sess:${session.id}`);
};

export { register, login, logout };

export class idTaken extends Error {
  constructor(message) {
    super(message);
    this.name = "IdTakenError";
  }
}

export class loginOrPasswordInvalid extends Error {
  constructor(message) {
    super(message);
    this.name = "LoginPasswordInvalidationError";
  }
}
