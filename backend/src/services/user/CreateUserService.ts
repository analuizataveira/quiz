import { CreateUserDto, CreateUserData } from "@interfaces/user/ICreateUser";
import { CreateUserRepository } from "@repositories/user/CreateUserRepository";
import { GetUserRepository } from "@repositories/user/GetUserRepository";
import { UserStatusEnum } from "@enums/UserStatusEnum";
import { HTTPError } from "@config/errors";
import { hash } from "bcryptjs";

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
    const existingUser = await this.getUserRepository.getByEmail(
      createUserDto.email
    );

    if (existingUser) {
      throw new HTTPError(409, "User with this email already exists");
    }

    const hashedPassword = await hash(createUserDto.password, 10);

    const userData: CreateUserData = {
      ...createUserDto,
      status: UserStatusEnum.ACTIVE,
      balance: 0,
      password: hashedPassword,
    };

    return this.createUserRepository.execute(userData);
  }
}
