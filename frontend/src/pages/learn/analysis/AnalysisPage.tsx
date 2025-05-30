import { useState, useRef } from "react";

import { Chess } from "chess.js";

import { v4 as uuidv4 } from "uuid";

import { MdSettings } from "react-icons/md";

import { PIECE_ORDER, PIECE_VALUES } from "@/constant/piece";

import Button from "@/components/common/Button";
import ChessBoard from "@/components/chessboard/ChessBoard";
import EngineSettingModal from "@/components/analysis/EngineSettingModal";
import EngineAnalysis from "@/components/analysis/EngineAnalysis";

const AnalysisPage = () => {
  const channelKeyRef = useRef(uuidv4());

  const [game, setGame] = useState(new Chess());

  const [engineType, setEngineType] = useState("STOCKFISH_17_1");
  const [multipv, setMultipv] = useState(3);
  const [movetime, setMovetime] = useState(5000);

  const [scoreCp, setScoreCp] = useState(0);
  const [scoreMate, setScoreMate] = useState(0);

  const [capturedByWhite, setCapturedByWhite] = useState<string[]>([]);
  const [capturedByBlack, setCapturedByBlack] = useState<string[]>([]);
  const [capturedScore, setCapturedScore] = useState(0);

  const [isOpenSettingModal, setIsOpenSettingModal] = useState(false);

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

        <div className="flex flex-col my-8 bg-pollock800">
          <div className="flex">
            <div className="flex-1 flex justify-center items-center text-xl font-bold p-2">
              분석
            </div>
            <div className="flex items-center">
              <Button
                onClick={() => setIsOpenSettingModal(true)}
                className="p-2"
              >
                <MdSettings size={24} />
              </Button>
            </div>
          </div>

          <div className="flex-1">
            {/* 엔진 분석 결과 */}
            <EngineAnalysis
              channelKey={channelKeyRef.current}
              engineType={engineType}
              fen={game.fen()}
              multipv={multipv}
              movetime={movetime}
              setScoreCp={setScoreCp}
              setScoreMate={setScoreMate}
            />
          </div>

          {/* 엔진 옵션 선택 모달 */}
          <div>
            {isOpenSettingModal && (
              <EngineSettingModal
                engineType={engineType}
                setEngineType={setEngineType}
                multipv={multipv}
                setMultipv={setMultipv}
                movetime={movetime}
                setMovetime={setMovetime}
                onClose={() => setIsOpenSettingModal(false)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisPage;
