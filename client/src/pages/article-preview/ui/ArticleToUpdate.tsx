import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";

export const ArticleToUpdate = ({ id }: { id: string }) => {
  return (
    <Button asChild>
      <Link
        to="/app/articles/edit"
        params={id}
      >
        Редактировать
      </Link>
    </Button>
  );
};
