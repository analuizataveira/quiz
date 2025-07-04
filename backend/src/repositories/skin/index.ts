import prisma from "@config/postgres";
import { CreateSkinRepository } from "@repositories/skin/CreateSkinRepository";
import { ListSkinRepository } from "@repositories/skin/ListSkinRepository";
import { GetSkinRepository } from "./GetSkinRepository";

export const createSkinRepository = new CreateSkinRepository(prisma);
export const listSkinRepository = new ListSkinRepository(prisma);
export const getSkinRepository = new GetSkinRepository(prisma);
