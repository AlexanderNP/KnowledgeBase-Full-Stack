import { Button } from "@/components/ui/button";
import { Bookmark } from "lucide-react";
import { useUserContext } from "@/shared/contexts/user";
import {
  useArticleToFavorite,
  useArticleRemoveFromFavorite,
} from "@/pages/article-preview/model/useArticleFavorite";

interface Props {
  articleTitle: string;
  articleId: string;
}

export const ArticleToFavorite = ({ articleTitle, articleId }: Props) => {
  const { user } = useUserContext();

  const findFavoriteArticle = user?.favoritesArticle?.find((item) => item.articleId === articleId);

  const { mutate: addToFavorite, isPending: isPendingAdd } = useArticleToFavorite({
    articleTitle,
    userId: user!.id,
  });

  const { mutate: removeFromFavorite, isPending: isPendingRemove } = useArticleRemoveFromFavorite({
    articleTitle,
    userId: user!.id,
  });

  const handleActionFavorite = () => {
    if (findFavoriteArticle) {
      removeFromFavorite({ path: { id: findFavoriteArticle.id } });
    } else {
      addToFavorite({ body: { articleId, userId: user!.id } });
    }
  };

  return (
    <Button
      variant="outline"
      onClick={handleActionFavorite}
      disabled={isPendingAdd || isPendingRemove}
    >
      {findFavoriteArticle ? "Убрать из избранного" : "В избранное"}
      <Bookmark
        className={findFavoriteArticle ? "fill-yellow-500" : undefined}
        strokeWidth={findFavoriteArticle ? 0 : 2}
      />
    </Button>
  );
};
