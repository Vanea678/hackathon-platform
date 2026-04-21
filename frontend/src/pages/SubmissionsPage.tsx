import { useState } from 'react';
import { Github, Video, Send, FileCode, CheckCircle2 } from 'lucide-react';

function SubmissionsPage() {
  const [success, setSuccess] = useState(false);

  return (
    <div className="min-h-screen bg-black text-slate-200 font-sans max-w-4xl mx-auto">
      <header className="mb-12 relative">
        <div className="absolute -left-4 top-0 w-1 h-12 bg-purple-500 rounded-full shadow-[0_0_15px_rgba(168,85,247,0.5)]"></div>
        <h1 className="text-4xl font-black text-white tracking-tight px-2 uppercase">PROJECT <span className="text-purple-500">SUBMISSION</span></h1>
        <p className="text-slate-500 mt-1 ml-2 text-[10px] uppercase tracking-[0.3em] font-bold italic">Upload your deployment assets</p>
      </header>

      <div className="bg-[#0a0a0a] border border-white/5 p-10 rounded-[3rem] relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-50"></div>
        
        {success ? (
            <div className="py-20 text-center space-y-4 animate-in fade-in zoom-in duration-500">
                <div className="inline-flex p-6 bg-purple-500/20 rounded-full text-purple-400 mb-4 border border-purple-500/30">
                    <CheckCircle2 size={64} />
                </div>
                <h2 className="text-3xl font-black text-white uppercase italic">Mission Accomplished</h2>
                <p className="text-slate-500 font-mono text-sm">Your project data has been encrypted and sent to the Jury.</p>
                <button onClick={() => setSuccess(false)} className="text-purple-500 font-black uppercase text-xs tracking-widest pt-10 hover:text-white transition-colors">Submit Another Link</button>
            </div>
        ) : (
            <form className="space-y-8" onSubmit={(e) => { e.preventDefault(); setSuccess(true); }}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 flex items-center gap-2">
                            <Github size={14} className="text-purple-500" /> Source Code Repository
                        </label>
                        <input type="url" placeholder="https://github.com/..." required
                            className="w-full bg-black border border-white/10 rounded-2xl py-4 px-5 text-white font-mono text-sm focus:border-purple-500 outline-none transition-all placeholder:text-slate-800" />
                    </div>
                    <div className="space-y-3">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 flex items-center gap-2">
                            <Video size={14} className="text-red-500" /> Video Demonstration
                        </label>
                        <input type="url" placeholder="https://youtube.com/..." required
                            className="w-full bg-black border border-white/10 rounded-2xl py-4 px-5 text-white font-mono text-sm focus:border-purple-500 outline-none transition-all placeholder:text-slate-800" />
                    </div>
                </div>

                <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 flex items-center gap-2">
                        <FileCode size={14} className="text-blue-500" /> Brief Description
                    </label>
                    <textarea placeholder="Technical stack, core features and instructions..." rows={4}
                        className="w-full bg-black border border-white/10 rounded-2xl py-4 px-5 text-white font-mono text-sm focus:border-purple-500 outline-none transition-all resize-none placeholder:text-slate-800" />
                </div>

                <button type="submit" className="w-full bg-purple-600 hover:bg-purple-500 text-white font-black py-5 rounded-[2rem] shadow-[0_20px_40px_rgba(147,51,234,0.2)] transition-all flex items-center justify-center gap-3 uppercase tracking-[0.3em] text-xs">
                    <Send size={18} /> Initiate Deployment
                </button>
            </form>
        )}
      </div>
    </div>
  );
}

export default SubmissionsPage;