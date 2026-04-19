import React, { useState } from 'react';
import { ShieldCheck, Award, Monitor, Cpu, Send } from 'lucide-react';

function EvaluationPage() {
  const [scoreTech, setScoreTech] = useState(80);
  const [scoreFunc, setScoreFunc] = useState(85);
  const [scoreUI, setScoreUI] = useState(90);

  const total = Math.round((scoreTech + scoreFunc + scoreUI) / 3);

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20">
      <div className="text-center">
        <h1 className="text-3xl font-black text-white uppercase tracking-tighter flex items-center justify-center gap-3">
          <ShieldCheck className="text-indigo-400" size={36} /> Оцінювання проєкту
        </h1>
        <p className="text-slate-400 mt-2">Виставлення балів для команди: <span className="text-white font-bold text-lg italic">Code Wizards</span></p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ScoreSlider label="Технічна частина" icon={<Cpu size={20}/>} value={scoreTech} onChange={setScoreTech} color="blue" />
        <ScoreSlider label="Функціональність" icon={<Award size={20}/>} value={scoreFunc} onChange={setScoreFunc} color="emerald" />
        <ScoreSlider label="UX / UI Дизайн" icon={<Monitor size={20}/>} value={scoreUI} onChange={setScoreUI} color="purple" />
      </div>

      <div className="bg-white/5 border border-white/10 p-8 rounded-3xl text-center backdrop-blur-xl relative overflow-hidden">
        <div className="relative z-10">
          <p className="text-slate-400 uppercase text-sm font-bold tracking-widest">Середній бал</p>
          <h2 className="text-7xl font-black text-white mt-2">{total}</h2>
          <button className="mt-8 bg-indigo-500 hover:bg-indigo-400 text-white font-black px-10 py-4 rounded-2xl transition-all shadow-lg flex items-center gap-3 mx-auto">
            <Send size={20} /> Підтвердити оцінку
          </button>
        </div>
      </div>
    </div>
  );
}

function ScoreSlider({ label, value, onChange, color, icon }: any) {
  const colors: any = { blue: "accent-blue-500", emerald: "accent-emerald-500", purple: "accent-purple-500" };
  return (
    <div className="bg-white/5 border border-white/10 p-6 rounded-3xl space-y-4">
      <div className="flex items-center gap-2 text-slate-300 font-bold uppercase text-xs">
        {icon} {label}
      </div>
      <div className="text-3xl font-black text-white">{value}</div>
      <input 
        type="range" min="0" max="100" value={value} 
        onChange={(e) => onChange(parseInt(e.target.value))}
        className={`w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer ${colors[color]}`}
      />
    </div>
  );
}

export default EvaluationPage;