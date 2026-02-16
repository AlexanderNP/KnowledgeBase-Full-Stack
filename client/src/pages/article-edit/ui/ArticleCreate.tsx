import { useCreateArticle } from "../model/hooks/useCreateArticle";
import { ArticleForm } from "./ArticleForm";

export const ArticleCreate = () => {
  const createForm = useCreateArticle();

  return (
    <ArticleForm
      type="create"
      {...createForm}
    />
  );
};
