import { useNavigate } from "react-router-dom";

import { FaRobot, FaUserFriends } from "react-icons/fa";

import { gameModes } from "../../constans/GameModes";

import api from "../../common/api";

import Header from "../../components/common/Header";
import Footer from "../../components/common/Footer";
import Button from "../../components/common/Button";

const HomePage = () => {
  const navigate = useNavigate();

  // 새 게임 시작 핸들러
  const handleNewGame = async (gameType: number) => {
    try {
      const response = await api.post("/api/pollock/game/new-game", {
        gameType,
      });
      const { roomId } = response.data;

      navigate(`/play/${roomId}`);
    } catch (error) {
      console.error("게임 시작 실패:", error);
      alert("게임을 시작할 수 없습니다.");
    }
  };

  return (
    <>
      <div>
        <Header />
      </div>

      <div className="w-1/2 mx-auto my-8">
        <div className="text-center text-xl font-bold py-4 my-8 bg-gray-700">
          새 게임
        </div>

        <div className="grid grid-cols-3 gap-4 my-8">
          {gameModes.map((mode, index) => (
            <Button
              key={index}
              onClick={() => handleNewGame(mode.gameType)}
              className="w-full h-full flex flex-col justify-center gap-8 text-3xl font-bold p-4 bg-gray-700 hover:bg-gray-600"
            >
              <div>{mode.timeControl}</div>
              {mode.gameFormat && <div>{mode.gameFormat}</div>}
            </Button>
          ))}
        </div>

        <div className="flex gap-4 my-8">
          <div className="flex-1">
            <Button
              onClick={() => navigate("/play/computer")}
              className="w-full font-bold p-4 bg-gray-700 hover:bg-gray-600"
            >
              <div className="flex justify-center items-center gap-4">
                <FaRobot size={32} />
                <div>봇과 플레이</div>
              </div>
            </Button>
          </div>
          <div className="flex-1">
            <Button
              onClick={() => navigate("/play/friend")}
              className="w-full font-bold p-4 bg-gray-700 hover:bg-gray-600"
            >
              <div className="flex justify-center items-center gap-4">
                <FaUserFriends size={32} />
                <div>친구와 플레이</div>
              </div>
            </Button>
          </div>
        </div>
      </div>

      <div>
        <Footer />
      </div>
    </>
  );
};

export default HomePage;
