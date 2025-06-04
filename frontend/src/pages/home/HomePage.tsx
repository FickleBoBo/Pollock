import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { v4 as uuidv4 } from "uuid";

import { FaClock, FaRobot, FaUserFriends } from "react-icons/fa";

import { UserInfo } from "@/store/userStore";
import { useUserStore } from "@/store/userStore";

import { gameModes } from "@/constant/gameModes";

import api from "@/common/api";

import Button from "@/components/common/Button";
import Footer from "@/components/common/Footer";
import UserInfoSection from "@/components/home/UserInfoSection";
import TrafficInfo from "@/components/home/TrafficInfo";

const HomePage = () => {
  const channelKeyRef = useRef(uuidv4());

  const userInfo = useUserStore((state) => state.userInfo);
  const setUserInfo = useUserStore((state) => state.setUserInfo);

  const navigate = useNavigate();

  // 유저 정보 요청 API
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const { data } = await api.get<UserInfo>("/api/pollock/users/me");
        setUserInfo(data);
      } catch (error) {
        console.error("fetchUserInfo", error);
      }
    };

    fetchUserInfo();
  }, [setUserInfo]);

  // 새 게임 생성 핸들러
  const handleCreateNewGame = () => {
    alert("아직 새 게임을 생성할 수 없습니다.");
  };

  // 새 게임 시작 핸들러
  const handleStartNewGame = async () => {
    navigate("/match/BULLET_1_0");
  };

  return (
    <>
      <div className="flex gap-8 p-16">
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
                <TrafficInfo channelKey={channelKeyRef.current} />
              </div>
            </div>

            {/* 게임 옵션 */}
            <div className="w-2/3 p-4 border-4 border-pollock750">
              <div className="grid grid-cols-3 gap-4">
                {gameModes.map((mode, index) => (
                  <Button
                    key={index}
                    onClick={() => handleStartNewGame()}
                    className="w-full flex flex-col justify-center gap-4 text-xl font-bold p-4 bg-pollock750 hover:bg-pollock650"
                  >
                    <div>{mode.timeControl}</div>
                    <div>{mode.gameFormat}</div>
                  </Button>
                ))}
              </div>
            </div>
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
        </div>
      </div>

      <div>
        <Footer />
      </div>
    </>
  );
};

export default HomePage;
