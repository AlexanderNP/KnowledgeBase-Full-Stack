import MDEditor from "@uiw/react-md-editor";
import { useTheme } from "@/shared/contexts/theme";

interface PreviewProps {
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
        <MDEditor.Markdown source={content} />
      </div>
    </>
  );
};
