import React from 'react';
import { Trophy, Calendar, CheckCircle } from 'lucide-react';

const mockTournaments = [
  { id: 1, title: 'Star for Life Hackathon 2026', status: 'RUNNING', date: '15.04.2026 - 20.04.2026', tasks: 3 },
  { id: 2, title: 'Autumn Code Fest', status: 'FINISHED', date: '10.10.2025 - 15.10.2025', tasks: 5 },
];

function TournamentsPage() {
  return (
    <div className="space-y-6 pb-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <Trophy className="text-indigo-400" size={32} />
            Турніри
          </h1>
          <p className="text-slate-400 mt-1">Список активних та завершених змагань</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {mockTournaments.map((t) => (
          <div key={t.id} className="bg-white/5 border border-white/10 rounded-3xl p-8 hover:border-indigo-500/30 transition-all flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-4">
                <span className={`px-3 py-1 text-xs font-bold rounded-full uppercase tracking-wider ${
                  t.status === 'RUNNING' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-slate-500/10 text-slate-400'
                }`}>
                  {t.status === 'RUNNING' ? 'Активний' : 'Завершено'}
                </span>
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">{t.title}</h2>
              <div className="flex items-center gap-2 text-slate-400 text-sm mb-6">
                <Calendar size={16} />
                <span>{t.date}</span>
              </div>
            </div>
            
            <div className="pt-4 border-t border-white/5 flex items-center justify-between">
              <span className="text-slate-400 text-sm flex items-center gap-2">
                <CheckCircle size={16} className="text-indigo-400" /> Завдань: {t.tasks}
              </span>
              <button className="text-indigo-400 font-bold hover:text-indigo-300 transition-colors">
                Переглянути деталі →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TournamentsPage;