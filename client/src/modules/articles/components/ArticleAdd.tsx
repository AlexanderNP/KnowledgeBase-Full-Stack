import { Editor } from "@/features/editor";
import { useState } from "react";

export const ArticleAdd = () => {
  const [content, setContent] = useState("");

  // Добавить всю обработку добавления статьи
  /// 1) Инпут поле названия статьи
  /// 2) Мультиселект с выбором категорий статьи
  /// 3) Написать функцию, которая будет парсить контент -> отображать из него ссылки на изображения и файлы
  /// 4) Перейти на разработку фичи просмотра статьи (Previewer)
  return (
    <Editor
      onChange={setContent}
      value={content}
    />
  );
};
