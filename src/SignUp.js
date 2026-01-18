import React, { useState } from "react";
import { auth } from "./firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function SignUp() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSignUp = async (event) => {
        event.preventDefault();

        try {
            await createUserWithEmailAndPassword(auth, email, password);
            alert("회원가입 성공!");
            navigate("/Login");
        } catch (error) {
            console.log("error", error.message);
            alert("회원가입 실패: " + error.message);
        }
    };

    return (
        <form>
            <h1>회원가입</h1>
            <div>
                email :
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
                password :
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>

            <button onClick={handleSignUp}>회원가입하기</button>

            <button type="button" onClick={() => navigate("/Login")}>로그인하러 가기</button>
        </form>
    );
}

export default SignUp;