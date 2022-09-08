import { getRepository } from "typeorm";
import { Post } from "./model";

const showPost = async (postId: number) => {
  return findPost(postId).catch((e) => {
    throw new PostNotFound(e.message);
  });
};

const showUserPosts = async (userId: number, skip: number, offset: number) => {
  return findUserPosts(userId, skip, offset).catch((e) => {
    throw new PostNotFound(e.message);
  });
};

const showAllPosts = async () => {
  return getRepository(Post).find();
};

const createPost = async (title: string, text: string, userId: number) => {
  const postRepository = getRepository(Post);

  return postRepository.save({
    title,
    text,
    author: { userId },
  });
};

const changePost = async (postId: number, title?: string, text?: string) => {
  await getRepository(Post).update(
    { postId: postId },
    {
      title,
      text,
    }
  );
  return getRepository(Post).findOne({ postId: postId });
};

const deletePost = async (postId: number) => {
  return getRepository(Post).delete({ postId: postId });
};

const findPost = async (postId: number) => {
  const postRepository = getRepository(Post);
  const findPost = await postRepository.findOne(postId, {
    relations: ["author", "likes", "comments", "likes.liker"],
  });
  if (findPost) return findPost;
  else throw new PostNotFound("Post doesn't exist");
};

const findUserPosts = async (userId: number, skip: number, offset: number) =>
  getRepository(Post).find({
    where: { author: userId },
    skip,
    take: offset,
  });

const shortenPosts = async (array: Post[]) => {
  return array.map((post) => {
    delete post.postId;
    delete post.createdAt;
    if (post.text.length >= 200) post.text = post.text.slice(200) + "...";
    return post;
  });
};

export {
  showPost,
  showUserPosts,
  showAllPosts,
  createPost,
  changePost,
  deletePost,
  shortenPosts,
  findPost,
};

export class PostNotFound extends Error {
  constructor(message: string) {
    super(message);
    this.name = "PostNotFoundError";
    this.message = "Post doesn't exist";
  }
}

export class NotOwnPost extends Error {
  constructor(message: string) {
    super(message);
    this.name = "NotOwnPostError";
  }
}
