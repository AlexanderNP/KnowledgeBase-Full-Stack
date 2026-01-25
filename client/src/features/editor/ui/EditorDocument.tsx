import { FileSymlink } from "lucide-react";
import { EditorUploadFile } from "./EditorUploadFile";
import type { ExecuteState, ICommand, TextAreaTextApi } from "@uiw/react-md-editor";

export const EditorDocument = (props: {
  command: ICommand;
  disabled: boolean;
  executeCommand: (command: ICommand, name?: string) => void;
}) => {
  const handleMDPaste = (inputUrl: string) => {
    props.command.execute = (state: ExecuteState, api: TextAreaTextApi) => {
      api.replaceSelection(`[someTitle](${inputUrl})\n`);
    };

    props.executeCommand(props.command, props.command.groupName);
  };

  return (
    <EditorUploadFile
      onSuccess={handleMDPaste}
      typeFile="DOCUMENT"
    >
      <button>
        <FileSymlink size={14} />
      </button>
    </EditorUploadFile>
  );
};
