import { toast } from "sonner";
import { useNavigate } from "@tanstack/react-router";
import { articlesControllerDeleteArticleMutation } from "@/shared/api/generated/@tanstack/react-query.gen";
import { useMutation } from "@tanstack/react-query";
import type { Article } from "@/shared/api/generated";

export const useArticleDelete = (article: Article) => {
  const navigate = useNavigate();

  const handleSuccess = () => {
    const categoryId = article.categoryIds[0];

    toast.success(`Статья ${article.title} успешно удалена!`);

    navigate({
      to: "/app/categories/$categoryId",
      params: { categoryId },
    });
  };

  const handleError = (error: Error) => {
    toast.error(error.message);
  };

  const { mutate: deleteArticle } = useMutation({
    ...articlesControllerDeleteArticleMutation(),
    onError: handleError,
    onSuccess: handleSuccess,
  });

  return {
    deleteArticle,
  };
};
