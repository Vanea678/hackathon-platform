import { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, Clock, Video, Flag, AlertCircle, Plus } from 'lucide-react';
import axios from 'axios';

function SchedulePage() {
  const [events, setEvents] = useState<any[]>([]);
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    // В реальному проєкті тут axios.get('http://localhost:3000/api/events')
    // Поки ставимо mock-дані, щоб ти одразу побачив дизайн
    setEvents([
      { id: 1, title: 'Відкриття турніру', description: 'Офіційний старт та оголошення правил', type: 'MILESTONE', date: '2026-04-15T10:00:00Z' },
      { id: 2, title: 'Q&A Сесія з Журі', description: 'Відповіді на технічні запитання команд', type: 'MEETING', date: '2026-04-16T15:00:00Z' },
      { id: 3, title: 'Дедлайн: Здача MVP', description: 'Закриття форми сабмітів першого етапу', type: 'DEADLINE', date: '2026-04-18T23:59:00Z' },
      { id: 4, title: 'Оголошення переможців', description: 'Фінальний стрім та нагородження', type: 'MILESTONE', date: '2026-04-20T18:00:00Z' }
    ]);
  }, []);

  const getEventIcon = (type: string) => {
    switch(type) {
      case 'DEADLINE': return <AlertCircle className="text-red-500" size={20} />;
      case 'MEETING': return <Video className="text-blue-500" size={20} />;
      default: return <Flag className="text-purple-500" size={20} />;
    }
  };

  const getEventColor = (type: string) => {
    switch(type) {
      case 'DEADLINE': return 'border-red-500/30 bg-red-500/5 hover:border-red-500/60';
      case 'MEETING': return 'border-blue-500/30 bg-blue-500/5 hover:border-blue-500/60';
      default: return 'border-purple-500/30 bg-purple-500/5 hover:border-purple-500/60';
    }
  };

  return (
    <div className="min-h-screen bg-black text-slate-200 pb-20 max-w-4xl mx-auto">
      <header className="mb-16 relative flex justify-between items-end">
        <div className="relative">
          <div className="absolute -left-4 top-0 w-1 h-12 bg-purple-500 rounded-full shadow-[0_0_15px_rgba(168,85,247,0.5)]"></div>
          <h1 className="text-4xl font-black text-white tracking-tight px-2 uppercase italic">EVENT <span className="text-purple-500">TIMELINE</span></h1>
          <p className="text-slate-500 mt-1 ml-2 text-[10px] uppercase tracking-[0.3em] font-bold">Official Hackathon Schedule</p>
        </div>

        {/* Кнопка доступна тільки для Адміна */}
        {user.role === 'ADMIN' && (
          <button className="flex items-center gap-2 px-6 py-3 bg-white text-black hover:bg-purple-500 hover:text-white rounded-2xl text-xs font-black uppercase tracking-widest transition-all">
            <Plus size={16} /> Add Event
          </button>
        )}
      </header>

      {/* Таймлайн */}
      <div className="relative border-l border-white/10 ml-6 md:ml-10 space-y-12 pb-12">
        {events.map((ev, index) => {
          const dateObj = new Date(ev.date);
          const isPast = dateObj < new Date();

          return (
            <div key={ev.id} className="relative pl-8 md:pl-12 group">
              {/* Крапка на таймлайні */}
              <div className={`absolute -left-[9px] top-4 w-4 h-4 rounded-full border-4 border-black ${isPast ? 'bg-slate-600' : 'bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.8)]'}`}></div>
              
              <div className={`p-6 rounded-[2rem] border transition-all duration-300 ${isPast ? 'bg-[#050505] border-white/5 opacity-60' : getEventColor(ev.type)}`}>
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-xl bg-black border border-white/5 shadow-inner`}>
                      {getEventIcon(ev.type)}
                    </div>
                    <h2 className={`text-xl font-bold ${isPast ? 'text-slate-400' : 'text-white'}`}>{ev.title}</h2>
                  </div>
                  
                  <div className="flex items-center gap-2 bg-black/50 px-4 py-2 rounded-lg border border-white/5">
                    <CalendarIcon size={14} className="text-slate-500" />
                    <span className="text-sm font-mono text-slate-300">
                      {dateObj.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}
                    </span>
                    <span className="text-slate-600 mx-1">|</span>
                    <Clock size={14} className="text-slate-500" />
                    <span className="text-sm font-mono text-slate-300">
                      {dateObj.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>

                <p className={`text-sm ${isPast ? 'text-slate-600' : 'text-slate-400'} ml-2`}>
                  {ev.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SchedulePage;