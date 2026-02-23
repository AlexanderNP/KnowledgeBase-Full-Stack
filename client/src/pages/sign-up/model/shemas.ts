import { z } from "zod";

export const signUpUserSchema = z.object({
  username: z
    .string()
    .min(3, { error: "Имя должно содержать не менее 3 символов." })
    .max(20, { error: "Имя должно содержать не более 20 символов." })
    .trim(),
  email: z.email({ error: "Пожалуйста, введите корректный email." }).trim(),
  password: z
    .string()
    .min(4, { error: "Должен содержать не менее 8 символов" })
    .regex(/[a-zA-Z]/, { error: "Должен содержать хотя бы одну букву." })
    .regex(/[0-9]/, { error: "Должен содержать хотя бы одну цифру." })
    .trim(),
});
