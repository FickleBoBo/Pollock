import { useEffect, useRef, useState, useCallback } from "react";

import api from "../../common/api";

interface EngineAnalysisProps {
  engineType: string;
  fen: string;
  multiPV: number;
  moveTime: number;
  setScoreCp: (value: number) => void;
  setScoreMate: (value: number) => void;
}

const EngineAnalysis = ({
  engineType,
  fen,
  multiPV,
  moveTime,
  setScoreCp,
  setScoreMate,
}: EngineAnalysisProps) => {
  const [analysis, setAnalysis] = useState<string[]>([]);
  const [streamKey, setStreamKey] = useState<string | null>(null);
  const [lastId, setLastId] = useState("0-0");

  const pollingRef = useRef<NodeJS.Timeout | null>(null);

  const startAnalysis = useCallback(async () => {
    try {
      const { data } = await api.post("/api/pollock/engine", {
        engineType,
        fen,
        multiPV,
        moveTime,
      });

      setStreamKey(data.streamKey);
      setAnalysis([]);
      setLastId("0-0");
    } catch (error) {
      console.error("분석 요청 실패:", error);
      setAnalysis(["❌ 서버 요청 실패"]);
    }
  }, [engineType, fen, multiPV, moveTime]);

  const pollAnalysis = useCallback(async () => {
    if (!streamKey) return;

    try {
      const { data } = await api.get("/api/pollock/engine", {
        params: { streamKey, lastId },
      });

      console.log("✅ 폴링 응답:", data);

      const rawMessages: string[] = data?.messages ?? [];
      const parsedMessages = rawMessages.map((msg) => {
        try {
          // JSON으로 되어있다면 파싱, 아니면 그대로
          const parsed = JSON.parse(msg);
          return typeof parsed === "object"
            ? JSON.stringify(parsed, null, 2)
            : String(parsed);
        } catch {
          return msg;
        }
      });

      setAnalysis((prev) => [...prev, ...parsedMessages]);
      if (data?.lastId) setLastId(data.lastId);
    } catch (error) {
      console.error("폴링 실패:", error);
    }
  }, [streamKey, lastId]);

  useEffect(() => {
    startAnalysis();
  }, [startAnalysis]);

  useEffect(() => {
    if (!streamKey) return;

    pollingRef.current = setInterval(() => {
      pollAnalysis();
    }, 500);

    return () => {
      if (pollingRef.current) clearInterval(pollingRef.current);
    };
  }, [streamKey, pollAnalysis]);

  return (
    <div className="flex flex-col">
      <div className="bg-gray-100 border rounded h-screen overflow-x-auto overflow-y-auto whitespace-pre text-sm">
        <h2 className="font-bold">📡 Stockfish 응답</h2>
        <pre className="text-black">{analysis.join("\n")}</pre>
      </div>
    </div>
  );
};

export default EngineAnalysis;
