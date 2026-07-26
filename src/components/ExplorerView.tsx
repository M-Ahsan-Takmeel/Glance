import React, { useState } from 'react';
import { SAMPLE_DOCS } from '../lib/sampleDocs';
import { SampleDoc } from '../types';
import { ParsedDocResult } from '../lib/docxParser';

interface ExplorerViewProps {
  onSelectDocForPresent: (parsedDoc: ParsedDocResult) => void;
  onNavigateToPresent: () => void;
}

export const ExplorerView: React.FC<ExplorerViewProps> = ({
  onSelectDocForPresent,
  onNavigateToPresent,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [previewDoc, setPreviewDoc] = useState<SampleDoc | null>(SAMPLE_DOCS[0] || null);

  const categories = ['All', 'Legal', 'Finance', 'Tech', 'HR', 'Sales', 'Ops'];

  const filteredDocs = SAMPLE_DOCS.filter((doc) => {
    const matchesSearch =
      doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === 'All' || doc.category.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  const handleTransformDoc = (doc: SampleDoc) => {
    onSelectDocForPresent({
      text: doc.content,
      filename: doc.filename,
      wordCount: doc.wordCount,
      charCount: (doc.content || '').length,
      headings: [doc.title],
    });
    onNavigateToPresent();
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#dae2fd]">
            Document Corpus Explorer
          </h1>
          <p className="text-sm text-[#bdc8d1] mt-1">
            Browse active files, inspect structural hierarchy, and trigger instant AI slide restructures.
          </p>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <span className="material-symbols-outlined absolute left-3 top-2.5 text-sm text-[#bdc8d1]/60">
              search
            </span>
            <input
              type="text"
              placeholder="Search files or clauses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#131b2e] border border-white/10 text-xs text-[#dae2fd] placeholder-[#bdc8d1]/40 focus:outline-none focus:border-[#8ed5ff] transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Category Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-mono-code transition-all whitespace-nowrap cursor-pointer ${
              selectedCategory === cat
                ? 'bg-[#38bdf8] text-[#00354a] font-semibold shadow-md shadow-[#38bdf8]/20'
                : 'bg-[#171f33] text-[#bdc8d1] border border-white/5 hover:border-white/15'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Main Grid: Left File List, Right Document Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Document Cards List */}
        <div className="lg:col-span-7 space-y-3">
          {filteredDocs.length === 0 ? (
            <div className="glass p-8 text-center rounded-2xl text-xs text-[#bdc8d1]/60">
              No matching documents found in corpus. Try adjusting search filters.
            </div>
          ) : (
            filteredDocs.map((doc) => {
              const isSelected = previewDoc?.id === doc.id;
              return (
                <div
                  key={doc.id}
                  onClick={() => setPreviewDoc(doc)}
                  className={`glass-card p-4 rounded-xl border transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                    isSelected
                      ? 'border-[#8ed5ff]/60 bg-[#171f33] shadow-lg shadow-[#8ed5ff]/5'
                      : 'border-white/5 hover:border-white/20 hover:bg-[#171f33]/80'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#222a3d] flex items-center justify-center text-[#8ed5ff] border border-white/10 shrink-0">
                      <span className="material-symbols-outlined text-xl">description</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-[#8ed5ff]/10 text-[#8ed5ff] font-mono-code text-[10px]">
                          {doc.category}
                        </span>
                        <span className="font-mono-code text-[10px] text-[#bdc8d1]/50">
                          {doc.wordCount} words
                        </span>
                      </div>
                      <h3 className="text-sm font-semibold text-[#dae2fd] mt-1">{doc.title}</h3>
                      <p className="text-xs text-[#bdc8d1]/70 line-clamp-1 mt-0.5">{doc.description}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleTransformDoc(doc);
                      }}
                      className="px-3 py-1.5 rounded-lg bg-[#38bdf8] text-[#00354a] hover:bg-[#8ed5ff] font-semibold text-xs transition-all flex items-center gap-1 shadow-md shadow-[#38bdf8]/20"
                    >
                      <span className="material-symbols-outlined text-sm">present_to_all</span>
                      <span>Transform to Visual</span>
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Selected Document Inspector Panel */}
        <div className="lg:col-span-5">
          {previewDoc ? (
            <div className="glass p-6 rounded-2xl space-y-5 sticky top-20 border border-white/10">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#44e2cd]">auto_awesome</span>
                  <span className="font-mono-code text-xs text-[#44e2cd] uppercase">
                    AI Document Inspector
                  </span>
                </div>
                <span className="px-2.5 py-1 rounded-md bg-[#44e2cd]/10 text-[#44e2cd] font-mono-code text-[10px]">
                  Ready for Visual Generation
                </span>
              </div>

              <div>
                <span className="font-mono-code text-[10px] text-[#bdc8d1]/60 uppercase">
                  {previewDoc.category} • {previewDoc.filename}
                </span>
                <h2 className="text-lg font-bold text-[#dae2fd] mt-0.5">{previewDoc.title}</h2>
                <p className="text-xs text-[#bdc8d1] leading-relaxed mt-2">{previewDoc.description}</p>
              </div>

              <div className="p-3 rounded-xl bg-[#0b1326] border border-white/5 space-y-2">
                <div className="font-mono-code text-[10px] text-[#bdc8d1]/60 uppercase">
                  Excerpt Preview
                </div>
                <p className="text-xs text-[#dae2fd]/80 font-mono-code leading-relaxed line-clamp-5 whitespace-pre-wrap">
                  {previewDoc.content}
                </p>
              </div>

              <div className="space-y-2">
                <button
                  onClick={() => handleTransformDoc(previewDoc)}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-[#38bdf8] to-[#44e2cd] text-[#00354a] font-bold text-xs hover:opacity-95 active:scale-98 transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#38bdf8]/20"
                >
                  <span className="material-symbols-outlined text-base">auto_awesome</span>
                  <span>Restructure & Generate Interactive Presentation</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="glass p-8 rounded-2xl text-center text-xs text-[#bdc8d1]/60">
              Select a document from the corpus to inspect details.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
