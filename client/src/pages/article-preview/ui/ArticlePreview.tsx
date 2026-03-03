import { useQuery } from "@tanstack/react-query";
import { useUserContext } from "@/shared/contexts/user";
import { Preview } from "@/features/markdown-preview";
import { ArticleComments } from "./ArticleComments";
import { ArticleDelete } from "./ArticleDelete";
import { ArticleToUpdate } from "./ArticleToUpdate";
import { ArticleHeadingNavigation } from "./ArticleHeadingNavigation";
import { ArticleCategoryBadges } from "./ArticleCategoryBadges";
import { articlesControllerGetArticleByIdOptions } from "@/shared/api/generated/@tanstack/react-query.gen";

export const ArticlePreview = ({ id }: { id: string }) => {
  const { data, status } = useQuery({
    ...articlesControllerGetArticleByIdOptions({ path: { id } }),
    staleTime: 0,
  });

  const { user } = useUserContext();

  const isAuthor = user?.id === data?.authorId;

  //TODO
  // Добавить логику добавления статьи в избранное
  // Добавить логику отображение/добавления количества просмотров

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
      <div className="flex justify-between border-b-2">
        <h1>{data.title}</h1>
        {isAuthor && (
          <div className="flex gap-4">
            <ArticleToUpdate id={data.id} />
            <ArticleDelete article={data} />
          </div>
        )}
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
