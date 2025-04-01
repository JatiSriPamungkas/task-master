import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import SignUpPage from "./pages/RegisterPage";
import { Routes, Route } from "react-router";
import TestingPage from "./pages/TestingPage";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <>
      {/* ROUTES PATH */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<SignUpPage />} />
        <Route path="/testing" element={<TestingPage />} />
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
