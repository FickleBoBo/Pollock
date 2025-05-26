import { useState, useEffect, useRef } from "react";

import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

interface TrafficInfoProps {
  channelKey: string;
}

const TrafficInfo = ({ channelKey }: TrafficInfoProps) => {
  const clientRef = useRef<Client | null>(null);

  const [userCnt, setUserCnt] = useState("");
  const [gameCnt, setGameCnt] = useState("");

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

        client.subscribe("/topic/sessions", (message) => {
          setUserCnt(message.body);
        });

        client.subscribe("/topic/games", (message) => {
          setGameCnt(message.body);
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

  return (
    <div className="flex flex-col gap-2 p-4">
      <div className="flex justify-between">
        <div>접속자 수</div>
        <div>{userCnt}</div>
      </div>
      <div className="flex justify-between">
        <div>실시간 게임 수</div>
        <div>{gameCnt}</div>
      </div>
    </div>
  );
};

export default TrafficInfo;
