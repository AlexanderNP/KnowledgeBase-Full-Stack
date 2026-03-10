import { toast } from "sonner";
import {
  articlesControllerGetArticleByIdQueryKey,
  articlesControllerToggleLikesMutation,
  userControllerGetUserByIdQueryKey,
} from "@/shared/api/generated/@tanstack/react-query.gen";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { User, Article } from "@/shared/api/generated";

export const useArticleLike = ({ articleId, userId }: { articleId: string; userId: string }) => {
  const queryClient = useQueryClient();

  return useMutation({
    ...articlesControllerToggleLikesMutation(),

    onMutate: async () => {
      const articleKey = articlesControllerGetArticleByIdQueryKey({ path: { id: articleId } });
      const userKey = userControllerGetUserByIdQueryKey({ path: { id: userId } });

      await queryClient.cancelQueries({
        queryKey: articleKey,
      });

      await queryClient.cancelQueries({
        queryKey: userKey,
      });

      const prevArticle = queryClient.getQueryData<Article>(articleKey);
      const prevUser = queryClient.getQueryData<User>(userKey);

      const isLiked = prevUser?.articleLikes?.some((item) => item.articleId === articleId);

      queryClient.setQueryData(articleKey, (old: Article) => {
        if (!old) return old;

        return {
          ...old,
          likesCount: isLiked ? old.likesCount - 1 : old.likesCount + 1,
        };
      });

      queryClient.setQueryData(userKey, (old: User) => {
        if (!old) return old;

        return {
          ...old,
          articleLikes: isLiked
            ? old?.articleLikes?.filter((item) => item.articleId !== articleId)
            : [...(old?.articleLikes ?? []), { articleId }],
        };
      });

      return { prevArticle, prevUser };
    },

    onError: (err, _, onMutateResult) => {
      toast.error((err as Error).message);

      if (onMutateResult?.prevArticle) {
        queryClient.setQueryData(
          articlesControllerGetArticleByIdQueryKey({ path: { id: articleId } }),
          onMutateResult.prevArticle,
        );
      }

      if (onMutateResult?.prevUser) {
        queryClient.setQueryData(
          userControllerGetUserByIdQueryKey({ path: { id: userId } }),
          onMutateResult.prevUser,
        );
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: articlesControllerGetArticleByIdQueryKey({ path: { id: articleId } }),
      });

      queryClient.invalidateQueries({
        queryKey: userControllerGetUserByIdQueryKey({ path: { id: userId } }),
      });
    },
  });
};
