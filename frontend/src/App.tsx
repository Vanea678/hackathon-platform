import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import MainLayout from './components/MainLayout';
import LeaderboardPage from './pages/LeaderboardPage';
import TeamsPage from './pages/TeamsPage';           
import TournamentsPage from './pages/TournamentsPage'; 
import SubmissionsPage from './pages/SubmissionsPage';
import EvaluationPage from './pages/EvaluationPage'; // Додай цей імпорт
import RegisterPage from './pages/RegisterPage';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/tournaments" element={<TournamentsPage />} />
          <Route path="/teams" element={<TeamsPage />} />
          <Route path="/submissions" element={<SubmissionsPage />} />
          <Route path="/evaluation" element={<EvaluationPage />} />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;