import axios from "axios";

const API_URL = "http://localhost:8081/api/pollock/stockfish";

interface Props {
  fen: string;
  analysis: string;
  setAnalysis: (result: string) => void;
}

const ChessEngine = ({ fen, analysis, setAnalysis }: Props) => {
  const requestAnalysis = async () => {
    try {
      const response = await axios.get(API_URL, {
        params: {
          fen,
        },
      });
      setAnalysis(response.data);
    } catch (error) {
      console.error("분석 요청 실패:", error);
      setAnalysis("서버 요청 실패");
    }
  };

  return (
    <div className="flex flex-col gap-2 w-[300px]">
      <button
        onClick={requestAnalysis}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        현재 FEN 분석 요청
      </button>
      <div className="bg-gray-100 border p-4 rounded h-[300px] overflow-auto whitespace-pre-wrap text-sm">
        <h2 className="font-bold mb-2">Stockfish 응답</h2>
        {analysis}
      </div>
    </div>
  );
};

export default ChessEngine;
