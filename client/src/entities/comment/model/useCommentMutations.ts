import {
  articlesControllerGetArticleByIdQueryKey,
  commentsControllerCreateMutation,
  commentsControllerUpdateMutation,
  commentsControllerDeleteMutation,
} from "@/shared/api/generated/@tanstack/react-query.gen";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { COMMENT_MUTATION_KEYS } from "@/entities/comment/model/queries";

export const useCreateCommentMutation = (articleId: string) => {
  const queryClient = useQueryClient();

  const handleSuccess = () => {
    toast.success(`Комментарий к статье успешно создан!`);
  };

  const handleError = (error: Error) => {
    toast.error(error.message);
  };

  const handleSettled = () => {
    return queryClient.invalidateQueries({
      queryKey: articlesControllerGetArticleByIdQueryKey({ path: { id: articleId } }),
    });
  };

  return useMutation({
    ...commentsControllerCreateMutation(),
    mutationKey: COMMENT_MUTATION_KEYS.create(),
    onError: handleError,
    onSuccess: handleSuccess,
    onSettled: handleSettled,
  });
};

export const useUpdateCommentMutation = (articleId: string) => {
  const queryClient = useQueryClient();

  const handleSuccess = () => {
    toast.success(`Комментарий к статье успешно обновлен!`);
  };

  const handleError = (error: Error) => {
    toast.error(error.message);
  };

  const handleSettled = () => {
    return queryClient.invalidateQueries({
      queryKey: articlesControllerGetArticleByIdQueryKey({ path: { id: articleId } }),
    });
  };

  return useMutation({
    ...commentsControllerUpdateMutation(),
    mutationKey: COMMENT_MUTATION_KEYS.update(),
    onError: handleError,
    onSuccess: handleSuccess,
    onSettled: handleSettled,
  });
};

export const useDeleteCommentMutation = (articleId: string) => {
  const queryClient = useQueryClient();

  const handleSuccess = () => {
    toast.success(`Комментарий к статье успешно удален!`);
  };

  const handleError = (error: Error) => {
    toast.error(error.message);
  };

  const handleSettled = () => {
    return queryClient.invalidateQueries({
      queryKey: articlesControllerGetArticleByIdQueryKey({ path: { id: articleId } }),
    });
  };

  return useMutation({
    ...commentsControllerDeleteMutation(),
    mutationKey: COMMENT_MUTATION_KEYS.delete(),
    onError: handleError,
    onSuccess: handleSuccess,
    onSettled: handleSettled,
  });
};
