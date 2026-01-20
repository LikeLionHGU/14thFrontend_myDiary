import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Diary.css";
import { auth } from "../firebase";

function Diary() {
  const { date } = useParams();
  const [text, setText] = useState("");
  const navigate = useNavigate();

  const user = auth.currentUser;

  useEffect(() => {
    if (!user) return;

    const userKey = `diary_contents_${user.uid}`;
    const diaries = JSON.parse(localStorage.getItem(userKey)) || {};
    setText(diaries[date] || "");
  }, [date, user]);

  const saveDiary = () => {
    if (!user) {
      alert("로그인이 필요합니다!");
      return;
    }

    const userKey = `diary_contents_${user.uid}`;
    const diaries = JSON.parse(localStorage.getItem(userKey)) || {};
    diaries[date] = text;
    localStorage.setItem(userKey, JSON.stringify(diaries));

    alert("저장되었습니다!");
  };

  const navigateToHome = () => {
    navigate("/Home");
  };

  return (
    <div className="diary-wrapper">
      <h2 className="diary-date">{date}</h2>

      <div className="memo-card">
        <div className="memo-header">
        </div>

        <textarea
          className="memo-textarea"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="오늘의 재밌는 얘기..."
        />
      </div>

      <div className="diary-buttons">
        <button onClick={saveDiary}>저장하기</button>
        <button onClick={navigateToHome}>홈으로</button>
      </div>
    </div>
  );
}

export default Diary;
