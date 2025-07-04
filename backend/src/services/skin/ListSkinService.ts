import { ListSkinRepository } from "@repositories/skin/ListSkinRepository";

export class ListSkinService {
  private listSkinRepository: ListSkinRepository;

  constructor(listSkinRepository: ListSkinRepository) {
    this.listSkinRepository = listSkinRepository;
  }

  async execute() {
    const skins = await this.listSkinRepository.execute();

    return skins;
  }
}
