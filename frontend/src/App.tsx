import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Layout from "@/pages/Layout";

import HomePage from "@/pages/home/HomePage";
import ProfilePage from "@/pages/profile/ProfilePage";
import PlayPage from "@/pages/play/PlayPage";
import ComputerPage from "@/pages/play/computer/ComputerPage";
import PuzzlePage from "@/pages/puzzle/PuzzlePage";
import OpeningPage from "@/pages/learn/opening/OpeningPage";
import AnalysisPage from "@/pages/learn/analysis/AnalysisPage";
import NewsPage from "@/pages/news/NewsPage";
import SearchPage from "@/pages/social/search/SearchPage";
import RankingPage from "@/pages/etc/ranking/RankingPage";
import StorePage from "@/pages/etc/store/StorePage";

import AuthCallbackPage from "@/pages/signup/AuthCallbackPage";
import SignupPage from "@/pages/signup/SignupPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/home" replace />} />
          <Route path="home" element={<HomePage />} />
          <Route path="profile/:nickname" element={<ProfilePage />} />

          <Route path="play" element={<PlayPage />} />
          <Route path="play/computer" element={<ComputerPage />} />

          <Route path="puzzle" element={<PuzzlePage />} />

          <Route path="learn/opening" element={<OpeningPage />} />
          <Route path="learn/analysis" element={<AnalysisPage />} />
          <Route path="learn/analysis/:gameId" element={<AnalysisPage />} />

          <Route path="news" element={<NewsPage />} />

          <Route path="social/search" element={<SearchPage />} />

          <Route path="ranking" element={<RankingPage />} />
          <Route path="store" element={<StorePage />} />
        </Route>

        <Route path="/auth/callback" element={<AuthCallbackPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
