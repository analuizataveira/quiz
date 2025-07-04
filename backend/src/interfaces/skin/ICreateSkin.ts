import { z } from "zod";

export const CreateSkinSchema = z.object({
  name: z
    .string({
      required_error: "Name is required",
      invalid_type_error: "Name must be a string",
    })
    .min(1, "Name cannot be empty")
    .max(100, "Name must be less than 100 characters")
    .trim(),

  description: z
    .string({
      required_error: "Description is required",
      invalid_type_error: "Description must be a string",
    })
    .min(1, "Description cannot be empty")
    .max(500, "Description must be less than 500 characters")
    .trim(),

  image: z
    .string({
      required_error: "Image URL is required",
      invalid_type_error: "Image must be a string",
    })
    .url("Image must be a valid URL")
    .trim(),

  price: z
    .number({
      required_error: "Price is required",
      invalid_type_error: "Price must be a number",
    })
    .min(0, "Price must be non-negative")
    .max(999999, "Price cannot exceed 999,999"),

  userId: z
    .string({
      required_error: "User ID is required",
      invalid_type_error: "User ID must be a string",
    })
    .uuid("User ID must be a valid UUID"),
});

export type CreateSkinDto = z.infer<typeof CreateSkinSchema>;

export type CreateSkinData = CreateSkinDto & {
  userId: string;
};
