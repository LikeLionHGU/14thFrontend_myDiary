import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();

        if (!email || !password){
            alert("아이디와 비밀번호를 모두 입력해주세요");
            return;
        }

        try {
            const response = await axios.post(`${process.env.REACT_APP_HOST_URL}/Login`,{
                email: email,
                password: password
            });

            console.log("로그인 응답:",response.data);

            if(response.data.isLogined === 1){
                alert(response.data.message);

                localStorage.setItem("accessToken", "dummy-token"); //가짜 토큰?... 
                localStorage.setItem("userInfo", JSON.stringify({email: email}));

                navigate("/Home");
            } else{
                alert("로그인 실패: 아이디 또는 비밀번호를 확인하세요");
            } 
        }catch(error){
                console.log("로그인 에러:", error);
                alert("서버 통신 중 오류 발생");
            }
    };
    
    return (
        <div className="LoginPage-background">
            <div className="Login-card">
                <form onSubmit={handleLogin}>
                    <h1 className="login-title">LogIn</h1>

                    <div className="input-group">
                        <div className="id">
                            아이디
                            <input className="id-input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>

                        <div className="pw">
                            비밀번호
                            <input className="pw-input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>

                    </div>

                    <button className="libtn lilogin-btn" type="submit">로그인하기</button>

                    <button className="libtn lisignup-btn" type="button" onClick={() => navigate("/SignUp")}>회원가입하러 가기</button>

                    <button className="libtn home-btn" type="button" onClick={() => navigate("/")}><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-arrow-left-circle" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z" />
                    </svg></button>
                </form>
            </div>
        </div>
    );
}

export default Login;