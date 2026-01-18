import React from "react";
import { useNavigate } from "react-router-dom";

function StartPage() {
    const navigate = useNavigate();

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>DIARY</h1>
            <button onClick={() => navigate("/Login")}>로그인</button>
            <button onClick={() => navigate("/SignUp")}>회원가입</button>
        </div>
    );
}

export default StartPage;