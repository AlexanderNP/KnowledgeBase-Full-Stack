import { toast } from "sonner";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { commentsControllerUpdateMutation } from "@/shared/api/generated/@tanstack/react-query.gen";
import { updateCommentsSchema } from "../shemas";
import type { UpdateCommentDto } from "@/shared/api/generated";

export function useUpdateComment(commentId: string, payload: UpdateCommentDto) {
  const handleSuccess = () => {
    toast.success(`Комментарий к статье успешно обновлен!`);
  };

  const handleError = (error: Error) => {
    toast.error(error.message);
  };

  const { mutateAsync: createComment } = useMutation({
    ...commentsControllerUpdateMutation(),
    onError: handleError,
    onSuccess: handleSuccess,
  });

  const { Field, handleSubmit, Subscribe } = useForm({
    defaultValues: payload,
    onSubmit: async ({ value }) => {
      return createComment({
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
    Field,
    Subscribe,
    handleSubmit,
  };
}
