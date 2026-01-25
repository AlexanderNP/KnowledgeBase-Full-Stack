import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EditorUploadFile } from "./EditorUploadFile";
import type {
  ContextStore,
  TextAreaCommandOrchestrator,
  TextAreaTextApi,
} from "@uiw/react-md-editor";

export const EditorImageGroup = (props: {
  close: () => void;
  execute: () => void;
  getState?: TextAreaCommandOrchestrator["getState"];
  textApi?: TextAreaTextApi;
  dispatch?: React.Dispatch<ContextStore>;
}) => {
  const handleMDPaste = (inputImageUrl?: string) => {
    if (inputImageUrl) {
      props?.textApi?.replaceSelection(`![image](${inputImageUrl})\n`);
      props.close();
      return;
    }

    const state = props?.getState?.();

    if (typeof state !== "object") return;

    const mdImageUrl = state.selectedText
      ? `![image](${state.selectedText})\n`
      : `![image](https://example.com/your-image.png)\n`;

    props?.textApi?.replaceSelection(mdImageUrl);
    props.close();
  };

  return (
    <div className="w-[430px] p-3">
      <p className="mb-5">Выберите варианты для изображения</p>
      <X
        className="absolute top-2 right-2 cursor-pointer"
        size={16}
        onClick={() => props.close()}
      />
      <div className="flex gap-3.5 align-middle">
        <EditorUploadFile onSuccess={handleMDPaste} />
        <Button
          variant="outline"
          onClick={() => handleMDPaste()}
          size="sm"
        >
          Вставить md разметку
        </Button>
      </div>
    </div>
  );
};
