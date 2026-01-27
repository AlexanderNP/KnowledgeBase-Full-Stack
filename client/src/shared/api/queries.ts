import { categoriesControllerGetCategoriesOptions } from "./generated/@tanstack/react-query.gen";
import type { CategoriesControllerGetCategoriesData, Options } from "./generated";

export const categoriesQueryOptionsOptions = (
  options?: Options<CategoriesControllerGetCategoriesData>,
) => {
  const defineQueryOptions: ReturnType<typeof categoriesControllerGetCategoriesOptions> = {
    ...categoriesControllerGetCategoriesOptions(options),
    staleTime: Infinity,
  };

  return defineQueryOptions;
};
