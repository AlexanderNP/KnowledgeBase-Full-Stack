import { Button } from "@/components/ui/button";
import { useArticleDelete } from "../model/useArticleDelete";
import type { Article } from "@/shared/api/generated";

interface ArticleDelete {
  article: Article;
}

export const ArticleDelete = ({ article }: ArticleDelete) => {
  const { deleteArticle } = useArticleDelete(article);

  return (
    <Button
      onClick={() => deleteArticle({ path: { id: article.id } })}
      variant="destructive"
    >
      Удалить
    </Button>
  );
};
