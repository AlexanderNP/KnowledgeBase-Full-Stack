import { cn } from "@/shared/lib/utils";
import { Heart } from "lucide-react";
import { useArticleLike } from "@/pages/article-preview/model/useArticleLike";
import { useUserContext } from "@/shared/contexts/user";

interface Props {
  articleId: string;
  likesCount: number;
}

export const ArticleLike = ({ articleId, likesCount }: Props) => {
  const { user } = useUserContext();
  const { mutate, isPending } = useArticleLike({ articleId, userId: user!.id });

  const isArticleLikes = user?.articleLikes?.some((item) => item.articleId === articleId);

  return (
    <>
      <Heart
        className={cn(
          "cursor-pointer transition-transform hover:scale-110",
          isPending && "pointer-events-none opacity-25",
        )}
        onClick={() =>
          mutate({
            path: {
              id: articleId,
            },
            body: {
              userId: user!.id,
            },
          })
        }
        fill={isArticleLikes ? "red" : ""}
      />
      <p className={cn(isPending && "opacity-25")}>{likesCount}</p>
    </>
  );
};
