import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import MainLayout from './components/MainLayout';
import LeaderboardPage from './pages/LeaderboardPage'; // Наш новий головний файл

// Тимчасові заглушки для інших сторінок, щоб сайт не видавав помилку
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
          <Route path="/tournaments" element={<Placeholder title="Турніри" />} />
          <Route path="/teams" element={<Placeholder title="Команди" />} />
          <Route path="/submissions" element={<Placeholder title="Сабміти" />} />
          <Route path="/evaluation" element={<Placeholder title="Оцінювання" />} />
          
          {/* Найголовніша сторінка */}
          <Route path="/leaderboard" element={<LeaderboardPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;