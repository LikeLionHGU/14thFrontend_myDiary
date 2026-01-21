import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Home from "./routes/Home";
import Diary from "./routes/Diary";
import GoogleLogin from "./components/loginPage";
import Loading from "./components/loading";
import TestPage from "./components/TestPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<GoogleLogin />} />
        <Route path="/test" element={<TestPage />} />
        <Route path="/loading" element={<Loading />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/diary/:date" element={<Diary />} />
      </Routes>
    </Router>
  );
}

export default App;
