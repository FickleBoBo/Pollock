import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import ChessAnalysisPage from "./pages/ChessAnalysisPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/analysis" element={<ChessAnalysisPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
