import fallbackImgUrl from "@/assets/fallback-category.jpg";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
      <CardContent className="h-[350px] w-[350px]">
        <div className="relative w-full overflow-hidden rounded-md bg-muted">
          <div className="w-full pt-[75%]" />
          <img
            className="absolute inset-0 h-full w-full object-contain"
            src={category.imageUrl ?? fallbackImgUrl}
            alt={category.name}
          />
        </div>
      </CardContent>
    </Card>
  );
};
