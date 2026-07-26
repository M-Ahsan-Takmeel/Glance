import React from 'react';
import { ActiveTab } from '../types';

interface SidebarProps {
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, onSelectTab }) => {
  return (
    <aside className="hidden lg:flex flex-col py-6 bg-[#131b2e] border-r border-white/10 fixed inset-y-0 left-0 w-[280px] z-[30] mt-16 overflow-y-auto select-none">
      {/* Profile Section */}
      <div className="px-6 mb-6">
        <div className="flex items-center gap-3 p-2.5 rounded-2xl bg-[#222a3d]/60 border border-white/10">
          <div className="w-10 h-10 rounded-xl bg-[#2d3449] flex items-center justify-center border border-white/10 text-[#8ed5ff] shrink-0">
            <span className="material-symbols-outlined text-xl">analytics</span>
          </div>
          <div className="overflow-hidden">
            <div className="text-sm font-semibold text-[#8ed5ff] truncate">Muhammad Ahsan</div>
            <div className="text-xs text-[#bdc8d1]/60 truncate">Enterprise Admin</div>
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex flex-col gap-1 px-4">
        <div className="px-3 py-1 mb-1 font-mono-code text-[10px] uppercase tracking-widest text-[#bdc8d1]/40">
          Navigation
        </div>

        <button
          onClick={() => onSelectTab('Dashboard')}
          className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-medium transition-all ${
            activeTab === 'Dashboard'
              ? 'bg-[#8ed5ff]/10 text-[#8ed5ff] border-l-2 border-[#8ed5ff] font-semibold'
              : 'text-[#bdc8d1] hover:bg-[#222a3d] hover:text-white'
          }`}
        >
          <span className="material-symbols-outlined text-lg">dashboard</span>
          <span>Dashboard</span>
        </button>

        <button
          onClick={() => onSelectTab('Explorer')}
          className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-medium transition-all ${
            activeTab === 'Explorer'
              ? 'bg-[#8ed5ff]/10 text-[#8ed5ff] border-l-2 border-[#8ed5ff] font-semibold'
              : 'text-[#bdc8d1] hover:bg-[#222a3d] hover:text-white'
          }`}
        >
          <span className="material-symbols-outlined text-lg">folder_open</span>
          <span>Explorer</span>
        </button>

        <button
          onClick={() => onSelectTab('Insights')}
          className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-medium transition-all ${
            activeTab === 'Insights'
              ? 'bg-[#8ed5ff]/10 text-[#8ed5ff] border-l-2 border-[#8ed5ff] font-semibold'
              : 'text-[#bdc8d1] hover:bg-[#222a3d] hover:text-white'
          }`}
        >
          <span className="material-symbols-outlined text-lg">analytics</span>
          <span>Data Insights</span>
        </button>

        <button
          onClick={() => onSelectTab('Deck')}
          className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-medium transition-all ${
            activeTab === 'Deck'
              ? 'bg-[#8ed5ff]/10 text-[#8ed5ff] border-l-2 border-[#8ed5ff] font-semibold'
              : 'text-[#bdc8d1] hover:bg-[#222a3d] hover:text-white'
          }`}
        >
          <span className="material-symbols-outlined text-lg">view_carousel</span>
          <span>Interactive Deck</span>
        </button>

        <button
          onClick={() => onSelectTab('About')}
          className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-medium transition-all ${
            activeTab === 'About'
              ? 'bg-[#8ed5ff]/10 text-[#8ed5ff] border-l-2 border-[#8ed5ff] font-semibold'
              : 'text-[#bdc8d1] hover:bg-[#222a3d] hover:text-white'
          }`}
        >
          <span className="material-symbols-outlined text-lg">info</span>
          <span>About</span>
        </button>

        <button
          onClick={() => onSelectTab('Working')}
          className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-medium transition-all ${
            activeTab === 'Working'
              ? 'bg-[#8ed5ff]/10 text-[#8ed5ff] border-l-2 border-[#8ed5ff] font-semibold'
              : 'text-[#bdc8d1] hover:bg-[#222a3d] hover:text-white'
          }`}
        >
          <span className="material-symbols-outlined text-lg">schema</span>
          <span>How It Works</span>
        </button>

        <div className="h-px bg-white/5 my-3 mx-2"></div>

        <div className="px-3 py-1 mb-1 font-mono-code text-[10px] uppercase tracking-widest text-[#bdc8d1]/40">
          Workspaces
        </div>

        <button className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-medium text-[#bdc8d1] hover:bg-[#222a3d] transition-colors">
          <span className="material-symbols-outlined text-lg">history</span>
          <span>Recent Documents</span>
        </button>

        <button className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-medium text-[#bdc8d1] hover:bg-[#222a3d] transition-colors">
          <span className="material-symbols-outlined text-lg">group</span>
          <span>Shared with me</span>
        </button>

        <button className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-medium text-[#bdc8d1] hover:bg-[#222a3d] transition-colors">
          <span className="material-symbols-outlined text-lg">star</span>
          <span>Starred</span>
        </button>

        <div className="h-px bg-white/5 my-3 mx-2"></div>

        <button className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-medium text-[#bdc8d1] hover:bg-[#222a3d] transition-colors">
          <span className="material-symbols-outlined text-lg">settings</span>
          <span>Settings</span>
        </button>
      </nav>

      <div className="mt-auto px-6 py-4 text-center">
        <span className="font-mono-code text-[10px] text-[#bdc8d1]/40">System Version v2.4.0</span>
      </div>
    </aside>
  );
};
