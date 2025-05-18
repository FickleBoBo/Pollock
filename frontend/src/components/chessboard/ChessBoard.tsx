import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";

import ScoreBar from "./ScoreBar";
import { UserInfo } from "../../constant/User";

import defaultProfileImg from "../../assets/image/defaultProfileImg.jpg";

import PieceIcon from "./PieceIcon";

interface ChessBoardProps {
  game: Chess;
  setGame: (game: Chess) => void;
  onCapture: (captured: string, by: "w" | "b") => void;
  scoreCp: number;
  scoreMate: number;
  capturedByWhite: string[];
  capturedByBlack: string[];
  capturedScore: number;
  users: UserInfo[] | null;
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
  users,
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
    <div className="flex flex-col">
      <div className="flex">
        <div className="w-[10%]">김치1</div>
        <div className="w-[90%]">
          <div>
            {users ? (
              <div className="flex items-center gap-4">
                <img
                  src={users[0].profileImageUrl}
                  alt="profile"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>{users[0].nickname}</div>
                <div>ELO {users[0].elo}</div>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <img
                  src={defaultProfileImg}
                  alt="profile"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>흑</div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex">
        <div className="w-[10%]">김치2</div>
        <div className="w-[90%]">
          {" "}
          <div className="flex">
            {capturedByWhite.map((p, i) => (
              <PieceIcon key={i} color="white" piece={p} />
            ))}
            <div>
              {capturedScore < 0 ? (
                <div className="mx-2">+{Math.abs(capturedScore)}</div>
              ) : (
                <div className="invisible">0</div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="flex">
        <div className="w-[5%]">
          <ScoreBar scoreCp={scoreCp} scoreMate={scoreMate} />
        </div>
        <div className="w-[5%]">김치3</div>
        <div className="w-[90%]">
          <Chessboard position={game.fen()} onPieceDrop={handlePieceDrop} />
        </div>
      </div>
      <div className="flex">
        <div className="w-[10%]">김치4</div>
        <div className="w-[90%]">
          {" "}
          <div className="flex">
            {capturedByBlack.map((p, i) => (
              <PieceIcon key={i} color="black" piece={p} />
            ))}
            <div>
              {capturedScore > 0 ? (
                <div className="mx-2">+{capturedScore}</div>
              ) : (
                <div className="invisible">0</div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="flex">
        <div className="w-[10%]">김치5</div>
        <div className="w-[90%]">
          {" "}
          <div>
            {users ? (
              <div className="flex items-center gap-4">
                <img
                  src={users[1].profileImageUrl}
                  alt="profile"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>{users[1].nickname}</div>
                <div>ELO {users[1].elo}</div>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <img
                  src={defaultProfileImg}
                  alt="profile"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>백</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChessBoard;
