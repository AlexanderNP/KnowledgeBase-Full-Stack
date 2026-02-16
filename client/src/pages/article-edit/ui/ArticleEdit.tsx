import { ArticleCreate } from "./ArticleCreate";
import { ArticleUpdate } from "./ArticleUpdate";

export const ArticleEdit = ({ id }: { id?: string }) => {
  return <>{id ? <ArticleUpdate id={id} /> : <ArticleCreate />}</>;
};
