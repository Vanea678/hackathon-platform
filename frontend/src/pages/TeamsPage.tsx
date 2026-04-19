import { useEffect, useState } from 'react'; // Прибрали 'React', щоб не було жовтого попередження
import axios from 'axios';
import { Search, Users, Shield, Mail } from 'lucide-react';

function TeamsPage() {
  const [teams, setTeams] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3000/api/dashboard/stats')
      .then(res => {
        setTeams(res.data.students || []);
      })
      .catch(err => console.error(err));
  }, []);

  const filteredTeams = teams.filter(t => 
    `${t.firstName} ${t.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <Users className="text-indigo-400" size={32} />
            Учасники та Команди
          </h1>
          <p className="text-slate-400 mt-1">Список усіх зареєстрованих учасників турніру</p>
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
          <input 
            type="text"
            placeholder="Пошук учасника..."
            className="bg-slate-800 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-white focus:ring-2 focus:ring-indigo-500 outline-none w-full md:w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredTeams.map((member) => (
          <div key={member.id} className="bg-white/5 border border-white/10 p-6 rounded-3xl hover:border-indigo-500/50 transition-all group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-indigo-500/5 rounded-bl-full"></div>
            
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-indigo-500/20 rounded-xl flex items-center justify-center text-indigo-400 font-bold">
                {member.firstName[0]}{member.lastName[0]}
              </div>
              <div>
                <h3 className="text-lg font-bold text-white leading-tight">{member.lastName} {member.firstName}</h3>
                <span className="text-xs text-indigo-400 font-bold uppercase tracking-widest">
                  {member.role}
                </span>
              </div>
            </div>
            
            <div className="space-y-2 border-t border-white/5 pt-4">
              <p className="text-slate-400 text-sm flex items-center gap-2">
                <Mail size={14} className="text-slate-500" /> {member.email}
              </p>
              <p className="text-slate-400 text-sm flex items-center gap-2">
                <Shield size={14} className="text-slate-500" /> ID: {member.id.slice(0,8)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ОСЬ ЦЬОГО РЯДКА ТОБІ НЕ ВИСТАЧАЛО:
export default TeamsPage;