import React, { useState } from 'react';
import { Github, Video, Send, FileText } from 'lucide-react';
import axios from 'axios';

function SubmissionsPage() {
  const [githubUrl, setGithubUrl] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Надсилання...');
    
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      // В реальній системі teamId береться з профілю користувача
      await axios.post('http://localhost:3000/api/submissions', {
        teamId: user.id, 
        taskId: "default-task-id", 
        githubUrl,
        videoUrl,
        description
      });
      setStatus('✅ Роботу успішно здано!');
    } catch (error) {
      setStatus('❌ Помилка при здачі роботи');
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Подача проєкту</h1>
        <p className="text-slate-400 mt-2">Заповніть посилання на ваші матеріали для оцінювання журі</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white/5 border border-white/10 p-8 rounded-3xl space-y-6 backdrop-blur-xl">
        {status && (
          <div className={`p-4 rounded-xl text-sm font-bold text-center ${status.includes('✅') ? 'bg-emerald-500/20 text-emerald-400' : 'bg-indigo-500/20 text-indigo-400'}`}>
            {status}
          </div>
        )}

        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-400 uppercase flex items-center gap-2">
            <Github size={16} /> GitHub Репозиторій
          </label>
          <input 
            type="url" required
            className="w-full bg-slate-900/50 border border-white/10 rounded-xl py-3 px-4 text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            placeholder="https://github.com/your-username/project"
            value={githubUrl}
            onChange={(e) => setGithubUrl(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-400 uppercase flex items-center gap-2">
            <Video size={16} /> Відео-демо (YouTube / Drive)
          </label>
          <input 
            type="url" required
            className="w-full bg-slate-900/50 border border-white/10 rounded-xl py-3 px-4 text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            placeholder="https://youtu.be/..."
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-400 uppercase flex items-center gap-2">
            <FileText size={16} /> Короткий опис роботи
          </label>
          <textarea 
            rows={4}
            className="w-full bg-slate-900/50 border border-white/10 rounded-xl py-3 px-4 text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            placeholder="Опишіть основний функціонал та технології..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <button 
          type="submit"
          className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-indigo-500/20 transition-all flex items-center justify-center gap-2"
        >
          <Send size={18} /> Здати роботу
        </button>
      </form>
    </div>
  );
}

export default SubmissionsPage;