import { Check, Loader, Pencil, Trash, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ItemActions } from "@/components/ui/item";
import { useUpdateComment } from "@/entities/comment/model/useUpdateComment";
import { useDeleteCommentMutation } from "@/entities/comment/model/useCommentMutations";

type Props = {
  mode: "view" | "edit";
  commentId: string;
  articleId: string;
  form: ReturnType<typeof useUpdateComment>;
  onEdit: () => void;
  onCancel: () => void;
};

export const CommentActions = ({ mode, commentId, articleId, form, onEdit, onCancel }: Props) => {
  const { mutate: deleteComment, isPending } = useDeleteCommentMutation(articleId);

  const { handleSubmit, Subscribe, reset } = form;

  const handleCancel = () => {
    reset();
    onCancel();
  };

  return (
    <ItemActions>
      {mode === "edit" && (
        <>
          <Subscribe
            selector={(s) => [s.canSubmit, s.isSubmitting]}
            children={([canSubmit, isSubmitting]) => (
              <Button
                variant="outline"
                size="icon"
                disabled={!canSubmit || isSubmitting}
                onClick={handleSubmit}
              >
                {isSubmitting ? <Loader className="animate-spin" /> : <Check />}
              </Button>
            )}
          />
          <Button
            variant="outline"
            size="icon"
            onClick={handleCancel}
          >
            <X />
          </Button>
        </>
      )}

      {mode === "view" && (
        <>
          <Button
            variant="outline"
            size="icon"
            onClick={onEdit}
          >
            <Pencil />
          </Button>

          <Button
            variant="outline"
            size="icon"
            onClick={() => deleteComment({ path: { id: commentId } })}
            disabled={isPending}
          >
            <Trash />
          </Button>
        </>
      )}
    </ItemActions>
  );
};
