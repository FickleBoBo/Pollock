import Header from "../../components/common/Header";
import Footer from "../../components/common/Footer";
import NaverLoginButton from "../../components/login/NaverLoginButton";

const LoginPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <div>
        <Header />
      </div>

      <div className="flex flex-grow justify-center items-center">
        <NaverLoginButton />
      </div>

      <div>
        <Footer />
      </div>
    </div>
  );
};

export default LoginPage;
