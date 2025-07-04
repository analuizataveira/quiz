import { PrismaClient } from "@prisma/client";

export class ListUserRepository {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async execute() {
    return this.prisma.user.findMany();
  }
}
