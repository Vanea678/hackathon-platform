import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, BookOpen, LogOut, GraduationCap } from 'lucide-react';

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const menuItems = [
  { path: '/dashboard', name: 'Дашборд', icon: <LayoutDashboard size={20} /> },
  { path: '/teachers', name: 'Вчителі', icon: <Users size={20} /> },
  { path: '/students', name: 'Учні', icon: <Users size={20} /> },
  { path: '/subjects', name: 'Предмети', icon: <BookOpen size={20} /> },
  { path: '/journal', name: 'Журнал', icon: <GraduationCap size={20} /> },
  { path: '/schedule', name: 'Розклад', icon: <CalendarDays size={20} /> }, // НОВИЙ ПУНКТ
];
  return (
    <div className="w-64 min-h-screen bg-slate-900 border-r border-white/10 flex flex-col p-4 fixed left-0 top-0">
      <div className="flex items-center gap-3 px-2 mb-10">
        <div className="p-2 bg-indigo-500 rounded-xl shadow-lg shadow-indigo-500/20">
          <GraduationCap className="text-white w-6 h-6" />
        </div>
        <span className="text-xl font-bold text-white tracking-tight italic">LMS Portal</span>
      </div>

      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => 
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                isActive 
                ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/20' 
                : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
              }`
            }
          >
            {item.icon}
            <span className="font-medium">{item.name}</span>
          </NavLink>
        ))}
      </nav>

      <button 
        onClick={handleLogout}
        className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-red-400 hover:bg-red-400/10 rounded-xl transition-all mt-auto"
      >
        <LogOut size={20} />
        <span className="font-medium">Вийти</span>
      </button>
    </div>
  );
}

export default Sidebar;