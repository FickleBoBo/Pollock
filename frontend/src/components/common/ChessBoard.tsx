import React, { useState } from "react";
import { Chess, Square } from "chess.js";
import { Chessboard } from "react-chessboard";

interface Props {
  game: Chess;
  setGame: (game: Chess) => void;
}

const PROMOTION_PIECES = ["q", "r", "b", "n"];

export default function ChessBoard({ game, setGame }: Props) {
  const [moveFrom, setMoveFrom] = useState<string | null>(null);
  const [highlightSquares, setHighlightSquares] = useState<
    Record<string, React.CSSProperties>
  >({});
  const [lastMoveSquares, setLastMoveSquares] = useState<
    Record<string, React.CSSProperties>
  >({});
  const [promotionDetails, setPromotionDetails] = useState<{
    from: string;
    to: string;
    color: "w" | "b";
  } | null>(null);

  const customSquareStyles = {
    ...highlightSquares,
    ...lastMoveSquares,
  };

  const makeAMove = (from: string, to: string, promotion?: string) => {
    const gameCopy = new Chess(game.fen());
    const move = gameCopy.move({ from, to, promotion });

    if (move === null) return false;

    setGame(gameCopy);
    setMoveFrom(null);
    setHighlightSquares({});
    setLastMoveSquares({
      [from]: { backgroundColor: "rgba(255, 255, 0, 0.4)" },
      [to]: { backgroundColor: "rgba(255, 255, 0, 0.4)" },
    });

    return true;
  };

  const onSquareClick = (square: Square) => {
    if (promotionDetails) return;

    if (!moveFrom) {
      const piece = game.get(square);
      if (piece && piece.color === game.turn()) {
        setMoveFrom(square);
        showMoveOptions(square);
      }
      return;
    }

    const moves = game.moves({ verbose: true });
    const targetMove = moves.find(
      (m) => m.from === moveFrom && m.to === square
    );

    if (targetMove?.promotion) {
      setPromotionDetails({ from: moveFrom, to: square, color: game.turn() });
      return;
    }

    const moved = makeAMove(moveFrom, square);
    if (!moved) {
      setMoveFrom(null);
      setHighlightSquares({});
    }
  };

  const onDrop = (sourceSquare: Square, targetSquare: Square) => {
    if (promotionDetails) return false;

    const moves = game.moves({ verbose: true });
    const move = moves.find(
      (m) => m.from === sourceSquare && m.to === targetSquare
    );

    if (move?.promotion) {
      setPromotionDetails({
        from: sourceSquare,
        to: targetSquare,
        color: game.turn(),
      });
      return false;
    }

    return makeAMove(sourceSquare, targetSquare);
  };

  const showMoveOptions = (square: Square) => {
    const moves = game.moves({ square, verbose: true });
    if (moves.length === 0) return;

    const newHighlight: Record<string, React.CSSProperties> = {};
    for (const move of moves) {
      if ("captured" in move) {
        newHighlight[move.to] = { backgroundColor: "rgba(255, 0, 0, 0.4)" };
      } else {
        newHighlight[move.to] = {
          background:
            "radial-gradient(circle, rgba(0,0,0,0.2) 25%, transparent 25%)",
        };
      }
    }

    newHighlight[square] = { backgroundColor: "rgba(255, 255, 0, 0.4)" };
    setHighlightSquares(newHighlight);
  };

  const onPromotionSelect = (piece: string) => {
    if (!promotionDetails) return;
    makeAMove(promotionDetails.from, promotionDetails.to, piece);
    setPromotionDetails(null);
  };

  return (
    <div className="relative">
      <Chessboard
        position={game.fen()}
        onPieceDrop={onDrop}
        onSquareClick={onSquareClick}
        customSquareStyles={customSquareStyles}
        boardOrientation="white"
        boardWidth={560}
      />

      {promotionDetails && (
        <div className="absolute top-1/2 left-1/2 z-50 grid grid-cols-2 gap-2 p-4 bg-white border rounded shadow -translate-x-1/2 -translate-y-1/2">
          {PROMOTION_PIECES.map((p) => {
            const pieceKey = `${promotionDetails.color}${p}`; // eg. 'wq'
            return (
              <button
                key={p}
                onClick={() => onPromotionSelect(p)}
                className="w-16 h-16 hover:ring-2"
              >
                <img
                  src={`https://www.chess.com/chess-themes/pieces/neo/150/${pieceKey}.png`}
                  alt={pieceKey}
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
