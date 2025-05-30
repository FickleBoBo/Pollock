import { useState, useEffect, useRef } from "react";

import {
  engineTypeOption,
  multipvOption,
  movetimeOption,
} from "@/constant/engine";

import Button from "@/components/common/Button";

interface EngineSettingModalProps {
  engineType: string;
  setEngineType: (value: string) => void;
  multipv: number;
  setMultipv: (value: number) => void;
  movetime: number;
  setMovetime: (value: number) => void;
  onClose: () => void;
}

const EngineSettingModal = ({
  engineType,
  setEngineType,
  multipv,
  setMultipv,
  movetime,
  setMovetime,
  onClose,
}: EngineSettingModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const [tmpEngineType, setTmpEngineType] = useState(engineType);
  const [tmpMultipv, setTmpMultipv] = useState(multipv);
  const [tmpMovetime, setTmpMovetime] = useState(movetime);

  useEffect(() => {
    const handleOutsideClickOrEscape = (event: MouseEvent | KeyboardEvent) => {
      if (
        event instanceof MouseEvent &&
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }

      if (event instanceof KeyboardEvent && event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleOutsideClickOrEscape);
    document.addEventListener("keydown", handleOutsideClickOrEscape);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClickOrEscape);
      document.removeEventListener("keydown", handleOutsideClickOrEscape);
    };
  }, [onClose]);

  const handleConfirm = () => {
    setEngineType(tmpEngineType);
    setMultipv(tmpMultipv);
    setMovetime(tmpMovetime);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div ref={modalRef} className="w-64 p-8 bg-pollock800">
        <div className="flex flex-col gap-8">
          {/* 체스 엔진 선택 */}
          <div className="flex flex-col gap-4">
            <label>체스 엔진</label>
            <select
              value={tmpEngineType}
              onChange={(e) => setTmpEngineType(e.target.value)}
              className="text-black p-2 rounded"
            >
              {Object.entries(engineTypeOption).map(([label, value]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>

          {/* 라인 수 선택 */}
          <div className="flex flex-col gap-4">
            <label>라인 수</label>
            <select
              value={tmpMultipv}
              onChange={(e) => setTmpMultipv(Number(e.target.value))}
              className="text-black p-2 rounded"
            >
              {multipvOption.map((v) => (
                <option key={v} value={v}>
                  {v}
                </option>
              ))}
            </select>
          </div>

          {/* 최대 시간 선택 */}
          <div className="flex flex-col gap-4">
            <label>최대 시간</label>
            <select
              value={tmpMovetime}
              onChange={(e) => setTmpMovetime(Number(e.target.value))}
              className="text-black p-2 rounded"
            >
              {movetimeOption.map((ms) => (
                <option key={ms} value={ms}>
                  {ms / 1000}초
                </option>
              ))}
            </select>
          </div>

          <div className="text-right">
            <Button
              onClick={handleConfirm}
              text="확인"
              className="px-4 py-2 bg-pollock850 hover:bg-pollock750"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EngineSettingModal;
