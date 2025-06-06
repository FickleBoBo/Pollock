interface OAuthLoginButtonProps {
  provider: "naver" | "kakao";
}

const OAuthLoginButton = ({ provider }: OAuthLoginButtonProps) => {
  const config = {
    naver: {
      // href="http://www.pollock.kr/api/pollock/users/oauth2/authorization/naver"
      href: "http://localhost:8080/api/pollock/users/oauth2/authorization/naver",
      className: "bg-[#03C75A] hover:bg-[#029E4F] text-white",
      label: "Naver 로그인",
    },
    kakao: {
      // href="http://www.pollock.kr/api/pollock/users/oauth2/authorization/kakao"
      href: "http://localhost:8080/api/pollock/users/oauth2/authorization/kakao",
      className: "bg-[#FEE500] hover:bg-[#ECD900] text-black",
      label: "Kakao 로그인",
    },
  };

  const { href, className, label } = config[provider];

  return (
    <div>
      <a
        href={href}
        className={`${className} inline-block w-[400px] text-center text-xl font-bold py-8 rounded`}
      >
        {label}
      </a>
    </div>
  );
};

export default OAuthLoginButton;
