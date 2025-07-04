import { HTTPError } from "@config/errors";
import { CreateSkinDto } from "@interfaces/skin/ICreateSkin";
import { CreateSkinRepository } from "@repositories/skin/CreateSkinRepository";
import { GetUserRepository } from "@repositories/user/GetUserRepository";

export class CreateSkinService {
  private createSkinRepository: CreateSkinRepository;
  private getUserRepository: GetUserRepository;

  constructor(
    createSkinRepository: CreateSkinRepository,
    getUserRepository: GetUserRepository
  ) {
    this.createSkinRepository = createSkinRepository;
    this.getUserRepository = getUserRepository;
  }

  async execute(createSkinDto: CreateSkinDto) {
    const { userId } = createSkinDto;

    const user = await this.getUserRepository.getById(userId);

    if (!user) {
      throw new HTTPError(404, "User not found");
    }

    return this.createSkinRepository.execute({
      ...createSkinDto,
      userId: user.id,
    });
  }
}
