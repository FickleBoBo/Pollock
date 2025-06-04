import { useState, useEffect, useRef } from "react";

import { Chess } from "chess.js";

import { PIECE_ORDER, PIECE_VALUES } from "@/constant/piece";

import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

import ChessBoard from "@/components/chessboard/ChessBoard";
import { useUserStore } from "@/store/userStore";
import { useParams } from "react-router-dom";

const PlayPage = () => {
  const [game, setGame] = useState(new Chess());

  const [scoreCp, setScoreCp] = useState(0);
  const [scoreMate, setScoreMate] = useState(0);

  const [capturedByWhite, setCapturedByWhite] = useState<string[]>([]);
  const [capturedByBlack, setCapturedByBlack] = useState<string[]>([]);
  const [capturedScore, setCapturedScore] = useState(0);

  const userInfo = useUserStore((state) => state.userInfo);
  const clientRef = useRef<Client | null>(null);
  const channelKey = userInfo?.nickname;

  const [user1, setUser1] = useState<string>("");
  const [user2, setUser2] = useState<string>("");

  const { gameId } = useParams();

  useEffect(() => {
    console.log("🔌 STOMP 연결 시도");
    console.log("김치");

    const socket = new SockJS("http://localhost:8080/ws");

    const client = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      heartbeatIncoming: 10000,
      heartbeatOutgoing: 10000,

      onConnect: () => {
        console.log("✅ STOMP 연결 성공");

        client.subscribe(`/topic/match/${channelKey}`, (message) => {
          console.log(channelKey);
          setUserCnt(message.body);
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

  const sortPieces = (pieces: string[]) =>
    [...pieces].sort(
      (a, b) =>
        PIECE_ORDER.indexOf(a.toLowerCase()) -
        PIECE_ORDER.indexOf(b.toLowerCase())
    );

  const handleCapture = (piece: string, by: "w" | "b") => {
    const score = PIECE_VALUES[piece.toLowerCase()] || 0;

    if (by === "w") {
      setCapturedByWhite((prev) => sortPieces([...prev, piece]));
      setCapturedScore((prev) => prev - score);
    } else {
      setCapturedByBlack((prev) => sortPieces([...prev, piece]));
      setCapturedScore((prev) => prev + score);
    }
  };

  return (
    <div className="w-4/5 mx-auto">
      <div className="flex">
        {/* 체스 보드 */}
        <div>
          <ChessBoard
            game={game}
            setGame={setGame}
            onCapture={handleCapture}
            scoreCp={scoreCp}
            scoreMate={scoreMate}
            capturedByWhite={capturedByWhite}
            capturedByBlack={capturedByBlack}
            capturedScore={capturedScore}
          />
        </div>
        <div>게임</div>
      </div>
    </div>
  );
};

export default PlayPage;
