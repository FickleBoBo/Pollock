import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { FaClock, FaRobot, FaUserFriends } from "react-icons/fa";

import { UserInfo } from "../../constant/User";
import { gameModes } from "../../constant/GameModes";

import api from "../../common/api";

import SideMenu from "../../components/common/SideMenu";
import Footer from "../../components/common/Footer";
import Button from "../../components/common/Button";
import UserInfoSection from "../../components/home/UserInfoSection";
import PuzzleCard from "../../components/home/PuzzleCard";
import StoreItemCarousel from "../../components/home/StoreItemCarousel";
import TrafficInfo from "../../components/home/TrafficInfo";
import MatchHistory from "../../components/home/MatchHistory";
import NewsCarousel from "../../components/home/NewsCarousel";

const HomePage = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  const navigate = useNavigate();

  // 유저 정보 요청 API
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const { data } = await api.get<UserInfo>("/api/pollock/user/me");
        setUserInfo(data);
      } catch (error) {
        console.error("유저 정보 조회 실패:", error);
      }
    };

    fetchUserInfo();
  }, []);

  // 새 게임 생성 핸들러
  const handleCreateNewGame = () => {
    alert("아직 새 게임을 생성할 수 없습니다.");
  };

  // 새 게임 시작 핸들러
  const handleStartNewGame = async (gameType: number) => {
    alert(`아직 ${gameType} 타입 게임을 시작할 수 없습니다.`);
  };

  return (
    <>
      <SideMenu userInfo={userInfo} />

      <main className="ml-48 p-16">
        <div className="flex gap-8">
          {/* 좌측 영역 */}
          <div className="w-3/4 flex flex-col gap-8">
            <div className="flex gap-8">
              <div className="w-1/3 flex flex-col justify-between p-4 border-4 border-pollock750">
                <div className="flex flex-col gap-8">
                  <div>
                    <Button
                      onClick={handleCreateNewGame}
                      className="w-full font-bold p-8 bg-pollock750 hover:bg-pollock650"
                    >
                      <div className="flex items-center gap-4">
                        <FaClock size={24} />
                        <div>새 게임</div>
                      </div>
                    </Button>
                  </div>
                  <div>
                    <Button
                      onClick={() => navigate("/play/computer")}
                      className="w-full font-bold p-8 bg-pollock750 hover:bg-pollock650"
                    >
                      <div className="flex items-center gap-4">
                        <FaRobot size={24} />
                        <div>봇과 플레이</div>
                      </div>
                    </Button>
                  </div>
                  <div>
                    <Button
                      onClick={() => navigate("/play")}
                      className="w-full font-bold p-8 bg-pollock750 hover:bg-pollock650"
                    >
                      <div className="flex items-center gap-4">
                        <FaUserFriends size={24} />
                        <div>친구와 플레이</div>
                      </div>
                    </Button>
                  </div>
                </div>

                {/* 현재 트래픽 정보 */}
                <div className="bg-pollock750">
                  <TrafficInfo />
                </div>
              </div>

              {/* 게임 옵션 */}
              <div className="w-2/3 p-4 border-4 border-pollock750">
                <div className="grid grid-cols-3 gap-4">
                  {gameModes.map((mode, index) => (
                    <Button
                      key={index}
                      onClick={() => handleStartNewGame(mode.gameType)}
                      className="w-full flex flex-col justify-center gap-4 text-xl font-bold p-4 bg-pollock750 hover:bg-pollock650"
                    >
                      <div>{mode.timeControl}</div>
                      <div>{mode.gameFormat}</div>
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            {/* 경기 내역 */}
            {userInfo && (
              <div>
                <MatchHistory />
              </div>
            )}

            {/* 뉴스 캐러셀 */}
            <div>
              <NewsCarousel />
            </div>
          </div>

          {/* 우측 영역 */}
          <div className="w-1/4 flex flex-col gap-8">
            {/* 유저 정보 */}
            {userInfo && (
              <div className="border-4 border-pollock750">
                <UserInfoSection userInfo={userInfo} />
              </div>
            )}

            {/* 데일리 퍼즐 */}
            <div>
              <PuzzleCard />
            </div>

            {/* 상점 캐러셀 */}
            <div>
              <StoreItemCarousel />
            </div>
          </div>
        </div>
      </main>

      <div>
        <Footer />
      </div>
    </>
  );
};

export default HomePage;
