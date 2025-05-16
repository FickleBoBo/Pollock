import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";

interface ChessBoardProps {
  game: Chess;
  setGame: (game: Chess) => void;
}

const ChessBoard = ({ game, setGame }: ChessBoardProps) => {
  const handlePieceDrop = (sourceSquare: string, targetSquare: string) => {
    const move = game.move({
      from: sourceSquare,
      to: targetSquare,
    });

    if (move === null) return false;

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
