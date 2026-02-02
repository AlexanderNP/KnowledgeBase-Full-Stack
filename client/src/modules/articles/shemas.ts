import z from "zod";

export const createArticleSchema = z.object({
  title: z.string().min(5, { message: "Заголовок статьи должен быть не менее 5 символов." }).trim(),
  content: z
    .string()
    .min(20, { message: "Содержание статьи должно быть не менее 20 символов." })
    .trim(),
  authorId: z.string(),
  categoryIds: z.array(z.string()).min(1, { message: "Выберите хотя бы одну категорию." }),
});
