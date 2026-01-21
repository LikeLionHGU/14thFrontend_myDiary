import React from "react";
import styled from "styled-components";
import GoogleLoginBtn from "../asset/GoogleLoginBtn.svg";

/*
시작 로그인 페이지 
이곳에는 google oauth url과 연결된 구글 로그인 버튼이 있어야한다. 

google oauth에서 만든 client id와 redirecton url 그리고 어떤 토큰을 받을 것인지 url뒤에 명시해주어야 한다.
그리고 사용자의 어떤 정보를 받을지 scope또한 들어가야한다. 

*/

const GoogleLogin = () => {
  const handleGoogleLogin = () => {
    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_GOOGLE_AUTH_REDIRECT_URI}&response_type=code&scope=email profile`;
  };

  console.log("client_id:", process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID);
console.log("redirect_uri:", process.env.REACT_APP_GOOGLE_AUTH_REDIRECT_URI);


  return (
    <Wrapper>
      <LoginBtn src={GoogleLoginBtn} alt="" onClick={handleGoogleLogin} />
    </Wrapper>
  );
};

export default GoogleLogin;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoginBtn = styled.img`
  cursor: pointer;
`;
