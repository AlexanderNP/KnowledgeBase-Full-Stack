import { Field as UiField, FieldLabel as UiFieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { MultiSelect } from "@/components/ui/multi-select";
import { Skeleton } from "@/components/ui/skeleton";
import { Editor } from "@/features/markdown-editor";
import { categoriesQueryOptionsOptions } from "@/shared/api/queries";
import { useQuery } from "@tanstack/react-query";
import { useCreateArticle } from "@/pages/article-edit/model/hooks/useCreateArticle";
import { Button } from "@/components/ui/button";
import { CirclePlus, Loader } from "lucide-react";
import { ErrorFields } from "@/components/ErrorFields";

export const ArticleEdit = () => {
  const { Field, Subscribe, handleSubmit } = useCreateArticle();
  const { data: categories, status } = useQuery(categoriesQueryOptionsOptions());

  if (status === "pending") {
    return (
      <div className="flex flex-col gap-10">
        <div className="flex items-center justify-between gap-5.5">
          <Skeleton className="h-[100px] flex-1" />
          <Skeleton className="h-[100px] flex-1" />
        </div>
        <UiField className="mb-6">
          <Skeleton className="flex h-[700px] w-[100%]" />
        </UiField>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="flex items-center justify-center">
        <p className="text-2xl">Что-то пошло не так :(</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
      className="flex h-[100%] flex-col gap-4"
    >
      <Subscribe
        selector={(state) => [state.canSubmit, state.isSubmitting]}
        children={([canSubmit, isSubmitting]) => (
          <Button
            type="submit"
            className="ml-auto animate-bounce bg-emerald-800 text-amber-100 hover:bg-emerald-700"
            size="lg"
            disabled={!canSubmit || isSubmitting}
          >
            {isSubmitting ? <Loader className="animate-spin" /> : <CirclePlus />}
            Создать
          </Button>
        )}
      />
      <div className="flex items-center justify-between gap-5.5">
        <Field
          name="title"
          children={({ state, handleChange }) => (
            <UiField data-invalid={!state.meta.isValid}>
              <UiFieldLabel
                htmlFor="article-name"
                className="text-xl"
              >
                Введите название статьи <span className="text-destructive">*</span>
              </UiFieldLabel>
              <Input
                className="h-[40px]"
                value={state.value}
                onChange={(e) => handleChange(e.target.value)}
                id="article-name"
                aria-invalid={!state.meta.isValid}
                placeholder="Статья"
              />
              <ErrorFields meta={state.meta} />
            </UiField>
          )}
        />
        {categories && (
          <Field
            name="categoryIds"
            children={({ state, handleChange }) => (
              <UiField data-invalid={!state.meta.isValid}>
                <UiFieldLabel className="text-xl">
                  Выберите категории <span className="text-destructive">*</span>
                </UiFieldLabel>
                <MultiSelect
                  invalid={!state.meta.isValid}
                  options={categories}
                  optionLabel="name"
                  optionValue="id"
                  maxCount={4}
                  value={state.value}
                  onValueChange={handleChange}
                  placeholder="Категория"
                />
                <ErrorFields meta={state.meta} />
              </UiField>
            )}
          />
        )}
      </div>
      <Field
        name="content"
        children={({ state, handleChange }) => (
          <UiField
            className="mb-6 grow"
            data-invalid={!state.meta.isValid}
          >
            <UiFieldLabel className="text-xl">
              Содержимое <span className="text-destructive">*</span>
            </UiFieldLabel>
            <Editor
              onChange={(value) => handleChange(value ?? "")}
              value={state.value}
            />
            <ErrorFields meta={state.meta} />
          </UiField>
        )}
      />
    </form>
  );
};
