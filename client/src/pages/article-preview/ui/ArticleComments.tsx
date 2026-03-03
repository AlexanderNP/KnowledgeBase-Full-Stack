import { CommentPreview } from "@/entities/comment";
import { CommentCreate } from "@/entities/comment";
import { useUserContext } from "@/shared/contexts/user";
import { useMutationState } from "@tanstack/react-query";
import { COMMENT_MUTATION_KEYS } from "@/entities/comment";
import type {
  Article,
  CommentsControllerCreateData,
  CreateCommentDto,
} from "@/shared/api/generated";

interface ArticleComments {
  comments: Article["comments"];
  articleId: string;
}

export const ArticleComments = ({ comments, articleId }: ArticleComments) => {
  const { user } = useUserContext();

  const variables = useMutationState<CreateCommentDto>({
    filters: { mutationKey: COMMENT_MUTATION_KEYS.create(), status: "pending" },
    select: (mutation) => (mutation.state.variables as CommentsControllerCreateData).body,
  });

  const countComnnets = comments.length;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4 rounded-2xl border bg-background/90 p-6 backdrop-blur">
        <h2 className="font-semibold tracking-wide text-muted-foreground uppercase">
          Комментарии: <span className="text-accent-foreground">{countComnnets}</span>
        </h2>
        {comments.length > 0 && (
          <ul className="flex flex-col gap-4">
            {comments.map((item) => (
              <CommentPreview
                {...item}
                articleId={articleId}
                key={item.id}
              ></CommentPreview>
            ))}
            {variables.map((comment, index) => (
              <CommentPreview
                key={`optimistic-${index}`}
                id={`optimistic-${index}`}
                articleId={articleId}
                className="opacity-25"
                content={comment.content}
                author={{
                  id: comment.authorId,
                  username: user!.username,
                }}
              />
            ))}
          </ul>
        )}
      </div>
      {user && (
        <CommentCreate
          articleId={articleId}
          authorId={user?.id ?? ""}
        />
      )}
    </div>
  );
};
