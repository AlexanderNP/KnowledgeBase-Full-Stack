import { Link } from "@tanstack/react-router";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRightIcon } from "lucide-react";
import type { Article } from "@/shared/api/generated";

interface ArticleCategoryBadges {
  categories: Article["categories"];
}

export const ArticleCategoryBadges = ({ categories }: ArticleCategoryBadges) => {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((item) => (
        <Badge
          asChild
          key={item.id}
          variant="secondary"
          className="transition-transform hover:scale-95"
        >
          <Link
            to="/app/categories/$categoryId"
            params={{ categoryId: item.id }}
          >
            {item.name} <ArrowUpRightIcon data-icon="inline-end" />
          </Link>
        </Badge>
      ))}
    </div>
  );
};
