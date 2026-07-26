import React from 'react';
import { ActiveTab } from '../types';

interface BottomNavProps {
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onSelectTab }) => {
  return (
    <nav className="md:hidden fixed bottom-0 w-full z-50 bg-[#171f33]/90 backdrop-blur-xl border-t border-white/10 flex justify-around items-center h-16 px-2 pb-safe">
      <button
        onClick={() => onSelectTab('Dashboard')}
        className={`flex flex-col items-center justify-center w-full py-1 transition-all ${
          activeTab === 'Dashboard' ? 'text-[#8ed5ff] font-bold scale-105' : 'text-[#bdc8d1] hover:text-[#8ed5ff]'
        }`}
      >
        <span className="material-symbols-outlined text-xl">dashboard</span>
        <span className="font-mono-code text-[10px] mt-0.5">Dashboard</span>
      </button>

      <button
        onClick={() => onSelectTab('Explorer')}
        className={`flex flex-col items-center justify-center w-full py-1 transition-all ${
          activeTab === 'Explorer' ? 'text-[#8ed5ff] font-bold scale-105' : 'text-[#bdc8d1] hover:text-[#8ed5ff]'
        }`}
      >
        <span className="material-symbols-outlined text-xl">folder_open</span>
        <span className="font-mono-code text-[10px] mt-0.5">Explorer</span>
      </button>

      <button
        onClick={() => onSelectTab('Insights')}
        className={`flex flex-col items-center justify-center w-full py-1 transition-all ${
          activeTab === 'Insights' ? 'text-[#8ed5ff] font-bold scale-105' : 'text-[#bdc8d1] hover:text-[#8ed5ff]'
        }`}
      >
        <span className="material-symbols-outlined text-xl">analytics</span>
        <span className="font-mono-code text-[10px] mt-0.5">Insights</span>
      </button>

      <button
        onClick={() => onSelectTab('Deck')}
        className={`flex flex-col items-center justify-center w-full py-1 transition-all ${
          activeTab === 'Deck' ? 'text-[#8ed5ff] font-bold scale-105' : 'text-[#bdc8d1] hover:text-[#8ed5ff]'
        }`}
      >
        <span className="material-symbols-outlined text-xl">view_carousel</span>
        <span className="font-mono-code text-[10px] mt-0.5">Deck</span>
      </button>

      <button
        onClick={() => onSelectTab('About')}
        className={`flex flex-col items-center justify-center w-full py-1 transition-all ${
          activeTab === 'About' ? 'text-[#8ed5ff] font-bold scale-105' : 'text-[#bdc8d1] hover:text-[#8ed5ff]'
        }`}
      >
        <span className="material-symbols-outlined text-xl">info</span>
        <span className="font-mono-code text-[10px] mt-0.5">About</span>
      </button>
      <button
        onClick={() => onSelectTab('Working')}
        className={`flex flex-col items-center justify-center w-full py-1 transition-all ${
          activeTab === 'Working' ? 'text-[#8ed5ff] font-bold scale-105' : 'text-[#bdc8d1] hover:text-[#8ed5ff]'
        }`}
      >
        <span className="material-symbols-outlined text-xl">schema</span>
        <span className="font-mono-code text-[10px] mt-0.5">Working</span>
      </button>
    </nav>
  );
};
