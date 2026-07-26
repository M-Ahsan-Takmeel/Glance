import React, { useState } from 'react';
import { 
  TrendingUp, 
  Sparkles, 
  Schedule, 
  Lock, 
  BarChart, 
  CompareArrows, 
  AddCircle, 
  RemoveCircle, 
  NorthEast, 
  CloudUpload,
  MoreVert,
  CalendarMonth,
  Download
} from './Icons';

interface InsightsViewProps {
  onNavigateToPresent?: () => void;
}

export const InsightsView: React.FC<InsightsViewProps> = ({ onNavigateToPresent }) => {
  const [selectedSet, setSelectedSet] = useState<'A' | 'B'>('A');

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#dae2fd]">
            Document Corpus Insights
          </h1>
          <p className="text-sm text-[#bdc8d1] mt-1">
            Real-time intelligence across 4,289 active files.
          </p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-[#222a3d] border border-white/10 rounded-xl hover:bg-[#2d3449] transition-colors text-xs font-medium text-[#dae2fd]">
            <span className="material-symbols-outlined text-base">calendar_month</span>
            <span>Last 30 Days</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#8ed5ff] text-[#00354a] rounded-xl font-semibold shadow-lg shadow-[#8ed5ff]/20 hover:opacity-90 active:scale-95 transition-all text-xs">
            <span className="material-symbols-outlined text-base">download</span>
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-min">
        {/* Main Trend Line Chart */}
        <div className="md:col-span-8 glass p-6 rounded-2xl flex flex-col gap-4 min-h-[380px] group transition-all duration-300 hover:border-[#8ed5ff]/30">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#8ed5ff]">trending_up</span>
              <h2 className="font-semibold text-sm text-[#dae2fd]">Volume Trend Analysis</h2>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#8ed5ff]"></span>
              <span className="text-xs text-[#bdc8d1]">Current</span>
              <span className="w-3 h-3 rounded-full bg-[#44e2cd] ml-3"></span>
              <span className="text-xs text-[#bdc8d1]">Historical</span>
            </div>
          </div>

          {/* Chart SVG with Glowing Paths */}
          <div className="flex-1 w-full relative mt-4 flex items-end px-2">
            <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
              <div className="w-full h-px bg-white/20"></div>
            </div>
            
            <svg className="absolute inset-0 w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 100">
              <path 
                className="chart-glow" 
                d="M 0 80 Q 20 20 40 50 T 60 10 T 80 40 T 100 30" 
                fill="none" 
                stroke="#8ed5ff" 
                strokeWidth="2.5"
              />
              <path 
                d="M 0 90 Q 20 70 40 85 T 60 60 T 80 75 T 100 80" 
                fill="none" 
                opacity="0.6" 
                stroke="#44e2cd" 
                strokeDasharray="4" 
                strokeWidth="1.5"
              />
            </svg>

            {/* Grid lines */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-5">
              <div className="border-b border-white"></div>
              <div className="border-b border-white"></div>
              <div className="border-b border-white"></div>
              <div className="border-b border-white"></div>
            </div>
          </div>

          <div className="flex justify-between text-[11px] font-mono-code text-[#bdc8d1]/50 pt-4 border-t border-white/5">
            <span>JAN</span><span>FEB</span><span>MAR</span><span>APR</span><span>MAY</span><span>JUN</span><span>JUL</span>
          </div>
        </div>

        {/* AI Key Insights Sidebar */}
        <div className="md:col-span-4 flex flex-col gap-6">
          <div className="glass p-6 rounded-2xl border-l-4 border-l-[#44e2cd] relative overflow-hidden group">
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-3">
                <span className="material-symbols-outlined text-[#44e2cd]">auto_awesome</span>
                <h3 className="font-mono-code text-xs uppercase tracking-wider text-[#44e2cd] font-semibold">
                  AI Summary
                </h3>
              </div>
              <p className="text-sm text-[#dae2fd] leading-relaxed mb-4 italic">
                "Analysis shows a 24% increase in legal compliance documentation this quarter. Key semantic clusters indicate a pivot toward ESG standards across European jurisdictions."
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-2.5 py-1 rounded-md bg-[#44e2cd]/10 border border-[#44e2cd]/20 text-[#44e2cd] font-mono-code text-[11px]">
                  Compliance High
                </span>
                <span className="px-2.5 py-1 rounded-md bg-[#44e2cd]/10 border border-[#44e2cd]/20 text-[#44e2cd] font-mono-code text-[11px]">
                  ESG Pivot
                </span>
              </div>
            </div>
          </div>

          <div className="glass p-6 rounded-2xl flex flex-col gap-3">
            <h3 className="font-mono-code text-xs uppercase text-[#bdc8d1] tracking-wider">
              Active Intelligence
            </h3>
            <div className="space-y-4 mt-2">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#2d3449] flex items-center justify-center text-[#8ed5ff]">
                  <span className="material-symbols-outlined text-base">schedule</span>
                </div>
                <div className="flex-1">
                  <div className="text-xs text-[#dae2fd]">Last Sync: 4m ago</div>
                  <div className="w-full bg-white/5 h-1.5 rounded-full mt-1.5 overflow-hidden">
                    <div className="bg-[#8ed5ff] h-full rounded-full w-4/5"></div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#2d3449] flex items-center justify-center text-[#44e2cd]">
                  <span className="material-symbols-outlined text-base">lock</span>
                </div>
                <div className="flex-1">
                  <div className="text-xs text-[#dae2fd]">PII Detection Active</div>
                  <div className="w-full bg-white/5 h-1.5 rounded-full mt-1.5 overflow-hidden">
                    <div className="bg-[#44e2cd] h-full rounded-full w-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Document Frequency Bar Chart */}
        <div className="md:col-span-12 lg:col-span-7 glass p-6 rounded-2xl flex flex-col gap-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#8ed5ff]">bar_chart</span>
              <h2 className="font-semibold text-sm text-[#dae2fd]">Document Type Frequency</h2>
            </div>
            <button className="material-symbols-outlined text-[#bdc8d1] opacity-40 hover:opacity-100 transition-opacity">
              more_vert
            </button>
          </div>

          <div className="flex items-end justify-between h-48 px-4 gap-3">
            {[
              { label: 'LEGAL', heightPct: 90, barPct: 80 },
              { label: 'FINANCE', heightPct: 65, barPct: 70 },
              { label: 'TECH', heightPct: 45, barPct: 60 },
              { label: 'HR', heightPct: 80, barPct: 85 },
              { label: 'SALES', heightPct: 55, barPct: 75 },
              { label: 'OPS', heightPct: 30, barPct: 50 },
            ].map((item, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2 group cursor-pointer">
                <div 
                  className="w-full bg-[#8ed5ff]/20 rounded-t-lg relative flex items-end justify-center transition-all duration-300 group-hover:bg-[#8ed5ff]/40"
                  style={{ height: `${item.heightPct}%` }}
                >
                  <div 
                    className="w-3/4 bg-[#8ed5ff] rounded-t-lg transition-all duration-500 delay-100 group-hover:h-full"
                    style={{ height: `${item.barPct}%` }}
                  />
                </div>
                <span className="font-mono-code text-[10px] text-[#bdc8d1]">{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Corpus Comparison */}
        <div className="md:col-span-12 lg:col-span-5 glass p-6 rounded-2xl flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#8ed5ff]">compare_arrows</span>
            <h2 className="font-semibold text-sm text-[#dae2fd]">Corpus Comparison</h2>
          </div>

          <div className="grid grid-cols-2 gap-3 mt-1">
            <div 
              onClick={() => setSelectedSet('A')}
              className={`p-3 rounded-xl bg-white/5 border transition-all cursor-pointer ${
                selectedSet === 'A' ? 'border-[#8ed5ff]/60 bg-[#8ed5ff]/10' : 'border-white/5 hover:border-[#8ed5ff]/20'
              }`}
            >
              <div className="font-mono-code text-[10px] text-[#bdc8d1]/60 mb-1">SET A</div>
              <div className="text-xs font-semibold text-[#8ed5ff] truncate">Q3 Audit Docs</div>
            </div>

            <div 
              onClick={() => setSelectedSet('B')}
              className={`p-3 rounded-xl bg-white/5 border transition-all cursor-pointer ${
                selectedSet === 'B' ? 'border-[#44e2cd]/60 bg-[#44e2cd]/10' : 'border-white/5 hover:border-[#8ed5ff]/20'
              }`}
            >
              <div className="font-mono-code text-[10px] text-[#bdc8d1]/60 mb-1">SET B</div>
              <div className="text-xs font-semibold text-[#44e2cd] truncate">Q4 Projection</div>
            </div>
          </div>

          <div className="flex flex-col gap-3 mt-2">
            <div className="flex justify-between items-center px-1">
              <span className="text-xs text-[#dae2fd]">Similarity Score</span>
              <span className="font-mono-code text-xs font-bold text-[#8ed5ff]">74.2%</span>
            </div>
            <div className="relative h-2 bg-white/10 rounded-full overflow-hidden mx-1">
              <div className="absolute h-full bg-gradient-to-r from-[#8ed5ff] to-[#44e2cd] w-[74.2%]"></div>
            </div>
            <div className="p-2 space-y-2 mt-1">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-green-400 text-sm">add_circle</span>
                <span className="text-xs text-[#dae2fd]/80">Increased focus on risk mitigation clauses.</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-red-400 text-sm">remove_circle</span>
                <span className="text-xs text-[#dae2fd]/80">Reduced mentions of legacy API integrations.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity Metrics Row */}
        <div className="md:col-span-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="glass p-5 rounded-2xl hover:bg-white/5 transition-all group">
            <div className="text-[#bdc8d1] opacity-60 font-mono-code text-[11px] mb-1">TOTAL DOCUMENTS</div>
            <div className="text-2xl font-bold text-[#8ed5ff]">4.2k</div>
            <div className="text-[#44e2cd] text-xs mt-1 font-medium flex items-center gap-1">
              <span className="material-symbols-outlined text-[12px]">north_east</span> +12%
            </div>
          </div>

          <div className="glass p-5 rounded-2xl hover:bg-white/5 transition-all group">
            <div className="text-[#bdc8d1] opacity-60 font-mono-code text-[11px] mb-1">AI PROCESSING</div>
            <div className="text-2xl font-bold text-[#dae2fd]">98.4%</div>
            <div className="text-[#bdc8d1]/50 text-xs mt-1">Accuracy Index</div>
          </div>

          <div className="glass p-5 rounded-2xl hover:bg-white/5 transition-all group">
            <div className="text-[#bdc8d1] opacity-60 font-mono-code text-[11px] mb-1">STORAGE USED</div>
            <div className="text-2xl font-bold text-[#dae2fd]">1.2 TB</div>
            <div className="text-[#8ed5ff] text-xs mt-1 flex items-center gap-1">
              <span className="material-symbols-outlined text-[12px]">cloud_upload</span> Active
            </div>
          </div>

          <div className="glass p-5 rounded-2xl hover:bg-white/5 transition-all group">
            <div className="text-[#bdc8d1] opacity-60 font-mono-code text-[11px] mb-1">CONTRIBUTORS</div>
            <div className="text-2xl font-bold text-[#dae2fd]">84</div>
            <div className="text-[#bdc8d1]/50 text-xs mt-1">Enterprise Wide</div>
          </div>
        </div>
      </div>
    </div>
  );
};
