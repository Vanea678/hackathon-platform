import React, { useEffect, useState } from 'react';
import { Users, BookOpen, GraduationCap, LogOut, Search } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function DashboardPage() {
  const [data, setData] = useState<any>(null);
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const navigate = useNavigate();

  useEffect(() => {
    // Завантажуємо дані з бекенду
    axios.get('http://localhost:3000/api/dashboard/stats')
      .then(res => setData(res.data))
      .catch(err => console.error(err));
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
            <GraduationCap className="text-indigo-400 w-8 h-8" />
            <span className="text-xl font-bold text-white tracking-tight">LMS Portal</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-white">{user.firstName} {user.lastName}</p>
              <p className="text-xs text-slate-400 uppercase tracking-widest">{user.role}</p>
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
          <StatCard icon={<Users className="text-blue-400" />} label="Всього учнів" value={data.stats.students} gradient="from-blue-500/10 to-transparent" />
          <StatCard icon={<BookOpen className="text-indigo-400" />} label="Кількість класів" value={data.stats.classes} gradient="from-indigo-500/10 to-transparent" />
          <StatCard icon={<Search className="text-emerald-400" />} label="Предметів" value={data.subjects.length} gradient="from-emerald-500/10 to-transparent" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Список предметів */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              📚 Навчальні предмети
            </h2>
            <div className="space-y-3">
              {data.subjects.length > 0 ? data.subjects.map((s: any) => (
                <div key={s.id} className="p-4 bg-slate-800/40 rounded-2xl border border-white/5 hover:border-indigo-500/30 transition-all cursor-pointer">
                  <p className="font-semibold text-slate-100">{s.name}</p>
                  <p className="text-sm text-slate-400">{s.description || 'Опис відсутній'}</p>
                </div>
              )) : <p className="text-slate-500 italic">Предметів поки немає...</p>}
            </div>
          </div>

          {/* Список вчителів */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              👨‍🏫 Наші викладачі
            </h2>
            <div className="space-y-3">
              {data.teachers.length > 0 ? data.teachers.map((t: any) => (
                <div key={t.id} className="p-4 bg-slate-800/40 rounded-2xl border border-white/5 flex items-center gap-4">
                  <div className="w-10 h-10 bg-indigo-500/20 rounded-full flex items-center justify-center text-indigo-400 font-bold">
                    {t.firstName[0]}{t.lastName[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-100">{t.lastName} {t.firstName}</p>
                    <p className="text-xs text-slate-500">{t.email}</p>
                  </div>
                </div>
              )) : <p className="text-slate-500 italic">Вчителів поки немає...</p>}
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