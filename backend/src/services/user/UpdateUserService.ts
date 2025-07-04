import { UpdateUserDto } from "@interfaces/user/IUpdateUser";
import { HTTPError } from "@config/errors";
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

    return this.updateUserRepository.execute(updateUserDto);
  }
}
