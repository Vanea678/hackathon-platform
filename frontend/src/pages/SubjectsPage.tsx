import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BookOpen, Plus, MoreVertical } from 'lucide-react';

function SubjectsPage() {
  const [subjects, setSubjects] = useState<any[]>([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/dashboard/stats')
      .then(res => setSubjects(res.data.subjects))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Предмети</h1>
          <p className="text-slate-400 mt-1">Навчальна програма школи</p>
        </div>
        <button className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2.5 rounded-xl font-bold transition-all flex items-center gap-2 shadow-lg shadow-indigo-500/20">
          <Plus size={20} /> Додати предмет
        </button>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden text-left">
        <table className="w-full border-collapse">
          <thead className="bg-white/5 text-slate-400 text-sm uppercase tracking-wider">
            <tr>
              <th className="px-6 py-4 font-semibold text-left">Назва предмету</th>
              <th className="px-6 py-4 font-semibold text-left">Опис</th>
              <th className="px-6 py-4 font-semibold text-center">Дії</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {subjects.map((sub) => (
              <tr key={sub.id} className="hover:bg-white/[0.02] transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400">
                      <BookOpen size={18} />
                    </div>
                    <span className="font-bold text-slate-100">{sub.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-slate-400 text-sm">
                  {sub.description || 'Детальний опис ще не додано...'}
                </td>
                <td className="px-6 py-4 text-center text-slate-500">
                  <button className="hover:text-white transition-colors">
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

export default SubjectsPage;