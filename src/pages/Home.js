import { useState, useEffect } from "react";
import "react-calendar/dist/Calendar.css";
import Calendar from "react-calendar";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";
import { getHome } from "../apis/home";

function Home() {
  const [date, setDate] = useState(new Date());
  const [marks, setMarks] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  const makeKeyDate = (dateObj) => {
    const y = dateObj.getFullYear();
    const m = String(dateObj.getMonth() + 1).padStart(2, "0");
    const d = String(dateObj.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  };

  useEffect(() => {
    const userEmail = localStorage.getItem("userEmail");
    if (!userEmail) {
      navigate("/Login");
      return;
    }

    const run = async () => {
      setIsLoading(true);
      try {
        const data = await getHome();

        const haveContents = Array.isArray(data?.haveContents) ? data.haveContents : [];
        const haveTodos = Array.isArray(data?.haveTodos) ? data.haveTodos : [];

        const nextMarks = {};

        haveContents.forEach((dateKey) => {
          if (!nextMarks[dateKey]) nextMarks[dateKey] = { hasTodo: false, hasDiary: false };
          nextMarks[dateKey].hasDiary = true;
        });

        haveTodos.forEach((dateKey) => {
          if (!nextMarks[dateKey]) nextMarks[dateKey] = { hasTodo: false, hasDiary: false };
          nextMarks[dateKey].hasTodo = true;
        });

        setMarks(nextMarks);
      } catch (err) {
        console.error("데이터 로드 실패:", err);
      } finally {
        setIsLoading(false);
      }
    };

    run();
  }, [navigate]);

  const handleLogout = () => {
    const confirmLogout = window.confirm("정말 로그아웃 하시겠습니까?");
    if (confirmLogout) {
      localStorage.removeItem("userEmail");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("userInfo");
      alert("로그아웃 되었습니다.");
      navigate("/Login");
    }
  };

  const tileContent = ({ date, view }) => {
    if (view !== "month") return null;

    const dateString = makeKeyDate(date);
    const mark = marks[dateString];

    if (!mark) return null;

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const targetDate = new Date(date);
    targetDate.setHours(0, 0, 0, 0);

    const isPast = targetDate < today;
    const isFutureOrToday = targetDate >= today;

    return (
      <div className="tile-content-wrapper">
        <div className="dot-container">
          {mark.hasTodo && <div className="dot todo-dot"></div>}
          {mark.hasDiary && <div className="dot diary-dot"></div>}
        </div>

        <div className="text-label">
          {isPast && mark.hasDiary && (
            <span className="diary-label">추억</span>
          )}

          {isFutureOrToday && mark.hasTodo && (
            <span className="todo-label">할일</span>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="home">
      <div className="calendar-container">
        {isLoading ? (
          <div style={{ padding: 12, fontFamily: "Gowun Batang" }}>불러오는 중...</div>
        ) : (
          <>
            <Calendar
              calendarType="hebrew"
              onChange={setDate}
              value={date}
              tileContent={tileContent}
              onClickDay={(clickedDate) =>
                navigate(`/diary/${makeKeyDate(clickedDate)}`)
              }
            />
            <button className="logout-btn" onClick={handleLogout}>
              로그아웃
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Home;