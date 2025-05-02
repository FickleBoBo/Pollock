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
        <Button text="분석하기" onClick={() => navigate("/analysis")} />
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
};

export default HomePage;
