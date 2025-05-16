import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { BiLogIn, BiLogOut } from "react-icons/bi";

import axios from "axios";
import api from "../../common/api";

import Button from "./Button";

interface UserInfo {
  nickname: string;
  profileImageUrl: string;
  elo: number;
  grade: string;
}

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
      <div className="flex justify-between p-8 bg-gray-700">
        <div className="flex items-center gap-16">
          <div className="mr-32">
            <Button
              className="text-3xl font-bold"
              text="Pollock"
              onClick={() => (window.location.href = "/")}
            />
          </div>
          <div>
            <Button
              className="text-xl font-bold"
              text="학습"
              onClick={() => navigate("/learn")}
            />
          </div>
          <div>
            <Button
              className="text-xl font-bold"
              text="분석"
              onClick={() => navigate("/analysis")}
            />
          </div>
        </div>
        <div>
          {userInfo ? (
            <div className="flex items-center gap-4">
              <div>
                <img
                  src={userInfo.profileImageUrl}
                  alt="profile"
                  className="w-12 h-12 rounded-full object-cover"
                />
              </div>
              <div>{userInfo.nickname}</div>
              <div>ELO {userInfo.elo}</div>
              <div>{userInfo.grade}</div>
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
