import React from 'react';
import { Presentation, Upload, Sparkles, Sliders, Play, X, CheckCircle2 } from 'lucide-react';

interface HowItWorksModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HowItWorksModal: React.FC<HowItWorksModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md p-4 sm:p-6 flex items-center justify-center animate-fadeIn">
      <div className="max-w-2xl w-full bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center">
              <Presentation className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-white">How Glance Works</h3>
              <p className="text-xs text-slate-400">
                From static Word doc to visual, presentable deck in 4 simple steps
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 4 Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="w-6 h-6 rounded-full bg-indigo-600/30 text-indigo-400 text-xs font-bold flex items-center justify-center">
                1
              </span>
              <Upload className="w-4 h-4 text-indigo-400" />
            </div>
            <h4 className="font-semibold text-sm text-slate-200">1. Upload .docx File</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Glance parses your Word document directly in your browser. No file data is stored.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="w-6 h-6 rounded-full bg-indigo-600/30 text-indigo-400 text-xs font-bold flex items-center justify-center">
                2
              </span>
              <Sliders className="w-4 h-4 text-indigo-400" />
            </div>
            <h4 className="font-semibold text-sm text-slate-200">2. Pick Style & Intent</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Choose Executive Summary, Deep Dive, Timeline / Story, or Data Highlights based on your audience.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="w-6 h-6 rounded-full bg-indigo-600/30 text-indigo-400 text-xs font-bold flex items-center justify-center">
                3
              </span>
              <Sparkles className="w-4 h-4 text-amber-400" />
            </div>
            <h4 className="font-semibold text-sm text-slate-200">3. AI Visual Restructuring</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Gemini AI analyzes topic hierarchy, converting paragraphs into stats, timelines, bullet cards, and callouts.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="w-6 h-6 rounded-full bg-indigo-600/30 text-indigo-400 text-xs font-bold flex items-center justify-center">
                4
              </span>
              <Play className="w-4 h-4 text-emerald-400" />
            </div>
            <h4 className="font-semibold text-sm text-slate-200">4. Present Directly</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Use arrow keys, presenter notes, themes, and full-screen mode to show your work live without manual slide building.
            </p>
          </div>
        </div>

        {/* Feature Highlights */}
        <div className="p-4 rounded-xl bg-indigo-950/40 border border-indigo-800/40 text-xs text-indigo-200 space-y-1.5">
          <p className="font-semibold text-indigo-100">Why Glance?</p>
          <ul className="space-y-1 text-slate-300">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Saves 2+ hours of tedious slide formatting per document</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Supports full presentation controls, speaker notes, and custom color themes</span>
            </li>
          </ul>
        </div>

        <div className="flex justify-end pt-2">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition"
          >
            Got it, let's build a deck
          </button>
        </div>
      </div>
    </div>
  );
};
