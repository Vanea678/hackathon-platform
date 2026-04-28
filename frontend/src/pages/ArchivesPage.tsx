import { Archive, Trophy, Calendar, Users, ExternalLink } from 'lucide-react';

// Тестові дані архівних турнірів
const archiveData = [
  { id: 1, year: 2025, title: 'Winter Code Fest', winner: 'Team Syntax', teams: 48, prize: '$300' },
  { id: 2, year: 2024, title: 'Star for Life Hackathon 2024', winner: 'Code Wizards', teams: 31, prize: '$500' },
  { id: 3, year: 2023, title: 'Junior Dev Challenge', winner: 'Byte Me', teams: 24, prize: '$150' },
];

function ArchivesPage() {
  return (
    <div className="min-h-screen bg-black text-slate-200 font-sans pb-20">
      {/* Header */}
      <header className="mb-12 relative flex justify-between items-end">
        <div className="relative">
          <div className="absolute -left-4 top-0 w-1 h-12 bg-purple-500 rounded-full shadow-[0_0_15px_rgba(168,85,247,0.5)]"></div>
          <h1 className="text-4xl font-black text-white tracking-tight px-2 uppercase italic">PAST <span className="text-purple-500">EVENTS</span></h1>
          <p className="text-slate-500 mt-1 ml-2 text-[10px] uppercase tracking-[0.3em] font-bold">Tournament History & Hall of Fame</p>
        </div>
      </header>

      {/* Main Layout */}
      <div className="grid grid-cols-12 gap-8">
        
        {/* Ліва колонка: Timeline архіву */}
        <div className="col-span-12 lg:col-span-8 space-y-6">
          {archiveData.map((tour) => (
            <div key={tour.id} className="bg-[#0a0a0a] border border-white/5 p-8 rounded-[2.5rem] hover:border-purple-500/30 transition-all group relative overflow-hidden flex flex-col md:flex-row gap-8 items-center">
              {/* Фоновий ефект */}
              <div className="absolute top-0 left-0 w-2 h-full bg-slate-800 group-hover:bg-purple-500 transition-colors"></div>
              
              {/* Рік (велика цифра) */}
              <div className="text-6xl font-black text-white/5 tracking-tighter">
                {tour.year}
              </div>

              {/* Деталі */}
              <div className="flex-1 space-y-4 w-full">
                <h3 className="text-2xl font-bold text-white group-hover:text-purple-400 transition-colors">{tour.title}</h3>
                <div className="flex flex-wrap gap-4 text-xs font-bold uppercase tracking-widest text-slate-500">
                    <span className="flex items-center gap-2"><Users size={14} className="text-blue-500"/> {tour.teams} Teams</span>
                    <span className="flex items-center gap-2"><Trophy size={14} className="text-yellow-500"/> Prize: {tour.prize}</span>
                </div>
              </div>

              {/* Кнопка */}
              <button className="px-6 py-3 rounded-xl border border-white/10 hover:border-purple-500 hover:bg-purple-500/10 text-slate-400 hover:text-white transition-all text-xs font-bold uppercase tracking-widest flex items-center gap-2 whitespace-nowrap">
                  View Results <ExternalLink size={14} />
              </button>
            </div>
          ))}
        </div>

        {/* Права колонка: Зал слави */}
        <div className="col-span-12 lg:col-span-4">
          <div className="bg-purple-600 p-1 rounded-[2.5rem] shadow-[0_20px_50px_rgba(147,51,234,0.15)] sticky top-8">
            <div className="bg-[#050505] h-full w-full rounded-[2.4rem] p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10 text-purple-500"><Archive size={100}/></div>
                <h2 className="text-xs font-black text-purple-500 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                    Hall of Fame
                </h2>
                <div className="space-y-6 relative z-10">
                    {archiveData.map((tour, idx) => (
                        <div key={idx} className="p-4 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 transition-colors">
                            <p className="text-[10px] text-yellow-500 uppercase font-black mb-1">{tour.year} Champion</p>
                            <div className="flex justify-between items-center">
                                <p className="text-sm font-bold text-white leading-tight">{tour.winner}</p>
                                <Trophy size={16} className="text-slate-600" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default ArchivesPage;