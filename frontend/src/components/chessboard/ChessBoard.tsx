import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";

import ScoreBar from "@/components/chessboard/ScoreBar";
import PieceIcon from "@/components/chessboard/PieceIcon";

interface ChessBoardProps {
  game: Chess;
  setGame: (game: Chess) => void;
  onCapture: (captured: string, by: "w" | "b") => void;
  scoreCp: number;
  scoreMate: number;
  capturedByWhite: string[];
  capturedByBlack: string[];
  capturedScore: number;
}

const ChessBoard = ({
  game,
  setGame,
  onCapture,
  scoreCp,
  scoreMate,
  capturedByWhite,
  capturedByBlack,
  capturedScore,
}: ChessBoardProps) => {
  const handlePieceDrop = (sourceSquare: string, targetSquare: string) => {
    const move = game.move({
      from: sourceSquare,
      to: targetSquare,
    });

    if (move === null) return false;

    if (move.captured) {
      const capturerColor = move.color === "w" ? "b" : "w";
      onCapture(move.captured, capturerColor);
    }

    setGame(new Chess(game.fen()));
    return true;
  };

  return (
    <div className="h-screen">
      <div className="grid grid-rows-[auto_1fr_auto] grid-cols-[auto_1fr] h-full gap-4 p-8">
        <div></div>
        <div>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10">
              <img
                src="/defaultProfileImg.jpg"
                alt="profile"
                className="w-full h-full rounded-xl object-cover"
              />
            </div>
            <div className="flex flex-col">
              <div>흑</div>
              <div className="flex">
                {capturedByWhite.map((p, i) => (
                  <PieceIcon key={i} color="WHITE" piece={p} />
                ))}
                <div>
                  {capturedScore < 0 ? (
                    <div>+{Math.abs(capturedScore)}</div>
                  ) : (
                    <div className="invisible">0</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <ScoreBar scoreCp={scoreCp} scoreMate={scoreMate} />
        </div>
        <div className="aspect-square">
          <Chessboard position={game.fen()} onPieceDrop={handlePieceDrop} />
        </div>
        <div></div>
        <div>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10">
              <img
                src="/defaultProfileImg.jpg"
                alt="profile"
                className="w-full h-full rounded-xl object-cover"
              />
            </div>
            <div className="flex flex-col">
              <div>백</div>
              <div className="flex">
                {capturedByBlack.map((p, i) => (
                  <PieceIcon key={i} color="BLACK" piece={p} />
                ))}
                <div>
                  {capturedScore > 0 ? (
                    <div>+{capturedScore}</div>
                  ) : (
                    <div className="invisible">0</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChessBoard;
