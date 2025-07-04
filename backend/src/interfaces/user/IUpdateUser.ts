import { z } from "zod";
import { UserStatusEnum } from "@enums/UserStatusEnum";

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

  password: z
    .string({
      required_error: "Password is required",
      invalid_type_error: "Password must be a string",
    })
    .min(8, "Password must be at least 8 characters")
    .max(50, "Password must be less than 50 characters")
    .refine(
      (password) => /[A-Z]/.test(password),
      "Password must contain at least one uppercase letter"
    )
    .refine(
      (password) => /[a-z]/.test(password),
      "Password must contain at least one lowercase letter"
    )
    .refine(
      (password) => /[0-9]/.test(password),
      "Password must contain at least one number"
    )
    .refine(
      (password) => /[^A-Za-z0-9]/.test(password),
      "Password must contain at least one special character"
    )
    .optional(),

  avatar: z.string().url("Avatar must be a valid URL").optional().nullable(),

  status: z.nativeEnum(UserStatusEnum).optional(),
});

export type UpdateUserDto = z.infer<typeof UpdateUserSchema>;
