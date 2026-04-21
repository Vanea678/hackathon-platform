import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, Trophy, ClipboardCheck, Send, Medal, LogOut, Terminal } from 'lucide-react';

function Sidebar() {
  const navigate = useNavigate();
  const handleLogout = () => { localStorage.clear(); navigate('/login'); };

  const menuItems = [
    { path: '/dashboard', name: 'Dashboard', icon: <LayoutDashboard size={18} /> },
    { path: '/tournaments', name: 'Tournaments', icon: <Trophy size={18} /> },
    { path: '/teams', name: 'Teams', icon: <Users size={18} /> },
    { path: '/submissions', name: 'Submissions', icon: <Send size={18} /> },
    { path: '/evaluation', name: 'Evaluation', icon: <ClipboardCheck size={18} /> },
    { path: '/leaderboard', name: 'Leaderboard', icon: <Medal size={18} /> },
  ];

  return (
    <div className="w-64 min-h-screen bg-black border-r border-white/10 flex flex-col p-6 fixed left-0 top-0 z-50">
      
      {/* Branding - точно як у EvaluationPage */}
      <div className="flex items-center gap-3 mb-12">
        <div className="p-2 bg-purple-500 rounded-lg border border-purple-400/50 shadow-[0_0_15px_rgba(168,85,247,0.4)]">
          <Terminal className="text-white w-5 h-5" />
        </div>
        <span className="text-xl font-black text-white tracking-tighter uppercase">HACKATHON <span className="text-purple-500">HUB</span></span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => 
              `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all duration-300 border ${
                isActive 
                ? 'bg-purple-500/10 border-purple-500/40 text-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.1)]' 
                : 'text-slate-500 border-transparent hover:text-slate-200 hover:bg-white/5'
              }`
            }
          >
            {item.icon}
            <span className="tracking-tight">{item.name}</span>
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <button 
        onClick={handleLogout}
        className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:text-red-400 text-sm font-bold transition-all mt-auto border border-transparent hover:border-red-500/20 hover:bg-red-500/5 rounded-xl"
      >
        <LogOut size={18} />
        <span>Sign Out</span>
      </button>
    </div>
  );
}

export default Sidebar;