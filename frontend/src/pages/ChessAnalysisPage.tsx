import { useState } from "react";
import { Chess } from "chess.js";
import ChessBoard from "../components/ChessBoard";
import ChessEngine from "../components/ChessEngine";

const ChessAnalysisPage = () => {
  const [game, setGame] = useState(new Chess());
  const [analysis, setAnalysis] = useState("");

  return (
    <div>
      <ChessBoard game={game} setGame={setGame} />
      <ChessEngine
        fen={game.fen()}
        analysis={analysis}
        setAnalysis={setAnalysis}
      />
    </div>
  );
};

export default ChessAnalysisPage;
