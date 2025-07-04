import { CreateSkinData } from "@interfaces/skin/ICreateSkin";
import { PrismaClient } from "@prisma/client";

export class CreateSkinRepository {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async execute(createSkinData: CreateSkinData) {
    const { name, description, image, price, userId } = createSkinData;

    return this.prisma.skin.create({
      data: {
        name,
        description,
        image,
        price,
        userId,
      },
    });
  }
}
