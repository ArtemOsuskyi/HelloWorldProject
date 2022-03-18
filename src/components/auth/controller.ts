import { Request, Response } from "express";
import { idTaken, login, loginOrPasswordInvalid, register } from "./service";

const signup = async (req: Request, res: Response) => {
  const { name, username, password } = req.body;

  await register(name, username, password)
    .then(() => {
      // req.session['key'] = username
      // const sessionMessage = req.session['key']
      // console.log(sessionMessage)
      return res.status(200).json({ message: "Signup successful" });
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
  const session = req.session;
  const { username, password } = req.body;

  await login(username, password)
    .then(() => {
      session["username"] = username;
      session["password"] = password;
      console.log(session);
      return res.status(200).json({ message: "Login successful. Welcome!" });
    })
    .catch((e) => {
      if (e instanceof loginOrPasswordInvalid)
        return res.status(400).json({ error: e.message });
      return res
        .status(500)
        .json({ message: "Something gone wrong, please try again", error: e });
    });
};

const logout = (req: Request, res: Response) => {
  //TODO: fix creating new sessions on logout
  if (req.session.cookie)
    req.session.destroy((err) => {
      if (err) return res.status(400).json({ message: err });
    });
  res.clearCookie("connect.sid", { path: "/" });
  //console.log(req.session)
  return res.redirect("/");
};

export { signup, signin, logout };
