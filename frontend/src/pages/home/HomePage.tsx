import { useNavigate } from "react-router-dom";

import Header from "../../components/common/Header.tsx";
import Footer from "../../components/common/Footer.tsx";
import Button from "../../components/common/Button.tsx";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <>
      <div>
        <Header />
      </div>
      <div>
        <Button
          text="봇과 플레이"
          onClick={() => navigate("/play/computer")}
          className="w-48 h-14 bg-blue-600 text-white px-5 py-3 m-4"
        />
        <Button
          text="분석"
          onClick={() => navigate("/analysis")}
          className="w-48 h-14 bg-blue-600 text-white px-5 py-3 m-4"
        />
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
};

export default HomePage;
