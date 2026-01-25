import { Editor } from "@/features/editor";
import { useState } from "react";

export const ArticleAdd = () => {
  const [content, setContent] = useState("");

  return (
    <Editor
      onChange={setContent}
      value={content}
    />
  );
};
