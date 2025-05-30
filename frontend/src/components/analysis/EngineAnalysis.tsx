import { useState, useEffect, useRef } from "react";

import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

import { HiChevronUp, HiChevronDown } from "react-icons/hi";

import api from "@/common/api";

import Button from "@/components/common/Button";

interface EngineAnalysisResponseDTO {
  score: number | null;
  mate: number | null;
  currentPv: number;
  pvList: string[];
}

interface EngineAnalysisProps {
  channelKey: string;
  engineType: string;
  fen: string;
  multipv: number;
  movetime: number;
  setScoreCp: (value: number) => void;
  setScoreMate: (value: number) => void;
}

const EngineAnalysis = ({
  channelKey,
  engineType,
  fen,
  multipv,
  movetime,
  setScoreCp,
  setScoreMate,
}: EngineAnalysisProps) => {
  const clientRef = useRef<Client | null>(null);

  const [analysisMap, setAnalysisMap] = useState<
    Record<number, EngineAnalysisResponseDTO>
  >({});
  const [expandedLines, setExpandedLines] = useState<Record<number, boolean>>(
    {}
  );

  // 웹소켓 연결
  useEffect(() => {
    console.log("🔌 STOMP 연결 시도");

    const socket = new SockJS("http://localhost:8080/ws");

    const client = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      heartbeatIncoming: 10000,
      heartbeatOutgoing: 10000,

      onConnect: () => {
        console.log("✅ STOMP 연결 성공");

        client.subscribe(`/topic/ping/${channelKey}`, (message) => {
          console.log("🟢 ping 응답:", message.body);
        });

        client.subscribe(`/topic/analysis/${channelKey}`, (message) => {
          const responseDTO: EngineAnalysisResponseDTO = JSON.parse(
            message.body
          );

          setAnalysisMap((prev) => ({
            ...prev,
            [responseDTO.currentPv]: responseDTO,
          }));
        });

        client.publish({
          destination: `/app/heartbeat/${channelKey}`,
        });
      },

      onWebSocketError: (err) => {
        console.error("❌ WebSocket 에러", err);
      },

      onStompError: (frame) => {
        console.error("❌ STOMP 에러", frame.headers["message"], frame.body);
      },
    });

    clientRef.current = client;
    client.activate();

    return () => {
      console.log("🔌 STOMP 연결 종료 시도됨");
      clientRef.current?.deactivate();
    };
  }, [channelKey]);

  // 엔진 분석 요청
  useEffect(() => {
    const fetchEngineAnalysis = async () => {
      try {
        await api.post("/api/pollock/engine/analysis", {
          channelKey,
          engineType,
          fen,
          multipv,
          movetime,
        });
      } catch (error) {
        console.error("❌ [분석 요청] 실패:", error);
      }
    };

    fetchEngineAnalysis();
  }, [channelKey, engineType, fen, multipv, movetime]);

  // score cp, score mate 세팅
  useEffect(() => {
    const bestLine = analysisMap[1];
    if (!bestLine) return;

    const score = bestLine.score ?? 0;
    const mate = bestLine.mate ?? 0;

    setScoreCp(score);
    setScoreMate(mate);
  }, [analysisMap, fen, setScoreCp, setScoreMate]);

  const toggleLine = (pv: number) => {
    setExpandedLines((prev) => ({
      ...prev,
      [pv]: !prev[pv],
    }));
  };

  return (
    <div className="font-bold p-4 bg-pollock850">
      {Object.values(analysisMap)
        .sort((a, b) => a.currentPv - b.currentPv)
        .slice(0, multipv)
        .map((entry) => {
          const isExpanded = expandedLines[entry.currentPv] ?? false;

          return (
            <div
              key={entry.currentPv}
              className="flex gap-2 py-2 border-b border-white"
            >
              <div className="w-12 text-sm text-center">
                <div
                  className={`rounded ${
                    entry.mate !== null
                      ? entry.mate > 0
                        ? "bg-white text-black"
                        : "bg-black text-white"
                      : (entry.score ?? 0) >= 0
                      ? "bg-white text-black"
                      : "bg-black text-white"
                  }`}
                >
                  {entry.mate !== null
                    ? `${entry.mate > 0 ? "+" : "-"}M${Math.abs(entry.mate)}`
                    : `${(entry.score ?? 0) >= 0 ? "+" : "-"}${
                        Math.abs(entry.score ?? 0) / 100 >= 10
                          ? (Math.abs(entry.score ?? 0) / 100).toFixed(1)
                          : (Math.abs(entry.score ?? 0) / 100).toFixed(2)
                      }`}
                </div>
              </div>
              <div className="flex-1 text-xs p-1">
                {isExpanded ? (
                  <div className="flex flex-wrap overflow-hidden gap-2">
                    {entry.pvList.map((move, index) => (
                      <div key={index}>[{move}]</div>
                    ))}
                  </div>
                ) : (
                  <div>
                    <p className="line-clamp-1 overflow-hidden">
                      {entry.pvList.map((move, i) => (
                        <span key={i} className="mr-2">
                          [{move}]
                        </span>
                      ))}
                    </p>
                  </div>
                )}
              </div>
              <div>
                <Button onClick={() => toggleLine(entry.currentPv)}>
                  {isExpanded ? (
                    <HiChevronUp size={24} />
                  ) : (
                    <HiChevronDown size={24} />
                  )}
                </Button>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default EngineAnalysis;
