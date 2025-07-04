import fp from "fastify-plugin";
import { FastifyInstance } from "fastify";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default fp(async (fastify: FastifyInstance) => {
  fastify.decorate("prisma", prisma);

  fastify.addHook("onClose", async () => {
    console.log("Closing Prisma Client connection...");
    await prisma.$disconnect();
  });
});

declare module "fastify" {
  interface FastifyInstance {
    prisma: PrismaClient;
  }
}
