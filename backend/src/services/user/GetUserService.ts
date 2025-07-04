import { HTTPError } from "@config/errors";
import { GetUserRepository } from "@repositories/user/GetUserRepository";

export class GetUserService {
  private getUserRepository: GetUserRepository;

  constructor(getUserRepository: GetUserRepository) {
    this.getUserRepository = getUserRepository;
  }

  async execute(id: string) {
    const user = await this.getUserRepository.getById(id);

    if (!user) {
      throw new HTTPError(404, "User not found");
    }

    return user;
  }
}
