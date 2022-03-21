import "express-session";
import { Session } from "express-session";

declare module "express-session" {
  interface SessionData {
    authenticated: boolean;
  }
}

declare module "express" {
  interface Request {
    session: Session;
  }
}
