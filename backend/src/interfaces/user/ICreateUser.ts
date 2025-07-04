import { z } from "zod";

export const CreateUserSchema = z.object({
  name: z
    .string({
      required_error: "Name is required",
      invalid_type_error: "Name must be a string",
    })
    .min(1, "Name cannot be empty")
    .max(100, "Name must be less than 100 characters")
    .trim(),

  character: z
    .string({
      required_error: "Character is required",
      invalid_type_error: "Character must be a string",
    })
    .min(1, "Character cannot be empty")
    .max(50, "Character must be less than 50 characters")
    .trim(),

  score: z
    .number({
      invalid_type_error: "Score must be a number",
    })
    .int("Score must be an integer")
    .min(0, "Score cannot be negative")
    .optional()
    .default(0),
});

export type CreateUserDto = z.infer<typeof CreateUserSchema>;

export type CreateUserData = CreateUserDto;

export interface ICreateUser {
  execute(createUserData: CreateUserData): Promise<any>;
}
