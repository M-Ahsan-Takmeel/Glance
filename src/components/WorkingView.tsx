import React, { useState } from 'react';
import {
  Workflow,
  Upload,
  Cpu,
  Sliders,
  Presentation,
  CheckCircle2,
  FileText,
  BarChart3,
  Sparkles,
  ArrowRight,
  Database,
  Zap,
  ShieldCheck,
  Eye,
  Layers,
  Code2,
  ChevronRight
} from 'lucide-react';
import { ActiveTab } from '../types';

interface WorkingViewProps {
  onNavigate: (tab: ActiveTab) => void;
}

export const WorkingView: React.FC<WorkingViewProps> = ({ onNavigate }) => {
  const [activeStep, setActiveStep] = useState<number>(1);

  const steps = [
    {
      id: 1,
      title: '1. Document Ingestion & Parsing',
      icon: Upload,
      color: '#38bdf8',
      summary: 'Extracts semantic hierarchy and raw text directly inside the browser using mammoth.js XML parser.',
      details: [
        'Client-Side Privacy: The file is processed completely in your browser memory without uploading raw documents to external servers.',
        'Semantic Extraction: Parses Word (.docx) XML documents, preserving headings (H1, H2, H3), paragraphs, bullet points, and data tables.',
        'Word & Character Metrics: Computes exact word counts, character counts, and identifies key structural anchors.',
        'Fallback Sample Library: Provides pre-loaded enterprise documents (Executive Review, Q3 Performance, AI Strategy) for instant testing.'
      ],
      codeSnippet: `// In-browser Document Ingestion Workflow
const arrayBuffer = await file.arrayBuffer();
const result = await mammoth.extractRawText({ arrayBuffer });
const parsedDoc = {
  text: result.value,
  filename: file.name,
  wordCount: result.value.split(/\\s+/).length,
  headings: extractHeadings(result.value)
};`
    },
    {
      id: 2,
      title: '2. Style & Intent Configuration',
      icon: Sliders,
      color: '#44e2cd',
      summary: 'Tailors output structure based on target audience, deck length, and tone preferences.',
      details: [
        'Style Intent Options: Executive Summary (high-level cards), Deep Dive (exhaustive analysis), Timeline/Story (chronological steps), Data Highlights (chart-centric).',
        'Target Slide Budgeting: Set slide count to Auto, 3-5 slides, 6-10 slides, or 10+ slides.',
        'Tone Customization: Choose from Professional & Engaging, Direct & Concise, Analytical & Data-Driven, or Visionary & Inspiring.',
        'Audience Focus: Target Executive Leadership, Technical Teams, Board Members, or General Stakeholders.'
      ],
      codeSnippet: `// Configuration Parameters
interface GenerationOptions {
  style: 'Executive Summary' | 'Deep Dive' | 'Timeline' | 'Data Highlights';
  slideCount: 'Auto' | '3-5' | '6-10' | '10+';
  tone: string;
  audienceFocus: string;
}`
    },
    {
      id: 3,
      title: '3. Data Synthesis & Chart Generation',
      icon: Cpu,
      color: '#baa3ff',
      summary: 'Transforms text statistics into visual components including treemaps, stacked bar graphs, and histograms.',
      details: [
        'Numerical Parsing: Detects percentages, dollar figures, YoY growth rates, and categorical data in text.',
        'Smart Visualization Selection: Automatically pairs numbers with stacked bar charts, treemaps, pie charts, histograms, or box plots.',
        'Key Takeaway Synthesis: Generates structured bullet lists, executive quote blocks, and highlighted takeaway banners per slide.',
        'Speaker Notes Generation: Creates companion presenter scripts and context notes for every slide.'
      ],
      codeSnippet: `// Synthesizing Slide Data
const slide = {
  type: 'stacked_bar',
  heading: 'Q3 Financial Performance',
  stackedBar: {
    categories: ['Q1', 'Q2', 'Q3', 'Q4'],
    keys: ['Direct', 'Partner', 'Enterprise'],
    data: [...]
  },
  speakerNotes: 'Highlight the 34% increase in Enterprise ARR during Q3.'
};`
    },
    {
      id: 4,
      title: '4. Interactive Presentation & Customization',
      icon: Presentation,
      color: '#38bdf8',
      summary: 'Displays slides in an interactive viewer with full-screen presenter mode, theme switching, and live deck editing.',
      details: [
        'Presenter Mode: Enter distraction-free full-screen mode with keyboard arrow navigation and timer controls.',
        'Theme Engine: Toggle between Midnight Glow, Clean Light, Corporate Navy, Emerald Dark, and Warm Editorial themes.',
        'Interactive Navigation: Click slide thumbnails, reorder slides, and toggle speaker notes visibility dynamically.',
        'Exporting Options: Copy presentation content, export summary insights, or export visual layouts.'
      ],
      codeSnippet: `// Interactive Slide Renderer
<SlideViewer
  presentation={generatedPresentation}
  theme={currentTheme}
  activeSlideIndex={currentIndex}
  isFullScreen={presenterMode}
/>`
    }
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-10 animate-fadeIn py-4">
      {/* Top Banner */}
      <div className="glass p-8 sm:p-10 rounded-3xl border border-white/10 text-center relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#38bdf8]/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#baa3ff]/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#38bdf8]/10 border border-[#38bdf8]/30 text-[#8ed5ff] text-xs font-mono-code mb-4">
          <Workflow className="w-3.5 h-3.5 text-[#44e2cd]" />
          <span>APPLICATION ARCHITECTURE & WORKFLOW</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
          How <span className="bg-gradient-to-r from-[#8ed5ff] via-[#44e2cd] to-[#baa3ff] bg-clip-text text-transparent">Glance Works</span>
        </h1>
        <p className="text-sm sm:text-base text-[#bdc8d1] max-w-2xl mx-auto leading-relaxed">
          Learn how Glance transforms raw enterprise documents into visual presentation decks through a client-side parsing pipeline and intelligent layout synthesis engine.
        </p>
      </div>

      {/* Interactive Step Navigator */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <Zap className="w-5 h-5 text-[#38bdf8]" />
            <span>The 4-Step Processing Pipeline</span>
          </h2>
          <span className="text-xs text-[#bdc8d1] font-mono-code">Click any step to inspect technical details</span>
        </div>

        {/* Step Selector Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {steps.map((step) => {
            const IconComponent = step.icon;
            const isActive = activeStep === step.id;
            return (
              <button
                key={step.id}
                onClick={() => setActiveStep(step.id)}
                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                  isActive
                    ? 'bg-[#1e293b] border-[#38bdf8] shadow-lg shadow-[#38bdf8]/10 ring-1 ring-[#38bdf8]/50'
                    : 'glass border-white/5 hover:border-white/20 hover:bg-[#171f33]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className="font-mono-code text-xs font-bold"
                    style={{ color: isActive ? '#8ed5ff' : '#bdc8d1' }}
                  >
                    STEP 0{step.id}
                  </span>
                  <div
                    className="w-8 h-8 rounded-xl flex items-center justify-center"
                    style={{
                      backgroundColor: `${step.color}15`,
                      color: step.color,
                    }}
                  >
                    <IconComponent className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-xs font-semibold text-white line-clamp-1">
                  {step.title.split('. ')[1]}
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Step Detail Panel */}
        {(() => {
          const current = steps.find((s) => s.id === activeStep) || steps[0];
          const StepIcon = current.icon;
          return (
            <div className="glass p-7 sm:p-8 rounded-3xl border border-white/10 space-y-6 animate-fadeIn">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
                <div className="flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
                    style={{
                      backgroundColor: `${current.color}18`,
                      color: current.color,
                      border: `1px solid ${current.color}30`,
                    }}
                  >
                    <StepIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <span
                      className="text-xs font-mono-code uppercase tracking-wider block"
                      style={{ color: current.color }}
                    >
                      Pipeline Stage 0{current.id}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                      {current.title}
                    </h3>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono-code text-[#bdc8d1]">
                  Status: Active Engine
                </span>
              </div>

              <p className="text-sm text-[#8ed5ff] font-medium leading-relaxed bg-[#38bdf8]/5 p-4 rounded-xl border border-[#38bdf8]/20">
                {current.summary}
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Key Execution Highlights */}
                <div className="space-y-3">
                  <h4 className="text-xs font-mono-code text-[#bdc8d1] uppercase tracking-wider flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#44e2cd]" />
                    <span>Execution Highlights</span>
                  </h4>
                  <ul className="space-y-2.5">
                    {current.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-[#bdc8d1] leading-relaxed">
                        <ChevronRight className="w-4 h-4 shrink-0 mt-0.5" style={{ color: current.color }} />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Conceptual Code Snippet */}
                <div className="space-y-3">
                  <h4 className="text-xs font-mono-code text-[#bdc8d1] uppercase tracking-wider flex items-center gap-2">
                    <Code2 className="w-4 h-4 text-[#baa3ff]" />
                    <span>Engine Code Architecture</span>
                  </h4>
                  <pre className="p-4 rounded-xl bg-[#0b1326] border border-white/10 font-mono-code text-[11px] text-[#8ed5ff] overflow-x-auto leading-relaxed">
                    <code>{current.codeSnippet}</code>
                  </pre>
                </div>
              </div>
            </div>
          );
        })()}
      </div>

      {/* High-Level Architecture Grid */}
      <div className="space-y-4">
        <div className="text-center space-y-1">
          <h3 className="text-lg font-bold text-white tracking-tight">Platform Technical Architecture</h3>
          <p className="text-xs text-[#bdc8d1]">Designed for high reliability, zero server latency, and data security</p>
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          <div className="glass p-6 rounded-2xl border border-white/5 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#38bdf8]/10 text-[#8ed5ff] flex items-center justify-center border border-[#38bdf8]/20">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-white">100% Client-Side Privacy</h4>
            <p className="text-xs text-[#bdc8d1] leading-relaxed">
              Documents are processed directly inside your browser memory. Your confidential files never touch external storage or third-party servers.
            </p>
          </div>

          <div className="glass p-6 rounded-2xl border border-white/5 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#44e2cd]/10 text-[#44e2cd] flex items-center justify-center border border-[#44e2cd]/20">
              <Layers className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-white">Modular Layout Engine</h4>
            <p className="text-xs text-[#bdc8d1] leading-relaxed">
              Supports 12+ presentation slide types ranging from metric callouts, timeline cards, quote blocks, to complex stacked bar charts and treemaps.
            </p>
          </div>

          <div className="glass p-6 rounded-2xl border border-white/5 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#baa3ff]/10 text-[#baa3ff] flex items-center justify-center border border-[#baa3ff]/20">
              <Zap className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-white">Instant Rendering</h4>
            <p className="text-xs text-[#bdc8d1] leading-relaxed">
              Generates beautiful, fully formatted presentations in less than 500ms with zero loading spinners or rendering delays.
            </p>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="glass p-6 sm:p-8 rounded-2xl border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-white">Experience the pipeline in action</h3>
          <p className="text-xs sm:text-sm text-[#bdc8d1]">Try uploading a document or selecting a sample report to build your deck.</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => onNavigate('About')}
            className="px-4 py-2.5 rounded-xl bg-[#171f33] border border-white/10 text-xs font-semibold text-[#8ed5ff] hover:bg-[#222a3d] transition-colors"
          >
            About Glance
          </button>
          <button
            onClick={() => onNavigate('Deck')}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#38bdf8] to-[#44e2cd] text-[#00354a] font-bold text-xs flex items-center gap-2 hover:brightness-110 transition-all shadow-md shadow-[#38bdf8]/20"
          >
            <span>Launch Deck Builder</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
