import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

function MainLayout() {
  return (
    <div className="flex min-h-screen bg-[#0f172a]">
      {/* Підключаємо сайдбар */}
      <Sidebar />
      
      {/* Контент сторінок справа (відступ 64 для сайдбару) */}
      <main className="flex-1 ml-64 p-8">
        <div className="max-w-6xl mx-auto">
          <Outlet /> 
        </div>
      </main>
    </div>
  );
}

export default MainLayout;