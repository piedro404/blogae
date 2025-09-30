import { prismaClient } from "@config/database";
import { UserRequest } from "src/schemas/user.schema";

export default class UserRepository {
  static async findAll() {
    return await prismaClient.user.findMany();
  }

  static async findByEmail(email: string) {
    return await prismaClient.user.findUnique({ where: { email } });
  }

  static async findById(id: number) {
    return await prismaClient.user.findUnique({ where: { id } });
  }

  static async createUser(data: UserRequest) {
    return await prismaClient.user.create({
      data: {
        name: data.name!,
        email: data.email!,
        password: data.password!,
      },
    });
  }

  static async updateUser(id: number, data: UserRequest) {
    return await prismaClient.user.update({
      where: { id },
      data
    });
  }

  static async deleteUser(id: number) {
    return await prismaClient.user.delete({
      where: { id },
    });
  }
}