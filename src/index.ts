import * as express from "express";
import * as cors from "cors";
import * as session from "express-session";
import * as connectRedis from "connect-redis";
import { createClient } from "redis";

import "reflect-metadata";
import { createConnection } from "typeorm";

import * as dbConfig from "../ormconfig";
import authRouter from "./components/auth/router";
import postsRouter from "./components/post/router";
import commentsRouter from "./components/comment/router";
import likesRouter from "./components/like/router";

const PORT = 5050;
const RedisStore = connectRedis(session);
const redisClient = createClient({
  host: "localhost",
  port: 6379,
});

createConnection(dbConfig.dbOptions).then(async () => {
  const app = express();

  const options: cors.CorsOptions = {
    allowedHeaders: [
      "Origin",
      "X-Requested-With",
      "Content-Type",
      "Accept",
      "X-Access-Token",
    ],
    credentials: true,
    methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
  };

  app.use(express.json());
  app.use(cors(options));

  app.use(
    session({
      secret: process.env.SECRET_WORD,
      store: new RedisStore({ client: redisClient }),
      resave: false,
      saveUninitialized: false,
      unset: "destroy",
      cookie: {
        httpOnly: true,
        secure: false,
        maxAge: 1000 * 60 * 10,
      },
    })
  );

  app.use("/auth", authRouter);
  app.use("/posts", postsRouter);
  app.use("/comments", commentsRouter);
  app.use("/like", likesRouter);

  app.listen(PORT);
  console.log(`App is running on port ${PORT}...`);
});
