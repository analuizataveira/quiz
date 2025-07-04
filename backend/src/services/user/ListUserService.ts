import { ListUserRepository } from "@repositories/user/ListUserRepository";

export class ListUserService {
  private listUserRepository: ListUserRepository;

  constructor(listUserRepository: ListUserRepository) {
    this.listUserRepository = listUserRepository;
  }

  async execute() {
    const users = await this.listUserRepository.execute();

    return users;
  }
}
