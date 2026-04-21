import { Trophy, Calendar, Zap, ArrowRight, Shield } from 'lucide-react';

const mockTournaments = [
  { id: 1, title: 'Star for Life Hackathon 2026', status: 'RUNNING', date: 'APR 15 - APR 20', tasks: 3, prize: '$5000' },
  { id: 2, title: 'Autumn Code Fest', status: 'FINISHED', date: 'OCT 10 - OCT 15', tasks: 5, prize: '$2000' },
];

function TournamentsPage() {
  return (
    <div className="min-h-screen bg-black text-slate-200 font-sans">
      <header className="mb-12 relative flex justify-between items-end">
        <div className="relative">
          <div className="absolute -left-4 top-0 w-1 h-12 bg-purple-500 rounded-full shadow-[0_0_15px_rgba(168,85,247,0.5)]"></div>
          <h1 className="text-4xl font-black text-white tracking-tight px-2 uppercase">ACTIVE <span className="text-purple-500">EVENTS</span></h1>
          <p className="text-slate-500 mt-1 ml-2 text-[10px] uppercase tracking-[0.3em] font-bold">Tournament Lifecycle Management</p>
        </div>
      </header>

      <div className="grid grid-cols-12 gap-6">
        {mockTournaments.map((t) => (
          <div key={t.id} className="col-span-12 lg:col-span-6 bg-[#0a0a0a] border border-white/5 p-8 rounded-[2.5rem] hover:border-purple-500/30 transition-all group relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 text-purple-500/5 group-hover:text-purple-500/10 transition-colors">
                <Trophy size={150} fill="currentColor" />
            </div>
            
            <div className="relative z-10">
                <div className="flex justify-between items-start mb-8">
                    <span className={`px-3 py-1 text-[10px] font-black rounded-full uppercase tracking-wider border ${
                        t.status === 'RUNNING' ? 'bg-purple-500/10 border-purple-500/50 text-purple-400' : 'bg-slate-800 border-white/10 text-slate-500'
                    }`}>
                        {t.status}
                    </span>
                    <div className="flex items-center gap-2 text-slate-500 font-mono text-xs">
                        <Calendar size={14} /> {t.date}
                    </div>
                </div>
                
                <h2 className="text-3xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">{t.title}</h2>
                <p className="text-slate-500 text-sm mb-8 max-w-sm">Official programming tournament powered by Star for Life Ukraine. Join the elite.</p>
                
                <div className="flex items-center gap-6">
                    <div className="flex flex-col">
                        <span className="text-[10px] text-slate-600 uppercase font-black tracking-widest">Tasks</span>
                        <span className="text-xl font-bold text-white">{t.tasks}</span>
                    </div>
                    <div className="w-px h-8 bg-white/10"></div>
                    <div className="flex flex-col">
                        <span className="text-[10px] text-slate-600 uppercase font-black tracking-widest">Prize Pool</span>
                        <span className="text-xl font-bold text-purple-400">{t.prize}</span>
                    </div>
                </div>

                <button className="mt-10 w-full py-4 rounded-2xl bg-white text-black font-black uppercase text-xs tracking-widest hover:bg-purple-500 hover:text-white transition-all flex items-center justify-center gap-2 group/btn">
                    Enter Tournament <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TournamentsPage;