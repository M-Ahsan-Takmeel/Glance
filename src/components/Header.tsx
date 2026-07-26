import React from 'react';
import { ActiveTab } from '../types';

interface HeaderProps {
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
  onOpenSearch?: () => void;
  onToggleSidebarMobile?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onSelectTab,
  onOpenSearch,
  onToggleSidebarMobile,
}) => {
  return (
    <header className="bg-[#171f33]/80 backdrop-blur-xl border-b border-white/10 docked full-width top-0 sticky flex items-center justify-between px-4 md:px-8 py-2 w-full z-40 h-16 select-none">
      <div className="flex items-center gap-4">
        <div
          onClick={() => onSelectTab('Dashboard')}
          className="flex items-center gap-2 cursor-pointer group"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#38bdf8] to-[#44e2cd] flex items-center justify-center text-[#00354a] font-black text-lg shadow-md shadow-[#38bdf8]/20 group-hover:scale-105 transition-transform">
            G
          </div>
          <span className="font-bold text-xl tracking-tight text-[#8ed5ff]">
            Glance
          </span>
        </div>
      </div>

      <div className="hidden md:flex items-center gap-8">
        <nav className="flex gap-6">
          <button
            onClick={() => onSelectTab('Dashboard')}
            className={`font-mono-code text-xs transition-all ${
              activeTab === 'Dashboard'
                ? 'text-[#8ed5ff] font-bold active-nav-indicator'
                : 'text-[#bdc8d1] hover:text-[#8ed5ff]'
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => onSelectTab('Deck')}
            className={`font-mono-code text-xs transition-all ${
              activeTab === 'Deck'
                ? 'text-[#8ed5ff] font-bold active-nav-indicator'
                : 'text-[#bdc8d1] hover:text-[#8ed5ff]'
            }`}
          >
            Interactive Deck
          </button>
          <button
            onClick={() => onSelectTab('About')}
            className={`font-mono-code text-xs transition-all ${
              activeTab === 'About'
                ? 'text-[#8ed5ff] font-bold active-nav-indicator'
                : 'text-[#bdc8d1] hover:text-[#8ed5ff]'
            }`}
          >
            About
          </button>
          <button
            onClick={() => onSelectTab('Working')}
            className={`font-mono-code text-xs transition-all ${
              activeTab === 'Working'
                ? 'text-[#8ed5ff] font-bold active-nav-indicator'
                : 'text-[#bdc8d1] hover:text-[#8ed5ff]'
            }`}
          >
            Working
          </button>
        </nav>
      </div>

      {/* Right side controls */}
    </header>
  );
};
