import { Item, ItemMedia } from "@/components/ui/item";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CommentView } from "@/entities/comment/ui/CommentPreview/CommentView";
import { CommentEdit } from "@/entities/comment/ui/CommentPreview/CommentEdit";
import { CommentActions } from "@/entities/comment/ui/CommentPreview/CommentActions";
import { useUserContext } from "@/shared/contexts/user";
import { useUpdateComment } from "@/entities/comment/model/useUpdateComment";
import { useCommentActionMode } from "@/entities/comment/model/useCommentActionMode";
import type { Article } from "@/shared/api/generated/types.gen";

type CommentPreviewProps = Article["comments"][0] & {
  articleId: string;
  className?: string;
};

export const CommentPreview = ({
  id,
  author,
  content,
  articleId,
  className,
}: CommentPreviewProps) => {
  const { user } = useUserContext();

  const { mode, pendingMutation, setMode } = useCommentActionMode(id);

  const form = useUpdateComment(id, {
    articleId,
    authorId: author.id,
    content,
  });

  const isAuthor = author.id === user?.id;

  const displayedContent = mode === "optimistic" ? (pendingMutation?.body?.content ?? "") : content;

  return (
    <Item
      variant="outline"
      className={className}
    >
      <ItemMedia>
        <Avatar className="size-10">
          <AvatarImage src="https://github.com/evilrabbit.png" />
          <AvatarFallback>?</AvatarFallback>
        </Avatar>
      </ItemMedia>

      {mode !== "edit" && (
        <CommentView
          className={mode === "optimistic" ? "opacity-25" : undefined}
          author={author.username ?? ""}
          content={displayedContent}
        />
      )}

      {mode === "edit" && isAuthor && <CommentEdit form={form} />}

      {mode !== "optimistic" && isAuthor && (
        <CommentActions
          mode={mode}
          commentId={id}
          articleId={articleId}
          onEdit={() => setMode("edit")}
          onCancel={() => setMode("view")}
          form={form}
        />
      )}
    </Item>
  );
};
