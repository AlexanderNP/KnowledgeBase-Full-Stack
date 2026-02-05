import { CategoryCard } from "@/pages/categories/ui/CategoryCard";
import { CategoriesSkeleton } from "@/pages/categories/ui/CategoriesSkeleton";
import { categoriesQueryOptionsOptions } from "@/shared/api/queries";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";

export function Categories() {
  const { data: categories, isError, isPending } = useQuery(categoriesQueryOptionsOptions());

  if (isPending) {
    return <CategoriesSkeleton />;
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
