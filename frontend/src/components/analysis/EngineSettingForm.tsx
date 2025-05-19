import {
  engineTypeOption,
  multipvOption,
  movetimeOption,
} from "../../constant/Engine";

interface EngineSettingFormProps {
  engineType: string;
  setEngineType: (type: string) => void;
  multipv: number;
  setMultipv: (value: number) => void;
  movetime: number;
  setMovetime: (value: number) => void;
}

const EngineSettingForm = ({
  engineType,
  setEngineType,
  multipv,
  setMultipv,
  movetime,
  setMovetime,
}: EngineSettingFormProps) => {
  return (
    <div className="flex flex-col gap-8 p-4 bg-grayDark">
      {/* 체스 엔진 선택 */}
      <div className="flex flex-col gap-4">
        <label>체스 엔진</label>
        <select
          value={engineType}
          onChange={(e) => setEngineType(e.target.value)}
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
          value={multipv}
          onChange={(e) => setMultipv(Number(e.target.value))}
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
          value={movetime}
          onChange={(e) => setMovetime(Number(e.target.value))}
          className="text-black p-2 rounded"
        >
          {movetimeOption.map((ms) => (
            <option key={ms} value={ms}>
              {ms / 1000}초
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default EngineSettingForm;
