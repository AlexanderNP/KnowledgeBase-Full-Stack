import { mongoId } from "@/shared/lib/zod";
import z from "zod";

export const createArticleSchema = z.object({
  title: z.string().min(5, { error: "Заголовок статьи должен быть не менее 5 символов." }).trim(),
  content: z
    .string()
    .min(20, { error: "Содержание статьи должно быть не менее 20 символов." })
    .trim(),
  authorId: mongoId,
  categoryIds: z.array(mongoId).min(1, { error: "Выберите хотя бы одну категорию." }),
});

export const updateArticleSchema = z.object({
  title: z
    .string()
    .min(5, { error: "Заголовок статьи должен быть не менее 5 символов." })
    .trim()
    .optional(),
  content: z
    .string()
    .min(20, { error: "Содержание статьи должно быть не менее 20 символов." })
    .trim()
    .optional(),
  categoryIds: z.array(mongoId).min(1, { error: "Выберите хотя бы одну категорию." }).optional(),
  authorId: mongoId.optional(),
});
