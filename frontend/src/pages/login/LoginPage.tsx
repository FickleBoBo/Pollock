import Header from "../../components/common/Header";
import Footer from "../../components/common/Footer";
import OAuthLoginButton from "../../components/login/OAuthLoginButton";

const LoginPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <div>
        <Header />
      </div>

      <div className="flex-grow flex flex-col items-center justify-center gap-4">
        <OAuthLoginButton provider="naver" />
        <OAuthLoginButton provider="kakao" />
        <OAuthLoginButton provider="google" />
      </div>

      <div>
        <Footer />
      </div>
    </div>
  );
};

export default LoginPage;
