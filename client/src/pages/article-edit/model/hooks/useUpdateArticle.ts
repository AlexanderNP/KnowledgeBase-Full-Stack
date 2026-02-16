import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { updateArticleSchema } from "@/pages/article-edit/model/shemas";
import { useUserContext } from "@/shared/contexts/user";
import {
  articlesControllerGetArticleByIdOptions,
  articlesControllerUpdateArticleMutation,
} from "@/shared/api/generated/@tanstack/react-query.gen";
import type { ArticleUpdate, ArticleWithHeadings, UpdateArticleDto } from "@/shared/api/generated";

export function useUpdateArticle(id: string) {
  const navigate = useNavigate();
  const { user } = useUserContext();

  const { data } = useQuery({
    ...articlesControllerGetArticleByIdOptions({ path: { id } }),
  });

  const handleSuccess = (data: ArticleUpdate) => {
    toast.success(`Статья ${data.title} успешно создан!`);

    navigate({
      to: `/app/articles/${data.id}`,
    });
  };

  const handleError = (error: Error) => {
    toast.error(error.message);
  };

  const { mutateAsync: updateArticle } = useMutation({
    ...articlesControllerUpdateArticleMutation(),
    onError: handleError,
    onSuccess: handleSuccess,
  });

  const { Field, handleSubmit, Subscribe } = useForm({
    defaultValues: { ...getDefaultValues(data), authorId: user?.id },
    onSubmit: async ({ value }) => {
      return updateArticle({
        path: {
          id,
        },
        body: {
          content: value.content,
          categoryIds: value.categoryIds,
          title: value.title,
        },
      });
    },
    validators: {
      onSubmit: updateArticleSchema,
    },
  });

  return {
    Field,
    Subscribe,
    handleSubmit,
  };
}

const getDefaultValues = (article: ArticleWithHeadings | undefined) => {
  const defaultValues: UpdateArticleDto = {
    title: "",
    content: "",
    categoryIds: [],
  };

  if (!article) return defaultValues;

  const { title, content, categoryIds } = article;

  return {
    title,
    content,
    categoryIds,
  };
};
