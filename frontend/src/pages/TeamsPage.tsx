import React, { useState } from 'react';
import { Search, Users, Shield, Code } from 'lucide-react';

const mockTeams = [
  { id: 1, name: 'Code Wizards', captain: 'Іван Петренко', members: 4, stack: 'React, Node.js' },
  { id: 2, name: 'Byte Me', captain: 'Олена Коваль', members: 3, stack: 'Vue, Python' },
  { id: 3, name: 'Ctrl Alt Defeat', captain: 'Максим Сидоренко', members: 5, stack: 'Angular, Java' },
];

function TeamsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTeams = mockTeams.filter(t => 
    t.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <Users className="text-indigo-400" size={32} />
            Зареєстровані команди
          </h1>
          <p className="text-slate-400 mt-1">Список команд, які беруть участь у турнірі</p>
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
          <input 
            type="text"
            placeholder="Пошук команди..."
            className="bg-slate-800 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-white focus:ring-2 focus:ring-indigo-500 outline-none w-full md:w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredTeams.map((team) => (
          <div key={team.id} className="bg-white/5 border border-white/10 p-6 rounded-3xl hover:border-indigo-500/50 transition-all group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/10 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
            
            <div className="flex items-start justify-between mb-4 relative z-10">
              <div className="w-14 h-14 bg-indigo-500/20 rounded-2xl flex items-center justify-center text-indigo-400 text-xl font-black uppercase shadow-inner">
                {team.name.substring(0, 2)}
              </div>
              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 text-xs font-bold rounded-full uppercase tracking-wider">
                Підтверджено
              </span>
            </div>
            
            <h3 className="text-2xl font-bold text-white mb-1">{team.name}</h3>
            <p className="text-slate-400 text-sm mb-4 flex items-center gap-2 font-medium">
              <Shield size={14} className="text-indigo-400" /> Капітан: {team.captain}
            </p>

            <div className="pt-4 border-t border-white/5 flex gap-4 text-sm text-slate-400">
              <div className="flex items-center gap-1.5">
                <Users size={16} className="text-slate-500" />
                <span>{team.members} учасників</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Code size={16} className="text-slate-500" />
                <span>{team.stack}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TeamsPage;