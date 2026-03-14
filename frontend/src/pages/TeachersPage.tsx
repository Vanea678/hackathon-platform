import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Search, Mail, UserCheck } from 'lucide-react';

function TeachersPage() {
  const [teachers, setTeachers] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3000/api/dashboard/stats')
      .then(res => setTeachers(res.data.teachers))
      .catch(err => console.error(err));
  }, []);

  const filteredTeachers = teachers.filter(t => 
    `${t.firstName} ${t.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Викладацький склад</h1>
          <p className="text-slate-400 mt-1">Керування вчителями та їх доступом</p>
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
          <input 
            type="text"
            placeholder="Пошук вчителя..."
            className="bg-slate-800 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-white focus:ring-2 focus:ring-indigo-500 outline-none w-full md:w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredTeachers.map((teacher) => (
          <div key={teacher.id} className="bg-white/5 border border-white/10 p-6 rounded-3xl hover:border-indigo-500/50 transition-all group">
            <div className="flex items-start justify-between mb-4">
              <div className="w-14 h-14 bg-indigo-500/20 rounded-2xl flex items-center justify-center text-indigo-400 text-xl font-bold">
                {teacher.firstName[0]}{teacher.lastName[0]}
              </div>
              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 text-xs font-bold rounded-full uppercase tracking-wider">
                Active
              </span>
            </div>
            
            <h3 className="text-xl font-bold text-white">{teacher.lastName} {teacher.firstName}</h3>
            <p className="text-slate-400 text-sm mb-4 flex items-center gap-2">
              <Mail size={14} /> {teacher.email}
            </p>

            <div className="pt-4 border-t border-white/5 flex gap-2">
              <button className="flex-1 bg-white/5 hover:bg-indigo-500 hover:text-white py-2 rounded-xl text-sm font-medium transition-all flex items-center justify-center gap-2">
                <UserCheck size={16} /> Профіль
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TeachersPage;