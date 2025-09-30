import { prismaClient } from "@config/database";
import { CategoryRequest } from "src/schemas/category.schema";
import { UserRequest } from "src/schemas/user.schema";

export class CategoryRepository {
  static async findAll() {
    return await prismaClient.category.findMany();
  }

  static async findByName(name: string) {
    return await prismaClient.category.findUnique({ where: { name } });
  }

  static async findById(id: number) {
    return await prismaClient.category.findUnique({ where: { id } });
  }

  static async createCategory(data: CategoryRequest) {
    return await prismaClient.category.create({
      data: {
        name: data.name!,
        description: data.description!,
      },
    });
  }

  static async updateCategory(id: number, data: CategoryRequest) {
    return await prismaClient.category.update({
      where: { id },
      data
    });
  }

  static async deleteCategory(id: number) {
    return await prismaClient.category.delete({
      where: { id },
    });
  }
}