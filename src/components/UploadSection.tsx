import React, { useRef, useState } from 'react';
import { ParsedDocResult } from '../lib/docxParser';
import { SAMPLE_DOCS } from '../lib/sampleDocs';
import { SampleDoc } from '../types';
import {
  FileUp,
  FileText,
  AlertCircle,
  Sparkles,
  Check,
  FileCode,
  BookOpen,
  ArrowRight,
  X,
  Heading,
} from 'lucide-react';

interface UploadSectionProps {
  parsedDoc: ParsedDocResult | null;
  onDocParsed: (doc: ParsedDocResult) => void;
  onClearDoc: () => void;
  isLoading: boolean;
  error: string | null;
  setError: (msg: string | null) => void;
  onParseFile: (file: File) => Promise<void>;
  onGenerateDeck?: () => void;
}

export const UploadSection: React.FC<UploadSectionProps> = ({
  parsedDoc,
  onDocParsed,
  onClearDoc,
  isLoading,
  error,
  setError,
  onParseFile,
  onGenerateDeck,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [showDocPreview, setShowDocPreview] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    setError(null);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      const file = files[0];
      await onParseFile(file);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      await onParseFile(files[0]);
    }
  };

  const handleSelectSample = (sample: SampleDoc) => {
    setError(null);
    const wordCount = sample.content.split(/\s+/).filter(Boolean).length;
    const charCount = sample.content.length;
    const lines = sample.content.split('\n').map((l) => l.trim()).filter(Boolean);
    const headings = lines
      .filter((l) => l.length < 80 && !l.endsWith('.') && /^[0-9A-Z\s\-\.\:]{3,}/.test(l))
      .slice(0, 6);

    onDocParsed({
      text: sample.content,
      filename: sample.filename,
      wordCount,
      charCount,
      headings,
    });
  };

  return (
    <div className="space-y-6">
      {/* Error Message */}
      {error && (
        <div className="p-4 rounded-xl bg-red-950/70 border border-red-800 text-red-200 text-xs flex items-start gap-3 animate-fadeIn">
          <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="font-semibold text-red-100">Document Processing Error</p>
            <p className="mt-0.5 text-red-300/90">{error}</p>
          </div>
          <button
            onClick={() => setError(null)}
            className="text-red-400 hover:text-red-200 p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Main Upload Area or Loaded Doc Info */}
      {!parsedDoc ? (
        <div className="space-y-4">
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`relative p-8 sm:p-12 rounded-2xl border-2 border-dashed text-center transition-all duration-200 cursor-pointer group ${
              isDragging
                ? 'border-indigo-500 bg-indigo-950/40 shadow-xl shadow-indigo-500/10'
                : 'border-slate-800 hover:border-indigo-500/60 bg-slate-900/50 hover:bg-slate-900/80'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".docx"
              onChange={handleFileChange}
              className="hidden"
            />

            <div className="w-16 h-16 mx-auto rounded-2xl bg-indigo-600/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center group-hover:scale-110 transition-transform duration-200 shadow-inner">
              <FileUp className="w-8 h-8" />
            </div>

            <div className="mt-4 space-y-1">
              <h3 className="text-base font-semibold text-slate-100">
                Upload your Word Document (.docx)
              </h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Drag and drop your file here, or click to browse. We parse document text 100% in your browser.
              </p>
            </div>

            <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs transition shadow-md shadow-indigo-600/20">
              <FileText className="w-4 h-4" />
              <span>Select .docx File</span>
            </div>

            <p className="mt-3 text-[11px] text-slate-500">
              Supported format: Microsoft Word (.docx) • No login required
            </p>
          </div>

          {/* Sample Document Section */}
          <div className="pt-2">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
                <span>Or test instantly with a sample document</span>
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {SAMPLE_DOCS.map((sample) => (
                <div
                  key={sample.id}
                  onClick={() => handleSelectSample(sample)}
                  className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-indigo-500/60 hover:bg-slate-800/80 transition cursor-pointer group text-left"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-semibold text-indigo-400 bg-indigo-950/80 px-2 py-0.5 rounded border border-indigo-800/40">
                      {sample.category}
                    </span>
                    <span className="text-[10px] text-slate-500">{sample.wordCount} words</span>
                  </div>
                  <h4 className="font-semibold text-slate-200 text-xs group-hover:text-white line-clamp-1">
                    {sample.title}
                  </h4>
                  <p className="text-[11px] text-slate-400 line-clamp-2 mt-1">
                    {sample.description}
                  </p>
                  <div className="mt-2 text-[10px] text-indigo-300 font-medium flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>Load sample</span>
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Document Loaded Summary */
        <div className="p-5 rounded-2xl bg-slate-900 border border-indigo-500/40 shadow-lg shadow-indigo-500/5 space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-xl bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 flex items-center justify-center shrink-0">
                <FileCode className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/80 border border-emerald-800/60 px-2 py-0.5 rounded-full">
                    <Check className="w-3 h-3" /> Document Parsed
                  </span>
                  <span className="text-xs text-slate-400">
                    {parsedDoc.wordCount} words • {(parsedDoc.charCount ?? parsedDoc.text?.length ?? 0).toLocaleString()} chars
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-100 mt-1">
                  {parsedDoc.filename}
                </h3>
              </div>
            </div>

            <button
              onClick={onClearDoc}
              className="text-xs text-slate-400 hover:text-red-300 p-1.5 rounded-lg hover:bg-slate-800 transition"
              title="Remove document"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Headings detected */}
          {parsedDoc.headings && parsedDoc.headings.length > 0 && (
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5 mb-2">
                <Heading className="w-3.5 h-3.5 text-indigo-400" />
                <span>Detected Structure & Topics</span>
              </span>
              <div className="flex flex-wrap gap-1.5">
                {parsedDoc.headings.map((h, idx) => (
                  <span
                    key={idx}
                    className="text-[11px] bg-slate-900 text-slate-300 border border-slate-800 px-2.5 py-1 rounded-md"
                  >
                    {h}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Toggle Raw Text Preview and Actions */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-2 border-t border-slate-800/80">
            <button
              onClick={() => setShowDocPreview(!showDocPreview)}
              className="text-xs text-indigo-400 hover:text-indigo-300 font-medium flex items-center gap-1 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{showDocPreview ? 'Hide document snippet' : 'Preview extracted text'}</span>
            </button>

            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <button
                onClick={onClearDoc}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition cursor-pointer"
              >
                Upload / Switch File
              </button>

              {onGenerateDeck && (
                <button
                  onClick={onGenerateDeck}
                  disabled={isLoading}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-500 via-sky-400 to-teal-400 text-slate-950 font-bold text-xs hover:opacity-95 transition shadow-lg shadow-indigo-500/20 flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  <Sparkles className="w-4 h-4 text-slate-950" />
                  <span>{isLoading ? 'Generating Deck...' : 'Generate Visual Deck'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {showDocPreview && (
            <div className="mt-2 p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 max-h-48 overflow-y-auto whitespace-pre-wrap font-mono">
              {parsedDoc.text.slice(0, 1500)}
              {parsedDoc.text.length > 1500 && '...\n[Content truncated for preview]'}
            </div>
          )}
        </div>
      )}

      {/* Quick Sample Switcher Chips if document loaded */}
      {parsedDoc && (
        <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/60 space-y-2">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
            <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
            <span>Switch to sample document:</span>
          </span>
          <div className="flex flex-wrap gap-2">
            {SAMPLE_DOCS.map((sample) => (
              <button
                key={sample.id}
                onClick={() => handleSelectSample(sample)}
                className={`text-[11px] px-2.5 py-1 rounded-lg border transition cursor-pointer ${
                  parsedDoc.filename === sample.filename
                    ? 'bg-indigo-600 text-white border-indigo-400 font-semibold'
                    : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
                }`}
              >
                {sample.title}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
