import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

function MainLayout() {
  return (
    <div className="flex min-h-screen bg-[#0f172a]">
      <Sidebar />
      {/* Контент справа від Sidebar (додаємо відступ ml-64) */}
      <main className="flex-1 ml-64 p-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          <Outlet /> 
        </div>
      </main>
    </div>
  );
}

export default MainLayout;