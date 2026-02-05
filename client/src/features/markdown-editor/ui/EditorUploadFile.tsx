import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { FilePicker } from "@/features/file-pick";
import { articlesControllerUploadFileMutation } from "@/shared/api/generated/@tanstack/react-query.gen";

export const EditorUploadFile = ({
  onSuccess,
  onError,
  typeFile,
  children,
}: {
  typeFile: "IMG" | "DOCUMENT";
  onError?: (error: Error) => void;
  onSuccess?: (data: string) => void;
  children?: React.ReactElement;
}) => {
  const [file, setFile] = useState<File | null>(null);

  const useUploadImage = useMutation({
    ...articlesControllerUploadFileMutation(),
    onError: (error) => {
      onError?.(error);
      toast.error(error.message);
    },
    onSuccess: (data) => {
      onSuccess?.(data);
      toast.success("Файл успешно загружен!");
    },
  });

  const handleUpload = () => {
    if (!file) return;

    useUploadImage.mutate({
      body: {
        file: file,
      },
    });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        {children ?? (
          <Button
            variant="outline"
            size="sm"
          >
            {typeFile === "IMG" ? <>Загрузить изображение</> : <>Загрузить документ</>}
          </Button>
        )}
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="z-[99999] border-none p-0"
      >
        <FilePicker
          type={typeFile}
          changeFileValue={setFile}
        />
        <div className="flex justify-center p-2">
          <Button
            variant="outline"
            size="sm"
            disabled={!file}
            onClick={handleUpload}
          >
            Загрузить
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};
