import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
//import Home from "./routes/Home";
//import Diary from "./routes/Diary";
import StartPage from "./StartPage";
import Login from "./Login";
import SignUp from "./SignUp";
//import GoogleLogin from "./components/loginPage";
import Loading from "./components/loading";
import TestPage from "./components/TestPage";

console.log({StartPage,Login,SignUp,Loading,TestPage});

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/Login" element={<Login/>} />
        <Route path="/SignUp" element={<SignUp/>}/>
        <Route path="/loading" element={<Loading />} />
        <Route path="/Home" element={<TestPage />} />
      </Routes>
    </Router>
  );
}

export default App;
