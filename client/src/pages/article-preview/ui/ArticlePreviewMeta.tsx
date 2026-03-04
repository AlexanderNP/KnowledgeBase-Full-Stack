import { Eye, Heart } from "lucide-react";

interface Props {
  title: string;
  viewCount: number;
  likesCount: number;
}

export const ArticlePreviewMeta = ({ title, viewCount, likesCount }: Props) => {
  return (
    <div className="flex flex-col gap-3.5">
      <h1>{title}</h1>
      <div className="flex gap-5.5">
        <div className="flex items-center gap-1.5">
          <Heart />
          <p>{likesCount}</p>
        </div>
        <div className="flex items-center gap-1.5">
          <Eye />
          <p>{viewCount}</p>
        </div>
      </div>
    </div>
  );
};
