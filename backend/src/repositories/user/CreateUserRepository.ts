import { CreateUserData } from "@interfaces/user/ICreateUser";
import { PrismaClient } from "@prisma/client";

export class CreateUserRepository {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async execute(createUserData: CreateUserData) {
    const { name, email, password, avatar, balance, status } = createUserData;

    return this.prisma.user.create({
      data: {
        name,
        email,
        password,
        avatar,
        balance,
        status,
      },
    });
  }
}
