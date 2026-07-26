import React, { useState } from 'react';
import { SAMPLE_DOCS } from '../lib/sampleDocs';
import { SampleDoc } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectDoc: (doc: SampleDoc) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, onSelectDoc }) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const results = SAMPLE_DOCS.filter(
    (doc) =>
      doc.title.toLowerCase().includes(query.toLowerCase()) ||
      doc.category.toLowerCase().includes(query.toLowerCase()) ||
      doc.description.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-start justify-center pt-20 px-4">
      <div className="bg-[#131b2e] border border-white/15 rounded-2xl max-w-xl w-full p-6 shadow-2xl space-y-4 animate-fadeIn">
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center gap-2 text-[#8ed5ff]">
            <span className="material-symbols-outlined text-xl">search</span>
            <span className="font-mono-code text-xs font-semibold uppercase">Search Document Corpus</span>
          </div>
          <button
            onClick={onClose}
            className="text-[#bdc8d1] hover:text-white p-1 rounded-lg hover:bg-white/5 transition-colors"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        <input
          type="text"
          autoFocus
          placeholder="Search by title, clause, tag, or topic..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full px-4 py-3 rounded-xl bg-[#0b1326] border border-white/10 text-sm text-[#dae2fd] placeholder-[#bdc8d1]/40 focus:outline-none focus:border-[#8ed5ff]"
        />

        <div className="max-h-80 overflow-y-auto space-y-2 pr-1">
          {results.length === 0 ? (
            <div className="text-center py-8 text-xs text-[#bdc8d1]/50">
              No matching documents found.
            </div>
          ) : (
            results.map((doc) => (
              <div
                key={doc.id}
                onClick={() => {
                  onSelectDoc(doc);
                  onClose();
                }}
                className="p-3 rounded-xl bg-[#171f33] hover:bg-[#222a3d] border border-white/5 cursor-pointer transition-colors flex items-center justify-between"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-[#8ed5ff]/10 text-[#8ed5ff] font-mono-code text-[10px]">
                      {doc.category}
                    </span>
                    <span className="text-xs font-semibold text-[#dae2fd]">{doc.title}</span>
                  </div>
                  <p className="text-xs text-[#bdc8d1]/70 line-clamp-1 mt-1">{doc.description}</p>
                </div>
                <span className="material-symbols-outlined text-[#8ed5ff] text-sm shrink-0 ml-2">
                  arrow_forward
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
