import { useState } from 'react';
import { Users, UserPlus, Trash2, Shield, Send } from 'lucide-react';


function TeamRegistrationPage() {
  const [members, setMembers] = useState([{ fullName: '', email: '' }, { fullName: '', email: '' }]);

  const addMember = () => setMembers([...members, { fullName: '', email: '' }]);
  const removeMember = (index: number) => setMembers(members.filter((_, i) => i !== index));

  return (
    <div className="min-h-screen bg-black text-slate-200 pb-20">
      <header className="mb-12 relative">
        <div className="absolute -left-4 top-0 w-1 h-12 bg-purple-500 rounded-full shadow-[0_0_15px_rgba(168,85,247,0.5)]"></div>
        <h1 className="text-4xl font-black text-white tracking-tight px-2 uppercase text-indigo-500">РЕЄСТРАЦІЯ КОМАНДИ</h1>
      </header>

      <div className="grid grid-cols-12 gap-8">
        {/* Ліва частина: Основні дані */}
        <div className="col-span-12 lg:col-span-5 space-y-6">
          <div className="bg-[#0a0a0a] border border-white/5 p-8 rounded-[2.5rem]">
            <h2 className="text-white font-bold mb-6 flex items-center gap-2"><Shield className="text-purple-500" size={18}/> Деталі команди</h2>
            <div className="space-y-4">
                <input placeholder="Назва команди" className="w-full bg-black border border-white/10 rounded-xl py-3 px-4 outline-none focus:border-purple-500 transition-all" />
                <input placeholder="Місто / Організація" className="w-full bg-black border border-white/10 rounded-xl py-3 px-4 outline-none focus:border-purple-500 transition-all" />
                <input placeholder="Telegram @username" className="w-full bg-black border border-white/10 rounded-xl py-3 px-4 outline-none focus:border-purple-500 transition-all" />
            </div>
          </div>
        </div>

        {/* Права частина: Учасники */}
        <div className="col-span-12 lg:col-span-7 bg-[#0a0a0a] border border-white/5 p-8 rounded-[2.5rem]">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-white font-bold flex items-center gap-2"><Users className="text-purple-500" size={18}/> Склад команди</h2>
            <button onClick={addMember} className="text-[10px] font-black uppercase tracking-widest text-purple-400 hover:text-white flex items-center gap-2">
              <UserPlus size={14} /> Додати учасника
            </button>
          </div>

          <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
            {members.map((member, index) => (
              <div key={index} className="flex gap-4 items-center bg-black/40 p-4 rounded-2xl border border-white/5 group">
                <span className="text-slate-600 font-mono text-xs">0{index + 1}</span>
                <input placeholder="ПІБ" className="flex-1 bg-transparent border-b border-white/10 py-1 outline-none focus:border-purple-500 text-sm" />
                <input placeholder="Email" className="flex-1 bg-transparent border-b border-white/10 py-1 outline-none focus:border-purple-500 text-sm" />
                {members.length > 2 && (
                  <button onClick={() => removeMember(index)} className="text-slate-600 hover:text-red-500 transition-colors">
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
            ))}
          </div>

          <button className="w-full mt-10 bg-white text-black font-black py-5 rounded-2xl uppercase tracking-[0.2em] text-xs hover:bg-purple-500 hover:text-white transition-all flex items-center justify-center gap-3">
            <Send size={16} /> Відправити заявку
          </button>
        </div>
      </div>
    </div>
  );
}

export default TeamRegistrationPage;