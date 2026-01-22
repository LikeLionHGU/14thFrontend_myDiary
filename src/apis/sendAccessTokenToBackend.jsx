import axios from "axios";

const sendAccessTokenToBackend = async (code) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_HOST_URL}/auth/google`, // ✅ 명세서 스타일: /Login (대문자 L)
      { code } // ✅ request body: { code }
    );

    const data = response.data;
    console.log("Login successful with server response:", data);

    // ✅ 명세서 기준: isLogined가 핵심이면 이것도 저장해두는 게 좋아
    if (typeof data.isLogined !== "undefined") {
      localStorage.setItem("isLogined", String(data.isLogined));
    }

    // ✅ 혹시 백엔드가 토큰을 주는 버전이면 저장
    if (data.token) {
      localStorage.setItem("accessToken", data.token);
      console.log("토큰 저장 완료!");
    }

    // ✅ memberId가 오면 저장
    if (data.memberId) {
      localStorage.setItem("memberId", String(data.memberId));
      console.log("memberId 저장 완료!");
    }

    // ✅ 명세서에 name/email이 보이니까, userInfo로 묶어서 저장 (있을 때만)
    const userInfo = {
      name: data.name,
      email: data.email,
      message: data.message, // "반갑습니다..." 같은 문구가 오면 같이 저장 가능
    };

    // 값이 하나라도 있으면 저장
    if (userInfo.name || userInfo.email || userInfo.message) {
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
      console.log("사용자 정보 저장 완료!");
    }

    return data;
  } catch (error) {
    console.error("Login failed with error:", error?.response?.data || error);
    throw error;
  }
};

export default sendAccessTokenToBackend;
