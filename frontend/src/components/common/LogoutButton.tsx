import Button from "./Button"; // 위에서 만든 컴포넌트
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:8081/api/pollock/user/logout", {
        method: "POST",
        credentials: "include", // 쿠키 전송
      });
      // 로그아웃 후 리디렉션 또는 상태 초기화
      navigate("/"); // 로그인 페이지로 이동 (원하는 경로로 변경 가능)
    } catch (error) {
      console.error("로그아웃 실패:", error);
    }
  };

  return <Button text="로그아웃" onClick={handleLogout} />;
};

export default LogoutButton;
