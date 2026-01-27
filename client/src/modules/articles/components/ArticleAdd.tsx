import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { MultiSelect } from "@/components/ui/multi-select";
import { Skeleton } from "@/components/ui/skeleton";
import { Editor } from "@/features/editor";
import { categoriesQueryOptionsOptions } from "@/shared/api/queries";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export const ArticleAdd = () => {
  const [content, setContent] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const { data: categories, status } = useQuery(categoriesQueryOptionsOptions());

  // Добавить всю обработку добавления статьи
  /// 1) Добавить валидацию + обработку роута на создание статьи
  /// 2) Перейти на разработку фичи просмотра статьи (Previewer)

  if (status === "pending") {
    return (
      <div className="flex flex-col gap-10">
        <div className="flex items-center justify-between gap-5.5">
          <Skeleton className="h-[100px] flex-1" />
          <Skeleton className="h-[100px] flex-1" />
        </div>
        <Field className="mb-6">
          <Skeleton className="flex h-[700px] w-[100%]" />
        </Field>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="flex items-center justify-center">
        <p className="text-2xl">{"Что-то пошло не так :("}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-10">
      <div className="flex items-center justify-between gap-5.5">
        <Field>
          <FieldLabel
            htmlFor="article-name"
            className="text-xl"
          >
            Введите название статьи <span className="text-destructive">*</span>
          </FieldLabel>
          <Input
            id="article-name"
            placeholder="Статья"
            required
          />
        </Field>
        {categories && (
          <Field>
            <FieldLabel className="text-xl">
              Выберите категории <span className="text-destructive">*</span>
            </FieldLabel>
            <MultiSelect
              options={categories}
              optionLabel="name"
              optionValue="id"
              maxCount={4}
              value={selectedCategories}
              onValueChange={setSelectedCategories}
              placeholder="Категория"
            />
          </Field>
        )}
      </div>
      <Field className="mb-6">
        <FieldLabel className="text-xl">Содержимое: </FieldLabel>
        <Editor
          onChange={setContent}
          value={content}
        />
      </Field>
    </div>
  );
};
