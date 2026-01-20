import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Diary.css";
import { auth } from "../firebase";

function Diary() {
  const { date } = useParams();
  const [text, setText] = useState("");

  const [todos, setTodos] = useState([]);
  const [todoInput, setTodoInput] = useState("");

  const navigate = useNavigate();
  const user = auth.currentUser;

  useEffect(() => {
    if (!user) return;

    const diaryKey = `diary_contents_${user.uid}`;
    const todoKey = `todo_${user.uid}`;

    const diaries = JSON.parse(localStorage.getItem(diaryKey)) || {};
    setText(diaries[date] || "");

    const todoByDate = JSON.parse(localStorage.getItem(todoKey)) || {};
    setTodos(todoByDate[date] || []);
  }, [date, user]);

  const saveDiary = () => {
    if (!user) {
      alert("로그인이 필요합니다!");
      return;
    }

    const diaryKey = `diary_contents_${user.uid}`;
    const diaries = JSON.parse(localStorage.getItem(diaryKey)) || {};
    diaries[date] = text;
    localStorage.setItem(diaryKey, JSON.stringify(diaries));

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

    const newTodo = { id: Date.now(), text: value, done: false };
    const nextTodos = [...todos, newTodo];

    setTodos(nextTodos);
    saveTodos(nextTodos);
    setTodoInput("");
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
    <div>
      <h2>{date}</h2>

      <div>
        <div>
          <input
            value={todoInput}
            onChange={(e) => setTodoInput(e.target.value)}
            placeholder="할 일 입력"
          />
          <button onClick={addTodo}>추가</button>
        </div>

        <ul>
          {todos.map((t) => (
            <li style={{listStyle: "none"}} key={t.id}>
              <label>
                <input
                  type="checkbox"
                  checked={t.done}
                  onChange={() => toggleTodo(t.id)}
                />{" "}
                <span style={{ textDecoration: t.done ? "line-through" : "" }}>
                  {t.text}
                </span>
              </label>
              <button onClick={() => deleteTodo(t.id)}>삭제</button>
            </li>
          ))}
        </ul>
      </div>

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
