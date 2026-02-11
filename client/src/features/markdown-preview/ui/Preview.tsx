import MDEditor from "@uiw/react-md-editor";
import { useTheme } from "@/shared/contexts/theme";
import type { MarkdownPreviewProps } from "@uiw/react-markdown-preview";
interface PreviewProps extends MarkdownPreviewProps {
  content: string;
}

export const Preview = ({ content }: PreviewProps) => {
  const { theme } = useTheme();

  return (
    <>
      <div
        className="container"
        data-color-mode={theme}
      >
        <MDEditor.Markdown
          data-color-mode={theme}
          source={content}
          className="p-5"
        />
      </div>
    </>
  );
};
