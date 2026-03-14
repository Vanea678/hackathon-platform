import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Search, GraduationCap, UserPlus, MoreVertical, TrendingUp } from 'lucide-react';

function StudentsPage() {
  const [students, setStudents] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Беремо реальні дані з бекенду
    axios.get('http://localhost:3000/api/dashboard/stats')
      .then(res => {
        // res.data.students містить 10 учнів, яких ми згенерували
        setStudents(res.data.students);
      })
      .catch(err => console.error(err));
  }, []);

  const filteredStudents = students.filter(s => 
    `${s.firstName} ${s.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Учні школи</h1>
          <p className="text-slate-400 mt-1">Керування особовими справами та успішністю</p>
        </div>
        
        <div className="flex gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
            <input 
              type="text"
              placeholder="Пошук учня..."
              className="bg-slate-800 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-white focus:ring-2 focus:ring-indigo-500 outline-none w-full md:w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="bg-indigo-500 hover:bg-indigo-600 text-white p-2.5 rounded-xl transition-all shadow-lg">
            <UserPlus size={20} />
          </button>
        </div>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-white/5 text-slate-400 uppercase text-xs tracking-widest">
            <tr>
              <th className="px-6 py-4">Учень</th>
              <th className="px-6 py-4">Клас</th>
              <th className="px-6 py-4">Рейтинг</th>
              <th className="px-6 py-4 text-center">Дії</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filteredStudents.map((student) => (
              <tr key={student.id} className="hover:bg-white/[0.02] transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-indigo-500/20 rounded-full flex items-center justify-center text-indigo-400 font-bold text-sm">
                      {student.firstName[0]}{student.lastName[0]}
                    </div>
                    <div>
                      <p className="font-bold text-white">{student.lastName} {student.firstName}</p>
                      <p className="text-xs text-slate-500">{student.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-slate-300">
                  <span className="px-3 py-1 bg-slate-800 rounded-lg border border-white/5">
                    {/* Беремо назву класу з об'єкта class, який віддав бекенд */}
                    {student.class ? student.class.name : 'Не призначено'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <TrendingUp size={16} className="text-emerald-400" />
                    <span className="text-emerald-400 font-bold">10.0</span> {/* Тимчасовий рейтинг */}
                  </div>
                </td>
                <td className="px-6 py-4 text-center">
                  <button className="text-slate-500 hover:text-white transition-colors">
                    <MoreVertical size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default StudentsPage;