import { getRepository } from "typeorm";
import { Comment } from "./model";

const showComment = async (commentId: number) => {};

const newComment = async (postId: number, text: string) => {
  const commRepository = getRepository(Comment);

  return commRepository.save({});
};

const changeComment = async (commentId: number, text: string) => {};

const removeComment = async (commentId: number) => {};
