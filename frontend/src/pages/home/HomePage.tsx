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
        <div>
          <Button
            text="봇과 플레이"
            onClick={() => navigate("/play/computer")}
            className="bg-blue-600"
          />
        </div>
        <div>
          <Button
            text="분석"
            onClick={() => navigate("/analysis")}
            className="bg-yellow-600"
          />
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
};

export default HomePage;
