import { getRepository } from "typeorm";
import { Post } from "./model";

const showPost = async (postId: number) => {
  return findPost(postId).catch((e) => {
    throw new Error(e);
  });
};

const showUserPosts = async (userId: number) => {
  return findUserPosts(userId).catch((e) => {
    throw new Error(e);
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
    author: { id: userId },
  });
};

const changePost = async (postId: number, title?: string, text?: string) => {
  await getRepository(Post).update(
    { id: postId },
    {
      title,
      text,
    }
  );
  return getRepository(Post).findOne({ id: postId });
};

const deletePost = async (postId: number) => {
  return getRepository(Post).delete({ id: postId });
};

const findPost = async (postId: number) => {
  const postRepository = getRepository(Post);
  const findPost = await postRepository.findOne(postId, {
    relations: ["author"],
  });
  if (findPost) return findPost;
  else throw new PostNotFound("Post doesn't exist");
};

const findUserPosts = async (userId: number) =>
  getRepository(Post).find({ author: { id: userId } });

const shortenPosts = async (array: Post[]) => {
  return array.map((post) => {
    delete post.id;
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
  constructor(message) {
    super(message);
    this.name = "PostNotFoundError";
  }
}

export class NotOwnPost extends Error {
  constructor(message) {
    super(message);
    this.name = "NotOwnPostError";
  }
}
