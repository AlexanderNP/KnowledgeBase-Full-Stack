import { ItemContent, ItemDescription, ItemTitle } from "@/components/ui/item";
import { getLocaleString } from "@/shared/lib/utils";
import { Clock } from "lucide-react";

type Props = {
  author: string;
  content: string;
  className?: string;
  createdAt: string;
};

export const CommentView = ({ author, content, createdAt, className }: Props) => {
  return (
    <ItemContent className={className}>
      <ItemDescription className="flex items-center gap-2.5">
        <span className="font-medium">{author}</span>

        <span className="flex items-center gap-1 rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground">
          <Clock className="h-3 w-3" />
          {getLocaleString(createdAt)}
        </span>
      </ItemDescription>

      <ItemTitle className="mt-1 leading-relaxed">{content}</ItemTitle>
    </ItemContent>
  );
};
