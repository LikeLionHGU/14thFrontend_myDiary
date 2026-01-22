import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Home from "./routes/Home";
import Diary from "./routes/Diary";
import StartPage from "./routes/StartPage";
import Login from "./components/Login";
import SignUp from "./routes/SignUp";
import Loading from "./components/loading";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/Login" element={<Login/>} />
        <Route path="/SignUp" element={<SignUp/>}/>
        <Route path="/loading" element={<Loading />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/diary/:date" element={<Diary />} />
      </Routes>
    </Router>
  );
}

export default App;
