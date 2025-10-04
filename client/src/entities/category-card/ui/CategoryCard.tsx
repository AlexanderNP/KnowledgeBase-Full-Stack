import fallbackImgUrl from "@/assets/fallback-category.jpg";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui";
import { ArrowUpRight } from "lucide-react";
import type { Category } from "@/shared/api/generated";

export const CategoryCard = (category: Category) => {
  return (
    <Card className="group transition-transform hover:-translate-y-0.5">
      <CardHeader>
        <CardTitle className="max-w-52 truncate">{category.name}</CardTitle>
        <CardDescription className="max-w-52 truncate">{category.description}</CardDescription>
        <CardAction>
          <ArrowUpRight
            size={20}
            className="transition-transform group-hover:scale-75"
          />
        </CardAction>
      </CardHeader>
      <CardContent>
        <img
          src={category.imageUrl ?? fallbackImgUrl}
          alt={category.name}
        />
      </CardContent>
    </Card>
  );
};
