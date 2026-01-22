import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Home from "./pages/Home";
import Diary from "./pages/Diary";
import StartPage from "./pages/StartPage";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
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
