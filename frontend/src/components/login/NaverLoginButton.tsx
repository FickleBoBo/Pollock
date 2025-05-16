const NaverLoginButton = () => {
  return (
    <div className="my-8">
      <a
        // href="http://www.pollock.kr/api/pollock/user/oauth2/authorization/naver"
        href="http://localhost:8080/api/pollock/user/oauth2/authorization/naver"
        className="bg-[#03C75A] hover:bg-[#029E4F] text-xl font-bold px-32 py-8 rounded"
      >
        Naver 로그인
      </a>
    </div>
  );
};

export default NaverLoginButton;
