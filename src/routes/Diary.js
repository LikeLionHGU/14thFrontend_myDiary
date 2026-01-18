import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Diary.css";

const KEY = "diary_contents";

function Diary() {
  const { date } = useParams();
  const [text, setText] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const diaries = JSON.parse(localStorage.getItem(KEY)) || {};
    setText(diaries[date] || "");
  }, [date]);

  const saveDiary = () => {
    const diaries = JSON.parse(localStorage.getItem(KEY)) || {};
    diaries[date] = text;
    localStorage.setItem(KEY, JSON.stringify(diaries));
  };
  
  const navigateToHome = () => {
    navigate("/");
  };

  return (
    <div>
      <h2>{date}</h2>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={8}
      />

      <br />
      <button onClick={saveDiary}>저장하기</button>
      <button onClick={navigateToHome}>홈으로</button>
    </div>
  );
}

export default Diary;
