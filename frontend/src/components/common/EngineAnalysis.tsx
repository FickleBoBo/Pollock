import { useEffect, useRef, useState, useCallback } from "react";
import api from "../../common/api";
import Button from "./Button";

interface EngineAnalysisProps {
  fen: string;
  multiPV?: number;
  moveTime?: number;
}

const EngineAnalysis = ({
  fen,
  multiPV = 2,
  moveTime = 10000,
}: EngineAnalysisProps) => {
  const [analysis, setAnalysis] = useState<string[]>([]);
  const [streamId, setStreamId] = useState<string | null>(null);
  const [lastId, setLastId] = useState("0-0");

  const pollingRef = useRef<NodeJS.Timeout | null>(null);

  const startAnalysis = useCallback(async () => {
    try {
      const { data } = await api.post("/api/pollock/engine", {
        fen,
        multiPV,
        moveTime,
      });

      setStreamId(data.streamId);
      setAnalysis([]);
      setLastId("0-0");
    } catch (error) {
      console.error("분석 요청 실패:", error);
      setAnalysis(["❌ 서버 요청 실패"]);
    }
  }, [fen, multiPV, moveTime]);

  const pollAnalysis = useCallback(async () => {
    if (!streamId) return;

    try {
      const { data } = await api.get("/api/pollock/engine", {
        params: { streamId, lastId },
      });

      console.log("✅ 폴링 응답:", data); // 이 줄 추가

      const parsed = data;
      const newMessages = parsed.messages.map((m: any) => m.result);
      setAnalysis((prev) => [...prev, ...newMessages]);
      setLastId(parsed.nextId);
    } catch (error) {
      console.error("폴링 실패:", error);
    }
  }, [streamId, lastId]);

  useEffect(() => {
    startAnalysis();
  }, [startAnalysis]);

  useEffect(() => {
    if (!streamId) return;

    pollingRef.current = setInterval(() => {
      pollAnalysis();
    }, 500);

    return () => {
      if (pollingRef.current) clearInterval(pollingRef.current);
    };
  }, [streamId, pollAnalysis]);

  return (
    <div className="flex flex-col gap-2 w-screen px-4">
      <Button
        text="📤 현재 FEN 분석 요청"
        onClick={startAnalysis}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      />
      <div className="bg-gray-100 border p-4 rounded h-screen overflow-x-auto overflow-y-auto whitespace-pre text-sm">
        <h2 className="font-bold mb-2">📡 Stockfish 응답</h2>
        <pre>{analysis.join("\n")}</pre>
      </div>
    </div>
  );
};

export default EngineAnalysis;
