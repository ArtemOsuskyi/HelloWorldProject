import { Like } from "./model";
import { getRepository } from "typeorm";
import { Post } from "../post/model";
import { Comment } from "../comment/model";
import { CommentNotFound, findComment } from "../comment/service";
import { findPost, PostNotFound } from "../post/service";

const likePost = async (postId: number, userId: number) => {
  const post = await findPost(postId);
  if (post) {
    const checkUserLikes = post.likes.some(
      (like) => like.liker.userId === userId
    );
    if (checkUserLikes) {
      throw new DuplicateLike("Can't like same post twice");
    } else
      return getRepository(Like).save({
        post,
        liker: { userId },
        entityId: post.postId,
        entityType: "Post",
      });
  } else throw new PostNotFound("Post doesn't exist");
};

const likeComment = async (commentId: number, userId: number) => {
  const comment = await findComment(commentId);
  if (comment) {
    const checkUserLikes = comment.likes.some(
      (like) => like.liker.userId === userId
    );
    if (checkUserLikes) {
      throw new DuplicateLike("Can't like same comment twice");
    } else
      return getRepository(Like).save({
        post: comment.reply_post,
        comment,
        liker: { userId },
        entityId: comment.commentId,
        entityType: "Comment",
      });
  } else throw new CommentNotFound("Comment doesn't exist");
};

const unsetPostLike = async (postId: number, userId: number) => {
  const postLike = await getRepository(Like).findOne({
    post: { postId },
    liker: { userId },
    entityId: postId,
  });
  if (!postLike) throw new NotLiked("Can't unlike unliked post");
  return getRepository(Like).remove(postLike);
};

const unsetCommentLike = async (commentId: number, userId: number) => {
  const commentLike = await getRepository(Like).findOne({
    comment: { commentId },
    liker: { userId },
    entityId: commentId,
  });
  if (!commentLike) throw new NotLiked("Can't unlike unliked comment");
  return getRepository(Like).remove(commentLike);
};

export { likePost, unsetPostLike, likeComment, unsetCommentLike };

export class NotLiked extends Error {
  constructor(message: string) {
    super(message);
    this.name = "PostNotLikedError";
  }
}

export class DuplicateLike extends Error {
  constructor(message: string) {
    super(message);
    this.name = "DuplicateLikeError";
  }
}
