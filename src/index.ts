import "reflect-metadata";
import { createConnection } from "typeorm";
import * as dbConfig from "../ormconfig";
import createServer from "./app";

const PORT = Number(process.env.LOCAL_PORT);

const app = createServer();

createConnection(dbConfig.dbOptions).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
