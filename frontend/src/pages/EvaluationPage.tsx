import { useEffect, useState } from 'react';
import { ShieldCheck, Github, ExternalLink, Cpu, Layout, MessageSquare, Send } from 'lucide-react';
import axios from 'axios';

function EvaluationPage() {
  const [assignments, setAssignments] = useState<any[]>([]);
  const [selectedSub, setSelectedSub] = useState<any>(null);
  
  // Стан для балів
  const [scores, setScores] = useState({ backend: 80, db: 80, frontend: 80, mustHave: 80, bugs: 80, ux: 80 });

  useEffect(() => {
    // Завантажуємо тільки ті роботи, що призначені поточному журі
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    axios.get(`http://localhost:3000/api/evaluation/my-assignments?juryId=${user.id}`)
      .then(res => setAssignments(res.data));
  }, []);

  const submitScore = async () => {
    const total = Object.values(scores).reduce((a, b) => a + b, 0) / 6;
    alert(`Проєкт оцінено на ${total.toFixed(1)} балів! ✅`);
  };

  return (
    <div className="min-h-screen text-slate-200 font-sans">
      <header className="mb-12 relative">
        <div className="absolute -left-4 top-0 w-1 h-12 bg-purple-500 rounded-full shadow-[0_0_15px_rgba(168,85,247,0.5)]"></div>
        <h1 className="text-4xl font-black text-white tracking-tight px-2 uppercase">JURY <span className="text-purple-500">ASSESSMENT</span></h1>
        <p className="text-slate-500 mt-1 ml-2 text-[10px] uppercase tracking-[0.3em] font-bold italic">Evaluation Phase • Assigned Projects</p>
      </header>

      <div className="grid grid-cols-12 gap-8">
        {/* Список призначених робіт (Bento) */}
        <div className="col-span-12 lg:col-span-4 space-y-4">
          <h2 className="text-xs font-black text-slate-500 uppercase tracking-widest ml-2 mb-4">Your Queue</h2>
          {[1, 2, 3].map((i) => ( // Тимчасовий цикл для дизайну
            <div key={i} onClick={() => setSelectedSub(i)} className={`p-6 rounded-[2rem] border transition-all cursor-pointer ${selectedSub === i ? 'bg-purple-600/10 border-purple-500/50' : 'bg-[#0a0a0a] border-white/5 hover:border-white/20'}`}>
              <h3 className="font-bold text-white uppercase tracking-tighter">Team Alpha 0{i}</h3>
              <p className="text-[10px] text-slate-500 font-mono mt-1 italic">Status: Pending Review</p>
            </div>
          ))}
        </div>

        {/* Форма оцінювання (Активна лише якщо обрана робота) */}
        <div className="col-span-12 lg:col-span-8 bg-[#0a0a0a] border border-white/5 p-10 rounded-[3rem] relative overflow-hidden">
          <div className="absolute top-0 right-0 p-10 opacity-5"><ShieldCheck size={180} /></div>
          
          <div className="relative z-10 space-y-10">
            <div className="flex justify-between items-center border-b border-white/5 pb-8">
                <div>
                    <h2 className="text-2xl font-bold text-white">Project Evaluation</h2>
                    <div className="flex gap-4 mt-4">
                        <a href="#" className="flex items-center gap-2 text-xs font-bold text-purple-400 hover:text-white transition-all bg-purple-500/5 px-3 py-1.5 rounded-lg border border-purple-500/20"><Github size={14}/> Code</a>
                        <a href="#" className="flex items-center gap-2 text-xs font-bold text-blue-400 hover:text-white transition-all bg-blue-500/5 px-3 py-1.5 rounded-lg border border-blue-500/20"><ExternalLink size={14}/> Live Demo</a>
                    </div>
                </div>
                <div className="text-center">
                    <p className="text-[10px] font-black text-slate-500 uppercase">Current Avg</p>
                    <p className="text-4xl font-black text-purple-500 tracking-tighter">84.2</p>
                </div>
            </div>

            {/* Слайдери Оцінок */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
              <ScoreItem label="Backend Quality" val={scores.backend} onChange={(v:any) => setScores({...scores, backend: v})} icon={<Cpu size={16}/>}/>
              <ScoreItem label="Functionality" val={scores.mustHave} onChange={(v:any) => setScores({...scores, mustHave: v})} icon={<Layout size={16}/>}/>
              <ScoreItem label="Database Structure" val={scores.db} onChange={(v:any) => setScores({...scores, db: v})} icon={<Cpu size={16}/>}/>
              <ScoreItem label="UI / UX Design" val={scores.ux} onChange={(v:any) => setScores({...scores, ux: v})} icon={<Layout size={16}/>}/>
            </div>

            <div className="space-y-4">
                <label className="text-[10px] font-black text-slate-500 uppercase flex items-center gap-2"><MessageSquare size={14}/> Jury Comments</label>
                <textarea className="w-full bg-black border border-white/10 rounded-2xl p-4 text-sm font-mono focus:border-purple-500 outline-none h-24" placeholder="Technical feedback for the team..."></textarea>
            </div>

            <button onClick={submitScore} className="w-full bg-white text-black font-black py-5 rounded-[2rem] uppercase tracking-[0.3em] text-xs hover:bg-purple-500 hover:text-white transition-all flex items-center justify-center gap-3">
               <Send size={18}/> Finalize Assessment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ScoreItem({ label, val, onChange, icon }: any) {
    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">{icon} {label}</span>
                <span className="text-lg font-bold text-white">{val}</span>
            </div>
            <input type="range" min="0" max="100" value={val} onChange={(e) => onChange(parseInt(e.target.value))} 
                   className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500" />
        </div>
    )
}

export default EvaluationPage;