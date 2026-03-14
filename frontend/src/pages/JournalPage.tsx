import { useState, useEffect } from 'react';
import { CheckCircle2, XCircle, Clock, Save } from 'lucide-react';
import axios from 'axios';

function JournalPage() {
  const [students, setStudents] = useState<any[]>([]);
  const [subjects, setSubjects] = useState<any[]>([]);
  const [selectedSubjectId, setSelectedSubjectId] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [records, setRecords] = useState<any>({});
  const [loading, setLoading] = useState(false);

  // Отримуємо дані користувача (вчителя) з локального сховища
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    // 1. Завантажуємо учнів та предмети з бекенду
    axios.get('http://localhost:3000/api/dashboard/stats').then(res => {
        // Ми використаємо існуючий ендпоінт для отримання списків
        // У реальному проекті тут будуть окремі запити
        setSubjects(res.data.subjects);
        if (res.data.subjects.length > 0) setSelectedSubjectId(res.data.subjects[0].id);
        
        // Для тесту завантажимо всіх вчителів як учнів, поки база учнів пуста, 
        // або ти можеш просто залишити порожнім для реальних даних
        setStudents(res.data.teachers); 
    });
  }, []);

  const updateRecord = (studentId: string, field: string, value: any) => {
    setRecords({
      ...records,
      [studentId]: { ...records[studentId], [field]: value }
    });
  };

  // --- ФУНКЦІЯ ЗБЕРЕЖЕННЯ НА БЕКЕНД ---
  const handleSave = async () => {
    if (!selectedSubjectId) return alert('Оберіть предмет!');
    setLoading(true);
    
    try {
      // Проходимо по всіх змінених учнях і відправляємо дані на сервер
      for (const studentId in records) {
        const data = records[studentId];
        await axios.post('http://localhost:3000/api/grades/save', {
          studentId,
          subjectId: selectedSubjectId,
          teacherId: user.id,
          date: date,
          grade: data.grade,
          attendance: data.att || 'PRESENT'
        });
      }
      alert('Дані успішно синхронізовано з базою даних! ✅');
    } catch (err) {
      alert('Помилка при з’єднанні з бекендом ❌');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Класний журнал</h1>
          <div className="flex items-center gap-3 mt-2">
            <select 
                value={selectedSubjectId} 
                onChange={(e) => setSelectedSubjectId(e.target.value)}
                className="bg-slate-800 border border-white/10 rounded-lg px-3 py-1 text-sm text-indigo-300 outline-none"
            >
                {subjects.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
            <span className="text-slate-500 text-sm">|</span>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)}
                className="bg-transparent text-slate-400 text-sm outline-none" />
          </div>
        </div>
        
        <button 
          onClick={handleSave}
          disabled={loading}
          className={`${loading ? 'bg-slate-600' : 'bg-indigo-500 hover:bg-indigo-600'} text-white px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-indigo-500/20`}
        >
          <Save size={18} /> {loading ? 'Зберігання...' : 'Зберегти в базу'}
        </button>
      </div>
    
      <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-white/5 text-slate-400 uppercase text-xs tracking-widest">
            <tr>
              <th className="px-6 py-4">Учень</th>
              <th className="px-6 py-4 text-center">Відвідуваність</th>
              <th className="px-6 py-4 text-center">Оцінка</th>
              <th className="px-6 py-4">Коментар вчителя</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {students.map((student) => (
              <tr key={student.id} className="hover:bg-white/[0.02] transition-colors">
                <td className="px-6 py-4">
                    <p className="font-bold text-white">{student.lastName} {student.firstName}</p>
                    <p className="text-xs text-slate-500">ID: {student.id.slice(0,8)}</p>
                </td>
                <td className="px-6 py-4">
                  <div className="flex justify-center gap-2">
                    <AttendanceBtn 
                      active={records[student.id]?.att === 'PRESENT'} 
                      onClick={() => updateRecord(student.id, 'att', 'PRESENT')}
                      icon={<CheckCircle2 size={16}/>} color="emerald" label="П" />
                    <AttendanceBtn 
                      active={records[student.id]?.att === 'ABSENT'} 
                      onClick={() => updateRecord(student.id, 'att', 'ABSENT')}
                      icon={<XCircle size={16}/>} color="red" label="Н" />
                    <AttendanceBtn 
                      active={records[student.id]?.att === 'LATE'} 
                      onClick={() => updateRecord(student.id, 'att', 'LATE')}
                      icon={<Clock size={16}/>} color="yellow" label="З" />
                  </div>
                </td>
                <td className="px-6 py-4 text-center">
                  <input 
                    type="number" min="1" max="12" 
                    className="w-12 bg-slate-900 border border-white/10 rounded-lg py-1.5 text-center text-indigo-400 font-bold focus:ring-2 focus:ring-indigo-500 outline-none"
                    onChange={(e) => updateRecord(student.id, 'grade', e.target.value)}
                  />
                </td>
                <td className="px-6 py-4">
                  <input 
                    type="text" placeholder="Примітка..."
                    className="w-full bg-transparent border-b border-white/5 focus:border-indigo-500 outline-none text-sm text-slate-400 py-1"
                    onChange={(e) => updateRecord(student.id, 'note', e.target.value)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Допоміжний компонент для кнопок відвідуваності
function AttendanceBtn({ active, onClick, icon, color, label }: any) {
  const colors: any = {
    emerald: active ? 'bg-emerald-500 text-white' : 'bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20',
    red: active ? 'bg-red-500 text-white' : 'bg-red-500/10 text-red-500 hover:bg-red-500/20',
    yellow: active ? 'bg-yellow-500 text-black' : 'bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20',
  };

  return (
    <button onClick={onClick} className={`p-2 rounded-lg transition-all flex items-center gap-1 ${colors[color]}`}>
      {icon} <span className="text-[10px] font-bold">{label}</span>
    </button>
  );
}

export default JournalPage; 