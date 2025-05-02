const NaverLoginButton = () => {
  return (
    <div>
      <a
        href="http://localhost:8080/oauth2/authorization/naver"
        className="inline-block bg-[#1ec800] text-white font-semibold py-2 px-8 rounded hover:bg-[#16a000] transition duration-200"
      >
        Naver 로그인
      </a>
    </div>
  );
};

export default NaverLoginButton;
