import { CommentCreate } from "./CommentCreate";
import { CommentUpdate } from "./CommentUpdate";
import type { Article } from "@/shared/api/generated/types.gen";

interface CommentCreateProps {
  articleId: string;
  userId: string;
}

type CommentUpdateProps = Article["comments"][0] & {
  articleId: string;
};

type CommentEditor<Type extends "create" | "update"> = Type extends "create"
  ? CommentCreateProps
  : CommentUpdateProps;

export const CommentEditor = <Type extends "create" | "update">(props: CommentEditor<Type>) => {
  return <>{"content" in props ? <CommentUpdate {...props} /> : <CommentCreate {...props} />}</>;
};
