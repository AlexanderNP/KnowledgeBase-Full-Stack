import { z } from "zod";

export const signInUserSchema = z.object({
  email: z.email({ error: "Пожалуйста, введите корректный email." }).trim(),
  password: z
    .string()
    .min(4, { error: "Должен содержать не менее 8 символов" })
    .regex(/[a-zA-Z]/, { error: "Должен содержать хотя бы одну букву." })
    .regex(/[0-9]/, { error: "Должен содержать хотя бы одну цифру." })
    .trim(),
});
