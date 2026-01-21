import axios from "axios";

const sendAccessTokenToBackend = async (code) => {
  try {    
      const response = await axios.post(
      `${process.env.REACT_APP_HOST_URL}/Login`,
      { code },
      {headers: {"Content-Type": "application/json"}}
    );

    console.log("Login successful with server response:", response);

    // 토큰 저장 (백엔드가 token을 반환하는 경우)
    if (response.data.token) {
      /*로컬스토리지에 저장하는 명령어를 입력해보기("accessToken", response.data.token);*/
       localStorage.setItem("accessToken", response.data.token);
      console.log("토큰 저장 완료!");
    }

    // memberId 저장 (백엔드가 memberId를 반환하는 경우)
    if (response.data.memberId) {
       /*로컬스토리지에 저장하는 명령어를 입력해보기("memberId", response.data.memberId);*/
      localStorage.setItem("memberId", response.data.memberId);
      console.log("memberId 저장 완료!");
    }

    // 사용자 정보 저장 (선택사항)
    if (response.data.user) {
       /*로컬스토리지에 저장하는 명령어를 입력해보기("userInfo", JSON.stringify(response.data.user));*/
      localStorage.setItem("userInfo", JSON.stringify(response.data.user));
      console.log("사용자 정보 저장 완료!");
    }

    return response.data;
    
    
  } catch (error) {
    console.error("Login failed with error:", error);
    throw error;
  }
};

export default sendAccessTokenToBackend;
