import { Request, Response } from "express";
import {
  idTaken,
  login,
  loginOrPasswordInvalid,
  logout,
  register,
} from "./service";
import { SessionData } from "express-session";

const signup = async (req: Request, res: Response) => {
  const session: SessionData = req.session;
  const { name, username, password } = req.body;

  await register(name, username, password)
    .then((userData) => {
      session.userId = userData.userId;
      session.authenticated = true;
      return res.status(200).json({ message: "Signup successful", session });
    })
    .catch((e) => {
      if (e instanceof idTaken)
        return res.status(400).json({ message: e.message });
      return res
        .status(500)
        .json({ message: "Something gone wrong, please try again", error: e });
    });
};

const signin = async (req: Request, res: Response) => {
  const session: SessionData = req.session;
  const { username, password } = req.body;

  await login(username, password)
    .then((userData) => {
      session.userId = userData.userId;
      session.authenticated = true;
      return res
        .status(200)
        .json({ message: "Login successful. Welcome!", session });
    })
    .catch((e) => {
      if (e instanceof loginOrPasswordInvalid)
        return res.status(400).json({ error: e.message });
      return res.status(500).json({
        message: "Something gone wrong, please try again",
        error: e.message,
      });
    });
};

const signout = async (req: Request, res: Response) => {
  const session = req.session;
  if (session.authenticated) {
    logout(session);
    res.clearCookie("connect.sid", { path: "/" });
    return res.status(200).json({ message: "Logout successful!" });
  } else return res.status(500).json({ message: "Something gone wrong" });
};

export { signup, signin, signout };
