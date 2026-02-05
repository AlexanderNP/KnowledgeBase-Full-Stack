import { useQuery } from "@tanstack/react-query";
import { Preview } from "@/features/markdown-preview";
import { articlesControllerGetArticleByIdOptions } from "@/shared/api/generated/@tanstack/react-query.gen";

export const ArticlePreview = ({ id }: { id: string }) => {
  const { data, isLoading } = useQuery({
    ...articlesControllerGetArticleByIdOptions({ path: { id } }),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <Preview content={data?.content ?? ""} />;
};
