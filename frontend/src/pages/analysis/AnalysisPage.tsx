import { useState } from "react";

import { Chess } from "chess.js";

import ChessBoard from "../../components/common/ChessBoard";
import EngineAnalysis from "../../components/common/EngineAnalysis";

const AnalysisPage = () => {
  const [game, setGame] = useState(new Chess());
  const [analysis, setAnalysis] = useState("");

  return (
    <>
      <div>
        <ChessBoard game={game} setGame={setGame} />
      </div>
      <div>
        <EngineAnalysis
          fen={game.fen()}
          analysis={analysis}
          setAnalysis={setAnalysis}
        />
      </div>
    </>
  );
};

export default AnalysisPage;
