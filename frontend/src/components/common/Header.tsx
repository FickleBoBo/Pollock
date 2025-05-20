import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { BiLogIn, BiLogOut } from "react-icons/bi";

import { UserInfo } from "../../constant/User";

import api from "../../common/api";

import Button from "./Button";

const Header = () => {
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

  // 로그아웃 핸들러
  const handleLogout = async () => {
    try {
      await api.post("/api/pollock/user/logout");
      window.location.href = "/";
    } catch (error) {
      console.error("로그아웃 실패:", error);
    }
  };

  return (
    <header className="mb-16">
      <div className="flex justify-between items-center px-16 bg-grayDark">
        {/* 헤더 좌측 */}
        <div className="flex items-center">
          {/* 메인 로고 */}
          <div className="mr-32">
            <Button
              className="text-3xl font-bold"
              text="Pollock"
              onClick={() => (window.location.href = "/")}
            />
          </div>
          {/* 학습 */}
          <div className="relative group px-16 py-8 hover:bg-grayBase transition">
            <div className="text-xl font-bold whitespace-nowrap">학습</div>

            <div className="absolute top-full left-0 w-full hidden group-hover:block bg-grayDark">
              <div className="hover:bg-grayBase transition">
                <Button
                  className="w-full py-4 text-xl font-bold whitespace-nowrap"
                  text="기보 학습"
                  onClick={() => navigate("/learn/notation")}
                />
              </div>
              <div className="hover:bg-grayBase transition">
                <Button
                  className="w-full py-4 text-xl font-bold whitespace-nowrap"
                  text="전술 학습"
                  onClick={() => navigate("/learn/tactic")}
                />
              </div>
            </div>
          </div>
          {/* 분석 */}
          <div className="hover:bg-grayBase transition">
            <Button
              className="text-xl font-bold px-16 py-8 whitespace-nowrap"
              text="분석"
              onClick={() => navigate("/analysis")}
            />
          </div>
        </div>
        {/* 헤더 우측 */}
        <div>
          {userInfo ? (
            <div className="flex items-center gap-4">
              <div>
                <Button
                  onClick={() => navigate("/setting")}
                  className="flex items-center gap-4"
                >
                  <div className="w-10 h-10">
                    <img
                      src={userInfo.profileImageUrl}
                      alt="profile"
                      className="w-full h-full rounded-xl object-cover"
                    />
                  </div>
                  <div className="whitespace-nowrap">{userInfo.nickname}</div>
                  <div className="whitespace-nowrap">ELO {userInfo.elo}</div>
                  <div className="whitespace-nowrap">{userInfo.grade}</div>
                </Button>
              </div>
              <div>
                <Button onClick={handleLogout} className="flex">
                  <BiLogOut size={32} />
                </Button>
              </div>
            </div>
          ) : (
            <div>
              <Button onClick={() => navigate("/login")} className="flex">
                <BiLogIn size={32} />
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
