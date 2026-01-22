import { useState, useEffect } from "react";
import "react-calendar/dist/Calendar.css";
import Calendar from "react-calendar";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";

function Home() {
  const [date, setDate] = useState(new Date());
  const [marks, setMarks] = useState({});
  const navigate = useNavigate();

  const makeKeyDate = (date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  };

  const getUserKey = () => {
    const memberId = localStorage.getItem("memberId");
    if (memberId) return `member_${memberId}`;

    const userInfoRaw = localStorage.getItem("userInfo");
    if (!userInfoRaw) return null;

    try {
      const userInfo = JSON.parse(userInfoRaw);
      if (userInfo?.email) return `email_${userInfo.email}`;
      return null;
    } catch {
      return null;
    }
  };

  useEffect(() => {
    const userKey = getUserKey();
    if (!userKey) {
      navigate("/Login");
      return;
    }

    const diaryKey = `diary_contents_${userKey}`;
    const todoKey = `todo_${userKey}`;
    const thankKey = `thank_${userKey}`;

    const diaryData = JSON.parse(localStorage.getItem(diaryKey)) || {};
    const todoData = JSON.parse(localStorage.getItem(todoKey)) || {};
    const thankData = JSON.parse(localStorage.getItem(thankKey)) || {};

    const newMarks = {};
    const allDates = new Set([
      ...Object.keys(diaryData),
      ...Object.keys(todoData),
      ...Object.keys(thankData),
    ]);

    allDates.forEach((dateKey) => {
      const hasTodo = Array.isArray(todoData[dateKey]) && todoData[dateKey].length > 0;
      const hasDiary =
        (typeof diaryData[dateKey] === "string" && diaryData[dateKey].trim() !== "") ||
        (typeof thankData[dateKey] === "string" && thankData[dateKey].trim() !== "");

      if (hasTodo || hasDiary) newMarks[dateKey] = { hasTodo, hasDiary };
    });

    setMarks(newMarks);
  }, [navigate]);

  const tileContent = ({ date, view }) => {
    if (view !== "month") return null;

    const dateString = makeKeyDate(date);
    const mark = marks[dateString];

    if (!mark) return null;

    return (
      <div className="dot-container">
        {mark.hasTodo && <div className="dot todo-dot"></div>}
        {mark.hasDiary && <div className="dot diary-dot"></div>}
      </div>
    );
  };

  return (
    <div className="home">
      <div className="calendar-container">
        <Calendar
          calendarType="hebrew"
          onChange={setDate}
          value={date}
          tileContent={tileContent}
          onClickDay={(clickedDate) => navigate(`/diary/${makeKeyDate(clickedDate)}`)}
        />
      </div>
    </div>
  );
}

export default Home;
