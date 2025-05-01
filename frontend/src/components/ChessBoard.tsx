import React, { useState } from "react";
import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";

interface Props {
  game: Chess;
  setGame: (game: Chess) => void;
}

const ChessBoard = ({ game, setGame }: Props) => {
  const [moveFrom, setMoveFrom] = useState<string | null>(null);
  const [highlightSquares, setHighlightSquares] = useState<
    Record<string, React.CSSProperties>
  >({});
  const [lastMoveSquares, setLastMoveSquares] = useState<
    Record<string, React.CSSProperties>
  >({});

  const makeAMove = (move: {
    from: string;
    to: string;
    promotion?: string;
  }) => {
    const gameCopy = new Chess(game.fen());
    const result = gameCopy.move(move);

    if (result) {
      setGame(gameCopy);

      const highlights: Record<string, React.CSSProperties> = {
        [move.from]: { background: "#facc15" }, // 노란색
        [move.to]: { background: "#86efac" }, // 연두색
      };
      setLastMoveSquares(highlights);
    }

    return result;
  };

  const onDrop = (sourceSquare: string, targetSquare: string) => {
    const move = makeAMove({
      from: sourceSquare,
      to: targetSquare,
      promotion: "q",
    });

    return move !== null;
  };

  const onSquareClick = (square: string) => {
    if (moveFrom === square) {
      setMoveFrom(null);
      setHighlightSquares({});
      return;
    }

    if (moveFrom) {
      const possibleMoves = game.moves({ square: moveFrom, verbose: true });
      const isValidTarget = possibleMoves.some((move) => move.to === square);

      if (isValidTarget) {
        const move = makeAMove({
          from: moveFrom,
          to: square,
          promotion: "q",
        });

        setMoveFrom(null);
        setHighlightSquares({});
        return;
      }
    }

    const moves = game.moves({ square, verbose: true });
    if (moves.length === 0) {
      setMoveFrom(null);
      setHighlightSquares({});
      return;
    }

    const newHighlights: Record<string, React.CSSProperties> = {};
    moves.forEach((move) => {
      const isCapture = move.flags.includes("c") || move.flags.includes("e");
      newHighlights[move.to] = {
        background: isCapture
          ? "#f87171"
          : "radial-gradient(circle, #90cdf4 30%, transparent 30%)",
        borderRadius: isCapture ? undefined : "50%",
      };
    });
    newHighlights[square] = { background: "#facc15" };

    setMoveFrom(square);
    setHighlightSquares(newHighlights);
  };

  return (
    <Chessboard
      position={game.fen()}
      onPieceDrop={onDrop}
      onSquareClick={onSquareClick}
      customSquareStyles={{
        ...highlightSquares,
        ...lastMoveSquares,
      }}
      boardWidth={800}
    />
  );
};

export default ChessBoard;
