import { useState, useEffect } from "react";
import "react-calendar/dist/Calendar.css";
import Calendar from "react-calendar";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import "./Home.css";

function Home() {
  const [date, setDate] = useState(new Date());
  // 단순 리스트 말고, 날짜 담은 객체로 -> 마크 표시 위함
  const [marks, setMarks] = useState({});
  const navigate = useNavigate();

  const makeKeyDate = (date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  };

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const diaryKey = `diary_contents_${user.uid}`;
    const todoKey = `todo_${user.uid}`;
    const thankKey = `thank_${user.uid}`;

    const diaryData = JSON.parse(localStorage.getItem(diaryKey)) || {};
    const todoData = JSON.parse(localStorage.getItem(todoKey)) || {};
    const thankData = JSON.parse(localStorage.getItem(thankKey)) || {};

    const newMarks = {};

    const allDates = new Set([
      ...Object.keys(diaryData),
      ...Object.keys(todoData),
      ...Object.keys(thankData)
    ]);

    allDates.forEach((dateKey) => {
      // 투두 유무 확인
      const hasTodo = todoData[dateKey] && todoData[dateKey].length > 0;

      // 재밌는 얘기 혹은 감사 일기 유무 확인 (둘 중 하나라도 있으면 트루)
      const hasDiary = (diaryData[dateKey] && diaryData[dateKey].trim() !== "") ||
        (thankData[dateKey] && thankData[dateKey].trim() !== "");

      if (hasTodo || hasDiary) {
        newMarks[dateKey] = { hasTodo, hasDiary };
      }
    });

    setMarks(newMarks);

  }, []);

  const tileContent = ({ date, view }) => {
    if (view === "month") {
      const dateString = makeKeyDate(date);
      const mark = marks[dateString];

      if (mark) {
        return (
          <div className="dot-container">
            {mark.hasTodo && <div className="dot todo-dot"></div>}
            {mark.hasDiary && <div className="dot diary-dot"></div>}
          </div>
        );
      }
    }
    return null;
  };

  return (
    <div className="home">
      <div className="calendar-container">
        <Calendar
          calendarType="hebrew"
          onChange={setDate}
          value={date}
          tileContent={tileContent}
          onClickDay={(clickedDate) => {
            navigate(`/diary/${makeKeyDate(clickedDate)}`);
          }}
        />
      </div>
    </div>
  );
}

export default Home;