import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { BiLogIn, BiLogOut } from "react-icons/bi";

import { UserInfo } from "../../constant/User";

import axios from "axios";
import api from "../../common/api";

import Button from "./Button";

const Header = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  const navigate = useNavigate();

  // 유저 정보 요청
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const { data } = await api.get<UserInfo>("/api/pollock/user/me");
        setUserInfo(data);
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          const status = error.response?.status;

          if (status !== 401) {
            console.error("유저 정보 요청 실패:", error);
          }
        } else {
          console.error("알 수 없는 에러:", error);
        }
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
      <div className="flex justify-between items-center px-16 bg-gray-700">
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
          <div className="px-16 py-8 hover:bg-gray-600 transition relative group">
            <div className="text-xl font-bold">학습</div>

            <div className="absolute top-full left-0 w-full hidden group-hover:block bg-gray-700">
              <div className="hover:bg-gray-600 transition">
                <Button
                  className="w-full py-4 text-xl font-bold"
                  text="기보 학습"
                  onClick={() => navigate("/learn/notation")}
                />
              </div>
              <div className="hover:bg-gray-600 transition">
                <Button
                  className="w-full py-4 text-xl font-bold"
                  text="전술 학습"
                  onClick={() => navigate("/learn/tactic")}
                />
              </div>
            </div>
          </div>
          {/* 분석 */}
          <div className="hover:bg-gray-600 transition">
            <Button
              className="text-xl font-bold px-16 py-8"
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
                  <div>
                    <img
                      src={userInfo.profileImageUrl}
                      alt="profile"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  </div>
                  <div>{userInfo.nickname}</div>
                  <div>ELO {userInfo.elo}</div>
                  <div>{userInfo.grade}</div>
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
