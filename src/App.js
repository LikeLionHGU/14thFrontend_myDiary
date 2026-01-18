import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Home from "./routes/Home";
import Diary from "./routes/Diary";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/diary/:date" element={<Diary />} />
      </Routes>
    </Router>
  );
}

export default App;
