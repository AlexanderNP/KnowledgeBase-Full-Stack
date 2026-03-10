import { Eye } from "lucide-react";
import { ArticleLike } from "./ArticleLike";
import { useUserContext } from "@/shared/contexts/user";

interface Props {
  articleId: string;
  title: string;
  viewCount: number;
  likesCount: number;
}

export const ArticlePreviewMeta = ({ articleId, title, viewCount, likesCount }: Props) => {
  const { user } = useUserContext();

  return (
    <div className="flex flex-col gap-3.5">
      <h1>{title}</h1>
      <div className="flex gap-5.5">
        {user && (
          <div className="flex items-center gap-1.5">
            <ArticleLike
              articleId={articleId}
              likesCount={likesCount}
            />
          </div>
        )}
        <div className="flex items-center gap-1.5">
          <Eye />
          <p>{viewCount}</p>
        </div>
      </div>
    </div>
  );
};
