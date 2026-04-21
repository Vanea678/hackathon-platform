import { useEffect, useState } from 'react';
import axios from 'axios';
import { Search, Users, Shield, Mail, Terminal } from 'lucide-react';

function TeamsPage() {
  const [teams, setTeams] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3000/api/dashboard/stats')
      .then(res => setTeams(res.data.students || []))
      .catch(err => console.error(err));
  }, []);

  const filteredTeams = teams.filter(t => 
    `${t.firstName} ${t.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-black text-slate-200 font-sans">
      <header className="mb-12 relative flex justify-between items-end">
        <div className="relative">
          <div className="absolute -left-4 top-0 w-1 h-12 bg-purple-500 rounded-full shadow-[0_0_15px_rgba(168,85,247,0.5)]"></div>
          <h1 className="text-4xl font-black text-white tracking-tight px-2 uppercase">TEAM <span className="text-purple-500">REGISTRY</span></h1>
          <p className="text-slate-500 mt-1 ml-2 text-[10px] uppercase tracking-[0.3em] font-bold italic">Active participants database</p>
        </div>
        <div className="flex items-center gap-3 bg-[#0a0a0a] border border-white/10 px-4 py-2 rounded-xl focus-within:border-purple-500/50 transition-all">
          <Search size={18} className="text-slate-500" />
          <input 
            type="text" placeholder="Search teams..." 
            className="bg-transparent outline-none text-sm w-48 text-white"
            value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </header>

      <div className="grid grid-cols-12 gap-6">
        {filteredTeams.map((member) => (
          <div key={member.id} className="col-span-12 md:col-span-6 lg:col-span-4 bg-[#0a0a0a] border border-white/5 p-6 rounded-[2rem] hover:border-purple-500/30 transition-all group relative overflow-hidden">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-purple-500/10 border border-purple-500/20 rounded-xl flex items-center justify-center text-purple-400 font-black">
                {member.firstName[0]}{member.lastName[0]}
              </div>
              <div>
                <h3 className="text-lg font-bold text-white group-hover:text-purple-400 transition-colors">{member.lastName} {member.firstName}</h3>
                <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest">{member.role}</span>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-xs text-slate-400 font-mono bg-white/5 p-3 rounded-xl border border-white/5">
                <Mail size={14} className="text-purple-500" /> {member.email}
              </div>
              <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-tighter px-2">
                <span className="text-slate-600">Object ID:</span>
                <span className="text-slate-400">{member.id.slice(0,12)}...</span>
              </div>
            </div>
            
            <button className="w-full mt-6 py-3 rounded-2xl bg-white/5 border border-white/5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:bg-purple-500 hover:text-white hover:border-purple-500 transition-all">
                Access Profile
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TeamsPage;