import React, { useState } from "react";
import { auth } from "./firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

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
            console.log("Login 실패", error.message);
            alert("로그인 실패.. 아이디/비번을 확인하세요");
        }
    };

    return (
        <form>
            <h1>로그인</h1>
            <div>
                email :
                <input type="email" onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
                password :
                <input type="password" onChange={(e) => setPassword(e.target.value)} />
            </div>

            <button onClick={handleLogin}>로그인하기</button>

            <button type="button" onClick={() => navigate("/SignUp")}>회원가입하러 가기</button>
        </form>
    );
}

export default Login;