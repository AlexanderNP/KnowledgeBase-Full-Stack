import { useForm } from "@tanstack/react-form";
import { useUpdateCommentMutation } from "@/entities/comment/model/useCommentMutations";
import { updateCommentsSchema } from "@/entities/comment/model/shemas";
import type { UpdateCommentDto } from "@/shared/api/generated";

export function useUpdateComment(commentId: string, payload: UpdateCommentDto) {
  const { mutateAsync: updateComment } = useUpdateCommentMutation(payload.articleId!);

  const { Field, handleSubmit, Subscribe, reset } = useForm({
    defaultValues: payload,
    onSubmit: async ({ value }) => {
      return updateComment({
        path: {
          id: commentId,
        },
        body: {
          ...value,
        },
      });
    },
    validators: {
      onSubmit: updateCommentsSchema,
    },
  });

  return {
    reset,
    Field,
    Subscribe,
    handleSubmit,
  };
}
