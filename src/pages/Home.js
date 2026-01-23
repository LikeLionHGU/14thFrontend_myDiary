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
        console.error(err);
        // alert("달력 데이터를 불러오지 못했습니다.");
        console.error("데이터 로드 실패:", err);
      } finally {
        setIsLoading(false);
      }
    };

    run();
  }, [navigate]);

  const handleLogout = () => {
    const confirmLogout = window.confirm("로그아웃 ㄱ?");
    if (confirmLogout) {
      localStorage.removeItem("userEmail");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("userInfo");

      alert("로그아웃 완료!");
      navigate("/Login");
    }
  };

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
        {isLoading ? (
          <div style={{ padding: 12 }}>불러오는 중...</div>
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