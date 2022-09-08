import { getRepository } from "typeorm";
import { User } from "./user/model";

export const truncateDatabase = async () => {
  await getRepository(User).query("TRUNCATE TABLE users CASCADE");
};
