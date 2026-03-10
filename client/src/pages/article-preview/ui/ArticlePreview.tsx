import { useQuery } from "@tanstack/react-query";
import { useUserContext } from "@/shared/contexts/user";
import { Preview } from "@/features/markdown-preview";
import { ArticleComments } from "@/pages/article-preview/ui/ArticleComments";
import { ArticleDelete } from "@/pages/article-preview/ui//ArticleDelete";
import { ArticleToUpdate } from "@/pages/article-preview/ui//ArticleToUpdate";
import { ArticlePreviewMeta } from "@/pages/article-preview/ui//ArticlePreviewMeta";
import { ArticleToFavorite } from "@/pages/article-preview/ui//ArticleToFavorite";
import { ArticleHeadingNavigation } from "@/pages/article-preview/ui//ArticleHeadingNavigation";
import { ArticleCategoryBadges } from "@/pages/article-preview/ui//ArticleCategoryBadges";
import { articlesControllerGetArticleByIdOptions } from "@/shared/api/generated/@tanstack/react-query.gen";

export const ArticlePreview = ({ id }: { id: string }) => {
  const { data, status } = useQuery({
    ...articlesControllerGetArticleByIdOptions({ path: { id } }),
    staleTime: 0,
  });

  const { user } = useUserContext();

  const isAuthor = user?.id === data?.author.id;

  if (status === "pending") {
    return <div>Loading...</div>;
  }

  if (status === "error") {
    return (
      <div>
        <h1>Произошла ошибка при получение статьи: {data?.title}</h1>
      </div>
    );
  }

  return (
    <div className="relative flex max-w-6xl flex-col gap-4 pb-6">
      <div className="flex justify-between border-b-2 pb-2">
        <ArticlePreviewMeta
          articleId={data.id}
          title={data.title}
          likesCount={data.likesCount}
          viewCount={data.viewCount}
        />
        <div className="flex gap-4">
          {isAuthor && (
            <div className="flex gap-4">
              <ArticleToUpdate id={data.id} />
              <ArticleDelete article={data} />
            </div>
          )}
          {user && (
            <ArticleToFavorite
              articleId={data.id}
              articleTitle={data.title}
            />
          )}
        </div>
      </div>
      <ArticleCategoryBadges categories={data.categories} />
      {data.headings.length > 0 && <ArticleHeadingNavigation headings={data.headings} />}
      <Preview content={data.content} />
      <ArticleComments
        articleId={data.id}
        comments={data.comments}
      />
    </div>
  );
};
