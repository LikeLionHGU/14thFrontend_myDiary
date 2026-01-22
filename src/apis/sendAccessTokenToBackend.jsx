import axios from "axios";

const sendAccessTokenToBackend = async (code) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_HOST_URL}/auth/google`,
      { code }
    );

    const data = response.data;
    console.log("Login successful with server response:", data);

    if (typeof data.isLogined !== "undefined") {
      localStorage.setItem("isLogined", String(data.isLogined));
    }

    if (data.token) {
      localStorage.setItem("accessToken", data.token);
      console.log("토큰 저장 완료!");
    }

    if (data.memberId) {
      localStorage.setItem("memberId", String(data.memberId));
      console.log("memberId 저장 완료!");
    }

    const userInfo = {
      name: data.name,
      email: data.email,
      message: data.message,
    };

    if (userInfo.name || userInfo.email || userInfo.message) {
      localStorage.setItem("userInfo", JSON.stringify(userInfo));

      if (userInfo.email) {
        localStorage.setItem("userEmail", userInfo.email);
      }
      console.log("사용자 정보 저장 완료!");
    }

    return data;
  } catch (error) {
    console.error("Login failed with error:", error?.response?.data || error);
    throw error;
  }
};

export default sendAccessTokenToBackend;
