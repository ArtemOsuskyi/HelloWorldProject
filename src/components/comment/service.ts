import { getRepository } from "typeorm";
import { Comment } from "./model";

const showPostComments = async (postId: number) => {
  return getRepository(Comment).find({
    reply_post: { id: postId },
  });
};

const newComment = async (postId: number, text: string, userId: number) => {
  return getRepository(Comment).save({
    text,
    reply_post: { id: postId },
    author: { id: userId },
  });
};

const changeComment = async (commentId: number, text: string) => {
  await getRepository(Comment).update({ id: commentId }, { text });
  return getRepository(Comment).findOne({ id: commentId });
};

const deleteComment = async (commentId: number) => {
  return getRepository(Comment).delete({ id: commentId });
};

const findComment = async (commentId: number) => {
  const findComment = getRepository(Comment).findOne(
    { id: commentId },
    {
      relations: ["author"],
    }
  );
  if (findComment) return findComment;
  else throw new CommentNotFound("Comment doesn't exist");
};

export {
  showPostComments,
  newComment,
  changeComment,
  deleteComment,
  findComment,
};

export class CommentNotFound extends Error {
  constructor(message) {
    super(message);
    this.name = "CommentNotFoundError";
  }
}

export class NotOwnComment extends Error {
  constructor(message) {
    super(message);
    this.name = "NotOwnCommentError";
  }
}
