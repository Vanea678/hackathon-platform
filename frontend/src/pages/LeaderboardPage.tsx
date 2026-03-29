import React, { useState } from 'react';
import { Trophy, Medal, Award, Star } from 'lucide-react';

// Тестові дані для таблиці лідерів (відсортовані за балами)
const mockLeaderboard = [
  { id: 1, team: 'Code Wizards', captain: 'Іван Петренко', tech: 95, func: 100, ui: 90, total: 285 },
  { id: 2, team: 'Byte Me', captain: 'Олена Коваль', tech: 85, func: 90, ui: 95, total: 270 },
  { id: 3, team: 'Ctrl Alt Defeat', captain: 'Максим Сидоренко', tech: 80, func: 85, ui: 80, total: 245 },
  { id: 4, team: 'Syntax Errors', captain: 'Анна Ткач', tech: 70, func: 60, ui: 75, total: 205 },
];

function LeaderboardPage() {
  return (
    <div className="space-y-6 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <Trophy className="text-yellow-400" size={32} />
            Таблиця Лідерів
          </h1>
          <p className="text-slate-400 mt-1">Рейтинг команд у турнірі "Star for Life Hackathon"</p>
        </div>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
        <table className="w-full text-left border-collapse">
          <thead className="bg-white/5 text-slate-400 uppercase text-xs tracking-widest">
            <tr>
              <th className="px-6 py-5 font-semibold">Місце</th>
              <th className="px-6 py-5 font-semibold">Команда</th>
              <th className="px-6 py-5 font-semibold text-center">Технічна частина</th>
              <th className="px-6 py-5 font-semibold text-center">Функціонал</th>
              <th className="px-6 py-5 font-semibold text-center">UX / UI</th>
              <th className="px-6 py-5 font-semibold text-center text-indigo-400">Загальний бал</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {mockLeaderboard.map((team, index) => (
              <tr key={team.id} className="hover:bg-white/[0.02] transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex justify-center items-center w-10 h-10 rounded-xl bg-slate-800/50 border border-white/5">
                    {index === 0 ? <Trophy size={20} className="text-yellow-400" /> : 
                     index === 1 ? <Medal size={20} className="text-slate-300" /> : 
                     index === 2 ? <Medal size={20} className="text-amber-600" /> : 
                     <span className="text-slate-500 font-bold">{index + 1}</span>}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <p className="font-bold text-white text-lg flex items-center gap-2">
                    {team.team}
                    {index === 0 && <Star size={14} className="text-yellow-400 fill-yellow-400" />}
                  </p>
                  <p className="text-xs text-slate-500">Капітан: {team.captain}</p>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className="text-slate-300 font-medium">{team.tech}</span>
                  <span className="text-slate-600 text-xs ml-1">/ 100</span>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className="text-slate-300 font-medium">{team.func}</span>
                  <span className="text-slate-600 text-xs ml-1">/ 100</span>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className="text-slate-300 font-medium">{team.ui}</span>
                  <span className="text-slate-600 text-xs ml-1">/ 100</span>
                </td>
                <td className="px-6 py-4 text-center">
                  <div className="inline-flex items-center justify-center px-4 py-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-black text-lg group-hover:bg-indigo-500 group-hover:text-white transition-all">
                    {team.total}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default LeaderboardPage;