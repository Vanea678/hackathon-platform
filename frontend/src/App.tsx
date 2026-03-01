import React, { useState } from 'react';
import { LogIn, Mail, Lock, GraduationCap, ShieldCheck } from 'lucide-react';
import axios from 'axios';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Прямий запит до вашого бекенду
      const res = await axios.post('http://localhost:3000/api/auth/login', { email, password });
      alert('Вхід успішний! Вітаємо, ' + res.data.user.firstName);
    } catch (err) {
      setError('Помилка: Невірні дані або сервер вимкнено');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-indigo-950 to-blue-900 p-4">
      <div className="max-w-md w-full relative">
        {/* Декоративні елементи фону */}
        <div className="absolute -top-10 -left-10 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-indigo-500/20 rounded-full blur-3xl"></div>

        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl shadow-2xl overflow-hidden relative">
          <div className="p-8 text-center border-b border-white/10 bg-white/5">
            <div className="inline-flex p-3 bg-indigo-500/20 rounded-2xl mb-4">
              <GraduationCap className="w-10 h-10 text-indigo-400" />
            </div>
            <h1 className="text-3xl font-bold text-white tracking-tight">LMS Portal</h1>
            <p className="text-indigo-200/60 text-sm mt-1 uppercase tracking-widest font-medium">Навчальна платформа</p>
          </div>

          <form onSubmit={handleLogin} className="p-8 space-y-5">
            {error && (
              <div className="p-3 bg-red-500/20 border border-red-500/50 text-red-200 text-xs rounded-xl text-center">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-xs font-semibold text-indigo-200/80 ml-1 uppercase">Email Адреса</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-5 h-5 text-indigo-300/50" />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-900/50 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-white placeholder:text-slate-500 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  placeholder="admin@school.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-indigo-200/80 ml-1 uppercase">Пароль</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-5 h-5 text-indigo-300/50" />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-900/50 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-white placeholder:text-slate-500 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button className="w-full bg-indigo-500 hover:bg-indigo-400 text-white font-bold py-3 rounded-xl shadow-lg shadow-indigo-500/20 transition-all flex items-center justify-center gap-2 group mt-2">
              <ShieldCheck className="w-5 h-5" />
              <span>Увійти до кабінету</span>
            </button>
          </form>

          <div className="p-4 bg-white/5 border-t border-white/10 text-center">
            <span className="text-xs text-indigo-300/40">© 2026 Star for Life Ukraine Project</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;