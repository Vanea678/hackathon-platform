import { useState, useEffect } from 'react';
import { Trophy, Plus, Calendar, Users, Zap, Info } from 'lucide-react';
import axios from 'axios';

function TournamentsPage() {
  const [tournaments, setTournaments] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    axios.get('http://localhost:3000/api/dashboard/stats').then(res => setTournaments(res.data.tournaments));
  }, []);

  return (
    <div className="min-h-screen bg-black text-slate-200 font-sans pb-20">
      <header className="mb-12 relative flex justify-between items-end">
        <div className="relative">
          <div className="absolute -left-4 top-0 w-1 h-12 bg-purple-500 rounded-full shadow-[0_0_15px_rgba(168,85,247,0.5)]"></div>
          <h1 className="text-4xl font-black text-white tracking-tight px-2 uppercase">Events <span className="text-purple-500">Manager</span></h1>
          <p className="text-slate-500 mt-1 ml-2 text-[10px] uppercase tracking-[0.3em] font-bold">Configure and monitor competitions</p>
        </div>
        
        {user.role === 'ADMIN' && (
          <button 
            onClick={() => setShowForm(!showForm)}
            className="bg-white text-black px-6 py-3 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-purple-500 hover:text-white transition-all flex items-center gap-2"
          >
            <Plus size={16} /> {showForm ? 'Close' : 'Create New'}
          </button>
        )}
      </header>

      {showForm && (
        <div className="mb-12 bg-[#0a0a0a] border border-purple-500/30 p-8 rounded-[2.5rem] animate-in slide-in-from-top duration-500">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2 italic"><Zap size={20} className="text-purple-500"/> Tournament Configuration</h2>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input type="text" placeholder="Tournament Title" className="bg-black border border-white/10 rounded-xl py-3 px-4 text-white outline-none focus:border-purple-500" />
            <div className="grid grid-cols-2 gap-4">
              <input type="date" title="Start Date" className="bg-black border border-white/10 rounded-xl py-3 px-4 text-white outline-none focus:border-purple-500" />
              <input type="number" placeholder="Max Teams" className="bg-black border border-white/10 rounded-xl py-3 px-4 text-white outline-none focus:border-purple-500" />
            </div>
            <textarea placeholder="Description and Rules" className="md:col-span-2 bg-black border border-white/10 rounded-xl py-3 px-4 text-white outline-none h-32 focus:border-purple-500" />
            <button className="md:col-span-2 bg-purple-600 text-white font-black py-4 rounded-xl uppercase tracking-widest hover:bg-purple-500 transition-all">Initialize Tournament Engine</button>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tournaments.map((t) => (
          <div key={t.id} className="bg-[#0a0a0a] border border-white/5 p-8 rounded-[2.5rem] hover:border-purple-500/30 transition-all group relative overflow-hidden">
            <div className="flex justify-between items-start mb-6">
              <span className="px-3 py-1 bg-purple-500/10 border border-purple-500/40 text-purple-400 text-[10px] font-black rounded-full uppercase tracking-wider">{t.status}</span>
              <div className="p-3 bg-white/5 rounded-2xl text-slate-500"><Trophy size={20} /></div>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">{t.title}</h3>
            <p className="text-slate-500 text-sm mb-8 line-clamp-2">{t.description}</p>
            <div className="flex items-center gap-6 border-t border-white/5 pt-6">
              <div className="flex flex-col">
                <span className="text-[10px] text-slate-600 uppercase font-black tracking-widest">Starts</span>
                <span className="text-sm font-bold text-white">{new Date(t.startDate).toLocaleDateString()}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-slate-600 uppercase font-black tracking-widest">Teams</span>
                <span className="text-sm font-bold text-white">{t._count?.teams || 0} / {t.maxTeams || '∞'}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TournamentsPage;