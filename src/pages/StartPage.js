import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/StartPage.css";
import GoogleLoginBtnImg from "../asset/GoogleLoginBtn.svg";

function StartPage() {
    const navigate = useNavigate();

    const handleGoogleLogin = () => {

        window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_GOOGLE_AUTH_REDIRECT_URI}&response_type=code&scope=email profile`
    };

    return (
        <div className="startPage-background">
            <div className="start-card">

                <h1 className="diary-title">Diary</h1>

                <div className="start-button-group">
                    <button className="btn start-login-btn" onClick={() => navigate("/Login")}>Log in</button>
                    <button className="btn start-signup-btn" onClick={() => navigate("/SignUp")}>Sign up</button>

                    <div style={{marginTop:"10px", cursor:"pointer"}} onClick={handleGoogleLogin}>
                        <img src={GoogleLoginBtnImg} alt="Google Login" style={{width:"200px"}}/>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default StartPage;