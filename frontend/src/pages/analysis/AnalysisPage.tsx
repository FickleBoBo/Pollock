import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { Chess } from "chess.js";

import { UserInfo } from "../../constant/User";
import { PIECE_ORDER, PIECE_VALUES } from "../../constant/Piece";

import api from "../../common/api";

import EngineSettingsForm from "../../components/analysis/EngineSettingForm";
import ChessBoard from "../../components/chessboard/ChessBoard";
import EngineAnalysis from "../../components/analysis/EngineAnalysis";
import PgnUpload from "../../components/analysis/PgnUpload";

const AnalysisPage = () => {
  const { gameId } = useParams();

  const [users, setUsers] = useState<UserInfo[] | null>(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        if (!gameId) return;

        const { data } = await api.get<UserInfo[]>(
          `/api/pollock/user/${gameId}`
        );
        setUsers(data);
      } catch (error) {
        console.error("게임 정보 불러오기 실패:", error);
      }
    };

    fetchUserInfo();
  }, [gameId]);

  const [game, setGame] = useState(new Chess());

  const [engineType, setEngineType] = useState("STOCKFISH_17");
  const [multiPV, setMultiPV] = useState(3);
  const [moveTime, setMoveTime] = useState(5000);

  const [scoreCp, setScoreCp] = useState(0);
  const [scoreMate, setScoreMate] = useState(0);

  const [capturedByWhite, setCapturedByWhite] = useState<string[]>([]);
  const [capturedByBlack, setCapturedByBlack] = useState<string[]>([]);
  const [capturedScore, setCapturedScore] = useState(0);

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

  const handlePgnUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      await api.post("/api/pollock/engine/analysis/pgn", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("업로드 성공!");
    } catch (error) {
      console.error("업로드 실패:", error);
      alert("업로드 실패");
    }
  };

  return (
    <>
      <div className="w-3/4 mx-auto flex gap-8 my-16">
        <div className="w-[10%]">
          <div className="flex flex-col gap-8">
            {/* 엔진 옵션 선택 폼 */}
            <div>
              <EngineSettingsForm
                engineType={engineType}
                setEngineType={setEngineType}
                multiPV={multiPV}
                setMultiPV={setMultiPV}
                moveTime={moveTime}
                setMoveTime={setMoveTime}
              />
            </div>
            {/* pgn 업로드 폼 */}
            <div>
              <PgnUpload onUpload={handlePgnUpload} />
            </div>
          </div>
        </div>

        {/* 체스 보드 */}
        <div className="w-[60%]">
          <div className="flex flex-col gap-8">
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
                users={users}
              />
            </div>
          </div>
        </div>

        {/* 엔진 분석 결과 */}
        <div className="w-[30%]">
          <EngineAnalysis
            fen={game.fen()}
            engineType={engineType}
            multiPV={multiPV}
            moveTime={moveTime}
            setScoreCp={setScoreCp}
            setScoreMate={setScoreMate}
          />
        </div>
      </div>
    </>
  );
};

export default AnalysisPage;
