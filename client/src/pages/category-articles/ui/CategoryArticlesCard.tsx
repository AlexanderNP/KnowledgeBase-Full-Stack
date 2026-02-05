import fallbackImgUrl from "@/assets/fallback-category.jpg";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { Heart, Eye, MessageCircle } from "lucide-react";
import type { CategoriesControllerGetCategoryByIdResponse } from "@/shared/api/generated";

export function CategoryArticlesCard(
  article: CategoriesControllerGetCategoryByIdResponse["articles"][0],
) {
  return (
    <Card>
      <CardHeader className="gap-5">
        <CardTitle className="flex items-center gap-10">
          <Link
            to="/app/articles/$articleId"
            params={{
              articleId: article.id,
            }}
            className="text-2xl"
          >
            {article.title}
          </Link>
        </CardTitle>
        <CardDescription className="flex items-center gap-7">
          <p>{article.createdAt}</p>
          <div className="flex items-center gap-1.5">
            <Heart />
            <p>{article.likesCount}</p>
          </div>
          <div className="flex items-center gap-1.5">
            <Eye />
            <p>{article.viewCount}</p>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <img
          src={article?.mediaFiles?.[0]?.url ?? fallbackImgUrl}
          alt={article.title}
          className="max-w-[728px]"
        />
      </CardContent>
      <CardFooter className="gap-5">
        <Button
          asChild
          variant="outline"
        >
          <Link
            to="/app/articles/$articleId"
            params={{
              articleId: article.id,
            }}
          >
            Читать
          </Link>
        </Button>
        <div className="ml-auto flex gap-2">
          <p>{article.comments?.length}</p>
          <MessageCircle />
        </div>
      </CardFooter>
    </Card>
  );
}
