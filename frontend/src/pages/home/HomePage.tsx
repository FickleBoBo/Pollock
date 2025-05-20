import { useNavigate } from "react-router-dom";

import { FaRobot, FaUserFriends } from "react-icons/fa";

import { gameModes } from "../../constant/GameModes";

import Header from "../../components/common/Header";
import Footer from "../../components/common/Footer";
import Button from "../../components/common/Button";

const HomePage = () => {
  const navigate = useNavigate();

  // 새 게임 생성 핸들러
  const handleCreateNewGame = () => {
    alert("아직 새 게임을 생성할 수 없습니다.");
  };

  // 새 게임 시작 핸들러
  const handleStartNewGame = async (gameType: number) => {
    alert(`아직 ${gameType} 게임을 시작할 수 없습니다.`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div>
        <Header />
      </div>

      <div className="flex-grow flex my-16">
        {/* 왼쪽 사이드 영역 */}
        <div className="w-1/4"></div>

        {/* 중앙 영역 */}
        <div className="w-1/2 min-w-[800px]">
          <div>
            <Button
              text="새 게임 생성"
              onClick={handleCreateNewGame}
              className="w-full text-xl font-bold p-4 bg-grayDark hover:bg-grayBase"
            />
          </div>

          <div className="grid grid-cols-3 gap-4 my-8">
            {gameModes.map((mode, index) => (
              <Button
                key={index}
                onClick={() => handleStartNewGame(mode.gameType)}
                className="w-full flex flex-col justify-center gap-8 text-3xl font-bold p-4 bg-grayDark hover:bg-grayBase"
              >
                <div>{mode.timeControl}</div>
                <div>{mode.gameFormat}</div>
              </Button>
            ))}
          </div>

          <div className="flex gap-4 my-8">
            <div className="flex-1">
              <Button
                onClick={() => navigate("/play/computer")}
                className="w-full font-bold p-4 bg-grayDark hover:bg-grayBase"
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
                className="w-full font-bold p-4 bg-grayDark hover:bg-grayBase"
              >
                <div className="flex justify-center items-center gap-4">
                  <FaUserFriends size={32} />
                  <div>친구와 플레이</div>
                </div>
              </Button>
            </div>
          </div>
        </div>

        {/* 오른쪽 사이드 영역 */}
        <div className="w-1/4"></div>
      </div>

      <div>
        <Footer />
      </div>
    </div>
  );
};

export default HomePage;
