import { z } from "zod";

export const signInUserSchema = z.object({
  email: z.email({ message: "Пожалуйста, введите корректный email." }).trim(),
  password: z
    .string()
    .min(4, { message: "Должен содержать не менее 8 символов" })
    .regex(/[a-zA-Z]/, { message: "Должен содержать хотя бы одну букву." })
    .regex(/[0-9]/, { message: "Должен содержать хотя бы одну цифру." })
    .trim(),
});
