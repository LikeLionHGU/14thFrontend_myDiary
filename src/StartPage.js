import React from "react";
import { useNavigate } from "react-router-dom";
import "./StartPage.css";

function StartPage() {
    const navigate = useNavigate();

    return (
        <div className="startPage-background">
            <div className="start-card">

                <h1 className="diary-title">DIARY</h1>

                <div className="start-button-group">
                    <button className="btn start-login-btn" onClick={() => navigate("/Login")}>Log in</button>
                    <button className="btn start-signup-btn" onClick={() => navigate("/SignUp")}>Sign up</button>
                </div>

            </div>
        </div>
    );
}

export default StartPage;