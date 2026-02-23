import { mongoId } from "@/shared/lib/zod";
import z from "zod";

export const createCommentsSchema = z.object({
  content: z.string().min(1, { error: "Комментарий не может быть пустым." }).trim(),
  articleId: mongoId.nonempty({
    error: "Не удалось определить статью.",
  }),
  userId: mongoId.nonempty({
    error: "Не удалось определить автора.",
  }),
});

export const updateCommentsSchema = z.object({
  content: z.string().trim().min(1, { message: "Комментарий не может быть пустым." }).optional(),
  userId: mongoId.optional(),
  articleId: mongoId.optional(),
});
