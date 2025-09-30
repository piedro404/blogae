import { prismaClient } from "@config/database";
import { PostRequest } from "src/schemas/post.schema";

export default class PostRepository {
  static async findAll() {
    return await prismaClient.post.findMany();
  }

  static async findById(id: number) {
    return await prismaClient.post.findUnique({ where: { id } });
  }

  static async createPost(data: PostRequest) {
    return await prismaClient.post.create({
      data: {
        title: data.title!,
        content: data.content!,
        authorId: data.authorId!,
        categoryId: data.categoryId!,
      },
    });
  }

  static async updatePost(id: number, data: PostRequest) {
    return await prismaClient.post.update({
      where: { id },
      data
    });
  }

  static async deletePost(id: number) {
    return await prismaClient.post.delete({
      where: { id },
    });
  }
}