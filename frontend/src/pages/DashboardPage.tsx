import React, { useEffect, useState } from 'react';
import { Users, Trophy, Send, LogOut, Code2 } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function DashboardPage() {
  const [data, setData] = useState<any>(null);
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const navigate = useNavigate();

  useEffect(() => {
    // В реальному проєкті тут буде запит на статистику турніру
    // Поки що ставимо статичні дані для презентації
    setData({
      stats: { teams: 12, submissions: 8, juries: 3 },
      tournaments: [
        { id: 1, title: 'Star for Life Hackathon 2026', status: 'RUNNING' }
      ],
      juries: [
        { id: 1, fullName: 'Суддя Максим', role: 'JURY', email: 'jury@hackathon.com' }
      ]
    });
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  if (!data) return <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">Завантаження...</div>;

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 font-sans">
      {/* Навігація */}
      <nav className="border-b border-white/10 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Code2 className="text-indigo-400 w-8 h-8" />
            <span className="text-xl font-bold text-white tracking-tight">Hackathon Hub</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-white">{user.fullName || 'Гість'}</p>
              <p className="text-xs text-slate-400 uppercase tracking-widest">{user.role || 'USER'}</p>
            </div>
            <button onClick={handleLogout} className="p-2 hover:bg-red-500/20 rounded-full text-slate-400 hover:text-red-400 transition-all">
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        {/* Картки статистики */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard icon={<Users className="text-blue-400" />} label="Команд-учасниць" value={data.stats.teams} gradient="from-blue-500/10 to-transparent" />
          <StatCard icon={<Trophy className="text-indigo-400" />} label="Активних турнірів" value={data.tournaments.length} gradient="from-indigo-500/10 to-transparent" />
          <StatCard icon={<Send className="text-emerald-400" />} label="Зданих робіт" value={data.stats.submissions} gradient="from-emerald-500/10 to-transparent" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Активні турніри */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              🏆 Активні Турніри
            </h2>
            <div className="space-y-3">
              {data.tournaments.map((t: any) => (
                <div key={t.id} className="p-4 bg-slate-800/40 rounded-2xl border border-white/5 flex items-center justify-between hover:border-indigo-500/30 transition-all cursor-pointer">
                  <p className="font-semibold text-slate-100">{t.title}</p>
                  <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 text-xs font-bold rounded-full uppercase tracking-wider">
                    {t.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Список журі */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              ⚖️ Склад Журі
            </h2>
            <div className="space-y-3">
              {data.juries.map((j: any) => (
                <div key={j.id} className="p-4 bg-slate-800/40 rounded-2xl border border-white/5 flex items-center gap-4">
                  <div className="w-10 h-10 bg-indigo-500/20 rounded-full flex items-center justify-center text-indigo-400 font-bold">
                    {j.fullName.substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-100">{j.fullName}</p>
                    <p className="text-xs text-slate-500">{j.email}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function StatCard({ icon, label, value, gradient }: any) {
  return (
    <div className={`bg-white/5 border border-white/10 p-6 rounded-3xl relative overflow-hidden bg-gradient-to-br ${gradient}`}>
      <div className="flex items-center justify-between relative z-10">
        <div>
          <p className="text-slate-400 text-sm font-medium uppercase tracking-wider">{label}</p>
          <p className="text-4xl font-black text-white mt-1">{value}</p>
        </div>
        <div className="p-3 bg-white/5 rounded-2xl">{icon}</div>
      </div>
    </div>
  );
}

export default DashboardPage;