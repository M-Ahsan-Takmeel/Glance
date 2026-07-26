import React, { useState } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { BottomNav } from './components/BottomNav';
import { SearchModal } from './components/SearchModal';
import { InsightsView } from './components/InsightsView';
import { ExplorerView } from './components/ExplorerView';
import { DashboardView } from './components/DashboardView';
import { AboutView } from './components/AboutView';
import { WorkingView } from './components/WorkingView';
import { UploadSection } from './components/UploadSection';
import { StyleSelector } from './components/StyleSelector';
import { SlideViewer } from './components/SlideViewer';
import { HowItWorksModal } from './components/HowItWorksModal';
import { ExportModal } from './components/ExportModal';
import { ParsedDocResult, parseDocxFile } from './lib/docxParser';
import { ActiveTab, StyleIntent, PresentationData, SampleDoc } from './types';
import { SAMPLE_DOCS } from './lib/sampleDocs';
import { Sparkles, ArrowRight, Loader2, RefreshCw, FileText, CheckCircle } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('Deck');
  const [parsedDoc, setParsedDoc] = useState<ParsedDocResult | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<StyleIntent>('Executive Summary');
  const [targetSlideCount, setTargetSlideCount] = useState<string>('Auto');
  const [tone, setTone] = useState<string>('Professional & Engaging');

  const [presentation, setPresentation] = useState<PresentationData | null>({
    title: 'Q3 2026 Executive Performance & Intelligence Deck',
    subtitle: 'Interactive Document Deck powered by Glance',
    overview: 'This interactive deck demonstrates how Glance analyzes document data and renders findings into rich visual components including Stacked Bar Charts, Treemaps, Histograms, Box Plots, and Graphs.',
    styleUsed: 'Executive Glance Deck',
    slides: [
      {
        id: 'slide-1',
        type: 'title',
        heading: 'Q3 2026 Executive Performance & Intelligence Deck',
        subheading: 'Interactive Document Deck powered by Glance',
        speakerNotes: 'Welcome to the Glance interactive deck viewer. Use arrow keys or on-screen controls to navigate.',
      },
      {
        id: 'slide-2',
        type: 'heading_summary',
        heading: 'Executive Summary & Operational Overview',
        subheading: 'Core document section synthesis',
        headingSummary: {
          sectionHeading: 'Executive Performance & Operational Momentum',
          summaryText: 'In Q3 2026, the company achieved total ARR of $8.4M representing +42% YoY expansion, driven by 18 new enterprise accounts, platform automation, and SOC2 Type II certification.',
          keyPoints: [
            'Net New ARR reached $2.1M in Q3 2026.',
            'Customer onboarding latency reduced from 14 days down to 3.2 days.',
            'Gross profit margin expanded from 72% to 78.5%.',
          ],
          metricsCallout: { label: 'ARR Expansion', value: '$8.4M ARR (+42%)' },
        },
        speakerNotes: 'Focus on the operational turnaround and ARR growth metrics.',
      },
      {
        id: 'slide-3',
        type: 'stacked_bar',
        heading: 'Quarterly Revenue Breakdown by Channel',
        subheading: 'Stacked Bar Chart showing revenue distribution across Direct, Partner, and Enterprise channels',
        stackedBar: {
          categories: ['Q1', 'Q2', 'Q3', 'Q4 (Proj)'],
          keys: ['Direct Sales', 'Partner Channel', 'Enterprise Tier'],
          data: [
            { name: 'Q1', 'Direct Sales': 45, 'Partner Channel': 25, 'Enterprise Tier': 20 },
            { name: 'Q2', 'Direct Sales': 52, 'Partner Channel': 30, 'Enterprise Tier': 28 },
            { name: 'Q3', 'Direct Sales': 60, 'Partner Channel': 42, 'Enterprise Tier': 38 },
            { name: 'Q4 (Proj)', 'Direct Sales': 78, 'Partner Channel': 55, 'Enterprise Tier': 48 },
          ],
          unit: '$k',
        },
        keyTakeaway: 'Enterprise tier and partner channels drove 65% of net new growth in Q3.',
      },
      {
        id: 'slide-4',
        type: 'treemap',
        heading: 'Resource & Budget Allocation Hierarchy',
        subheading: 'Treemap visualization of capital weight across operational divisions',
        treemapData: [
          { name: 'Cloud Infrastructure', size: 420, category: 'Engineering' },
          { name: 'Enterprise Sales Capacity', size: 310, category: 'Revenue' },
          { name: 'Security & Compliance (SOC2)', size: 240, category: 'Ops' },
          { name: 'Product Engineering (v3.2)', size: 190, category: 'R&D' },
          { name: 'Customer Success', size: 130, category: 'Retention' },
          { name: 'Legal & IP Strategy', size: 90, category: 'Legal' },
        ],
        keyTakeaway: 'Infrastructure and Enterprise Sales represent over 50% of total operational expenditure.',
      },
      {
        id: 'slide-5',
        type: 'pie_chart',
        heading: 'Customer Market Segment Distribution',
        subheading: 'Donut & Pie Chart breakdown of revenue contribution by customer tier',
        pieData: [
          { name: 'Enterprise Tier', value: 45 },
          { name: 'Mid-Market Growth', value: 30 },
          { name: 'Strategic Accounts', value: 15 },
          { name: 'Emerging Verticals', value: 10 },
        ],
        keyTakeaway: 'Enterprise Tier accounts now represent 45% of customer portfolio value.',
      },
      {
        id: 'slide-6',
        type: 'histogram',
        heading: 'Customer Onboarding Latency Distribution',
        subheading: 'Histogram frequency distribution across client onboarding turnaround (days)',
        histogramData: [
          { bin: '1-3 days', frequency: 54, label: 'Automated Cohort' },
          { bin: '4-7 days', frequency: 28, label: 'Standard Cohort' },
          { bin: '8-14 days', frequency: 12, label: 'Custom Security Cohort' },
          { bin: '15+ days', frequency: 6, label: 'Legacy Cohort' },
        ],
        keyTakeaway: 'Over 54% of new enterprise accounts complete onboarding in under 3 days.',
      },
      {
        id: 'slide-7',
        type: 'box_plot',
        heading: 'Contract Tenure & Deal Cycle Statistical Dispersion',
        subheading: '5-Number summary box plot (Min, Q1, Median, Q3, Max) for enterprise operations',
        boxPlotData: [
          { category: 'Contract Tenure', min: 6, q1: 12, median: 24, q3: 36, max: 48, unit: 'months' },
          { category: 'Deal Cycle Latency', min: 5, q1: 14, median: 28, q3: 42, max: 60, unit: 'days' },
          { category: 'Legal Turnaround', min: 1, q1: 3, median: 6, q3: 10, max: 18, unit: 'days' },
        ],
        keyTakeaway: 'Median contract tenure is 24 months, with median deal cycle closing in 28 days.',
      },
      {
        id: 'slide-8',
        type: 'graph',
        heading: '6-Month ARR Growth Trajectory vs Target',
        subheading: 'Line / Area graph tracking monthly recurring revenue trajectory ($M)',
        graphData: [
          { name: 'May', value: 6.2, target: 6.0 },
          { name: 'Jun', value: 6.8, target: 6.5 },
          { name: 'Jul', value: 7.3, target: 7.0 },
          { name: 'Aug', value: 7.8, target: 7.5 },
          { name: 'Sep', value: 8.4, target: 8.0 },
          { name: 'Oct (Proj)', value: 9.1, target: 8.5 },
        ],
        keyTakeaway: 'Actual ARR consistently outperformed target trajectories across all 6 consecutive months.',
      },
      {
        id: 'slide-9',
        type: 'bullets',
        heading: 'Strategic Recommendations & Action Plan',
        subheading: 'Key document takeaways and execution points',
        bullets: [
          'Expand enterprise sales capacity from 12 to 18 account executives in Q4.',
          'Accelerate Latin America and APAC regional infrastructure deployments.',
          'Scale automated SOC2 compliance suite for instant buyer verification.',
          'Launch AI Collaborative Canvas feature set in Q4 2026.',
        ],
        keyTakeaway: 'Maintaining 40%+ annual growth requires scaling sales capacity and expanding regional infrastructure.',
      },
    ],
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const [showHowItWorks, setShowHowItWorks] = useState(false);
  const [showExport, setShowExport] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);

  const handleParseFile = async (file: File) => {
    try {
      setError(null);
      const result = await parseDocxFile(file);
      setParsedDoc(result);
    } catch (err: any) {
      setError(err.message || 'Failed to parse file.');
    }
  };

  const handleGenerate = async (docToUse?: ParsedDocResult) => {
    const targetDoc = docToUse || parsedDoc;
    if (!targetDoc || !targetDoc.text || typeof targetDoc.text !== 'string' || targetDoc.text.trim().length === 0) {
      setError('Document text is empty or invalid. Please upload or select a document with text content.');
      return;
    }

    if (docToUse) {
      setParsedDoc(docToUse);
    }

    setIsGenerating(true);
    setError(null);
    setLoadingStep(0);

    const steps = [
      'Extracting document hierarchy...',
      'Distilling key takeaways & metrics...',
      `Applying "${selectedStyle}" design layout...`,
      'Generating visual slide schema...',
    ];

    const interval = setInterval(() => {
      setLoadingStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 1800);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: targetDoc.text,
          filename: targetDoc.filename,
          style: selectedStyle,
          targetSlideCount,
          tone,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to generate presentation slides.');
      }

      setPresentation(data.presentation);
    } catch (err: any) {
      console.error('Generation failed:', err);
      setError(err.message || 'Error communicating with AI service. Please try again.');
    } finally {
      clearInterval(interval);
      setIsGenerating(false);
    }
  };

  const handleReset = () => {
    setParsedDoc(null);
    setPresentation(null);
    setError(null);
  };

  const handleSelectSampleDocFromSearch = (doc: SampleDoc) => {
    const parsed: ParsedDocResult = {
      text: doc.content,
      filename: doc.filename,
      wordCount: doc.wordCount,
      charCount: doc.content.length,
      headings: [doc.title],
    };
    setParsedDoc(parsed);
    setActiveTab('Deck');
    handleGenerate(parsed);
  };

  const loadingStepsList = [
    'Extracting document hierarchy...',
    'Distilling key takeaways & metrics...',
    `Applying "${selectedStyle}" design layout...`,
    'Generating visual slide schema...',
  ];

  return (
    <div className="min-h-screen bg-[#0b1326] text-[#dae2fd] flex flex-col font-sans selection:bg-[#38bdf8]/30 selection:text-[#8ed5ff]">
      {/* Top Header Bar */}
      <Header
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        onOpenSearch={() => setShowSearchModal(true)}
      />

      <div className="flex min-h-[calc(100vh-4rem)] relative">
        {/* Desktop Collapsible Sidebar */}
        <Sidebar activeTab={activeTab} onSelectTab={setActiveTab} />

        {/* Main Content Area */}
        <main className="flex-1 lg:ml-[280px] px-4 md:px-8 py-6 pb-24 bg-[#0b1326]">
          {activeTab === 'About' && (
            <AboutView onNavigate={setActiveTab} />
          )}

          {activeTab === 'Working' && (
            <WorkingView onNavigate={setActiveTab} />
          )}

          {activeTab === 'Insights' && (
            <InsightsView onNavigateToPresent={() => setActiveTab('Deck')} />
          )}

          {activeTab === 'Dashboard' && (
            <DashboardView
              parsedDoc={parsedDoc}
              onDocParsed={(doc) => {
                setParsedDoc(doc);
                setError(null);
              }}
              onClearDoc={() => setParsedDoc(null)}
              isLoading={isGenerating}
              error={error}
              setError={setError}
              onParseFile={handleParseFile}
              onNavigateToPresent={() => setActiveTab('Deck')}
              onNavigateToInsights={() => setActiveTab('Insights')}
              onGenerateDeck={async () => {
                setActiveTab('Deck');
                await handleGenerate();
              }}
            />
          )}

          {activeTab === 'Explorer' && (
            <ExplorerView
              onSelectDocForPresent={(doc) => {
                setParsedDoc(doc);
                setActiveTab('Deck');
                handleGenerate(doc);
              }}
              onNavigateToPresent={() => setActiveTab('Deck')}
            />
          )}

          {activeTab === 'Deck' && (
            <div className="space-y-6">
              {!presentation ? (
                /* Input & Configuration Stage */
                <div className="max-w-4xl mx-auto w-full space-y-8 animate-fadeIn">
                  {/* Hero Banner */}
                  <div className="text-center space-y-3 glass p-8 rounded-2xl border border-white/10">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#38bdf8]/10 border border-[#38bdf8]/30 text-[#8ed5ff] text-xs font-mono-code shadow-inner">
                      <Sparkles className="w-3.5 h-3.5 text-[#44e2cd]" />
                      <span>Zero Manual Slide Design • 100% In-Browser Document Parsing</span>
                    </div>
                    <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
                      Turn Word Docs into <br />
                      <span className="bg-gradient-to-r from-[#8ed5ff] via-[#44e2cd] to-[#baa3ff] bg-clip-text text-transparent">
                        Interactive Visual Presentations
                      </span>
                    </h1>
                    <p className="text-xs sm:text-sm text-[#bdc8d1] max-w-2xl mx-auto leading-relaxed">
                      Upload any Word report, proposal, or strategy paper. DocMaster AI extracts structural semantics and restructures paragraphs into crisp, presentable slides.
                    </p>
                  </div>

                  {/* Document Upload Zone */}
                  <UploadSection
                    parsedDoc={parsedDoc}
                    onDocParsed={(doc) => {
                      setParsedDoc(doc);
                      setError(null);
                    }}
                    onClearDoc={() => setParsedDoc(null)}
                    isLoading={isGenerating}
                    error={error}
                    setError={setError}
                    onParseFile={handleParseFile}
                  />

                  {/* Style Intent Selector */}
                  {parsedDoc && (
                    <div className="space-y-6 animate-fadeIn glass p-6 rounded-2xl border border-white/10">
                      <StyleSelector
                        selectedStyle={selectedStyle}
                        onSelectStyle={setSelectedStyle}
                        targetSlideCount={targetSlideCount}
                        onSelectSlideCount={setTargetSlideCount}
                        tone={tone}
                        onSelectTone={setTone}
                      />

                      {/* Generate Action Button */}
                      <div className="pt-2 flex flex-col items-center gap-2">
                        <button
                          onClick={handleGenerate}
                          disabled={isGenerating}
                          className="w-full sm:w-auto px-10 py-4 rounded-xl bg-gradient-to-r from-[#38bdf8] to-[#44e2cd] text-[#00354a] font-bold text-sm shadow-xl shadow-[#38bdf8]/20 hover:opacity-95 hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 flex items-center justify-center gap-3 cursor-pointer disabled:opacity-50"
                        >
                          {isGenerating ? (
                            <>
                              <Loader2 className="w-5 h-5 animate-spin" />
                              <span>Restructuring Document...</span>
                            </>
                          ) : (
                            <>
                              <Sparkles className="w-5 h-5 text-[#00354a]" />
                              <span>Generate Visual Slide Presentation</span>
                              <ArrowRight className="w-5 h-5" />
                            </>
                          )}
                        </button>

                        <p className="font-mono-code text-[11px] text-[#bdc8d1]/60">
                          Takes ~8-10 seconds • Powered by Gemini AI
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Loading Modal */}
                  {isGenerating && (
                    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md p-6 flex flex-col items-center justify-center">
                      <div className="max-w-md w-full bg-[#131b2e] border border-white/15 rounded-2xl p-8 text-center space-y-6 shadow-2xl">
                        <div className="relative w-16 h-16 mx-auto">
                          <div className="absolute inset-0 rounded-full border-4 border-[#38bdf8]/20 animate-ping" />
                          <div className="w-16 h-16 rounded-full bg-[#38bdf8]/20 border-2 border-[#38bdf8] flex items-center justify-center text-[#8ed5ff]">
                            <Loader2 className="w-8 h-8 animate-spin" />
                          </div>
                        </div>

                        <div>
                          <h3 className="font-bold text-lg text-white">DocMaster AI is Restructuring</h3>
                          <p className="text-xs text-[#bdc8d1] mt-1">
                            Translating raw paragraphs into visual slides matching{' '}
                            <span className="text-[#8ed5ff] font-semibold">{selectedStyle}</span>
                          </p>
                        </div>

                        <div className="space-y-2 text-left bg-[#0b1326] p-4 rounded-xl border border-white/10 text-xs font-mono-code">
                          {loadingStepsList.map((stepMsg, idx) => (
                            <div
                              key={idx}
                              className={`flex items-center gap-2.5 transition-opacity duration-300 ${
                                idx === loadingStep
                                  ? 'text-[#8ed5ff] font-bold'
                                  : idx < loadingStep
                                  ? 'text-[#44e2cd]'
                                  : 'text-[#bdc8d1]/40'
                              }`}
                            >
                              {idx < loadingStep ? (
                                <CheckCircle className="w-4 h-4 text-[#44e2cd] shrink-0" />
                              ) : idx === loadingStep ? (
                                <Loader2 className="w-4 h-4 text-[#38bdf8] animate-spin shrink-0" />
                              ) : (
                                <div className="w-4 h-4 rounded-full border border-white/20 shrink-0" />
                              )}
                              <span>{stepMsg}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                /* Generated Interactive Presentation Viewer */
                <div className="space-y-6 animate-fadeIn">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl bg-[#171f33] border border-white/10">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#38bdf8]/20 text-[#8ed5ff] border border-[#38bdf8]/30 flex items-center justify-center">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono-code text-[11px] font-bold uppercase tracking-wider text-[#8ed5ff]">
                            {presentation.styleUsed || selectedStyle}
                          </span>
                          <span className="text-xs text-[#bdc8d1]/40">•</span>
                          <span className="text-xs text-[#bdc8d1]">
                            Source: {parsedDoc?.filename || 'Uploaded Document'}
                          </span>
                        </div>
                        <h2 className="text-base font-bold text-white line-clamp-1">
                          {presentation.title}
                        </h2>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 w-full sm:w-auto">
                      <button
                        onClick={handleReset}
                        className="px-3.5 py-2 rounded-xl bg-[#222a3d] hover:bg-[#2d3449] text-white text-xs font-medium border border-white/10 transition flex items-center gap-1.5 cursor-pointer"
                      >
                        <RefreshCw className="w-3.5 h-3.5 text-[#8ed5ff]" />
                        <span>Regenerate / New Doc</span>
                      </button>
                    </div>
                  </div>

                  <SlideViewer
                    presentation={presentation}
                    onUpdatePresentation={setPresentation}
                    onOpenExport={() => setShowExport(true)}
                  />
                </div>
              )}
            </div>
          )}
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <BottomNav activeTab={activeTab} onSelectTab={setActiveTab} />

      {/* Search Modal */}
      <SearchModal
        isOpen={showSearchModal}
        onClose={() => setShowSearchModal(false)}
        onSelectDoc={handleSelectSampleDocFromSearch}
      />

      {/* How It Works & Export Modals */}
      <HowItWorksModal isOpen={showHowItWorks} onClose={() => setShowHowItWorks(false)} />
      {presentation && (
        <ExportModal
          isOpen={showExport}
          onClose={() => setShowExport(false)}
          presentation={presentation}
        />
      )}
    </div>
  );
}
