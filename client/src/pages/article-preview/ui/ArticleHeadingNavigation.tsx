import { Link } from "lucide-react";
import type { ArticleWithHeadings } from "@/shared/api/generated";

interface ArticleHeadingNavigation {
  headings: ArticleWithHeadings["headings"];
}

export const ArticleHeadingNavigation = ({ headings }: ArticleHeadingNavigation) => {
  return (
    <aside className="fixed top-40 right-12 hidden max-h-[70vh] w-72 flex-col gap-3 overflow-y-auto rounded-2xl border bg-background/95 p-6 shadow-xl backdrop-blur lg:flex">
      <h3 className="text-sm font-semibold tracking-wide text-muted-foreground uppercase">
        Содержание статьи
      </h3>

      <nav className="flex flex-col gap-2">
        {headings.map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            className="group flex items-center gap-2 text-sm text-foreground transition-colors hover:text-primary"
          >
            <span className="border-b border-transparent transition-all group-hover:border-current">
              {item}
            </span>

            <Link
              data-icon="inline-end"
              size={14}
              className="opacity-0 transition-opacity group-hover:opacity-100"
            />
          </a>
        ))}
      </nav>
    </aside>
  );
};
