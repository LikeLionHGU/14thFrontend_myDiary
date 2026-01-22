import React, { useState } from "react";
//import { auth } from "./firebase";
//import { createUserWithEmailAndPassword } from "firebase/auth";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import "../styles/SignUp.css";

/*function SignUp() {
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
    }; */

const SignUp =() => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");

    const handleSignUp = async(e) => {
        e.preventDefault();

        if(!email || !password || !name) {
            alert("모든 항목을 입력해주세요");
            return;
        }

        try{
            const response = await axios.post(`${process.env.REACT_APP_HOST_URL}/SignUp`,{
                email: email,
                name: name,
                password: password
            });

            console.log('회원가입 성공:',response.data);
            alert('회원가입이 완료되었습니다!');
            navigate('/Login');
        } catch(error) {
            console.log('회원가입 실패: ', error);
            alert('회원가입에 실패했습니다. 다시 시도해주세요');
        }
    };

    return (
        <div className="SignUppage-background">
            <div className="SignUp-card">
                <form onSubmit={handleSignUp}>
                    <h1 className="signup-title">SignUp</h1>

                    <div className="input-group">
                        <div className="id">
                            아이디
                            <input className="id-input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>

                        <div className="name">
                            이름 <input className="name-input" type="text" value={name} onChange={(e)=>setName(e.target.value)} />
                        </div>

                        <div className="pw">
                            비밀번호
                            <input className="pw-input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                    </div>

                    <button className="subtn signup-btn">회원가입하기</button>

                    <button className="subtn login-btn" type="button" onClick={() => navigate("/Login")}>로그인하러 가기</button>

                    <button className="subtn home-btn" type="button" onClick={() => navigate("/")}><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-arrow-left-circle" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z" />
                    </svg></button>
                </form>
            </div>
        </div>
    );
};
  
export default SignUp;