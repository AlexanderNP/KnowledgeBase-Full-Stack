import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { createArticleSchema } from "../shemas";
import { useUserContext } from "@/shared/contexts/user";
import { articlesControllerCreateMutation } from "@/shared/api/generated/@tanstack/react-query.gen";
import type { CreateArticleDto, Article } from "@/shared/api/generated";

const defaultArticleState: CreateArticleDto = {
  content: "",
  title: "",
  authorId: "",
  categoryIds: [],
};

export function useCreateArticle() {
  const navigate = useNavigate();
  const { user } = useUserContext();

  const handleSuccess = (data: Article) => {
    toast.success(`Статья ${data.title} успешно создан!`);

    navigate({
      to: `/app/articles/${data.id}`,
    });
  };

  const handleError = (error: Error) => {
    toast.error(error.message);
  };

  const { mutate: createArticle } = useMutation({
    ...articlesControllerCreateMutation(),
    onError: handleError,
    onSuccess: handleSuccess,
  });

  const { Field, handleSubmit, Subscribe } = useForm({
    defaultValues: { ...defaultArticleState, authorId: user?.id },
    onSubmit: async ({ value }) => {
      createArticle({
        body: {
          title: value.title,
          content: value.content,
          categoryIds: value.categoryIds,
          authorId: value.authorId!,
        },
      });
    },
    validators: {
      onSubmit: createArticleSchema,
    },
  });

  return {
    Field,
    Subscribe,
    handleSubmit,
  };
}
