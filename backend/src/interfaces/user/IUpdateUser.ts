import { z } from "zod";

export const UpdateUserSchema = z.object({
  id: z.string().uuid("Id must be a valid UUID"),
  name: z
    .string({
      required_error: "Name is required",
      invalid_type_error: "Name must be a string",
    })
    .min(1, "Name cannot be empty")
    .max(100, "Name must be less than 100 characters")
    .trim()
    .optional(),

  character: z
    .string({
      invalid_type_error: "Character must be a string",
    })
    .min(1, "Character cannot be empty")
    .max(50, "Character must be less than 50 characters")
    .trim()
    .optional(),

  score: z
    .number({
      invalid_type_error: "Score must be a number",
    })
    .int("Score must be an integer")
    .min(0, "Score must be positive")
    .optional(),
});

export type UpdateUserDto = z.infer<typeof UpdateUserSchema>;
