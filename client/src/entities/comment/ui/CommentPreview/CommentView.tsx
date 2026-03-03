import { ItemContent, ItemDescription, ItemTitle } from "@/components/ui/item";

type Props = {
  author: string;
  content: string;
  className?: string;
};

export const CommentView = ({ author, content, className }: Props) => {
  return (
    <ItemContent className={className}>
      <ItemDescription>{author}</ItemDescription>
      <ItemTitle>{content}</ItemTitle>
    </ItemContent>
  );
};
