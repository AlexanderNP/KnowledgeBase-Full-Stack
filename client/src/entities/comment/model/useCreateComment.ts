import { useForm } from "@tanstack/react-form";
import { createCommentsSchema } from "./shemas";
import { useCreateCommentMutation } from "@/entities/comment/model/useCommentMutations";
import type { CreateCommentDto } from "@/shared/api/generated";

const defaultArticleState: CreateCommentDto = {
  articleId: "",
  content: "",
  authorId: "",
};

export function useCreateComment({ articleId, authorId }: Omit<CreateCommentDto, "content">) {
  const { mutateAsync: createComment } = useCreateCommentMutation(articleId);

  const { Field, handleSubmit, Subscribe, reset } = useForm({
    defaultValues: {
      ...defaultArticleState,
      articleId,
      authorId,
    },
    onSubmit: async ({ value }) => {
      reset();

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
