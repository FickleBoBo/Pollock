interface EngineSettingsFormProps {
  engineType: string;
  setEngineType: (type: string) => void;
  multiPV: number;
  setMultiPV: (value: number) => void;
  moveTime: number;
  setMoveTime: (value: number) => void;
}

const EngineSettingsForm = ({
  engineType,
  setEngineType,
  multiPV,
  setMultiPV,
  moveTime,
  setMoveTime,
}: EngineSettingsFormProps) => {
  return (
    <div className="w-full flex flex-col items-center gap-8">
      {/* 체스 엔진 선택 */}
      <div className="w-full">
        <label className="block mb-4">체스 엔진</label>
        <select
          value={engineType}
          onChange={(e) => setEngineType(e.target.value)}
          className="w-full block text-black px-2 py-1 rounded"
        >
          {["STOCKFISH_17"].map((v) => (
            <option key={v} value={v}>
              {v}
            </option>
          ))}
        </select>
      </div>

      {/* 라인 수 선택 */}
      <div className="w-full">
        <label className="block mb-4">라인 수</label>
        <select
          value={multiPV}
          onChange={(e) => setMultiPV(Number(e.target.value))}
          className="w-full block text-black px-2 py-1 rounded"
        >
          {[1, 2, 3, 4, 5].map((v) => (
            <option key={v} value={v}>
              {v}
            </option>
          ))}
        </select>
      </div>

      {/* 최대 시간 선택 */}
      <div className="w-full">
        <label className="block mb-4">최대 시간</label>
        <select
          value={moveTime}
          onChange={(e) => setMoveTime(Number(e.target.value))}
          className="w-full block text-black px-2 py-1 rounded"
        >
          {[3000, 5000, 10000, 20000, 30000, 60000].map((ms) => (
            <option key={ms} value={ms}>
              {ms / 1000}초
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default EngineSettingsForm;
