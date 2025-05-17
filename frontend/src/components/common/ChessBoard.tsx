import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";

interface ChessBoardProps {
  game: Chess;
  setGame: (game: Chess) => void;
  onCapture: (captured: string, by: "w" | "b") => void;
}

const ChessBoard = ({ game, setGame, onCapture }: ChessBoardProps) => {
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
    <div>
      <Chessboard position={game.fen()} onPieceDrop={handlePieceDrop} />
    </div>
  );
};

export default ChessBoard;
