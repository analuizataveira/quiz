import { UpdateUserDto } from "@interfaces/user/IUpdateUser";
import { UserStatusEnum } from "@enums/UserStatusEnum";
import { HTTPError } from "@config/errors";
import { hash } from "bcryptjs";
import { UpdateUserRepository } from "@repositories/user/UpdateUserRepository";
import { GetUserRepository } from "@repositories/user/GetUserRepository";

export class UpdateUserService {
  private updateUserRepository: UpdateUserRepository;
  private getUserRepository: GetUserRepository;

  constructor(
    updateUserRepository: UpdateUserRepository,
    getUserRepository: GetUserRepository
  ) {
    this.updateUserRepository = updateUserRepository;
    this.getUserRepository = getUserRepository;
  }

  async execute(updateUserDto: UpdateUserDto) {
    const existingUser = await this.getUserRepository.getById(updateUserDto.id);

    if (!existingUser) {
      throw new HTTPError(404, "User not found");
    }

    if (existingUser.status !== UserStatusEnum.ACTIVE) {
      throw new HTTPError(400, "User is not active");
    }

    if (updateUserDto.password) {
      const hashedPassword = await hash(updateUserDto.password, 10);
      updateUserDto.password = hashedPassword;
    }

    return this.updateUserRepository.execute(updateUserDto);
  }
}
