import { CreateUserService } from "./CreateUserService";
import {
  createUserRepository,
  deleteUserRepository,
  getUserRepository,
  listUserRepository,
  updateUserRepository,
} from "@repositories/user";
import { ListUserService } from "./ListUserService";
import { GetUserService } from "./GetUserService";
import { UpdateUserService } from "./UpdateUserService";
import { DeleteUserService } from "./DeleteUserService";

export const createUserService = new CreateUserService(
  createUserRepository,
  getUserRepository
);
export const listUserService = new ListUserService(listUserRepository);
export const getUserService = new GetUserService(getUserRepository);
export const updateUserService = new UpdateUserService(
  updateUserRepository,
  getUserRepository
);
export const deleteUserService = new DeleteUserService(deleteUserRepository);
