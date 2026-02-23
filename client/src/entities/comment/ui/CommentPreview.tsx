import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import type { Article } from "@/shared/api/generated/types.gen";

export const CommentPreview = ({ content }: Article["comments"][0]) => {
  return (
    <Item variant="outline">
      <ItemMedia>
        <Avatar className="size-10">
          <AvatarImage src="https://github.com/evilrabbit.png" />
          <AvatarFallback>?</AvatarFallback>
        </Avatar>
      </ItemMedia>
      <ItemContent>
        <ItemTitle>{user.username}</ItemTitle>
        <ItemDescription>{user.email}</ItemDescription>
      </ItemContent>
      <ItemActions>{children}</ItemActions>
    </Item>
  );
};
