import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Diary.css";
import { auth } from "../firebase";

function Diary() {
  const { date } = useParams();

  const [todoInput, setTodoInput] = useState("");
  const [todos, setTodos] = useState([]);

  const [text, setText] = useState("");
  const [thankText, setThankText] = useState("");

  const navigate = useNavigate();
  const user = auth.currentUser;

  useEffect(() => {
    if (!user) return;

    const diaryKey = `diary_contents_${user.uid}`;
    const diaries = JSON.parse(localStorage.getItem(diaryKey)) || {};
    setText(diaries[date] || "");

    const todoKey = `todo_${user.uid}`;
    const todoByDate = JSON.parse(localStorage.getItem(todoKey)) || {};
    setTodos(todoByDate[date] || []);

    const thankKey = `thank_${user.uid}`;
    const thankByDate = JSON.parse(localStorage.getItem(thankKey)) || {};
    setThankText(thankByDate[date] || "");
  }, [date, user]);

  const saveThank = () => {
    if (!user) return;

    const thankKey = `thank_${user.uid}`;
    const thankByDate = JSON.parse(localStorage.getItem(thankKey)) || {};
    thankByDate[date] = thankText;
    localStorage.setItem(thankKey, JSON.stringify(thankByDate));
  };

  const saveDiary = () => {
    if (!user) {
      alert("로그인이 필요합니다!");
      return;
    }

    const diaryKey = `diary_contents_${user.uid}`;
    const diaries = JSON.parse(localStorage.getItem(diaryKey)) || {};
    diaries[date] = text;
    localStorage.setItem(diaryKey, JSON.stringify(diaries));

    saveThank();

    alert("저장되었습니다!");
  };

  const saveTodos = (nextTodos) => {
    if (!user) return;

    const todoKey = `todo_${user.uid}`;
    const todoByDate = JSON.parse(localStorage.getItem(todoKey)) || {};
    todoByDate[date] = nextTodos;
    localStorage.setItem(todoKey, JSON.stringify(todoByDate));
  };

  const addTodo = () => {
    if (!user) {
      alert("로그인이 필요합니다!");
      return;
    }

    const value = todoInput.trim();
    if (!value) return;

    const newTodo = {
      id: Date.now(),
      text: value,
      done: false,
    };

    const nextTodos = [...todos, newTodo];
    setTodos(nextTodos);
    saveTodos(nextTodos);
    setTodoInput("");
  };

  const onTodoKeyDown = (e) => {
    if (e.key === "Enter") addTodo();
  };

  const toggleTodo = (id) => {
    const nextTodos = todos.map((t) =>
      t.id === id ? { ...t, done: !t.done } : t
    );
    setTodos(nextTodos);
    saveTodos(nextTodos);
  };

  const deleteTodo = (id) => {
    const nextTodos = todos.filter((t) => t.id !== id);
    setTodos(nextTodos);
    saveTodos(nextTodos);
  };

  const navigateToHome = () => {
    navigate("/Home");
  };

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
            onKeyDown={onTodoKeyDown}
            placeholder="할 일을 입력하고 Enter"
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
        <button onClick={saveDiary}>저장하기</button>
        <button onClick={navigateToHome}>홈으로</button>
      </div>
    </div>
  );
}

export default Diary;
