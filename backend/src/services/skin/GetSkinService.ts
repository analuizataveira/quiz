import { GetSkinRepository } from "@repositories/skin/GetSkinRepository";

export class GetSkinService {
  private getSkinRepository: GetSkinRepository;

  constructor(getSkinRepository: GetSkinRepository) {
    this.getSkinRepository = getSkinRepository;
  }

  async execute(id: string) {
    const skin = await this.getSkinRepository.execute(id);

    return skin;
  }
}
