import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, Trophy, ClipboardCheck, Send, Medal, LogOut, Code2 } from 'lucide-react';

function Sidebar() {
  const navigate = useNavigate();
  const handleLogout = () => { localStorage.clear(); navigate('/login'); };

  // Оновлений масив меню для Турніру (Хакатону)
  const menuItems = [
    { path: '/dashboard', name: 'Головна', icon: <LayoutDashboard size={20} /> },
    { path: '/tournaments', name: 'Турніри', icon: <Trophy size={20} /> },
    { path: '/teams', name: 'Команди', icon: <Users size={20} /> },
    { path: '/submissions', name: 'Сабміти (Роботи)', icon: <Send size={20} /> },
    { path: '/evaluation', name: 'Оцінювання (Журі)', icon: <ClipboardCheck size={20} /> },
    { path: '/leaderboard', name: 'Таблиця Лідерів', icon: <Medal size={20} /> },
  ];

  return (
    <div className="w-64 min-h-screen bg-slate-900 border-r border-white/10 flex flex-col p-4 fixed left-0 top-0">
      <div className="flex items-center gap-3 px-2 mb-10 text-white font-bold italic text-xl">
        <Code2 className="text-indigo-400 w-8 h-8" /> Hackathon Hub
      </div>
      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => (
          <NavLink 
            key={item.path} 
            to={item.path} 
            className={({ isActive }) => 
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                isActive ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/20' : 'text-slate-400 hover:bg-white/5'
              }`
            }
          >
            {item.icon} <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>
      <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-red-400 mt-auto transition-colors">
        <LogOut size={20} /> Вийти
      </button>
    </div>
  );
}

export default Sidebar;