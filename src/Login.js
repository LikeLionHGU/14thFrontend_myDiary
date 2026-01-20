import React, { useState } from "react";
import { auth } from "./firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            await signInWithEmailAndPassword(auth, email, password);
            alert("로그인 성공!");
            navigate("/Home");
        } catch (error) {
            console.log("로그인 실패", error.message);
            alert("로그인 실패.. 아이디/비번을 확인하세요");
        }
    };

    return (
        <div className="LoginPage-background">
            <div className="Login-card">
                <form>
                    <h1 className="login-title">LogIn</h1>

                    <div className="input-group">
                        <div className="id">
                            아이디
                            <input className="id-input" type="email" onChange={(e) => setEmail(e.target.value)} />
                        </div>

                        <div className="pw">
                            비밀번호
                            <input className="pw-input" type="password" onChange={(e) => setPassword(e.target.value)} />
                        </div>

                    </div>

                    <button className="libtn lilogin-btn" onClick={handleLogin}>로그인하기</button>

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