import { useRef } from "react";

import Button from "../common/Button";

interface PgnUploadProps {
  onUpload: (file: File) => void;
}

const PgnUpload = ({ onUpload }: PgnUploadProps) => {
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
        className="w-full px-4 py-2 rounded bg-grayDark hover:bg-grayBase"
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

export default PgnUpload;
