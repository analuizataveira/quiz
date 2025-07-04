import { PrismaClient } from "@prisma/client";

export class ListSkinRepository {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async execute() {
    return this.prisma.skin.findMany();
  }
}
