import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import TeachersPage from './pages/TeachersPage';
import SubjectsPage from './pages/SubjectsPage';
import JournalPage from './pages/JournalPage';
import StudentsPage from './pages/StudentsPage'; // 1. ДОДАЙ ЦЕЙ ІМПОРТ
import MainLayout from './components/MainLayout';
import SchedulePage from './pages/SchedulePage';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/teachers" element={<TeachersPage />} />
          <Route path="/subjects" element={<SubjectsPage />} />
          <Route path="/journal" element={<JournalPage />} />
          <Route path="/students" element={<StudentsPage />} /> {/* 2. ДОДАЙ ЦЕЙ РЯДОК */}
          <Route path="/schedule" element={<SchedulePage />} />
        </Route>

        {/* ОСЬ ЦЕЙ РЯДОК ВІДПРАВЛЯЄ ТЕБЕ НА ЛОГІН, ЯКЩО ШЛЯХУ /students НЕМАЄ ВИЩЕ */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;