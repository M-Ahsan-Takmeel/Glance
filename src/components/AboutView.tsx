import React from 'react';
import { Sparkles, Target, Lightbulb, FileText, BarChart3, Layers, ArrowRight } from 'lucide-react';
import { ActiveTab } from '../types';

interface AboutViewProps {
  onNavigate: (tab: ActiveTab) => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-5xl mx-auto space-y-10 animate-fadeIn py-4">
      {/* Header / Banner */}
      <div className="glass p-8 sm:p-10 rounded-3xl border border-white/10 text-center relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#38bdf8]/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#44e2cd]/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#38bdf8]/10 border border-[#38bdf8]/30 text-[#8ed5ff] text-xs font-mono-code mb-4">
          <Sparkles className="w-3.5 h-3.5 text-[#44e2cd]" />
          <span>ENTERPRISE INTELLIGENCE & DOCUMENT TRANSFORMATION</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
          About <span className="bg-gradient-to-r from-[#8ed5ff] via-[#44e2cd] to-[#baa3ff] bg-clip-text text-transparent">Glance AI</span>
        </h1>
        <p className="text-sm sm:text-base text-[#bdc8d1] max-w-2xl mx-auto leading-relaxed">
          Glance is an enterprise document intelligence platform designed to bridge the gap between dense written documentation and high-impact visual presentations.
        </p>
      </div>

      {/* Main Core Sections: Problem Statement & Purpose */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Problem Statement Card */}
        <div className="glass p-7 sm:p-8 rounded-2xl border border-white/10 hover:border-red-400/30 transition-all flex flex-col justify-between relative group">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400">
              <Target className="w-6 h-6" />
            </div>

            <div>
              <div className="text-xs font-mono-code text-red-400 uppercase tracking-widest mb-1">
                CHALLENGE & FRICTION
              </div>
              <h2 className="text-2xl font-bold text-white tracking-tight">
                Problem Statement
              </h2>
            </div>

            <p className="text-xs sm:text-sm text-[#bdc8d1] leading-relaxed">
              Enterprise teams frequently struggle with extracting and communicating critical findings locked inside lengthy text documents:
            </p>

            <ul className="space-y-3 pt-2">
              <li className="flex items-start gap-3 text-xs sm:text-sm text-[#bdc8d1]">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 shrink-0"></span>
                <span>
                  <strong className="text-white">Dense & Unapproachable Reports:</strong> Executive decision-makers rarely have time to digest 30+ page Word proposals or technical whitepapers.
                </span>
              </li>
              <li className="flex items-start gap-3 text-xs sm:text-sm text-[#bdc8d1]">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 shrink-0"></span>
                <span>
                  <strong className="text-white">Hours Lost in Manual Slide Design:</strong> Building presentation decks manually requires labor-intensive copy-pasting, formatting, layout tweaking, and chart building.
                </span>
              </li>
              <li className="flex items-start gap-3 text-xs sm:text-sm text-[#bdc8d1]">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 shrink-0"></span>
                <span>
                  <strong className="text-white">Buried Key Metrics & Insights:</strong> Vital statistics, trends, and action items get buried within dense prose, leading to delayed decisions and communication breakdowns.
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Purpose of the App Card */}
        <div className="glass p-7 sm:p-8 rounded-2xl border border-white/10 hover:border-[#44e2cd]/30 transition-all flex flex-col justify-between relative group">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-xl bg-[#44e2cd]/10 border border-[#44e2cd]/20 flex items-center justify-center text-[#44e2cd]">
              <Lightbulb className="w-6 h-6" />
            </div>

            <div>
              <div className="text-xs font-mono-code text-[#44e2cd] uppercase tracking-widest mb-1">
                OUR SOLUTION
              </div>
              <h2 className="text-2xl font-bold text-white tracking-tight">
                Purpose of the App
              </h2>
            </div>

            <p className="text-xs sm:text-sm text-[#bdc8d1] leading-relaxed">
              Glance was created to convert raw documentation into clear, interactive visual stories effortlessly:
            </p>

            <ul className="space-y-3 pt-2">
              <li className="flex items-start gap-3 text-xs sm:text-sm text-[#bdc8d1]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#44e2cd] mt-2 shrink-0"></span>
                <span>
                  <strong className="text-white">Automated Document Parsing:</strong> Directly extracts semantic headings, bullet points, numbers, and data points from uploaded DOCX files in real time.
                </span>
              </li>
              <li className="flex items-start gap-3 text-xs sm:text-sm text-[#bdc8d1]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#44e2cd] mt-2 shrink-0"></span>
                <span>
                  <strong className="text-white">Zero-Design Presentation Engine:</strong> Restructures text into interactive slide decks formatted as Executive Summaries, Deep Dives, or Timelines instantly.
                </span>
              </li>
              <li className="flex items-start gap-3 text-xs sm:text-sm text-[#bdc8d1]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#44e2cd] mt-2 shrink-0"></span>
                <span>
                  <strong className="text-white">Corpus Intelligence:</strong> Serves as a central dashboard to monitor document metrics, explore reports, and present data-backed narratives effortlessly.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Feature Capabilities Grid */}
      <div className="space-y-4">
        <div className="text-center space-y-1">
          <h3 className="text-lg font-bold text-white tracking-tight">Core Platform Capabilities</h3>
          <p className="text-xs text-[#bdc8d1]">Engineered for enterprise presentation clarity and speed</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="glass p-5 rounded-xl border border-white/5 hover:border-white/20 transition-all space-y-2">
            <div className="w-8 h-8 rounded-lg bg-[#38bdf8]/10 text-[#8ed5ff] flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-semibold text-white">Smart In-Browser Parsing</h4>
            <p className="text-xs text-[#bdc8d1] leading-relaxed">
              Reads DOCX files securely inside the browser without exposing sensitive enterprise content.
            </p>
          </div>

          <div className="glass p-5 rounded-xl border border-white/5 hover:border-white/20 transition-all space-y-2">
            <div className="w-8 h-8 rounded-lg bg-[#44e2cd]/10 text-[#44e2cd] flex items-center justify-center">
              <Layers className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-semibold text-white">Adaptive Presentation Styles</h4>
            <p className="text-xs text-[#bdc8d1] leading-relaxed">
              Generates decks tuned for Executive Summaries, Timelines, or Data-heavy reviews.
            </p>
          </div>

          <div className="glass p-5 rounded-xl border border-white/5 hover:border-white/20 transition-all space-y-2">
            <div className="w-8 h-8 rounded-lg bg-[#baa3ff]/10 text-[#baa3ff] flex items-center justify-center">
              <BarChart3 className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-semibold text-white">Visual Chart Synthesis</h4>
            <p className="text-xs text-[#bdc8d1] leading-relaxed">
              Automatically constructs bar graphs, treemaps, and stat cards directly from text figures.
            </p>
          </div>

          <div className="glass p-5 rounded-xl border border-white/5 hover:border-white/20 transition-all space-y-2">
            <div className="w-8 h-8 rounded-lg bg-[#38bdf8]/10 text-[#8ed5ff] flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-semibold text-white">Live Slide Customization</h4>
            <p className="text-xs text-[#bdc8d1] leading-relaxed">
              Customize themes, slide order, speaker notes, and presentation modes seamlessly.
            </p>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="glass p-6 sm:p-8 rounded-2xl border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-white">Ready to transform your documents?</h3>
          <p className="text-xs sm:text-sm text-[#bdc8d1]">Upload a report or select a sample document to generate an interactive deck.</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => onNavigate('Dashboard')}
            className="px-4 py-2.5 rounded-xl bg-[#171f33] border border-white/10 text-xs font-semibold text-[#8ed5ff] hover:bg-[#222a3d] transition-colors"
          >
            Go to Dashboard
          </button>
          <button
            onClick={() => onNavigate('Deck')}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#38bdf8] to-[#44e2cd] text-[#00354a] font-bold text-xs flex items-center gap-2 hover:brightness-110 transition-all shadow-md shadow-[#38bdf8]/20"
          >
            <span>Try Interactive Deck</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

