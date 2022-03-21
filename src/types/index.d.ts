import "express-session";

declare module "express-session" {
  interface SessionData {
    authenticated: boolean;
  }
}

declare module "express" {
  interface Request {
    session: any; //TODO: find a workaround for "any" type
  }
}
