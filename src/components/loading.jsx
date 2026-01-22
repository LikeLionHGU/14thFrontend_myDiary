// components/Loading.jsx
import React, { useEffect } from "react";
import sendAccessTokenToBackend from "../apis/sendAccessTokenToBackend";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Loading = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const parsedQuery = new URLSearchParams(window.location.search);
        const code = parsedQuery.get("code");

        if (!code) {
          alert("로그인에 실패했습니다. 다시 시도해주세요.");
          navigate("/");
          return;
        }

        const data = await sendAccessTokenToBackend(code);

        if (data?.memberId) {
          localStorage.setItem("memberId", String(data.memberId));
        }

        if (data?.email) {
          localStorage.setItem("userInfo", JSON.stringify({ email: data.email }));
        } else {
          // email이 안 오더라도 기존 userInfo가 있으면 유지
          const existing = localStorage.getItem("userInfo");
          if (!existing) {
            alert("로그인 정보(email)가 없어 로그인에 실패했습니다. 다시 시도해주세요.");
            navigate("/");
            return;
          }
        }

        navigate("/Home");
      } catch (error) {
        console.error("로그인 과정에서 에러가 발생했습니다.", error);
        alert("로그인에 실패했습니다. 다시 시도해주세요.");
        navigate("/");
      }
    };

    fetchData();
  }, [navigate]);

  return (
    <div>
      <LoginLoading>로그인 중입니다...</LoginLoading>
    </div>
  );
};

export default Loading;

const LoginLoading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  margin-top: 100px;
`;
