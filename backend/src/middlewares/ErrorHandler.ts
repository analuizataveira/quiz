import { HTTPError } from "@config/errors";
import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from "@prisma/client/runtime/library";
import { FastifyReply, FastifyRequest } from "fastify";
import { ZodError } from "zod";

export const errorHandler = (
  error: Error,
  request: FastifyRequest,
  reply: FastifyReply
) => {
  console.error(error);
  if (error instanceof ZodError) {
    return reply.status(400).send({
      success: false,
      error: "Validation Error",
      details: error.errors.map((err) => ({
        field: err.path.join("."),
        message: err.message,
        code: err.code,
      })),
    });
  }

  if (error instanceof HTTPError) {
    return reply.status(error.statusCode).send({
      success: false,
      error: error.message,
      detail: error.detail,
    });
  }

  if (error instanceof PrismaClientKnownRequestError) {
    return reply.status(400).send({
      success: false,
      error: "Database Error",
      detail: error.message,
    });
  }

  if (error instanceof PrismaClientValidationError) {
    return reply.status(400).send({
      success: false,
      error: "Validation Error",
      detail: error.message,
    });
  }

  return reply.status(500).send({
    success: false,
    error: "Internal Server Error",
  });
};
