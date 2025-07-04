import { CreateUserDto, CreateUserData } from "@interfaces/user/ICreateUser";
import { CreateUserRepository } from "@repositories/user/CreateUserRepository";
import { GetUserRepository } from "@repositories/user/GetUserRepository";
import { HTTPError } from "@config/errors";

export class CreateUserService {
  private createUserRepository: CreateUserRepository;
  private getUserRepository: GetUserRepository;

  constructor(
    createUserRepository: CreateUserRepository,
    getUserRepository: GetUserRepository
  ) {
    this.createUserRepository = createUserRepository;
    this.getUserRepository = getUserRepository;
  }

  async execute(createUserDto: CreateUserDto) {
    // Verificar se já existe um usuário com o mesmo nome
    const existingUser = await this.getUserRepository.getByName(
      createUserDto.name
    );

    if (existingUser) {
      throw new HTTPError(409, "User with this name already exists");
    }

    const userData: CreateUserData = {
      ...createUserDto,
    };

    return this.createUserRepository.execute(userData);
  }
}
