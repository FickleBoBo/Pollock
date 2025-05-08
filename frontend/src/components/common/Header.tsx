import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const { data } = await api.get<UserInfo>("/api/pollock/user/me");
        setUserInfo(data);
      } catch (error) {
        console.error("유저 정보 요청 실패:", error);
      }
    };

    fetchUserInfo();
  }, []);

  const handleLogout = async () => {
    try {
      await api.post("/api/pollock/user/logout");
      navigate("/");
    } catch (error) {
      console.error("로그아웃 실패:", error);
    }
  };

  return (
    <div className="flex justify-between bg-red-600">
      <div>
        <Button text="Pollock" onClick={() => window.location.reload()} />
      </div>
      <div>
        {userInfo ? (
          <>
            <div className="flex">
              <div>
                <img src={userInfo.profileImageUrl} alt="profile" />
              </div>
              <div>{userInfo.nickname}</div>
              <div>{userInfo.grade}</div>
            </div>
            <div>
              <div>ELO {userInfo.elo}</div>
              <Button text="logout" onClick={handleLogout} />
            </div>
          </>
        ) : (
          <div>
            <Button text="login" onClick={() => navigate("/login")} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
