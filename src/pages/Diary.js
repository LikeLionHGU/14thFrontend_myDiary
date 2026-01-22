import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/Diary.css";
import {
  getDiaryByDate,
  createDiaryByDate,
  updateDiaryByDate,
} from "../apis/diary";

function Diary() {
  const { date } = useParams();
  const navigate = useNavigate();

  const userEmail = localStorage.getItem("userEmail");

  const [todoInput, setTodoInput] = useState("");
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");
  const [thankText, setThankText] = useState("");

  const [isTrashOpen, setIsTrashOpen] = useState(false);
  const [trashText, setTrashText] = useState("");
  const [isThrowing, setIsThrowing] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const [hasServerData, setHasServerData] = useState(false);

  const serverTodoToUI = (arr) => {
    if (!Array.isArray(arr)) return [];
    return arr
      .filter((t) => typeof t === "string")
      .map((t) => ({
        id: `${Date.now()}_${Math.random()}`,
        text: t,
        done: false,
      }));
  };

  const uiTodoToServer = (arr) => {
    if (!Array.isArray(arr)) return [];
    return arr
      .map((t) => (t?.text || "").trim())
      .filter(Boolean);
  };

  useEffect(() => {
    const run = async () => {
      if (!date) {
        navigate("/Home");
        return;
      }

      if (!userEmail) {
        alert("로그인이 필요합니다!");
        navigate("/Login");
        return;
      }

      setIsLoading(true);

      try {
        const data = await getDiaryByDate(date);

        const hasAny =
          (Array.isArray(data?.todo) && data.todo.length > 0) ||
          (data?.contents && data.contents.trim() !== "") ||
          (data?.thanks && data.thanks.trim() !== "");

        setHasServerData(hasAny);

        setTodos(serverTodoToUI(data?.todo));
        setText(data?.contents || "");
        setThankText(data?.thanks || "");
      } catch (err) {
        console.error(err);
        alert("다이어리를 불러오지 못했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    run();
  }, [date, navigate, userEmail]);

  const addTodo = () => {
    if (!userEmail) {
      alert("로그인이 필요합니다!");
      navigate("/Login");
      return;
    }

    const value = todoInput.trim();
    if (!value) return;

    const newTodo = {
      id: Date.now(),
      text: value,
      done: false,
    };

    setTodos((prev) => [...prev, newTodo]);
    setTodoInput("");
  };

  const toggleTodo = (id) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  const saveDiary = async () => {
    if (!userEmail) {
      alert("로그인이 필요합니다!");
      navigate("/Login");
      return;
    }

    if (!date) return;

    const payload = {
      todo: uiTodoToServer(todos),
      contents: text,
      thanks: thankText,
    };

    setIsSaving(true);

    try {
      if (hasServerData) {
        await updateDiaryByDate(date, payload);
      } else {
        await createDiaryByDate(date, payload);
        setHasServerData(true);
      }

      alert("저장되었습니다!");
      navigate("/Home");
    } catch (err) {
      console.error(err);
      alert("저장에 실패했습니다.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleThrowTrash = () => {
    if (!trashText.trim()) return;

    setIsThrowing(true);

    setTimeout(() => {
      setIsTrashOpen(false);
      setTrashText("");
      setIsThrowing(false);
      alert("나쁜 감정 버리기 성공!");
    }, 1200);
  };

  if (isLoading) {
    return (
      <div className="diary-wrapper">
        <h2 className="diary-date">{date}</h2>
        <p>불러오는 중...</p>
      </div>
    );
  }

  return (
    <div className="diary-wrapper">
      <h2 className="diary-date">{date}</h2>

      <div className="todo-card">
        <div className="todo-title">To Do</div>

        <div className="todo-input-row">
          <input
            className="todo-input"
            value={todoInput}
            onChange={(e) => setTodoInput(e.target.value)}
            placeholder="할 일을 입력하세요"
          />
          <button className="todo-add-btn" onClick={addTodo}>
            추가
          </button>
        </div>

        <ul className="todo-list">
          {todos.map((t) => (
            <li key={t.id} className="todo-item">
              <label className="todo-left">
                <input
                  type="checkbox"
                  checked={t.done}
                  onChange={() => toggleTodo(t.id)}
                />
                <span className={t.done ? "todo-text done" : "todo-text"}>
                  {t.text}
                </span>
              </label>

              <button className="todo-del-btn" onClick={() => deleteTodo(t.id)}>
                삭제
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="memo-card">
        <textarea
          className="memo-textarea"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="오늘의 재밌는 얘기..."
        />
      </div>

      <div className="thank-card">
        <textarea
          className="thank-textarea"
          value={thankText}
          onChange={(e) => setThankText(e.target.value)}
          placeholder="오늘의 감사 일기!"
        />
      </div>

      <div className="diary-buttons">
        <button onClick={saveDiary} disabled={isSaving}>
          {isSaving ? "저장 중..." : "저장하기"}
        </button>
        <button className="trash-open-btn" onClick={() => setIsTrashOpen(true)}>
          🗑️ 감정 쓰레기통
        </button>
        <button onClick={() => navigate("/Home")}>홈으로</button>
      </div>

      {isTrashOpen && (
        <div className="trash-overlay">
          <div className={`trash-card ${isThrowing ? "crumple-animation" : ""}`}>
            <div className="trash-header">
              <h3>감정 쓰레기통</h3>
              {!isThrowing && (
                <button
                  className="close-btn"
                  onClick={() => setIsTrashOpen(false)}
                >
                  ✕
                </button>
              )}
            </div>
            <textarea
              className="trash-textarea"
              placeholder="저장되지 않으니 편하게 작성하세요!"
              value={trashText}
              onChange={(e) => setTrashText(e.target.value)}
              disabled={isThrowing}
            />
            <button
              className="throw-btn"
              onClick={handleThrowTrash}
              disabled={isThrowing}
            >
              쓰레기통에 버리기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Diary;
