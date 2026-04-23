import { useEffect, useState } from 'react';
import { Timer, Code, CheckSquare, Terminal, ExternalLink } from 'lucide-react';
import axios from 'axios';

function ActiveTaskPage() {
  const [task, setTask] = useState<any>(null);
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    // 1. Завантажуємо завдання
    axios.get('http://localhost:3000/api/tasks/active').then(res => {
      setTask(res.data);
      startTimer(res.data.deadline);
    });
  }, []);

  const startTimer = (deadline: string) => {
    setInterval(() => {
      const distance = new Date(deadline).getTime() - new Date().getTime();
      const hours = Math.floor(distance / (1000 * 60 * 60));
      const mins = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const secs = Math.floor((distance % (1000 * 60)) / 1000);
      setTimeLeft(`${hours}h ${mins}m ${secs}s`);
    }, 1000);
  };

  if (!task) return <div className="text-white p-10 font-black">WAITING FOR MISSION START...</div>;

  return (
    <div className="min-h-screen text-slate-200">
      <header className="mb-12 relative flex justify-between items-start">
        <div className="relative">
          <div className="absolute -left-4 top-0 w-1 h-12 bg-purple-500 rounded-full shadow-[0_0_15px_rgba(168,85,247,0.5)]"></div>
          <h1 className="text-4xl font-black text-white tracking-tight px-2 uppercase">MISSION: <span className="text-purple-500">{task.title}</span></h1>
          <p className="text-slate-500 mt-1 ml-2 text-[10px] uppercase tracking-[0.3em] font-bold">Round 01 • Deployment Phase</p>
        </div>

        <div className="bg-purple-600/10 border border-purple-500/30 px-6 py-4 rounded-3xl flex items-center gap-4">
            <Timer className="text-purple-400 animate-pulse" size={24} />
            <div>
                <p className="text-[10px] font-black text-slate-500 uppercase">Deadline in:</p>
                <p className="text-xl font-mono font-bold text-white leading-none">{timeLeft}</p>
            </div>
        </div>
      </header>

      <div className="grid grid-cols-12 gap-8">
        {/* Опис та Функціонал */}
        <div className="col-span-12 lg:col-span-8 space-y-8">
            <div className="bg-[#0a0a0a] border border-white/5 p-10 rounded-[3rem]">
                <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3 italic underline decoration-purple-500 underline-offset-8">
                    Project Description
                </h2>
                <div className="text-slate-400 leading-relaxed space-y-4">
                    {task.description.split('\n').map((line: string, i: number) => <p key={i}>{line}</p>)}
                </div>
            </div>

            <div className="bg-[#0a0a0a] border border-white/5 p-10 rounded-[3rem]">
                <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                    <Code className="text-purple-500" /> Tech Stack & Constraints
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {task.techRequirements.split(',').map((req: string, i: number) => (
                        <div key={i} className="flex items-center gap-3 bg-white/5 p-4 rounded-2xl border border-white/5">
                            <Terminal size={16} className="text-indigo-500" />
                            <span className="text-sm font-bold text-slate-300">{req.trim()}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        {/* Check-list Must Have */}
        <div className="col-span-12 lg:col-span-4 bg-purple-600 p-1 rounded-[3rem] shadow-[0_20px_60px_rgba(147,51,234,0.2)]">
            <div className="bg-[#0d1117] h-full w-full rounded-[2.9rem] p-8">
                <h2 className="font-black text-white uppercase text-xs tracking-[0.2em] mb-8 flex items-center gap-2">
                    <CheckSquare size={16} className="text-purple-500" /> Must-Have Criteria
                </h2>
                <div className="space-y-4">
                    {task.mustHaveChecklist.map((item: string, i: number) => (
                        <div key={i} className="flex items-start gap-4 p-4 bg-white/5 rounded-2xl border border-white/5 group hover:border-purple-500/50 transition-all">
                            <div className="mt-1 w-2 h-2 rounded-full bg-purple-500 group-hover:shadow-[0_0_10px_#a855f7]"></div>
                            <span className="text-sm text-slate-300 font-medium leading-tight">{item}</span>
                        </div>
                    ))}
                </div>

                {task.materialsUrl && (
                    <button className="w-full mt-10 py-4 bg-white text-black font-black uppercase text-[10px] tracking-widest rounded-2xl hover:bg-purple-500 hover:text-white transition-all flex items-center justify-center gap-2">
                        View Resources <ExternalLink size={14} />
                    </button>
                )}
            </div>
        </div>
      </div>
    </div>
  );
}

export default ActiveTaskPage;