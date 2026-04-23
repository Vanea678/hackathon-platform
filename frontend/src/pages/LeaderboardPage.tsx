import { useEffect, useState } from 'react';
import { Medal, Trophy, Star, ChevronDown, ChevronUp, Activity, Target, Layout } from 'lucide-react';
import axios from 'axios';

function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [expandedTeam, setExpandedTeam] = useState<string | null>(null);

  useEffect(() => {
    axios.get('http://localhost:3000/api/leaderboard')
      .then(res => setLeaderboard(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="min-h-screen text-slate-200 pb-20">
      <header className="mb-12 relative flex justify-between items-end">
        <div className="relative">
          <div className="absolute -left-4 top-0 w-1 h-12 bg-purple-500 rounded-full shadow-[0_0_15px_rgba(168,85,247,0.5)]"></div>
          <h1 className="text-4xl font-black text-white tracking-tight px-2 uppercase italic">RANKING <span className="text-purple-500">SYSTEM</span></h1>
          <p className="text-slate-500 mt-1 ml-2 text-[10px] uppercase tracking-[0.3em] font-bold">Final Tournament Standing</p>
        </div>
        <div className="px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-lg text-[10px] font-black uppercase tracking-widest animate-pulse">
            Evaluation Live
        </div>
      </header>

      <div className="bg-[#0a0a0a] border border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-white/5 text-slate-500 text-[10px] uppercase tracking-[0.2em] font-black">
              <th className="px-8 py-6">Pos</th>
              <th className="px-6 py-6">Team Entity</th>
              <th className="px-6 py-6 text-center">Breakdown</th>
              <th className="px-8 py-6 text-right text-purple-400 text-sm">Aggregated Score</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {leaderboard.map((team, index) => (
              <>
                <tr key={team.id} 
                    onClick={() => setExpandedTeam(expandedTeam === team.id ? null : team.id)}
                    className="hover:bg-white/[0.02] transition-all group cursor-pointer">
                  <td className="px-8 py-8 font-mono text-slate-500">
                    {index === 0 ? <Trophy className="text-yellow-400" size={24} /> : 
                     index === 1 ? <Medal className="text-slate-300" size={24} /> :
                     index === 2 ? <Medal className="text-amber-600" size={24} /> : 
                     `0${index + 1}`}
                  </td>
                  <td className="px-6 py-8">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 font-black">
                            {team.name[0]}
                        </div>
                        <div>
                            <p className="font-black text-white text-lg tracking-tight uppercase group-hover:text-purple-400 transition-colors">{team.name}</p>
                            <p className="text-[10px] text-slate-600 font-mono italic">UID: {team.id.slice(0,8)}</p>
                        </div>
                    </div>
                  </td>
                  <td className="px-6 py-8">
                    <div className="flex justify-center gap-6">
                        <MiniStat icon={<Activity size={12}/>} label="Tech" val={team.tech} />
                        <MiniStat icon={<Target size={12}/>} label="Func" val={team.func} />
                        <MiniStat icon={<Layout size={12}/>} label="UI" val={team.ui} />
                    </div>
                  </td>
                  <td className="px-8 py-8 text-right">
                    <span className="text-3xl font-black text-white tracking-tighter">{team.total}</span>
                    <span className="text-slate-700 text-xs font-bold ml-1">pts</span>
                  </td>
                </tr>
                
                {/* Розгортання з деталями (Опціонально) */}
                {expandedTeam === team.id && (
                  <tr className="bg-black/50">
                    <td colSpan={4} className="px-20 py-8">
                        <div className="grid grid-cols-3 gap-8 animate-in slide-in-from-top-2 duration-300">
                            <DetailBlock label="Technical Quality" val={team.tech} desc="Clean code, patterns, OOP, error handling" />
                            <DetailBlock label="Logic & Functionality" val={team.func} desc="Must-have requirements, bug-free performance" />
                            <DetailBlock label="Interface & UX" val={team.ui} desc="Aesthetics, usability, responsiveness" />
                        </div>
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function MiniStat({ icon, label, val }: any) {
    return (
        <div className="flex flex-col items-center gap-1">
            <div className="flex items-center gap-1 text-slate-600 font-black text-[8px] uppercase tracking-tighter">
                {icon} {label}
            </div>
            <span className="text-xs font-bold text-slate-400">{val}%</span>
        </div>
    )
}

function DetailBlock({ label, val, desc }: any) {
    return (
        <div className="space-y-2">
            <div className="flex justify-between items-end">
                <p className="text-[10px] font-black text-purple-500 uppercase tracking-widest">{label}</p>
                <p className="text-xl font-black text-white">{val}%</p>
            </div>
            <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-purple-600" style={{ width: `${val}%` }}></div>
            </div>
            <p className="text-[10px] text-slate-600 italic leading-tight">{desc}</p>
        </div>
    )
}

export default LeaderboardPage;