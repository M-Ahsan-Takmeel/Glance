import React from 'react';
import { StyleIntent, StyleOptionInfo } from '../types';
import { Briefcase, Compass, Clock, BarChart3, CheckCircle2, Sliders, Sparkles } from 'lucide-react';

interface StyleSelectorProps {
  selectedStyle: StyleIntent;
  onSelectStyle: (style: StyleIntent) => void;
  targetSlideCount: string;
  onSelectSlideCount: (count: string) => void;
  tone: string;
  onSelectTone: (tone: string) => void;
}

const STYLE_OPTIONS: (StyleOptionInfo & { icon: React.FC<{ className?: string }> })[] = [
  {
    id: 'Executive Summary',
    title: 'Executive Summary',
    tagline: 'High-Level & Punchy',
    description: 'Headline + 2-3 key takeaway bullets per slide. Ideal for executive updates and decision briefs.',
    icon: Briefcase,
    badge: 'Popular',
  },
  {
    id: 'Deep Dive',
    title: 'Deep Dive',
    tagline: 'Comprehensive & Detailed',
    description: 'Retains richer document detail in structured grid sections and thematic cards. Perfect for technical writeups.',
    icon: Compass,
    badge: 'Detailed',
  },
  {
    id: 'Timeline / Story',
    title: 'Timeline / Story',
    tagline: 'Sequential Narrative',
    description: 'Reframes content as a chronological journey, project phases, or milestone roadmap.',
    icon: Clock,
    badge: 'Narrative',
  },
  {
    id: 'Data Highlights',
    title: 'Data Highlights',
    tagline: 'Metrics & Stats Focus',
    description: 'Foregrounds key numbers, percentages, dollar figures, and quantitative callouts.',
    icon: BarChart3,
    badge: 'Metrics',
  },
];

export const StyleSelector: React.FC<StyleSelectorProps> = ({
  selectedStyle,
  onSelectStyle,
  targetSlideCount,
  onSelectSlideCount,
  tone,
  onSelectTone,
}) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-slate-200 uppercase tracking-wider flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span>Select Presentation Intent & Style</span>
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Choose how Glance restructures and visualizes your document content
          </p>
        </div>
      </div>

      {/* Style Option Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {STYLE_OPTIONS.map((opt) => {
          const Icon = opt.icon;
          const isSelected = selectedStyle === opt.id;
          return (
            <div
              key={opt.id}
              onClick={() => onSelectStyle(opt.id)}
              className={`relative p-5 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col justify-between select-none ${
                isSelected
                  ? 'bg-gradient-to-br from-indigo-950/80 via-slate-900 to-indigo-900/40 border-indigo-500 shadow-lg shadow-indigo-500/10 ring-1 ring-indigo-500'
                  : 'bg-slate-900/60 hover:bg-slate-800/80 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                        isSelected
                          ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                          : 'bg-slate-800 text-slate-400 group-hover:text-slate-200'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-100 text-base flex items-center gap-2">
                        {opt.title}
                      </h4>
                      <p className="text-xs text-indigo-300 font-medium">{opt.tagline}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full ${
                        isSelected
                          ? 'bg-indigo-500/20 text-indigo-200 border border-indigo-500/40'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {opt.badge}
                    </span>
                    {isSelected && <CheckCircle2 className="w-5 h-5 text-indigo-400" />}
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed mt-1">{opt.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Advanced Customizations Drawer */}
      <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/80 space-y-4">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-300 uppercase tracking-wider">
          <Sliders className="w-3.5 h-3.5 text-indigo-400" />
          <span>Presentation Controls</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Slide Count */}
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1.5">
              Target Deck Length
            </label>
            <div className="grid grid-cols-4 gap-1.5 p-1 bg-slate-950/80 rounded-lg border border-slate-800">
              {['Auto', '5 Slides', '8 Slides', '12 Slides'].map((countOption) => {
                const isActive = targetSlideCount === countOption;
                return (
                  <button
                    key={countOption}
                    type="button"
                    onClick={() => onSelectSlideCount(countOption)}
                    className={`py-1.5 px-2 rounded-md text-[11px] font-medium transition ${
                      isActive
                        ? 'bg-indigo-600 text-white shadow'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                    }`}
                  >
                    {countOption}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tone Selector */}
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1.5">
              Presentation Tone
            </label>
            <select
              value={tone}
              onChange={(e) => onSelectTone(e.target.value)}
              className="w-full bg-slate-950/80 text-slate-200 text-xs rounded-lg border border-slate-800 px-3 py-2 focus:outline-none focus:border-indigo-500"
            >
              <option value="Professional & Engaging">Professional & Executive</option>
              <option value="Pitch Deck Style">High-Impact Pitch Deck</option>
              <option value="Academic & Technical">Academic & Analytical</option>
              <option value="Creative & Bold">Creative & Narrative</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};
