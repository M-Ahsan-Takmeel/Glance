import React from 'react';
import { ParsedDocResult } from '../lib/docxParser';
import { UploadSection } from './UploadSection';

interface DashboardViewProps {
  parsedDoc: ParsedDocResult | null;
  onDocParsed: (doc: ParsedDocResult) => void;
  onClearDoc: () => void;
  isLoading: boolean;
  error: string | null;
  setError: (err: string | null) => void;
  onParseFile: (file: File) => Promise<void>;
  onNavigateToPresent: () => void;
  onNavigateToInsights?: () => void;
  onGenerateDeck?: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  parsedDoc,
  onDocParsed,
  onClearDoc,
  isLoading,
  error,
  setError,
  onParseFile,
  onNavigateToPresent,
  onNavigateToInsights,
  onGenerateDeck,
}) => {
  return (
    <div className="space-y-8 animate-fadeIn pb-12">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#38bdf8]/10 border border-[#38bdf8]/30 text-[#8ed5ff] text-xs font-mono-code mb-2">
            <span className="material-symbols-outlined text-sm text-[#44e2cd]">auto_awesome</span>
            <span>Enterprise Intelligence Active</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#dae2fd]">
            Dashboard
          </h1>
          <p className="text-sm text-[#bdc8d1] mt-1">
            Transform raw reports into interactive visual presentations or monitor live corpus analytics.
          </p>
        </div>
      </div>

      {/* Real-time Status Overview Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div 
          className="glass p-5 rounded-2xl border border-white/5"
        >
          <div className="flex justify-between items-start">
            <div className="text-[#bdc8d1] font-mono-code text-[11px]">ACTIVE CORPUS FILES</div>
            <span className="material-symbols-outlined text-[#8ed5ff] text-lg">folder_open</span>
          </div>
          <div className="text-2xl font-bold text-[#8ed5ff] mt-2">4,289</div>
          <div className="text-[#44e2cd] text-xs mt-1 font-mono-code flex items-center gap-1">
            <span className="material-symbols-outlined text-[12px]">north_east</span> +24% this quarter
          </div>
        </div>

        <div className="glass p-5 rounded-2xl border border-white/5">
          <div className="flex justify-between items-start">
            <div className="text-[#bdc8d1] font-mono-code text-[11px]">VISUAL DECKS GENERATED</div>
            <span className="material-symbols-outlined text-[#44e2cd] text-lg">present_to_all</span>
          </div>
          <div className="text-2xl font-bold text-[#dae2fd] mt-2">1,240</div>
          <div className="text-[#bdc8d1]/60 text-xs mt-1 font-mono-code">Avg 9.2 slides per doc</div>
        </div>

        <div className="glass p-5 rounded-2xl border border-white/5">
          <div className="flex justify-between items-start">
            <div className="text-[#bdc8d1] font-mono-code text-[11px]">AI PARSING ACCURACY</div>
            <span className="material-symbols-outlined text-[#baa3ff] text-lg">verified</span>
          </div>
          <div className="text-2xl font-bold text-[#dae2fd] mt-2">98.4%</div>
          <div className="text-[#baa3ff] text-xs mt-1 font-mono-code">Semantic cluster validated</div>
        </div>

        <div className="glass p-5 rounded-2xl border border-white/5">
          <div className="flex justify-between items-start">
            <div className="text-[#bdc8d1] font-mono-code text-[11px]">PROCESSING SPEED</div>
            <span className="material-symbols-outlined text-[#44e2cd] text-lg">bolt</span>
          </div>
          <div className="text-2xl font-bold text-[#dae2fd] mt-2">~8.2s</div>
          <div className="text-[#44e2cd] text-xs mt-1 font-mono-code">In-browser docx parsing</div>
        </div>
      </div>

      {/* Quick Transformer Zone */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#8ed5ff]">transform</span>
            <h2 className="text-base font-bold text-[#dae2fd]">Quick Document Transformer</h2>
          </div>
          <span className="font-mono-code text-xs text-[#bdc8d1]/60">
            Supports .docx files or enterprise samples
          </span>
        </div>

        <UploadSection
          parsedDoc={parsedDoc}
          onDocParsed={onDocParsed}
          onClearDoc={onClearDoc}
          isLoading={isLoading}
          error={error}
          setError={setError}
          onParseFile={onParseFile}
          onGenerateDeck={onGenerateDeck || onNavigateToPresent}
        />

        {parsedDoc && (
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 p-4 rounded-xl bg-[#131b2e] border border-[#38bdf8]/30">
            <div>
              <div className="text-xs font-bold text-[#dae2fd]">
                Document Loaded: <span className="text-[#8ed5ff]">{parsedDoc.filename}</span>
              </div>
              <div className="text-[11px] text-[#bdc8d1]">
                {parsedDoc.wordCount} words • {parsedDoc.headings.length} detected sections
              </div>
            </div>
            <button
              onClick={onGenerateDeck || onNavigateToPresent}
              disabled={isLoading}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-[#38bdf8] via-[#44e2cd] to-[#baa3ff] text-[#002738] font-bold text-xs hover:opacity-95 transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#38bdf8]/20 cursor-pointer disabled:opacity-50"
            >
              <span className="material-symbols-outlined text-base">auto_awesome</span>
              <span>{isLoading ? 'Generating Visual Presentation...' : 'Generate Visual Presentation Deck'}</span>
              <span className="material-symbols-outlined text-base">arrow_forward</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
