import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

function MainLayout() {
  return (
    <div className="flex min-h-screen bg-black"> {/* Змінено на чисто чорний */}
      <Sidebar />
      <main className="flex-1 ml-64 p-10 overflow-y-auto selection:bg-purple-500/30">
        <div className="max-w-7xl mx-auto">
          <Outlet /> 
        </div>
      </main>
    </div>
  );
}

export default MainLayout;