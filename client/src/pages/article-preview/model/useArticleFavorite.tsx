import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  userControllerGetUserByIdQueryKey,
  favoritesArticleControllerCreateMutation,
  favoritesArticleControllerDeleteMutation,
} from "@/shared/api/generated/@tanstack/react-query.gen";

export const useArticleRemoveFromFavorite = ({
  articleTitle,
  userId,
}: {
  articleTitle: string;
  userId: string;
}) => {
  const queryClient = useQueryClient();

  const handleSuccess = () => {
    toast.success(`Статья ${articleTitle} успешно удалена из избранных!`);
  };

  const handleError = (error: Error) => {
    toast.error(error.message);
  };

  const handleSettled = () => {
    return queryClient.invalidateQueries({
      queryKey: userControllerGetUserByIdQueryKey({ path: { id: userId } }),
    });
  };

  return useMutation({
    ...favoritesArticleControllerDeleteMutation(),
    onError: handleError,
    onSuccess: handleSuccess,
    onSettled: handleSettled,
  });
};

export const useArticleToFavorite = ({
  articleTitle,
  userId,
}: {
  articleTitle: string;
  userId: string;
}) => {
  const queryClient = useQueryClient();

  const handleSuccess = () => {
    toast.success(`Статья ${articleTitle} успешно добавлена в избранные!`);
  };

  const handleError = (error: Error) => {
    toast.error(error.message);
  };

  const handleSettled = () => {
    return queryClient.invalidateQueries({
      queryKey: userControllerGetUserByIdQueryKey({ path: { id: userId } }),
    });
  };

  return useMutation({
    ...favoritesArticleControllerCreateMutation(),
    onError: handleError,
    onSuccess: handleSuccess,
    onSettled: handleSettled,
  });
};
