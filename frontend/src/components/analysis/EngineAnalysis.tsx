import { useEffect, useRef, useState } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import api from "../../common/api";

interface EngineAnalysisProps {
  engineType: string;
  fen: string;
  multiPV: number;
  moveTime: number;
  setScoreCp: (value: number) => void;
  setScoreMate: (value: number) => void;
  channelKey: string;
}

const EngineAnalysis = ({
  engineType,
  fen,
  multiPV,
  moveTime,
  setScoreCp,
  setScoreMate,
  channelKey,
}: EngineAnalysisProps) => {
  const [analysis, setAnalysis] = useState<string[]>([]);
  const clientRef = useRef<Client | null>(null);

  useEffect(() => {
    console.log("🔌 STOMP 연결 시도");

    const socket = new SockJS("http://localhost:8080/ws", undefined, {
      transports: ["xhr-streaming", "xhr-polling"],
      withCredentials: true,
    });

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
          setAnalysis((prev) => {
            const updated = [...prev, message.body];
            return updated.slice(-10); // 최근 10개만 유지
          });
        });

        client.publish({
          destination: `/app/heartbeat/${channelKey}`,
          body: "ping",
        });
      },
      onWebSocketError: (err) => {
        console.error("❌ WebSocket 에러", err);
      },
      onStompError: (frame) => {
        console.error("❌ STOMP 에러", frame.headers["message"], frame.body);
      },
      debug: (msg) => console.log("📡", msg),
    });

    clientRef.current = client;
    client.activate();

    return () => {
      console.log("🔌 STOMP 연결 종료 시도됨");
      clientRef.current?.deactivate();
    };
  }, [channelKey]);

  useEffect(() => {
    const start = async () => {
      const payload = {
        engineType,
        fen,
        multiPV,
        moveTime,
        channelKey,
      };

      console.log("📤 [분석 요청] 전송 중:", payload);

      try {
        await api.post("/api/pollock/engine/analysis", payload);
        console.log("✅ [분석 요청] 성공");
      } catch (error) {
        console.error("❌ [분석 요청] 실패:", error);
        setAnalysis(["❌ 서버 요청 실패"]);
      }
    };

    start();
  }, [engineType, fen, multiPV, moveTime, channelKey]);

  return (
    <div className="flex flex-col">
      <div className="bg-gray-100 border rounded h-screen overflow-x-auto overflow-y-auto whitespace-pre text-sm">
        <h2 className="font-bold">📡 Stockfish 응답</h2>
        <div className="text-black">김치</div>
        <pre className="text-black">
          {analysis.map((entry, idx) => {
            try {
              const parsed = JSON.parse(entry);
              return (
                <div
                  key={idx}
                  className="p-2 bg-white rounded shadow space-y-1"
                >
                  <div>
                    <strong>MultiPV:</strong>{" "}
                    {parsed.currentPv !== undefined ? parsed.currentPv : 1}
                  </div>
                  <div>
                    <strong>Score:</strong>{" "}
                    {parsed.mate !== null ? `#${parsed.mate}` : parsed.score}
                  </div>
                  <div>
                    <strong>PV:</strong>{" "}
                    <span className="break-words">
                      {parsed.pvList.join(" ")}
                    </span>
                  </div>
                </div>
              );
            } catch (e) {
              return (
                <div
                  key={idx}
                  className="p-2 bg-red-100 rounded shadow text-red-800"
                >
                  JSON 파싱 에러: {entry}
                </div>
              );
            }
          })}
        </pre>
      </div>
    </div>
  );
};

export default EngineAnalysis;
