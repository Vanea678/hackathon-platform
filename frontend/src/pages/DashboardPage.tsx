import { useEffect, useState } from 'react';
import { Trophy, Zap, Activity, Globe, Terminal, CheckCircle2, Clock, ArrowRight } from 'lucide-react';
import axios from 'axios';

function DashboardPage() {
  const [tournaments, setTournaments] = useState<any[]>([]);
  const [filter, setFilter] = useState('ALL'); // ALL, REGISTRATION, RUNNING, FINISHED
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    // Завантаження реальних турнірів (заміни URL на свій ендпоінт)
    axios.get('http://localhost:3000/api/tournaments').then(res => setTournaments(res.data));
  }, []);

  const filtered = tournaments.filter(t => filter === 'ALL' || t.status === filter);

  return (
    <div className="min-h-screen text-slate-200 font-sans pb-20">
      {/* Header */}
      <header className="mb-12 relative flex justify-between items-end">
        <div className="relative">
          <div className="absolute -left-4 top-0 w-1 h-12 bg-purple-500 rounded-full shadow-[0_0_15px_rgba(168,85,247,0.5)]"></div>
          <h1 className="text-4xl font-black text-white tracking-tight px-2 uppercase">Command <span className="text-purple-500">Center</span></h1>
          <p className="text-slate-500 mt-1 ml-2 text-[10px] uppercase tracking-[0.3em] font-bold italic">System monitoring & active events</p>
        </div>
      </header>

      <div className="grid grid-cols-12 gap-8">
        
        {/* ЛІВА ЧАСТИНА: Персональний блок Команди (тільки для ролі TEAM) */}
        {user.role === 'TEAM' && (
          <div className="col-span-12 lg:col-span-4 space-y-6">
            <div className="bg-purple-600 p-1 rounded-[2.5rem] shadow-[0_20px_50px_rgba(147,51,234,0.15)]">
              <div className="bg-[#050505] h-full w-full rounded-[2.4rem] p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10 text-purple-500"><Terminal size={100}/></div>
                <h2 className="text-xs font-black text-purple-500 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                   <Activity size={14}/> Your Active Session
                </h2>
                <div className="space-y-6 relative z-10">
                    <div>
                        <p className="text-[10px] text-slate-500 uppercase font-bold">Current Tournament</p>
                        <p className="text-lg font-bold text-white italic">Star for Life 2026</p>
                    </div>
                    <div className="p-4 bg-white/5 border border-white/5 rounded-2xl">
                        <p className="text-[10px] text-emerald-400 uppercase font-black mb-1">Current Task</p>
                        <p className="text-sm font-bold text-slate-200 leading-tight">Implement JWT Auth & Database Schema</p>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
                        <CheckCircle2 size={14} className="text-purple-500"/> Submission Status: <span className="text-white ml-auto italic">Awaiting...</span>
                    </div>
                    <button className="w-full mt-4 py-3 bg-white text-black rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-purple-500 hover:text-white transition-all">
                        Resume Development
                    </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ПРАВА ЧАСТИНА: Список турнірів та фільтри */}
        <div className={`col-span-12 ${user.role === 'TEAM' ? 'lg:col-span-8' : ''} space-y-8`}>
          
          {/* Фільтри */}
          <div className="flex gap-2 p-1 bg-[#0a0a0a] border border-white/5 rounded-2xl w-fit">
            {['ALL', 'REGISTRATION', 'RUNNING', 'FINISHED'].map((f) => (
              <button 
                key={f} onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                  filter === f ? 'bg-white/10 text-purple-400 border border-purple-500/30' : 'text-slate-500 hover:text-slate-200'
                }`}
              >
                {f.replace('_', ' ')}
              </button>
            ))}
          </div>

          {/* Список карток */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filtered.length > 0 ? filtered.map((t: any) => (
              <div key={t.id} className="bg-[#0a0a0a] border border-white/5 p-8 rounded-[2.5rem] hover:border-purple-500/30 transition-all group relative">
                <div className="flex justify-between items-start mb-6">
                  <Badge status={t.status} />
                  <div className="p-3 bg-white/5 rounded-2xl text-slate-600"><Trophy size={20} /></div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors uppercase tracking-tighter">{t.title}</h3>
                <p className="text-slate-500 text-xs mb-8 line-clamp-2 italic">{t.description}</p>
                <div className="flex items-center justify-between pt-6 border-t border-white/5">
                    <div className="flex items-center gap-2 text-slate-400 font-mono text-[10px]">
                        <Clock size={12} /> ENDS IN 4 DAYS
                    </div>
                    <ArrowRight className="text-slate-700 group-hover:text-purple-500 group-hover:translate-x-1 transition-all" size={20} />
                </div>
              </div>
            )) : (
                <div className="col-span-12 lg:col-span-4 bg-purple-600 p-1 rounded-[3rem] shadow-[0_20px_50px_rgba(147,51,234,0.15)] relative">
            {user.role === 'ADMIN' && (
              <div className="absolute -top-3 -right-3 z-20">
                <button className="bg-white text-black p-3 rounded-full hover:scale-110 transition-transform shadow-xl" title="Post new announcement">
                  <Activity size={20} />
                </button>
              </div>
            )}
            
            <div className="bg-[#050505] h-full w-full rounded-[2.9rem] p-8 flex flex-col relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 blur-3xl"></div>
                <h2 className="font-black text-white uppercase text-xs tracking-[0.2em] mb-6 flex items-center gap-2 relative z-10">
                  <Zap size={14} className="text-purple-500" /> Announcements
                </h2>
                
                <div className="space-y-4 overflow-y-auto pr-2 custom-scrollbar flex-1 relative z-10">
                    {/* Новина 1 (Увага) */}
                    <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-2xl">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-[10px] text-purple-400 font-bold uppercase tracking-wider bg-purple-500/10 px-2 py-0.5 rounded">SYSTEM UPDATE</span>
                          <span className="text-[10px] text-slate-500 font-mono">Just now</span>
                        </div>
                        <p className="text-sm text-slate-200 font-medium">Реєстрація на Star for Life Hackathon 2026 офіційно відкрита! Дедлайн подачі заявок — 15 квітня.</p>
                        <a href="/tournaments" className="text-xs text-purple-400 hover:text-white mt-2 inline-block font-bold underline decoration-purple-500/30 underline-offset-4">Деталі турніру →</a>
                    </div>

                    {/* Новина 2 */}
                    <div className="p-4 bg-white/5 border border-white/5 rounded-2xl">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider bg-white/5 px-2 py-0.5 rounded">Q&A SESSION</span>
                          <span className="text-[10px] text-slate-500 font-mono">2h ago</span>
                        </div>
                        <p className="text-sm text-slate-300 font-medium">Сьогодні о 18:00 відбудеться онлайн-дзвінок із журі. Готуйте ваші питання щодо критеріїв оцінювання.</p>
                        <a href="#" className="text-xs text-blue-400 hover:text-white mt-2 inline-block font-bold flex items-center gap-1"><Globe size={12}/> Zoom Link</a>
                    </div>
                    
                    {/* Новина 3 */}
                    <div className="p-4 bg-white/5 border border-white/5 rounded-2xl opacity-60">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">GENERAL</span>
                          <span className="text-[10px] text-slate-500 font-mono">1d ago</span>
                        </div>
                        <p className="text-sm text-slate-400 font-medium">Вітаємо всіх учасників! Ознайомтеся з правилами платформи перед початком.</p>
                    </div>
                </div>
            </div>
        </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

function Badge({ status }: { status: string }) {
    const styles: any = {
        RUNNING: "bg-purple-500/10 border-purple-500/40 text-purple-400",
        REGISTRATION: "bg-emerald-500/10 border-emerald-500/40 text-emerald-400",
        FINISHED: "bg-slate-800 border-white/10 text-slate-500"
    };
    return (
        <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest border ${styles[status]}`}>
            {status}
        </span>
    )
}

export default DashboardPage;