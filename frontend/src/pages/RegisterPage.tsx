import React, { useState } from 'react';
import { Mail, Lock, Code2, User, Users, ShieldCheck } from 'lucide-react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function RegisterPage() {
  const [formData, setFormData] = useState({ email: '', password: '', fullName: '', teamName: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/api/auth/register', formData);
      setSuccess(true);
      setTimeout(() => navigate('/login'), 2000);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Помилка реєстрації');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-indigo-950 to-blue-900 p-4 font-sans">
      <div className="max-w-lg w-full bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-8">
        <div className="text-center mb-6">
          <div className="inline-flex p-3 bg-indigo-500/20 rounded-2xl mb-4">
            <Code2 className="w-10 h-10 text-indigo-400" />
          </div>
          <h1 className="text-3xl font-black text-white italic tracking-tighter">РЕЄСТРАЦІЯ КОМАНДИ</h1>
        </div>

        {success ? (
          <div className="bg-emerald-500/20 text-emerald-400 p-6 rounded-2xl text-center font-bold">
            🎉 Вітаємо! Команду створено. Перенаправлення на вхід...
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && <div className="p-3 bg-red-500/20 text-red-200 text-xs rounded-xl text-center font-bold">{error}</div>}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                    <label className="text-[10px] font-bold text-indigo-300 uppercase ml-1">Назва команди</label>
                    <div className="relative"><Users className="absolute left-3 top-3 w-4 h-4 text-slate-500" /><input type="text" required placeholder="CodeWizards" className="w-full bg-slate-900/50 border border-white/10 rounded-xl py-2.5 pl-10 text-white outline-none focus:ring-2 focus:ring-indigo-500" onChange={e => setFormData({...formData, teamName: e.target.value})} /></div>
                </div>
                <div className="space-y-1">
                    <label className="text-[10px] font-bold text-indigo-300 uppercase ml-1">ПІБ Капітана</label>
                    <div className="relative"><User className="absolute left-3 top-3 w-4 h-4 text-slate-500" /><input type="text" required placeholder="Іван Іванов" className="w-full bg-slate-900/50 border border-white/10 rounded-xl py-2.5 pl-10 text-white outline-none focus:ring-2 focus:ring-indigo-500" onChange={e => setFormData({...formData, fullName: e.target.value})} /></div>
                </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-indigo-300 uppercase ml-1">Електронна пошта</label>
              <div className="relative"><Mail className="absolute left-3 top-3 w-4 h-4 text-slate-500" /><input type="email" required placeholder="captain@mail.com" className="w-full bg-slate-900/50 border border-white/10 rounded-xl py-2.5 pl-10 text-white outline-none focus:ring-2 focus:ring-indigo-500" onChange={e => setFormData({...formData, email: e.target.value})} /></div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-indigo-300 uppercase ml-1">Пароль для входу</label>
              <div className="relative"><Lock className="absolute left-3 top-3 w-4 h-4 text-slate-500" /><input type="password" required placeholder="••••••••" className="w-full bg-slate-900/50 border border-white/10 rounded-xl py-2.5 pl-10 text-white outline-none focus:ring-2 focus:ring-indigo-500" onChange={e => setFormData({...formData, password: e.target.value})} /></div>
            </div>

            <button type="submit" className="w-full bg-indigo-500 hover:bg-indigo-400 text-white font-black py-4 rounded-2xl transition-all shadow-lg shadow-indigo-500/20 flex items-center justify-center gap-2 uppercase tracking-widest mt-4">
              <ShieldCheck className="w-5 h-5" /> Створити команду
            </button>

            <p className="text-center text-slate-500 text-sm mt-4">
              Вже є акаунт? <Link to="/login" className="text-indigo-400 hover:underline">Увійти</Link>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}

export default RegisterPage;