import { useRef } from "react";

import Button from "../common/Button";

interface PgnUploadFormProps {
  onUpload: (file: File) => void;
}

const PgnUploadForm = ({ onUpload }: PgnUploadFormProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleChange = () => {
    const file = fileInputRef.current?.files?.[0];

    if (file) {
      onUpload(file);
    }
  };

  return (
    <div>
      <Button
        onClick={handleClick}
        text="PGN 파일 업로드"
        className="w-full text-lg font-bold p-4 rounded bg-grayDark hover:bg-grayBase"
      />
      <input
        type="file"
        accept=".pgn"
        onChange={handleChange}
        ref={fileInputRef}
        className="hidden"
      />
    </div>
  );
};

export default PgnUploadForm;
