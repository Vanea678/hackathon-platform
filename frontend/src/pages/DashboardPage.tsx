import React, { useEffect, useState } from 'react';
import { Users, Trophy, Send, LogOut, Zap, Activity, Globe } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function DashboardPage() {
  const [data, setData] = useState<any>(null);
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const navigate = useNavigate();

  useEffect(() => {
    setData({
      stats: { teams: 12, tournaments: 1, submissions: 8 },
      recentTeams: [
        { name: 'Code Wizards', status: 'Online' },
        { name: 'Byte Me', status: 'Away' }
      ]
    });
  }, []);

  if (!data) return <div className="min-h-screen bg-black flex items-center justify-center text-purple-500 font-black">INITIALIZING...</div>;

  return (
    <div className="min-h-screen bg-black text-slate-200 font-sans">
      {/* Header із неоновою рискою як на EvaluationPage */}
      <header className="mb-12 relative flex justify-between items-start">
        <div className="relative">
          <div className="absolute -left-4 top-0 w-1 h-12 bg-purple-500 rounded-full shadow-[0_0_15px_rgba(168,85,247,0.5)]"></div>
          <h1 className="text-4xl font-black text-white tracking-tight px-2 uppercase">SYSTEM <span className="text-purple-500">OVERVIEW</span></h1>
          <p className="text-slate-500 mt-1 ml-2 text-[10px] uppercase tracking-[0.3em] font-bold">Welcome back, {user.fullName || 'Operator'}</p>
        </div>
      </header>

      {/* Bento Grid Stats */}
      <div className="grid grid-cols-12 gap-6">
        
        {/* Картка 1: Команди (Велика) */}
        <div className="col-span-12 md:col-span-4 bg-[#0a0a0a] border border-white/5 p-8 rounded-[2rem] hover:border-purple-500/30 transition-all group">
          <div className="flex justify-between items-start mb-6">
            <div className="p-3 bg-purple-500/10 rounded-xl text-purple-400"><Users size={24} /></div>
            <span className="text-4xl font-black text-white">{data.stats.teams}</span>
          </div>
          <h3 className="text-sm font-black text-slate-500 uppercase tracking-widest">Active Entities</h3>
          <p className="text-xs text-slate-600 mt-2">Команди, що пройшли валідацію</p>
        </div>

        {/* Картка 2: Турніри */}
        <div className="col-span-12 md:col-span-4 bg-[#0a0a0a] border border-white/5 p-8 rounded-[2rem] hover:border-blue-500/30 transition-all group">
          <div className="flex justify-between items-start mb-6">
            <div className="p-3 bg-blue-500/10 rounded-xl text-blue-400"><Globe size={24} /></div>
            <span className="text-4xl font-black text-white">{data.stats.tournaments}</span>
          </div>
          <h3 className="text-sm font-black text-slate-500 uppercase tracking-widest">Live Events</h3>
          <p className="text-xs text-slate-600 mt-2">Турніри у активній фазі</p>
        </div>

        {/* Картка 3: Сабміти */}
        <div className="col-span-12 md:col-span-4 bg-[#0a0a0a] border border-white/5 p-8 rounded-[2rem] hover:border-emerald-500/30 transition-all group">
          <div className="flex justify-between items-start mb-6">
            <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-400"><Send size={24} /></div>
            <span className="text-4xl font-black text-white">{data.stats.submissions}</span>
          </div>
          <h3 className="text-sm font-black text-slate-500 uppercase tracking-widest">Deployments</h3>
          <p className="text-xs text-slate-600 mt-2">Роботи подані на перевірку</p>
        </div>

        {/* Великий блок: Активний статус */}
        <div className="col-span-12 lg:col-span-8 bg-[#0a0a0a] border border-white/5 p-8 rounded-[3rem] relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 text-purple-500/20 group-hover:text-purple-500/40 transition-colors">
                <Zap size={120} fill="currentColor" />
            </div>
            <div className="relative z-10">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                    <Activity className="text-purple-500" /> Current Hackathon Status
                </h2>
                <div className="space-y-4">
                    <div className="p-5 bg-white/5 border border-white/5 rounded-2xl flex justify-between items-center hover:bg-white/10 transition-all">
                        <span className="font-bold text-slate-200">Star for Life 2026</span>
                        <span className="px-3 py-1 bg-purple-500/20 text-purple-400 text-[10px] font-black rounded-full uppercase border border-purple-500/30">Running</span>
                    </div>
                </div>
            </div>
        </div>

        {/* Малий блок: Останні дії */}
        <div className="col-span-12 lg:col-span-4 bg-purple-600 p-1 rounded-[3rem]">
            <div className="bg-[#050505] h-full w-full rounded-[2.9rem] p-8 flex flex-col justify-between">
                <h2 className="font-black text-white uppercase text-xs tracking-[0.2em] mb-6">System Logs</h2>
                <div className="space-y-4">
                    {data.recentTeams.map((t: any, i: number) => (
                        <div key={i} className="flex items-center justify-between text-xs font-mono">
                            <span className="text-slate-400">{t.name}</span>
                            <span className="text-purple-500 font-bold">{t.status}</span>
                        </div>
                    ))}
                </div>
                <button className="mt-8 text-[10px] font-black uppercase text-purple-400 hover:text-white transition-colors">View All Logs →</button>
            </div>
        </div>

      </div>
    </div>
  );
}

export default DashboardPage;