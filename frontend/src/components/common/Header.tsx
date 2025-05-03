import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

import Button from "./Button";

interface UserInfo {
  nickname: string;
  profileImageUrl: string;
  grade: string;
}

const Header = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://www.pollock.kr:8080/api/pollock/user/me", {
        withCredentials: true,
      })
      .then((response) => {
        const { nickname, profileImageUrl, grade } = response.data;
        setUserInfo({ nickname, profileImageUrl, grade });
      })
      .catch((error) => {
        console.error("유저 정보 요청 실패:", error);
      });
  }, []);

  return (
    <div className="flex items-center justify-between p-4 bg-gray-100 shadow">
      <Button text="Pollock" onClick={() => window.location.reload()} />
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
