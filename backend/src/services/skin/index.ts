import { CreateSkinService } from "./CreateSkinService";
import {
  createSkinRepository,
  getSkinRepository,
  listSkinRepository,
} from "@repositories/skin";
import { getUserRepository } from "@repositories/user";
import { ListSkinService } from "./ListSkinService";
import { GetSkinService } from "./GetSkinService";

export const createSkinService = new CreateSkinService(
  createSkinRepository,
  getUserRepository
);
export const listSkinService = new ListSkinService(listSkinRepository);
export const getSkinService = new GetSkinService(getSkinRepository);
