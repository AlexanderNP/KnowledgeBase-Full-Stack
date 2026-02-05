import { z } from "zod";

export const signUpUserSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Имя должно содержать не менее 3 символов." })
    .max(20, { message: "Имя должно содержать не более 20 символов." })
    .trim(),
  email: z.email({ message: "Пожалуйста, введите корректный email." }).trim(),
  password: z
    .string()
    .min(4, { message: "Должен содержать не менее 8 символов" })
    .regex(/[a-zA-Z]/, { message: "Должен содержать хотя бы одну букву." })
    .regex(/[0-9]/, { message: "Должен содержать хотя бы одну цифру." })
    .trim(),
});
