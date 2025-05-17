import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import HomePage from "./pages/home/HomePage";
import LoginPage from "./pages/login/LoginPage";
import SettingPage from "./pages/setting/SettingPage";
import LearnPage from "./pages/learn/LearnPage";
import AnalysisPage from "./pages/analysis/AnalysisPage";
import ComputerPage from "./pages/play/computer/ComputerPage";
import FriendPage from "./pages/play/friend/FriendPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/setting" element={<SettingPage />} />
        <Route path="/learn" element={<LearnPage />} />
        <Route path="/analysis" element={<AnalysisPage />} />
        <Route path="/play/computer" element={<ComputerPage />} />
        <Route path="/play/friend" element={<FriendPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
