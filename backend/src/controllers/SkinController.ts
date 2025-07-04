import {
  createSkinService,
  getSkinService,
  listSkinService,
} from "@services/skin";
import { CreateSkinDto, CreateSkinSchema } from "@interfaces/skin/ICreateSkin";
import { FastifyReply, FastifyRequest } from "fastify";

export class SkinController {
  async create(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const createSkinDto: CreateSkinDto = CreateSkinSchema.parse(request.body);

    const skinCreated = await createSkinService.execute(createSkinDto);

    reply.status(201).send({
      success: true,
      data: skinCreated,
    });
  }

  async list(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const skins = await listSkinService.execute();

    reply.status(200).send({
      success: true,
      data: [...skins],
    });
  }

  async get(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const { id } = request.params as { id: string };

    const skin = await getSkinService.execute(id);

    reply.status(200).send({
      success: true,
      data: skin,
    });
  }
}
