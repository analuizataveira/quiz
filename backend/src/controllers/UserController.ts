import { FastifyReply, FastifyRequest } from "fastify";
import { CreateUserDto, CreateUserSchema } from "@interfaces/user/ICreateUser";
import {
  createUserService,
  deleteUserService,
  getUserService,
  listUserService,
  updateUserService,
} from "@services/user";
import { UpdateUserDto, UpdateUserSchema } from "@interfaces/user/IUpdateUser";

export class UserController {
  async create(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const createUserDto: CreateUserDto = CreateUserSchema.parse(request.body);

    const userCreated = await createUserService.execute(createUserDto);

    reply.status(201).send({
      success: true,
      data: userCreated,
    });
  }

  async list(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const users = await listUserService.execute();

    reply.status(200).send({
      success: true,
      data: [...users],
    });
  }

  async get(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const { id } = request.params as { id: string };

    const user = await getUserService.execute(id);

    reply.status(200).send({
      success: true,
      data: user,
    });
  }

  async update(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const { id } = request.params as { id: string };

    const updateUserDto: UpdateUserDto = UpdateUserSchema.parse({
      id,
      ...(request.body as object),
    });

    const userUpdated = await updateUserService.execute(updateUserDto);

    reply.status(200).send({
      success: true,
      data: userUpdated,
    });
  }

  async delete(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const { id } = request.params as { id: string };

    await deleteUserService.execute(id);

    reply.status(200).send({
      success: true,
    });
  }
}
