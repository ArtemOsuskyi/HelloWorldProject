import { Like } from "./model";
import { getRepository } from "typeorm";
import { Post } from "../post/model";
import { Comment } from "../comment/model";
import { CommentNotFound, findComment } from "../comment/service";
import { findPost, PostNotFound } from "../post/service";

const likePost = async (postId: number) => {
  const post = await findPost(postId);
  if (post) {
    return getRepository(Like).save({
      owner: post,
      entityId: post.id,
      entityType: "Post",
    });
  } else throw new PostNotFound("Post doesn't exist");
};

const likeComment = async (commentId: number) => {
  const comment = await findComment(commentId);
  if (comment) {
    return getRepository(Like).save({
      owner: comment,
      entityId: comment.id,
      entityType: "Comment",
    });
  } else throw new CommentNotFound("Comment doesn't exist");
};

const unsetPostLike = async (postId: number) => {
  const postLike = await getRepository(Like).findOne({
    owner: { id: postId },
    entityId: postId,
  });
  if (!postLike) throw new PostNotLiked("Can't unlike unliked post");
  return getRepository(Like).remove(postLike);
};

const unsetCommentLike = async (commentId: number) => {
  const commentLike = await getRepository(Like).findOne({
    owner: { id: commentId },
    entityId: commentId,
  });
  if (!commentLike) throw new CommentNotLiked("Can't unlike unliked comment");
  return getRepository(Like).remove(commentLike);
};

export { likePost, unsetPostLike, likeComment, unsetCommentLike };

export class PostNotLiked extends Error {
  constructor(message) {
    super(message);
    this.name = "PostNotLikedError";
  }
}

export class CommentNotLiked extends Error {
  constructor(message) {
    super(message);
    this.name = "CommentNotLiked";
  }
}
