import api from "../../common/api";
import Button from "./Button";

interface EngineAnalysisProps {
  fen: string;
  analysis: string;
  setAnalysis: (result: string) => void;
}

const EngineAnalysis = ({
  fen,
  analysis,
  setAnalysis,
}: EngineAnalysisProps) => {
  const requestAnalysis = async () => {
    try {
      const { data } = await api.post("/api/pollock/pollock-hub", {
        fen,
        multiPV: 1,
        moveTime: 3,
      });

      setAnalysis(data);
    } catch (error) {
      console.error("분석 요청 실패:", error);
      setAnalysis("서버 요청 실패");
    }
  };

  return (
    <div className="flex flex-col gap-2 w-[300px]">
      <Button
        text="현재 FEN 분석 요청"
        onClick={requestAnalysis}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      />
      <div className="bg-gray-100 border p-4 rounded h-[300px] overflow-auto whitespace-pre-wrap text-sm">
        <h2 className="font-bold mb-2">Stockfish 응답</h2>
        <pre>{analysis}</pre>
      </div>
    </div>
  );
};

export default EngineAnalysis;
