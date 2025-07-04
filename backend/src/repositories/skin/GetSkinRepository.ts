import { PrismaClient } from "@prisma/client";

export class GetSkinRepository {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async execute(id: string) {
    return this.prisma.skin.findUnique({
      where: {
        id,
      },
    });
  }
}
