import { useQuery } from "@tanstack/react-query";
import { useUserContext } from "@/shared/contexts/user";
import { Preview } from "@/features/markdown-preview";
import { ArticleDelete } from "./ArticleDelete";
import { ArticleToUpdate } from "./ArticleToUpdate";
import { ArticleHeadingNavigation } from "./ArticleHeadingNavigation";
import { ArticleCategoryBadges } from "./ArticleCategoryBadges";
import { articlesControllerGetArticleByIdOptions } from "@/shared/api/generated/@tanstack/react-query.gen";

export const ArticlePreview = ({ id }: { id: string }) => {
  const { data, isLoading } = useQuery({
    ...articlesControllerGetArticleByIdOptions({ path: { id } }),
  });

  const { user } = useUserContext();

  const isUserCreatorArticle = user?.id === data?.authorId;

  //TODO
  // Добавить логику перехода к редактированию через ротуинг
  // Добавить отображение комментариев
  // Добавить логику добавления комментариев
  // Если комментарий относится к текущему пользователю, то добавить кнопку удаления/редактирования

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="relative flex max-w-6xl flex-col gap-4">
      <div className="flex justify-between">
        <h1>{data?.title}</h1>
        {isUserCreatorArticle && (
          <div>
            <ArticleToUpdate id={data?.id} />
            <ArticleDelete article={data!} />
          </div>
        )}
      </div>
      <ArticleCategoryBadges categories={data?.categories ?? []} />
      {data?.headings.length && <ArticleHeadingNavigation headings={data?.headings ?? []} />}
      <Preview content={data?.content ?? ""} />
    </div>
  );
};
