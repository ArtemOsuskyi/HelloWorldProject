import { getRepository } from "typeorm";
import z from "zod";
import { Post } from "./model";
import { User } from "../user/model";

const postSchema = z.object({
  title: z.string().min(1).max(200, { message: "Title is too long" }),
  text: z.string().min(1).max(2000, { message: "Text is too long" }),
});

const getPosts = async (postId?: number, userId?: number) => {
  const postRepository = getRepository(Post);

  if (postId != undefined) {
    await findPost(postId).catch((e) => {
      throw new e();
    });
  } else if (userId != undefined) {
    await findUserPosts(userId).catch((e) => {
      throw new e();
    });
  } else return postRepository.find();
};

const createPost = async (title: string, text: string, userId: number) => {
  const postRepository = getRepository(Post);

  const post = new Post();
  post.title = title;
  post.text = text;
  post.userId = userId;
  if (postSchema.parse(post)) await postRepository.save(post);
  else throw new Error();
  return post;
};

const editPost = async (postId: number) => {
  const postRepository = getRepository(Post);

  await findPost(postId);
};

const deletePost = async (postId: number) => {
  const postRepository = getRepository(Post);
  await findPost(postId)
    .then(async () => {
      await postRepository.delete({ id: postId });
    })
    .catch((e) => {
      if (e instanceof PostNotFound)
        throw new PostNotFound("Post doesn't exist");
    });
};

const findPost = async (postId: number) => {
  const postRepository = getRepository(Post);
  await postRepository.findOne({ id: postId });
};

const findUserPosts = async (userId: number) => {
  const userRepository = getRepository(User);
  const findUser = await userRepository.findOne({ id: userId });
  if (findUser) return findUser.posts;
  else throw new Error();
};

export { getPosts, createPost, deletePost };

export class PostNotFound extends Error {
  constructor(message) {
    super(message);
    this.name = "PostNotFoundError";
  }
}
