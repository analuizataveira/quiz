import { PrismaClient } from "@prisma/client";

export class DeleteUserRepository {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async execute(id: string) {
    return this.prisma.user.delete({
      where: {
        id,
      },
    });
  }
}
