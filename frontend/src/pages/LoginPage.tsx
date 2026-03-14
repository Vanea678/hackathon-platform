import React, { useState } from 'react';
import { Mail, Lock, GraduationCap, ShieldCheck } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // ДОДАЙ ЦЕ

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // ІНІЦІАЛІЗАЦІЯ

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3000/api/auth/login', { email, password });
      
      // Зберігаємо дані користувача
      localStorage.setItem('user', JSON.stringify(res.data.user));
      localStorage.setItem('token', res.data.token);
      
      // ПЕРЕНАПРАВЛЕННЯ
      navigate('/dashboard'); 
    } catch (err) {
      setError('Невірний логін або пароль');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-indigo-950 to-blue-900 p-4">
      <div className="max-w-md w-full bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl shadow-2xl p-8">
        <div className="text-center mb-8">
            <div className="inline-flex p-3 bg-indigo-500/20 rounded-2xl mb-4">
                <GraduationCap className="w-10 h-10 text-indigo-400" />
            </div>
            <h1 className="text-3xl font-bold text-white tracking-tight italic">LMS Portal</h1>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          {error && <div className="p-3 bg-red-500/20 text-red-200 text-xs rounded-xl text-center">{error}</div>}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-indigo-200/80 uppercase">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 w-5 h-5 text-indigo-300/50" />
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
                className="w-full bg-slate-900/50 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-white focus:ring-2 focus:ring-indigo-500 outline-none" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-semibold text-indigo-200/80 uppercase">Пароль</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-5 h-5 text-indigo-300/50" />
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required
                className="w-full bg-slate-900/50 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-white focus:ring-2 focus:ring-indigo-500 outline-none" />
            </div>
          </div>
          <button className="w-full bg-indigo-500 hover:bg-indigo-400 text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2">
            <ShieldCheck className="w-5 h-5" /> Увійти
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;