import { getRepository } from "typeorm";
import { Comment } from "./model";

const showPostComments = async (
  postId: number,
  skip: number,
  offset: number
) => {
  return getRepository(Comment).find({
    where: {
      reply_post: { postId },
    },
    skip,
    take: offset,
  });
};

const newComment = async (postId: number, text: string, userId: number) => {
  return getRepository(Comment).save({
    text,
    reply_post: { postId },
    author: { userId },
  });
};

const changeComment = async (commentId: number, text: string) => {
  await getRepository(Comment).update({ commentId: commentId }, { text });
  return getRepository(Comment).findOne({ commentId: commentId });
};

const deleteComment = async (commentId: number) => {
  return getRepository(Comment).delete({ commentId: commentId });
};

const findComment = async (commentId: number) => {
  const commRepository = getRepository(Comment);
  const findComment = await commRepository.findOne(commentId, {
    relations: ["author", "likes", "reply_post", "likes.liker"],
  });
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
  constructor(message: string) {
    super(message);
    this.name = "CommentNotFoundError";
  }
}

export class NotOwnComment extends Error {
  constructor(message: string) {
    super(message);
    this.name = "NotOwnCommentError";
  }
}
