import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import HomePage from "./pages/home/HomePage";
import ChessAnalysisPage from "./pages/ChessAnalysisPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/analysis" element={<ChessAnalysisPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
