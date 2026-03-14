import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock, BookOpen, User } from 'lucide-react';

// Тестовий розклад для класу 10-А (у реальному проєкті береться з БД)
const mockSchedule = {
  'Понеділок': [
    { time: '08:30 - 09:15', subject: 'Математика', teacher: 'Олена Петренко', room: 'Каб. 101' },
    { time: '09:25 - 10:10', subject: 'Історія', teacher: 'Іван Бойко', room: 'Каб. 204' },
    { time: '10:30 - 11:15', subject: 'Програмування', teacher: 'Андрій Коваль', room: 'Каб. 305' },
  ],
  'Вівторок': [
    { time: '08:30 - 09:15', subject: 'Англійська мова', teacher: 'Анна Ткач', room: 'Каб. 202' },
    { time: '09:25 - 10:10', subject: 'Математика', teacher: 'Олена Петренко', room: 'Каб. 101' },
    { time: '10:30 - 11:15', subject: 'Фізика', teacher: 'Олександр Мельник', room: 'Каб. 112' },
  ],
  'Середа': [
    { time: '08:30 - 09:15', subject: 'Програмування', teacher: 'Андрій Коваль', room: 'Каб. 305' },
    { time: '09:25 - 10:10', subject: 'Програмування', teacher: 'Андрій Коваль', room: 'Каб. 305' },
  ],
  'Четвер': [
    { time: '08:30 - 09:15', subject: 'Історія', teacher: 'Іван Бойко', room: 'Каб. 204' },
    { time: '09:25 - 10:10', subject: 'Англійська мова', teacher: 'Анна Ткач', room: 'Каб. 202' },
    { time: '10:30 - 11:15', subject: 'Фізика', teacher: 'Олександр Мельник', room: 'Каб. 112' },
  ],
  'П\'ятниця': [
    { time: '08:30 - 09:15', subject: 'Математика', teacher: 'Олена Петренко', room: 'Каб. 101' },
    { time: '09:25 - 10:10', subject: 'Математика', teacher: 'Олена Петренко', room: 'Каб. 101' },
  ]
};

function SchedulePage() {
  const [selectedClass, setSelectedClass] = useState('10-А');

  return (
    <div className="space-y-6 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <CalendarIcon className="text-indigo-400" size={32} />
            Розклад занять
          </h1>
          <p className="text-slate-400 mt-1">Календарне представлення уроків на тиждень</p>
        </div>
        
        <select 
          value={selectedClass} 
          onChange={(e) => setSelectedClass(e.target.value)}
          className="bg-slate-800 border border-white/10 rounded-xl px-4 py-2.5 text-white outline-none focus:ring-2 focus:ring-indigo-500 shadow-lg"
        >
          <option value="10-А">Клас: 10-А</option>
          <option value="10-Б">Клас: 10-Б</option>
          <option value="11-А">Клас: 11-А</option>
        </select>
      </div>

      {/* Календарна сітка */}
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
        {Object.entries(mockSchedule).map(([day, lessons]) => (
          <div key={day} className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden flex flex-col">
            <div className="bg-indigo-500/20 border-b border-white/10 p-4 text-center">
              <h2 className="text-lg font-bold text-indigo-100 uppercase tracking-widest">{day}</h2>
            </div>
            
            <div className="p-4 space-y-4 flex-1">
              {lessons.length > 0 ? (
                lessons.map((lesson, idx) => (
                  <div key={idx} className="bg-slate-800/50 border border-white/5 p-4 rounded-2xl hover:border-indigo-500/30 transition-all group cursor-default shadow-sm hover:shadow-indigo-500/10">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-indigo-400 flex items-center gap-1">
                        <Clock size={12} /> {lesson.time}
                      </span>
                      <span className="text-[10px] bg-slate-700 px-2 py-0.5 rounded-md text-slate-300 border border-white/10">
                        {lesson.room}
                      </span>
                    </div>
                    
                    <h3 className="font-bold text-white text-md mb-2 group-hover:text-indigo-300 transition-colors flex items-center gap-2">
                      <BookOpen size={14} className="text-slate-400" /> {lesson.subject}
                    </h3>
                    
                    <p className="text-xs text-slate-400 flex items-center gap-1.5">
                      <User size={12} /> {lesson.teacher}
                    </p>
                  </div>
                ))
              ) : (
                <div className="h-full flex items-center justify-center text-slate-500 italic text-sm">
                  Немає уроків
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SchedulePage;