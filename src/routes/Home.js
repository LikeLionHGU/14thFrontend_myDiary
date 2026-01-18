import { useState } from "react";
import "react-calendar/dist/Calendar.css";
import Calendar from "react-calendar";
import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {
  const [date, setDate] = useState(new Date());
  const navigate = useNavigate();

  const makeKeyDate = (date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  };

  return (
    <div className="home">
      <div className="calendar-container">
        <Calendar
          onChange={setDate}
          value={date}
          onClickDay={(clickedDate) => {
            navigate(`/diary/${makeKeyDate(clickedDate)}`);
          }}
        />
      </div>
    </div>
  );
}

export default Home;
