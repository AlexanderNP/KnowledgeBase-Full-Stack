import { toast } from "sonner";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { commentsControllerCreateMutation } from "@/shared/api/generated/@tanstack/react-query.gen";
import { createCommentsSchema } from "../shemas";
import type { CreateCommentDto } from "@/shared/api/generated";

const defaultArticleState: CreateCommentDto = {
  articleId: "",
  content: "",
  userId: "",
};

export function useCreateComment(payload: { articleId: string; userId: string }) {
  const handleSuccess = () => {
    toast.success(`Комментарий к статье успешно создан!`);
  };

  const handleError = (error: Error) => {
    toast.error(error.message);
  };

  const { mutateAsync: createComment } = useMutation({
    ...commentsControllerCreateMutation(),
    onError: handleError,
    onSuccess: handleSuccess,
  });

  const { Field, handleSubmit, Subscribe } = useForm({
    defaultValues: { ...defaultArticleState, articleId: payload.articleId, userId: payload.userId },
    onSubmit: async ({ value }) => {
      return createComment({
        body: {
          ...value,
        },
      });
    },
    validators: {
      onSubmit: createCommentsSchema,
    },
  });

  return {
    Field,
    Subscribe,
    handleSubmit,
  };
}
