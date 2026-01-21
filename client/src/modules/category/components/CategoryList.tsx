import { CategoryCard } from "@/modules/category/components/CategoryCard";
import { CategoryListSkeleton } from "@/modules/category/components/CategoryListSkeleton";
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
    staleTime: Infinity,
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
