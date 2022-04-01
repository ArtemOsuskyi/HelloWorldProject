import { getRepository } from "typeorm";
import * as bcrypt from "bcrypt";
import { User } from "../user/model";
import { createClient } from "redis";
import { Session } from "express-session";

const redisClient = createClient({
  host: process.env.HOST,
  port: Number(process.env.REDIS_PORT),
});

const register = async (name: string, username: string, password: string) => {
  const takenLogin = await getRepository(User).findOne({ username });
  if (takenLogin) throw new idTaken("This login is already taken");

  const hashPassword = await bcrypt.hash(password, 12);

  return getRepository(User).save({
    name,
    username,
    password: hashPassword,
  });
};

const login = async (username: string, password: string) => {
  const findUser = await getRepository(User).findOne({ username });
  if (!findUser)
    throw new loginOrPasswordInvalid("Username or password are invalid");

  if (!bcrypt.compareSync(password, findUser.password))
    throw new loginOrPasswordInvalid("Username or password are invalid");

  return findUser;
};

const logout = (session: Session) => {
  redisClient.del(`sess:${session.id}`);
};

export { register, login, logout };

export class idTaken extends Error {
  constructor(message: string) {
    super(message);
    this.name = "IdTakenError";
  }
}

export class loginOrPasswordInvalid extends Error {
  constructor(message: string) {
    super(message);
    this.name = "LoginPasswordInvalidationError";
  }
}
