import { DeleteUserRepository } from "@repositories/user/DeleteUserRepository";

export class DeleteUserService {
  private deleteUserRepository: DeleteUserRepository;

  constructor(deleteUserRepository: DeleteUserRepository) {
    this.deleteUserRepository = deleteUserRepository;
  }

  async execute(id: string) {
    return this.deleteUserRepository.execute(id);
  }
}
