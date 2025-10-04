import { CategoryCard } from "@/entities/category-card/ui/CategoryCard";
import { CategoryListSkeleton } from "@/features/category-list/ui/CategoryListSkeleton";
import { categoriesControllerGetCategoriesOptions } from "@/shared/api/generated/@tanstack/react-query.gen";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";

export function CategoryList() {
  const {
    data: categories,
    isError,
    isPending,
  } = useQuery({
    ...categoriesControllerGetCategoriesOptions(),
  });

  if (isPending) {
    return <CategoryListSkeleton />;
  }

  if (isError) {
    return (
      <div className="flex align-middle">
        <h1>Произошла ошибка при получение категорий</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap justify-between gap-3.5">
      {categories?.map((category) => (
        <Link
          key={category.id}
          to={"/app/categories/$categoryId"}
          params={{
            categoryId: category.id,
          }}
          className="flex h-[325px] basis-sm"
        >
          <CategoryCard {...category} />
        </Link>
      ))}
    </div>
  );
}
