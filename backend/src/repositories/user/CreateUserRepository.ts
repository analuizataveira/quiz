import { CreateUserData } from "@interfaces/user/ICreateUser";
import { PrismaClient } from "@prisma/client";

export class CreateUserRepository {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async execute(createUserData: CreateUserData) {
    const { name, character, score } = createUserData;

    return this.prisma.user.create({
      data: {
        name,
        character,
        score: score || 0,
      },
    });
  }
}
