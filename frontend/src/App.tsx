import "./App.css";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import SignUpPage from "./pages/SignUpPage";
import { Routes, Route } from "react-router";
import TestingPage from "./pages/TestingPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/signIn" element={<LoginPage />} />
        <Route path="/signUp" element={<SignUpPage />} />
        <Route path="/testing" element={<TestingPage />} />
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
