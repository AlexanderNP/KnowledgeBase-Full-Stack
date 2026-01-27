import MDEditor from "@uiw/react-md-editor";
import { commands } from "@uiw/react-md-editor";
import { useTheme } from "@/shared/contexts/theme";
import { EditorImageGroup } from "./EditorImageGroup";
import { EditorDocument } from "./EditorDocument";
import type { ICommand, MDEditorProps } from "@uiw/react-md-editor";

const imageGroup: ICommand = {
  name: "image-group",
  groupName: "image-group",
  buttonProps: { "aria-label": "Upload or insert image" },
  icon: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-image-plus-icon lucide-image-plus"
    >
      <path d="M16 5h6" />
      <path d="M19 2v6" />
      <path d="M21 11.5V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7.5" />
      <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
      <circle
        cx="9"
        cy="9"
        r="2"
      />
    </svg>
  ),
  children: (props) => <EditorImageGroup {...props} />,
};

const documentCommand: ICommand = {
  name: "document",
  keyCommand: "document",
  render: (command, disabled, executeCommand) => (
    <EditorDocument
      command={command}
      disabled={disabled}
      executeCommand={executeCommand}
    />
  ),
};

export const Editor = ({
  value,
  onChange,
}: {
  value: MDEditorProps["value"];
  onChange: MDEditorProps["onChange"];
}) => {
  const { theme } = useTheme();

  const filterCommands = () => [
    ...commands.getCommands().filter((item) => item.name !== "image"),
    commands.divider,
    commands.group([], imageGroup),
    documentCommand,
  ];

  return (
    <MDEditor
      data-color-mode={theme}
      value={value}
      onChange={onChange}
      preview="edit"
      height={700}
      commands={filterCommands()}
    />
  );
};
