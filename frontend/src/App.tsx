import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import MainLayout from './components/MainLayout';
import LeaderboardPage from './pages/LeaderboardPage';
import TeamsPage from './pages/TeamsPage';           // Додано
import TournamentsPage from './pages/TournamentsPage'; // Додано

// Заглушки для сторінок, які ми зробимо завтра
const Placeholder = ({ title }: { title: string }) => (
  <div className="flex items-center justify-center h-[70vh] text-slate-400 text-2xl font-bold">
    🚧 Сторінка "{title}" в розробці...
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/tournaments" element={<TournamentsPage />} /> {/* Підключено */}
          <Route path="/teams" element={<TeamsPage />} />             {/* Підключено */}
          
          <Route path="/submissions" element={<Placeholder title="Сабміти (Подача робіт)" />} />
          <Route path="/evaluation" element={<Placeholder title="Оцінювання (Для Журі)" />} />
          
          <Route path="/leaderboard" element={<LeaderboardPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;