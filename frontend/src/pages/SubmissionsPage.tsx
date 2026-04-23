import { useState, useEffect } from 'react';
import { Github, PlayCircle, Globe, FileText, Send, Lock, AlertCircle } from 'lucide-react';
import axios from 'axios';

function SubmissionPage() {
  const [task, setTask] = useState<any>(null);
  const [formData, setFormData] = useState({ github: '', video: '', live: '', desc: '' });
  const [isClosed, setIsClosed] = useState(false);

  useEffect(() => {
    // Завантажуємо активне завдання
    axios.get('http://localhost:3000/api/tasks/active').then(res => {
      setTask(res.data);
      if (new Date() > new Date(res.data.deadline)) setIsClosed(true);
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isClosed) return;
    // Логіка відправки на бекенд...
    alert("Project Synchronized! 🚀");
  };

  return (
    <div className="min-h-screen text-slate-200 font-sans max-w-5xl mx-auto">
      <header className="mb-12 relative flex justify-between items-end">
        <div className="relative">
          <div className="absolute -left-4 top-0 w-1 h-12 bg-purple-500 rounded-full shadow-[0_0_15px_rgba(168,85,247,0.5)]"></div>
          <h1 className="text-4xl font-black text-white tracking-tight px-2 uppercase italic">PROJECT <span className="text-purple-500">DEPLOYS</span></h1>
          <p className="text-slate-500 mt-1 ml-2 text-[10px] uppercase tracking-[0.3em] font-bold">Final submission phase</p>
        </div>
        
        {isClosed && (
            <div className="flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/40 text-red-500 rounded-xl font-black text-[10px] uppercase tracking-widest animate-pulse">
                <Lock size={14} /> Submission Closed
            </div>
        )}
      </header>

      <form onSubmit={handleSubmit} className="grid grid-cols-12 gap-6">
        
        {/* Посилання (Основний блок) */}
        <div className="col-span-12 lg:col-span-7 space-y-6">
            <div className="bg-[#0a0a0a] border border-white/5 p-8 rounded-[2.5rem] space-y-6">
                <h2 className="text-white font-bold flex items-center gap-3"><Github className="text-purple-500" size={20}/> Repository Links</h2>
                
                <div className="space-y-4">
                    <InputField label="GitHub Repository (Required)" icon={<Github size={16}/>} placeholder="https://github.com/..." disabled={isClosed} />
                    <InputField label="Video Demo (Required)" icon={<PlayCircle size={16}/>} placeholder="https://youtube.com/..." disabled={isClosed} />
                    <InputField label="Live Demo (Optional)" icon={<Globe size={16}/>} placeholder="https://my-app.vercel.app" disabled={isClosed} />
                </div>
            </div>
        </div>

        {/* Опис та Дія */}
        <div className="col-span-12 lg:col-span-5 space-y-6 flex flex-col">
            <div className="bg-[#0a0a0a] border border-white/5 p-8 rounded-[2.5rem] flex-1">
                <h2 className="text-white font-bold mb-6 flex items-center gap-3"><FileText className="text-purple-500" size={20}/> Description</h2>
                <textarea 
                    disabled={isClosed}
                    placeholder="Briefly describe your solution and execution steps..."
                    className="w-full bg-black border border-white/10 rounded-2xl p-4 text-sm font-mono text-slate-400 h-48 focus:border-purple-500 outline-none transition-all resize-none"
                />
            </div>

            <button 
                type="submit"
                disabled={isClosed}
                className={`w-full py-6 rounded-[2rem] font-black uppercase tracking-[0.2em] text-xs transition-all flex items-center justify-center gap-3 ${
                    isClosed ? 'bg-slate-900 text-slate-600 cursor-not-allowed' : 'bg-white text-black hover:bg-purple-500 hover:text-white shadow-[0_20px_40px_rgba(255,255,255,0.05)]'
                }`}
            >
                {isClosed ? 'Access Blocked' : <><Send size={18} /> Push Project Data</>}
            </button>
        </div>

      </form>
    </div>
  );
}

function InputField({ label, icon, placeholder, disabled }: any) {
    return (
        <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-600 uppercase tracking-widest ml-1">{label}</label>
            <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-purple-500 transition-colors">{icon}</div>
                <input 
                    type="url" required={label.includes('Required')} disabled={disabled}
                    placeholder={placeholder}
                    className="w-full bg-black border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white text-sm font-mono focus:border-purple-500 outline-none transition-all placeholder:text-slate-800"
                />
            </div>
        </div>
    );
}

export default SubmissionPage;