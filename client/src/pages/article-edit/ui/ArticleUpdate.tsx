import { useUpdateArticle } from "../model/hooks/useUpdateArticle";
import { ArticleForm } from "./ArticleForm";

export const ArticleUpdate = ({ id }: { id: string }) => {
  const updateForm = useUpdateArticle(id);

  return (
    <ArticleForm
      type="update"
      {...updateForm}
    />
  );
};
