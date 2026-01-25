import { useState } from "react";
import { CloudUpload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { useFilePick } from "@/features/file-pick/hooks/useFilePick";

type Props = {
  type: "IMG" | "DOCUMENT";
  changeFileValue: (value: File | null) => void;
};

export const FilePicker = ({ type, changeFileValue }: Props) => {
  const {
    file,
    fileRef,
    handleChange: handleChangeFilePicker,
    handleClear: handleClearFilePicker,
    handleOpen: handleOpenFilePicker,
  } = useFilePick(onLoad);

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const accept = type === "IMG" ? "image/*" : ".pdf,.doc,.docx";

  function onLoad(e: ProgressEvent<FileReader>) {
    setPreviewUrl(e.target?.result as string);
  }

  const handleClear = () => {
    if (fileRef.current) {
      handleClearFilePicker();
      setPreviewUrl(null);
      changeFileValue(null);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleChangeFilePicker(e, changeFileValue);
  };

  return (
    <div className="rounded-sm border p-3.5">
      {previewUrl && file && (
        <div>
          {type === "IMG" ? (
            <div className="flex items-center justify-between">
              <img
                src={previewUrl}
                alt={file.name}
                className="max-h-25 rounded-md object-contain"
              />
              <Button
                size="icon"
                variant="secondary"
                onClick={handleClear}
              >
                <X />
              </Button>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <a
                href={previewUrl}
                target="_blank"
                className="underline"
              >
                {file.name}
              </a>
              <Button
                size="icon"
                variant="secondary"
                onClick={handleClear}
              >
                <X />
              </Button>
            </div>
          )}
        </div>
      )}

      {!file && (
        <div
          className="flex cursor-pointer flex-col items-center gap-2 rounded-md border border-dashed p-3.5"
          onClick={handleOpenFilePicker}
        >
          <CloudUpload />
          <p>Выберите файл для загрузки</p>
        </div>
      )}

      <Input
        ref={fileRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={handleChange}
      />
    </div>
  );
};
