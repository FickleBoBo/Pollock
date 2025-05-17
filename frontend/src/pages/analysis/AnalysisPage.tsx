import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { Chess } from "chess.js";

import { UserInfo } from "../../constant/User";
import { PIECE_ORDER, PIECE_VALUES } from "../../constant/Piece";
import defaultProfileImg from "../../assets/image/defaultProfileImg.jpg";

import api from "../../common/api";

import EngineSettingsForm from "../../components/analysis/EngineSettingForm";
import ScoreBar from "../../components/analysis/ScoreBar";
import ChessBoard from "../../components/common/ChessBoard";
import PieceIcon from "../../components/analysis/PieceIcon";
import EngineAnalysis from "../../components/analysis/EngineAnalysis";

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

  return (
    <>
      <div className="w-3/4 mx-auto flex gap-8 my-16">
        {/* 엔진 옵션 선택 폼 */}
        <div className="w-[10%]">
          <EngineSettingsForm
            engineType={engineType}
            setEngineType={setEngineType}
            multiPV={multiPV}
            setMultiPV={setMultiPV}
            moveTime={moveTime}
            setMoveTime={setMoveTime}
          />
        </div>

        {/* 체스 보드 */}
        <div className="w-[60%]">
          <div className="flex flex-col gap-4">
            <div className="flex">
              <div className="w-[10%]"></div>
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
              <div className="w-[10%]"></div>
              <div className="w-[90%]">
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
              <div className="w-[5%]"></div>
              <div className="w-[90%]">
                <ChessBoard
                  game={game}
                  setGame={setGame}
                  onCapture={handleCapture}
                />
              </div>
            </div>
            <div className="flex">
              <div className="w-[10%]"></div>
              <div className="w-[90%]">
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
              <div className="w-[10%]"></div>
              <div className="w-[90%]">
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
