import { PrismaClient } from "@prisma/client";

export class GetUserRepository {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async getById(id: string) {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  async getByName(name: string) {
    return this.prisma.user.findFirst({
      where: {
        name,
      },
    });
  }
}
