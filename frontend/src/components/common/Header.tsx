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

  return (
    <div className="flex items-center justify-between p-4 bg-gray-100 shadow">
      <div>
        <Button text="Pollock" onClick={() => window.location.reload()} />
      </div>
      {userInfo ? (
        <div className="flex items-center space-x-4">
          <img
            src={userInfo.profileImageUrl}
            alt="프로필 이미지"
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="text-right">
            <p className="text-sm font-semibold">{userInfo.nickname}</p>
            <p className="text-xs text-gray-600">{userInfo.grade}</p>
          </div>
        </div>
      ) : (
        <div>
          <Button text="로그인" onClick={() => navigate("/login")} />
        </div>
      )}
    </div>
  );
};

export default Header;
