import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Layout from "./pages/Layout";
import HomePage from "./pages/home/HomePage";
import ProfilePage from "./pages/profile/ProfilePage";
import PuzzlePage from "./pages/puzzle/PuzzlePage";
import OpeningPage from "./pages/learn/opening/OpeningPage";
import AnalysisPage from "./pages/learn/analysis/AnalysisPage";
import NewsPage from "./pages/news/NewsPage";
import FriendsPage from "./pages/social/friends/FriendsPage";
import RankingPage from "./pages/ranking/RankingPage";
import StorePage from "./pages/store/StorePage";
import PlayPage from "./pages/play/PlayPage";
import ComputerPage from "./pages/play/computer/ComputerPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/home" replace />} />
          <Route path="home" element={<HomePage />} />

          <Route path="profile" element={<ProfilePage />} />

          <Route path="puzzle" element={<PuzzlePage />} />
          <Route path="learn/opening" element={<OpeningPage />} />
          <Route path="learn/analysis" element={<AnalysisPage />} />
          <Route path="learn/analysis/:gameId" element={<AnalysisPage />} />
          <Route path="news" element={<NewsPage />} />
          <Route path="social/friends" element={<FriendsPage />} />
          <Route path="ranking" element={<RankingPage />} />
          <Route path="store" element={<StorePage />} />

          <Route path="play" element={<PlayPage />} />
          <Route path="play/computer" element={<ComputerPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
