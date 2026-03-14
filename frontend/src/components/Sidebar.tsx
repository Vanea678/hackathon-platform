import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
// Зверни увагу: я додав сюди CalendarDays
import { LayoutDashboard, Users, BookOpen, LogOut, GraduationCap, CalendarDays } from 'lucide-react';

function Sidebar() {
  const navigate = useNavigate();
  const handleLogout = () => { localStorage.clear(); navigate('/login'); };

  // Оновлений масив меню з Календарем
  const menuItems = [
    { path: '/dashboard', name: 'Дашборд', icon: <LayoutDashboard size={20} /> },
    { path: '/teachers', name: 'Вчителі', icon: <Users size={20} /> },
    { path: '/students', name: 'Учні', icon: <Users size={20} /> },
    { path: '/subjects', name: 'Предмети', icon: <BookOpen size={20} /> },
    { path: '/journal', name: 'Класний журнал', icon: <GraduationCap size={20} /> },
    { path: '/schedule', name: 'Розклад', icon: <CalendarDays size={20} /> }, // Додали календар
  ];

  return (
    <div className="w-64 min-h-screen bg-slate-900 border-r border-white/10 flex flex-col p-4 fixed left-0 top-0">
      <div className="flex items-center gap-3 px-2 mb-10 text-white font-bold italic text-xl">
        <GraduationCap className="text-indigo-400 w-8 h-8" /> LMS Portal
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