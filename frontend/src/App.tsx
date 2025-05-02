import { useEffect, useState } from "react";
import ChessAnalysisPage from "./pages/ChessAnalysisPage.tsx";

const App = () => {
  const [userInfo, setUserInfo] = useState<string | null>(null);

  useEffect(() => {
    fetch("http://localhost:8080/api/pollock/user/me", {
      credentials: "include", // 🔥 세션 쿠키 포함 필수
    })
      .then((res) => (res.ok ? res.text() : null))
      .then((data) => {
        if (data) setUserInfo(data);
      });
  }, []);

  return (
    <>
      <div>
        <ChessAnalysisPage />
      </div>
      <div style={{ marginTop: "20px" }}>
        <a href="http://localhost:8080/oauth2/authorization/naver">
          네이버 로그인
        </a>
      </div>
      <div style={{ marginTop: "10px" }}>
        {userInfo ? (
          <p>로그인한 사용자: {userInfo}</p>
        ) : (
          <p>로그인하지 않았습니다.</p>
        )}
      </div>
    </>
  );
};

export default App;
