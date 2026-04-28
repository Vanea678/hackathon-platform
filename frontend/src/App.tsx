import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/MainLayout';

// Імпорти сторінок (всі з папки pages)
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import TeamsPage from './pages/TeamsPage';
import TournamentsPage from './pages/TournamentsPage';
import SubmissionsPage from './pages/SubmissionsPage';
import EvaluationPage from './pages/EvaluationPage';
import LeaderboardPage from './pages/LeaderboardPage';
import ArchivesPage from './pages/ArchivesPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/teams" element={<TeamsPage />} />
          <Route path="/tournaments" element={<TournamentsPage />} />
          <Route path="/submissions" element={<SubmissionsPage />} />
          <Route path="/archives" element={<ArchivesPage />} /> {/* 2. Додай маршрут */}

          <Route path="/evaluation" element={<EvaluationPage />} />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Route>

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;