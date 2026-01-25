import { useRef, useState } from "react";

export const useFilePick = (onLoad?: (e: ProgressEvent<FileReader>) => void) => {
  const fileRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);

  const handleOpen = () => {
    fileRef.current?.click();
  };

  const handleClear = () => {
    if (fileRef.current) {
      fileRef.current.value = "";
      setFile(null);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;

    const file = e.target.files[0];

    setFile(file);
    readFile(file);
  };

  const readFile = (file: File) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      if (!onLoad) return;

      onLoad(e);
    };

    reader.readAsDataURL(file);
  };

  return {
    fileRef,
    file,
    handleOpen,
    handleClear,
    handleChange,
  };
};
