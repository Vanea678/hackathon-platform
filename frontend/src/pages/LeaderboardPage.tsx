import React, { useEffect, useState } from 'react';
import { Trophy, Medal, Activity, Target, Layout, Download, Award } from 'lucide-react';
import axios from 'axios';
import { jsPDF } from 'jspdf';

function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [expandedTeam, setExpandedTeam] = useState<string | null>(null);

  // 1. REALTIME ОНОВЛЕННЯ
  useEffect(() => {
    const fetchLeaderboard = () => {
      axios.get('http://localhost:3000/api/leaderboard')
        .then(res => {
          setLeaderboard(prev => {
            if (JSON.stringify(prev) !== JSON.stringify(res.data)) {
              return res.data;
            }
            return prev;
          });
        })
        .catch(err => console.error(err));
    };

    fetchLeaderboard();
    const intervalId = setInterval(fetchLeaderboard, 3000);
    return () => clearInterval(intervalId);
  }, []);

  // 2. ЕКСПОРТ CSV
  const downloadCSV = () => {
    const headers = ['Rank', 'Team Name', 'Captain Email', 'Tech Score', 'Func Score', 'UI Score', 'Total Score'];
    const csvRows = leaderboard.map((team, index) => [
      index + 1,
      `"${team.name}"`,
      team.captain || 'N/A',
      team.tech || 0,
      team.func || 0,
      team.ui || 0,
      team.total || 0
    ]);

    const csvContent = [headers.join(','), ...csvRows.map(row => row.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `Hackathon_Results_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // 3. ГЕНЕРАЦІЯ PDF СЕРТИФІКАТА
  const generateCertificate = (teamName: string, rank: number, totalScore: number) => {
    const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });

    // Дизайн сертифіката
    doc.setFillColor(15, 23, 42); // slate-900 (Темний фон)
    doc.rect(0, 0, 297, 210, 'F');

    doc.setDrawColor(168, 85, 247); // purple-500 (Рамка)
    doc.setLineWidth(2);
    doc.rect(10, 10, 277, 190);

    // Текст
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(40);
    doc.setFont('helvetica', 'bold');
    doc.text('CERTIFICATE OF ACHIEVEMENT', 148.5, 50, { align: 'center' });

    doc.setFontSize(16);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(148, 163, 184); 
    doc.text('This is to certify that the team', 148.5, 80, { align: 'center' });

    doc.setFontSize(45);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(168, 85, 247); 
    doc.text(teamName.toUpperCase(), 148.5, 110, { align: 'center' });

    doc.setFontSize(16);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(148, 163, 184);
    
    let rankText = rank === 1 ? '1st Place Winner' : rank === 2 ? '2nd Place' : rank === 3 ? '3rd Place' : 'Honorable Participant';
    doc.text(`has successfully completed the Hackathon Hub Tournament`, 148.5, 130, { align: 'center' });
    doc.text(`achieving the title of ${rankText} with a score of ${totalScore} pts.`, 148.5, 140, { align: 'center' });

    doc.setFontSize(12);
    doc.setTextColor(255, 255, 255);
    doc.text('_______________________', 60, 180, { align: 'center' });
    doc.text('Chief Organizer', 60, 190, { align: 'center' });

    doc.text(new Date().toLocaleDateString(), 237, 180, { align: 'center' });
    doc.text('Date of Issue', 237, 190, { align: 'center' });

    doc.save(`Certificate_${teamName.replace(/\s+/g, '_')}.pdf`);
  };

  return (
    <div className="min-h-screen text-slate-200 pb-20">
      <header className="mb-12 relative flex flex-col md:flex-row md:justify-between md:items-end gap-4">
        <div className="relative">
          <div className="absolute -left-4 top-0 w-1 h-12 bg-purple-500 rounded-full shadow-[0_0_15px_rgba(168,85,247,0.5)]"></div>
          <h1 className="text-4xl font-black text-white tracking-tight px-2 uppercase italic">RANKING <span className="text-purple-500">SYSTEM</span></h1>
          <p className="text-slate-500 mt-1 ml-2 text-[10px] uppercase tracking-[0.3em] font-bold">Final Tournament Standing</p>
        </div>
        
        <div className="flex items-center gap-4">
            <button onClick={downloadCSV} className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-purple-600 border border-white/10 hover:border-purple-500 text-slate-300 hover:text-white rounded-lg text-xs font-bold transition-all shadow-lg">
                <Download size={16} /> Export CSV
            </button>
            <div className="flex items-center gap-3 px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-lg">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </span>
                <span className="text-[10px] font-black uppercase tracking-widest">Live Updates</span>
            </div>
        </div>
      </header>

      <div className="bg-[#0a0a0a] border border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-white/5 text-slate-500 text-[10px] uppercase tracking-[0.2em] font-black">
              <th className="px-8 py-6">Pos</th>
              <th className="px-6 py-6">Team Entity</th>
              <th className="px-6 py-6 text-center">Breakdown</th>
              <th className="px-8 py-6 text-right text-purple-400 text-sm">Aggregated Score</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {leaderboard.map((team, index) => (
              <React.Fragment key={team.id}>
                <tr onClick={() => setExpandedTeam(expandedTeam === team.id ? null : team.id)}
                    className="hover:bg-white/[0.02] transition-all group cursor-pointer">
                  <td className="px-8 py-8 font-mono text-slate-500">
                    {index === 0 ? <Trophy className="text-yellow-400" size={24} /> : 
                     index === 1 ? <Medal className="text-slate-300" size={24} /> :
                     index === 2 ? <Medal className="text-amber-600" size={24} /> : 
                     `0${index + 1}`}
                  </td>
                  <td className="px-6 py-8">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 font-black">
                            {team.name ? team.name[0] : '?'}
                        </div>
                        <div>
                            <p className="font-black text-white text-lg tracking-tight uppercase group-hover:text-purple-400 transition-colors">{team.name}</p>
                            <p className="text-[10px] text-slate-600 font-mono italic">UID: {team.id.slice(0,8)}</p>
                        </div>
                    </div>
                  </td>
                  <td className="px-6 py-8">
                    <div className="flex justify-center gap-6">
                        <MiniStat icon={<Activity size={12}/>} label="Tech" val={team.tech} />
                        <MiniStat icon={<Target size={12}/>} label="Func" val={team.func} />
                        <MiniStat icon={<Layout size={12}/>} label="UI" val={team.ui} />
                    </div>
                  </td>
                  <td className="px-8 py-8 text-right">
                    <span className="text-3xl font-black text-white tracking-tighter">{team.total}</span>
                    <span className="text-slate-700 text-xs font-bold ml-1">pts</span>
                  </td>
                </tr>
                
                {/* РОЗГОРНУТА ПАНЕЛЬ З КНОПКОЮ СЕРТИФІКАТА */}
                {expandedTeam === team.id && (
                  <tr className="bg-black/50">
                    <td colSpan={4} className="px-20 py-8">
                        <div className="grid grid-cols-3 gap-8 animate-in slide-in-from-top-2 duration-300">
                            <DetailBlock label="Technical Quality" val={team.tech} desc="Clean code, patterns, OOP" />
                            <DetailBlock label="Logic & Functionality" val={team.func} desc="Must-have requirements, bug-free" />
                            <div className="space-y-4">
                                <DetailBlock label="Interface & UX" val={team.ui} desc="Aesthetics, usability" />
                                <button 
                                  onClick={(e) => { e.stopPropagation(); generateCertificate(team.name, index + 1, team.total); }}
                                  className="w-full mt-4 py-3 bg-purple-600/20 hover:bg-purple-600 border border-purple-500/50 text-purple-300 hover:text-white rounded-xl text-xs font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2"
                                >
                                  <Award size={16} /> Download Certificate
                                </button>
                            </div>
                        </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function MiniStat({ icon, label, val }: any) {
    return (
        <div className="flex flex-col items-center gap-1">
            <div className="flex items-center gap-1 text-slate-600 font-black text-[8px] uppercase tracking-tighter">
                {icon} {label}
            </div>
            <span className="text-xs font-bold text-slate-400">{val}%</span>
        </div>
    )
}

function DetailBlock({ label, val, desc }: any) {
    return (
        <div className="space-y-2">
            <div className="flex justify-between items-end">
                <p className="text-[10px] font-black text-purple-500 uppercase tracking-widest">{label}</p>
                <p className="text-xl font-black text-white">{val}%</p>
            </div>
            <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-purple-600" style={{ width: `${val}%` }}></div>
            </div>
            <p className="text-[10px] text-slate-600 italic leading-tight">{desc}</p>
        </div>
    )
}

export default LeaderboardPage;