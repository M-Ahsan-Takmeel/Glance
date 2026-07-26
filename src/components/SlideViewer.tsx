import React, { useState, useEffect, useCallback } from 'react';
import { PresentationData, Slide, PresentationTheme } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  Grid,
  FileText,
  Edit3,
  Check,
  Palette,
  Sparkles,
  Share2,
  Quote,
  TrendingUp,
  Award,
  BookOpen,
  BarChart3,
  PieChart as PieIcon,
  Layers,
  Activity,
  BoxSelect,
  HelpCircle,
  FileSpreadsheet,
} from 'lucide-react';

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  LineChart,
  Line,
} from 'recharts';

interface SlideViewerProps {
  presentation: PresentationData;
  onUpdatePresentation: (updated: PresentationData) => void;
  onOpenExport: () => void;
}

const CHART_COLORS = ['#38bdf8', '#44e2cd', '#baa3ff', '#f472b6', '#fbbf24', '#34d399', '#818cf8'];

/* -------------------------------------------------------------------------- */
/*                            CHART RENDERER HELPERS                          */
/* -------------------------------------------------------------------------- */

// 1. Stacked Bar Chart Renderer
const StackedBarRenderer: React.FC<{ slide: Slide }> = ({ slide }) => {
  const sb = slide.stackedBar || {
    categories: ['Q1', 'Q2', 'Q3', 'Q4'],
    keys: ['Direct Sales', 'Partner Channel', 'Enterprise Tier'],
    data: [
      { name: 'Q1', 'Direct Sales': 45, 'Partner Channel': 25, 'Enterprise Tier': 20 },
      { name: 'Q2', 'Direct Sales': 52, 'Partner Channel': 30, 'Enterprise Tier': 28 },
      { name: 'Q3', 'Direct Sales': 60, 'Partner Channel': 42, 'Enterprise Tier': 38 },
      { name: 'Q4', 'Direct Sales': 78, 'Partner Channel': 55, 'Enterprise Tier': 48 },
    ],
    unit: '$k',
  };

  const keys = sb.keys || ['Series 1', 'Series 2'];
  const data = sb.data && sb.data.length > 0 ? sb.data : [
    { name: 'Cat A', 'Series 1': 40, 'Series 2': 24 },
    { name: 'Cat B', 'Series 1': 55, 'Series 2': 32 },
  ];

  return (
    <div className="space-y-4 w-full">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div>
          <span className="font-mono-code text-xs font-bold text-[#8ed5ff] uppercase tracking-wider flex items-center gap-1.5">
            <BarChart3 className="w-4 h-4 text-[#38bdf8]" /> Stacked Bar Analysis
          </span>
          <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">{slide.heading}</h3>
        </div>
        {sb.unit && (
          <span className="px-2.5 py-1 rounded-md bg-[#38bdf8]/10 text-[#8ed5ff] font-mono-code text-[11px] border border-[#38bdf8]/20">
            Unit: {sb.unit}
          </span>
        )}
      </div>

      <div className="h-64 sm:h-80 w-full bg-[#0b1326]/60 p-4 rounded-2xl border border-white/10">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff15" />
            <XAxis dataKey="name" stroke="#bdc8d1" tick={{ fontSize: 11 }} />
            <YAxis stroke="#bdc8d1" tick={{ fontSize: 11 }} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#131b2e',
                borderColor: '#38bdf840',
                borderRadius: '12px',
                color: '#dae2fd',
                fontSize: '12px',
                boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5)',
              }}
            />
            <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
            {keys.map((key, idx) => (
              <Bar
                key={key}
                dataKey={key}
                stackId="a"
                fill={CHART_COLORS[idx % CHART_COLORS.length]}
                radius={idx === keys.length - 1 ? [6, 6, 0, 0] : [0, 0, 0, 0]}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>

      {slide.subheading && (
        <p className="text-xs text-[#bdc8d1] leading-relaxed bg-white/5 p-3 rounded-xl border border-white/5">
          {slide.subheading}
        </p>
      )}
    </div>
  );
};

// 2. Treemap Renderer
const TreemapRenderer: React.FC<{ slide: Slide }> = ({ slide }) => {
  const data = slide.treemapData && slide.treemapData.length > 0
    ? slide.treemapData
    : [
        { name: 'Cloud Infra', size: 420, category: 'Tech' },
        { name: 'Enterprise Sales', size: 310, category: 'Revenue' },
        { name: 'Security & SOC2', size: 240, category: 'Compliance' },
        { name: 'Product Engineering', size: 190, category: 'R&D' },
        { name: 'Customer Success', size: 130, category: 'Ops' },
        { name: 'Legal & Risk', size: 90, category: 'Legal' },
      ];

  const total = data.reduce((acc, curr) => {
    const itemVal = typeof curr?.size === 'number' ? curr.size : typeof curr?.value === 'number' ? curr.value : Number(curr?.size || curr?.value) || 100;
    return acc + itemVal;
  }, 0);

  return (
    <div className="space-y-4 w-full">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div>
          <span className="font-mono-code text-xs font-bold text-[#44e2cd] uppercase tracking-wider flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-[#44e2cd]" /> Treemap Proportional Hierarchy
          </span>
          <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">{slide.heading}</h3>
        </div>
        <span className="px-2.5 py-1 rounded-md bg-[#44e2cd]/10 text-[#44e2cd] font-mono-code text-[11px] border border-[#44e2cd]/20">
          Proportional Weights
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {data.map((item, idx) => {
          const rawVal = typeof item?.size === 'number' ? item.size : typeof item?.value === 'number' ? item.value : Number(item?.size || item?.value) || 100;
          const val = typeof rawVal === 'number' && !isNaN(rawVal) ? rawVal : 100;
          const pct = total > 0 ? ((val / total) * 100).toFixed(1) : '0';
          const color = item?.color || CHART_COLORS[idx % CHART_COLORS.length];

          return (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.02 }}
              className="p-4 rounded-2xl border border-white/10 bg-[#0b1326]/80 flex flex-col justify-between min-h-[110px] relative overflow-hidden group shadow-lg"
              style={{ borderTop: `3px solid ${color}` }}
            >
              <div
                className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity"
                style={{ backgroundColor: color }}
              />
              <div className="relative z-10 flex justify-between items-start">
                <span className="text-xs font-bold text-white truncate max-w-[80%]">{item?.name || 'Item'}</span>
                <span className="font-mono-code text-[10px] px-1.5 py-0.5 rounded bg-white/10 text-[#bdc8d1]">
                  {pct}%
                </span>
              </div>
              <div className="relative z-10 mt-3 flex items-baseline justify-between">
                <span className="text-xl font-extrabold text-white">{val.toLocaleString()}</span>
                {item?.category && (
                  <span className="text-[10px] font-mono-code text-[#bdc8d1]/70">{item.category}</span>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {slide.keyTakeaway && (
        <div className="p-3.5 rounded-xl bg-[#44e2cd]/10 border border-[#44e2cd]/30 text-xs text-[#dae2fd] font-medium flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#44e2cd] shrink-0" />
          <span><strong>Key Insight:</strong> {slide.keyTakeaway}</span>
        </div>
      )}
    </div>
  );
};

// 3. Pie / Donut Chart Renderer
const PieChartRenderer: React.FC<{ slide: Slide }> = ({ slide }) => {
  const data = slide.pieData && slide.pieData.length > 0
    ? slide.pieData
    : [
        { name: 'Enterprise Market', value: 45 },
        { name: 'Mid-Market Growth', value: 30 },
        { name: 'Partner Channels', value: 15 },
        { name: 'Emerging Verticals', value: 10 },
      ];

  return (
    <div className="space-y-4 w-full">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div>
          <span className="font-mono-code text-xs font-bold text-[#baa3ff] uppercase tracking-wider flex items-center gap-1.5">
            <PieIcon className="w-4 h-4 text-[#baa3ff]" /> Distribution Split
          </span>
          <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">{slide.heading}</h3>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center bg-[#0b1326]/60 p-6 rounded-2xl border border-white/10">
        <div className="md:col-span-6 h-60 w-full relative flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={4}
                dataKey="value"
              >
                {data.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} stroke="#131b2e" strokeWidth={2} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#131b2e',
                  borderColor: '#baa3ff40',
                  borderRadius: '12px',
                  color: '#dae2fd',
                  fontSize: '12px',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute text-center pointer-events-none">
            <span className="text-xs font-mono-code text-[#bdc8d1]">Total</span>
            <div className="text-lg font-bold text-white">100%</div>
          </div>
        </div>

        <div className="md:col-span-6 space-y-3">
          {data.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 hover:border-white/15 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span
                  className="w-3.5 h-3.5 rounded-full shrink-0"
                  style={{ backgroundColor: CHART_COLORS[idx % CHART_COLORS.length] }}
                />
                <span className="text-xs font-medium text-[#dae2fd]">{item.name}</span>
              </div>
              <span className="font-mono-code text-xs font-bold text-white">{item.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// 4. Histogram Renderer
const HistogramRenderer: React.FC<{ slide: Slide }> = ({ slide }) => {
  const bins = slide.histogramData && slide.histogramData.length > 0
    ? slide.histogramData
    : [
        { bin: '0-20', frequency: 18, label: '0-20 ms' },
        { bin: '21-40', frequency: 45, label: '21-40 ms' },
        { bin: '41-60', frequency: 82, label: '41-60 ms' },
        { bin: '61-80', frequency: 34, label: '61-80 ms' },
        { bin: '81-100', frequency: 12, label: '81-100 ms' },
      ];

  return (
    <div className="space-y-4 w-full">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div>
          <span className="font-mono-code text-xs font-bold text-[#38bdf8] uppercase tracking-wider flex items-center gap-1.5">
            <Activity className="w-4 h-4 text-[#38bdf8]" /> Histogram Frequency Distribution
          </span>
          <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">{slide.heading}</h3>
        </div>
        <span className="px-2.5 py-1 rounded-md bg-[#38bdf8]/10 text-[#8ed5ff] font-mono-code text-[11px] border border-[#38bdf8]/20">
          Frequency Bins
        </span>
      </div>

      <div className="h-64 sm:h-80 w-full bg-[#0b1326]/60 p-4 rounded-2xl border border-white/10">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={bins} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff15" />
            <XAxis dataKey="bin" stroke="#bdc8d1" tick={{ fontSize: 11 }} />
            <YAxis stroke="#bdc8d1" tick={{ fontSize: 11 }} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#131b2e',
                borderColor: '#38bdf840',
                borderRadius: '12px',
                color: '#dae2fd',
                fontSize: '12px',
              }}
            />
            <Bar dataKey="frequency" fill="#38bdf8" radius={[8, 8, 0, 0]}>
              {bins.map((_, index) => (
                <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {slide.subheading && (
        <p className="text-xs text-[#bdc8d1] bg-white/5 p-3 rounded-xl border border-white/5">
          {slide.subheading}
        </p>
      )}
    </div>
  );
};

// 5. Box Plot Renderer
const BoxPlotRenderer: React.FC<{ slide: Slide }> = ({ slide }) => {
  const items = slide.boxPlotData && slide.boxPlotData.length > 0
    ? slide.boxPlotData
    : [
        { category: 'Contract Tenure', min: 6, q1: 12, median: 24, q3: 36, max: 48, unit: 'months' },
        { category: 'Deal Cycle Latency', min: 4, q1: 14, median: 28, q3: 42, max: 65, unit: 'days' },
        { category: 'Review Turnaround', min: 1, q1: 3, median: 7, q3: 12, max: 21, unit: 'days' },
      ];

  return (
    <div className="space-y-4 w-full">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div>
          <span className="font-mono-code text-xs font-bold text-[#baa3ff] uppercase tracking-wider flex items-center gap-1.5">
            <BoxSelect className="w-4 h-4 text-[#baa3ff]" /> Statistical Box Plot Dispersion
          </span>
          <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">{slide.heading}</h3>
        </div>
        <span className="px-2.5 py-1 rounded-md bg-[#baa3ff]/10 text-[#baa3ff] font-mono-code text-[11px] border border-[#baa3ff]/20">
          5-Number Summary
        </span>
      </div>

      <div className="space-y-4">
        {items.map((item, idx) => {
          const range = item.max - item.min || 1;
          const q1Pct = ((item.q1 - item.min) / range) * 100;
          const medianPct = ((item.median - item.min) / range) * 100;
          const q3Pct = ((item.q3 - item.min) / range) * 100;

          return (
            <div key={idx} className="p-4 rounded-2xl bg-[#0b1326]/80 border border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-white">{item.category}</span>
                <span className="font-mono-code text-xs text-[#baa3ff]">
                  Median: {item.median} {item.unit || ''}
                </span>
              </div>

              {/* Box Plot Visual Diagram */}
              <div className="relative h-12 w-full flex items-center px-4 bg-white/5 rounded-xl border border-white/5">
                {/* Horizontal Whisker Line */}
                <div className="absolute left-6 right-6 h-0.5 bg-[#bdc8d1]/30" />

                {/* Min Cap */}
                <div className="absolute left-6 h-4 w-1 bg-[#baa3ff] rounded" />

                {/* Max Cap */}
                <div className="absolute right-6 h-4 w-1 bg-[#baa3ff] rounded" />

                {/* Interquartile Range Box (Q1 to Q3) */}
                <div
                  className="absolute h-8 bg-[#baa3ff]/20 border-2 border-[#baa3ff] rounded-md flex items-center justify-center shadow-lg"
                  style={{
                    left: `calc(1.5rem + ${q1Pct * 0.82}%)`,
                    width: `${Math.max((q3Pct - q1Pct) * 0.82, 4)}%`,
                  }}
                >
                  {/* Median Line */}
                  <div className="w-1 h-full bg-[#44e2cd]" />
                </div>
              </div>

              {/* Numerical Metrics Footer */}
              <div className="grid grid-cols-5 text-center font-mono-code text-[10px] text-[#bdc8d1] pt-1 border-t border-white/5">
                <div>Min: <span className="text-white font-bold">{item.min}</span></div>
                <div>Q1: <span className="text-white font-bold">{item.q1}</span></div>
                <div>Median: <span className="text-[#44e2cd] font-bold">{item.median}</span></div>
                <div>Q3: <span className="text-white font-bold">{item.q3}</span></div>
                <div>Max: <span className="text-white font-bold">{item.max}</span></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// 6. Line/Area Graph Renderer
const GraphRenderer: React.FC<{ slide: Slide }> = ({ slide }) => {
  const points = slide.graphData && slide.graphData.length > 0
    ? slide.graphData
    : [
        { name: 'Jan', value: 24, target: 20 },
        { name: 'Feb', value: 32, target: 28 },
        { name: 'Mar', value: 45, target: 35 },
        { name: 'Apr', value: 58, target: 45 },
        { name: 'May', value: 72, target: 55 },
        { name: 'Jun', value: 89, target: 70 },
      ];

  return (
    <div className="space-y-4 w-full">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div>
          <span className="font-mono-code text-xs font-bold text-[#44e2cd] uppercase tracking-wider flex items-center gap-1.5">
            <TrendingUp className="w-4 h-4 text-[#44e2cd]" /> Time Trajectory Graph
          </span>
          <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">{slide.heading}</h3>
        </div>
      </div>

      <div className="h-64 sm:h-80 w-full bg-[#0b1326]/60 p-4 rounded-2xl border border-white/10">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={points} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
            <defs>
              <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#44e2cd" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#44e2cd" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff15" />
            <XAxis dataKey="name" stroke="#bdc8d1" tick={{ fontSize: 11 }} />
            <YAxis stroke="#bdc8d1" tick={{ fontSize: 11 }} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#131b2e',
                borderColor: '#44e2cd40',
                borderRadius: '12px',
                color: '#dae2fd',
                fontSize: '12px',
              }}
            />
            <Area type="monotone" dataKey="value" stroke="#44e2cd" strokeWidth={3} fillOpacity={1} fill="url(#colorVal)" />
            {points[0]?.target !== undefined && (
              <Line type="monotone" dataKey="target" stroke="#baa3ff" strokeDasharray="5 5" strokeWidth={2} dot={false} />
            )}
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {slide.subheading && (
        <p className="text-xs text-[#bdc8d1] bg-white/5 p-3 rounded-xl border border-white/5">
          {slide.subheading}
        </p>
      )}
    </div>
  );
};

// 7. Heading & Summary Card Renderer
const HeadingSummaryRenderer: React.FC<{ slide: Slide }> = ({ slide }) => {
  const hs = slide.headingSummary || {
    sectionHeading: slide.heading,
    summaryText: slide.subheading || 'Document section summary providing a clear executive synthesis of key clauses, terms, and operational frameworks.',
    keyPoints: slide.bullets || [
      'Operational workflow standardized across teams.',
      'Reduced document turnaround time by 65%.',
      'Full compliance verification validated.',
    ],
    metricsCallout: { label: 'Efficiency Gain', value: '+65%' },
  };

  return (
    <div className="space-y-6 w-full max-w-3xl mx-auto">
      <div className="border-b border-white/10 pb-4">
        <span className="font-mono-code text-xs font-bold text-[#8ed5ff] uppercase tracking-wider flex items-center gap-1.5">
          <FileText className="w-4 h-4 text-[#38bdf8]" /> Section Heading & Executive Summary
        </span>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white mt-1">
          {hs.sectionHeading || slide.heading}
        </h2>
      </div>

      <div className="p-6 rounded-2xl bg-[#0b1326]/80 border border-white/10 space-y-4 shadow-xl">
        <p className="text-sm sm:text-base leading-relaxed text-[#dae2fd]/90 border-l-4 border-[#38bdf8] pl-4 font-sans">
          {hs.summaryText}
        </p>

        {hs.metricsCallout && (
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-[#38bdf8]/10 border border-[#38bdf8]/30">
            <span className="text-xs text-[#bdc8d1] font-mono-code">{hs.metricsCallout.label}:</span>
            <span className="text-base font-bold text-[#8ed5ff]">{hs.metricsCallout.value}</span>
          </div>
        )}
      </div>

      {hs.keyPoints && hs.keyPoints.length > 0 && (
        <div className="space-y-2.5">
          <span className="font-mono-code text-xs font-bold text-[#bdc8d1]/70 uppercase">
            Section Bullet Highlights
          </span>
          <div className="grid grid-cols-1 gap-2.5">
            {hs.keyPoints.map((pt, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-white/5 border border-white/5 text-xs sm:text-sm text-[#dae2fd] flex items-center gap-3"
              >
                <div className="w-2 h-2 rounded-full bg-[#38bdf8] shrink-0" />
                <span>{pt}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/*                            MAIN SLIDE VIEWER DECK                           */
/* -------------------------------------------------------------------------- */

export const SlideViewer: React.FC<SlideViewerProps> = ({
  presentation,
  onUpdatePresentation,
  onOpenExport,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [showThumbnails, setShowThumbnails] = useState(false);
  const [theme, setTheme] = useState<PresentationTheme>('midnight');
  const [isEditingSlide, setIsEditingSlide] = useState(false);
  const [editHeading, setEditHeading] = useState('');
  const [editSubheading, setEditSubheading] = useState('');
  const [editNotes, setEditNotes] = useState('');

  const slides = presentation.slides || [];
  const currentSlide: Slide | undefined = slides[currentIndex];

  const handleNext = useCallback(() => {
    if (currentIndex < slides.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  }, [currentIndex, slides.length]);

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  }, [currentIndex]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isEditingSlide) return;
      if (e.key === 'ArrowRight' || e.key === 'Space') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      } else if (e.key === 'f' || e.key === 'F') {
        e.preventDefault();
        setIsFullscreen((prev) => !prev);
      } else if (e.key === 'n' || e.key === 'N') {
        e.preventDefault();
        setShowNotes((prev) => !prev);
      } else if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev, isEditingSlide, isFullscreen]);

  const handleStartEdit = () => {
    if (!currentSlide) return;
    setEditHeading(currentSlide.heading || '');
    setEditSubheading(currentSlide.subheading || '');
    setEditNotes(currentSlide.speakerNotes || '');
    setIsEditingSlide(true);
  };

  const handleSaveEdit = () => {
    if (!currentSlide) return;
    const updatedSlides = [...slides];
    updatedSlides[currentIndex] = {
      ...currentSlide,
      heading: editHeading,
      subheading: editSubheading,
      speakerNotes: editNotes,
    };
    onUpdatePresentation({
      ...presentation,
      slides: updatedSlides,
    });
    setIsEditingSlide(false);
  };

  const themeClasses: Record<PresentationTheme, { container: string; card: string; text: string }> = {
    midnight: {
      container: 'bg-[#0b1326] text-[#dae2fd]',
      card: 'bg-[#131b2e] border-white/10 shadow-2xl',
      text: 'text-white',
    },
    'clean-light': {
      container: 'bg-slate-100 text-slate-900',
      card: 'bg-white border-slate-200 shadow-xl',
      text: 'text-slate-900',
    },
    'corporate-navy': {
      container: 'bg-[#002233] text-slate-50',
      card: 'bg-[#00354a] border-cyan-800/60 shadow-2xl',
      text: 'text-slate-50',
    },
    'emerald-dark': {
      container: 'bg-zinc-950 text-emerald-50',
      card: 'bg-zinc-900/90 border-emerald-950/80 shadow-2xl',
      text: 'text-emerald-50',
    },
    'warm-editorial': {
      container: 'bg-[#1e1310] text-amber-50',
      card: 'bg-[#2b1b16] border-amber-900/40 shadow-2xl',
      text: 'text-amber-50',
    },
  };

  const currentTheme = themeClasses[theme];

  if (!currentSlide) {
    return <div className="p-8 text-center text-[#bdc8d1]">No visual deck cards available.</div>;
  }

  return (
    <div
      className={`relative min-h-[620px] rounded-2xl flex flex-col justify-between overflow-hidden transition-colors duration-300 select-none ${
        currentTheme.container
      } ${isFullscreen ? 'fixed inset-0 z-50 rounded-none h-screen w-screen' : 'w-full shadow-2xl border border-white/10'}`}
    >
      {/* Top Deck Header Toolbar */}
      <div className="p-4 sm:p-6 flex items-center justify-between border-b border-white/10 z-10">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#38bdf8] animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#8ed5ff]">
              Glance Deck • {presentation.title || 'Document Visuals'}
            </span>
          </div>

          <span className="text-xs opacity-40">|</span>

          {/* Theme Selector Dropdown */}
          <div className="flex items-center gap-1 bg-white/5 border border-white/10 rounded-lg p-1">
            <Palette className="w-3.5 h-3.5 text-[#8ed5ff] ml-1" />
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value as PresentationTheme)}
              className="bg-transparent text-xs text-[#dae2fd] focus:outline-none cursor-pointer pr-1"
            >
              <option value="midnight" className="bg-[#0b1326] text-white">Midnight Slate</option>
              <option value="clean-light" className="bg-white text-slate-900">Clean Light</option>
              <option value="corporate-navy" className="bg-[#002233] text-white">Corporate Navy</option>
              <option value="emerald-dark" className="bg-zinc-950 text-emerald-100">Forest Emerald</option>
              <option value="warm-editorial" className="bg-[#1e1310] text-amber-100">Warm Editorial</option>
            </select>
          </div>
        </div>

        {/* Top Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleStartEdit}
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition text-xs flex items-center gap-1.5"
            title="Edit Card"
          >
            <Edit3 className="w-3.5 h-3.5 text-[#8ed5ff]" />
            <span className="hidden sm:inline">Edit Card</span>
          </button>

          <button
            onClick={() => setShowNotes(!showNotes)}
            className={`p-2 rounded-lg border transition text-xs flex items-center gap-1.5 ${
              showNotes
                ? 'bg-[#38bdf8] text-[#00354a] font-bold border-[#38bdf8]'
                : 'bg-white/5 hover:bg-white/10 border-white/10'
            }`}
            title="Presenter Notes (N)"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Notes</span>
          </button>

          <button
            onClick={() => setShowThumbnails(!showThumbnails)}
            className={`p-2 rounded-lg border transition text-xs flex items-center gap-1.5 ${
              showThumbnails
                ? 'bg-[#38bdf8] text-[#00354a] font-bold border-[#38bdf8]'
                : 'bg-white/5 hover:bg-white/10 border-white/10'
            }`}
            title="All Cards Overview"
          >
            <Grid className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">All Cards ({slides.length})</span>
          </button>

          <button
            onClick={onOpenExport}
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition text-xs flex items-center gap-1.5"
            title="Export Deck"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Export</span>
          </button>

          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition"
            title="Toggle Fullscreen (F)"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Main Slide Card Stage */}
      <div className="relative flex-1 p-6 sm:p-10 flex flex-col justify-center items-center max-w-5xl mx-auto w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide.id + currentIndex}
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="w-full"
          >
            {/* Slide Type 1: Title Card */}
            {currentSlide.type === 'title' && (
              <div className="text-center space-y-6 max-w-3xl mx-auto">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest bg-[#38bdf8]/10 text-[#8ed5ff] border border-[#38bdf8]/30">
                  <Sparkles className="w-3.5 h-3.5 text-[#44e2cd]" />
                  {presentation.styleUsed || 'Executive Glance Deck'}
                </span>

                <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
                  {currentSlide.heading}
                </h1>

                {currentSlide.subheading && (
                  <p className="text-base sm:text-xl font-medium opacity-80 max-w-2xl mx-auto leading-relaxed">
                    {currentSlide.subheading}
                  </p>
                )}

                {presentation.overview && (
                  <div className={`p-6 rounded-2xl ${currentTheme.card} text-left mt-6`}>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#8ed5ff] mb-2">
                      Document Executive Overview
                    </h4>
                    <p className="text-sm leading-relaxed opacity-90">{presentation.overview}</p>
                  </div>
                )}
              </div>
            )}

            {/* Slide Type 2: Heading & Summary */}
            {currentSlide.type === 'heading_summary' && (
              <HeadingSummaryRenderer slide={currentSlide} />
            )}

            {/* Slide Type 3: Bullets & Key Points */}
            {currentSlide.type === 'bullets' && (
              <div className="space-y-6 w-full">
                <div className="space-y-2 border-b border-white/10 pb-4">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#8ed5ff]">
                    Key Takeaways & Points
                  </span>
                  <h2 className="text-2xl sm:text-4xl font-bold tracking-tight">
                    {currentSlide.heading}
                  </h2>
                  {currentSlide.subheading && (
                    <p className="text-sm opacity-75">{currentSlide.subheading}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 gap-3 sm:gap-4 mt-4">
                  {(currentSlide.bullets || []).map((bullet, idx) => (
                    <div
                      key={idx}
                      className={`p-4 sm:p-5 rounded-xl ${currentTheme.card} flex items-start gap-4 transition hover:translate-x-1 duration-200`}
                    >
                      <div className="w-7 h-7 rounded-lg bg-[#38bdf8]/20 text-[#8ed5ff] border border-[#38bdf8]/30 flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">
                        {idx + 1}
                      </div>
                      <p className="text-sm sm:text-base leading-relaxed opacity-95">{bullet}</p>
                    </div>
                  ))}
                </div>

                {currentSlide.keyTakeaway && (
                  <div className="p-4 rounded-xl bg-[#38bdf8]/10 border border-[#38bdf8]/30 text-[#8ed5ff] text-xs sm:text-sm font-medium flex items-center gap-3">
                    <Award className="w-5 h-5 text-[#44e2cd] shrink-0" />
                    <span>
                      <strong className="text-white">Core Takeaway:</strong> {currentSlide.keyTakeaway}
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* Slide Type 4: Stat / Metric Card */}
            {currentSlide.type === 'stat' && (
              <div className="text-center space-y-6 w-full max-w-3xl mx-auto">
                <span className="text-xs font-bold uppercase tracking-widest text-[#8ed5ff]">
                  Key Performance Metric
                </span>

                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                  {currentSlide.heading}
                </h2>

                <div className={`p-8 sm:p-12 rounded-3xl ${currentTheme.card} relative overflow-hidden border border-white/10`}>
                  <div className="text-5xl sm:text-7xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#8ed5ff] via-[#44e2cd] to-[#baa3ff]">
                    {currentSlide.stat?.value || '100%'}
                  </div>

                  <p className="text-lg sm:text-2xl font-bold mt-3 opacity-90">
                    {currentSlide.stat?.label}
                  </p>

                  {currentSlide.stat?.change && (
                    <div className="inline-flex items-center gap-1.5 mt-4 px-3.5 py-1 rounded-full bg-[#44e2cd]/20 text-[#44e2cd] border border-[#44e2cd]/40 text-xs font-bold">
                      <TrendingUp className="w-4 h-4" />
                      <span>{currentSlide.stat.change}</span>
                    </div>
                  )}

                  {currentSlide.stat?.context && (
                    <p className="text-xs sm:text-sm opacity-70 mt-4 max-w-xl mx-auto">
                      {currentSlide.stat.context}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Slide Type 5: Stacked Bar Chart */}
            {currentSlide.type === 'stacked_bar' && <StackedBarRenderer slide={currentSlide} />}

            {/* Slide Type 6: Treemap */}
            {currentSlide.type === 'treemap' && <TreemapRenderer slide={currentSlide} />}

            {/* Slide Type 7: Pie / Donut Chart */}
            {currentSlide.type === 'pie_chart' && <PieChartRenderer slide={currentSlide} />}

            {/* Slide Type 8: Histogram */}
            {currentSlide.type === 'histogram' && <HistogramRenderer slide={currentSlide} />}

            {/* Slide Type 9: Box Plot */}
            {currentSlide.type === 'box_plot' && <BoxPlotRenderer slide={currentSlide} />}

            {/* Slide Type 10: Graph / Trend Line */}
            {currentSlide.type === 'graph' && <GraphRenderer slide={currentSlide} />}

            {/* Slide Type 11: Grid / Comparison Pillars */}
            {currentSlide.type === 'grid' && (
              <div className="space-y-6 w-full">
                <div className="border-b border-white/10 pb-4">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#8ed5ff]">
                    Comparison Pillars
                  </span>
                  <h2 className="text-2xl sm:text-4xl font-bold tracking-tight mt-1">
                    {currentSlide.heading}
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {(currentSlide.gridItems || []).map((item, idx) => (
                    <div
                      key={idx}
                      className={`p-5 rounded-2xl ${currentTheme.card} space-y-2 border hover:border-[#8ed5ff]/50 transition`}
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-base text-[#8ed5ff]">{item.title}</h4>
                        {item.badge && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#38bdf8]/20 text-[#8ed5ff] border border-[#38bdf8]/30">
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-xs sm:text-sm leading-relaxed opacity-85">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Slide Type 12: Timeline Step */}
            {currentSlide.type === 'timeline_step' && (
              <div className="space-y-6 w-full max-w-3xl mx-auto">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-[#8ed5ff]">
                      Sequential Progress • Phase {currentSlide.timelineStep?.stepNumber || currentIndex + 1}
                    </span>
                    <h2 className="text-2xl sm:text-4xl font-bold tracking-tight mt-1">
                      {currentSlide.heading}
                    </h2>
                  </div>
                  {currentSlide.timelineStep?.phase && (
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#38bdf8]/20 text-[#8ed5ff] border border-[#38bdf8]/40">
                      {currentSlide.timelineStep.phase}
                    </span>
                  )}
                </div>

                <div className={`p-6 sm:p-8 rounded-2xl ${currentTheme.card} space-y-4`}>
                  <h3 className="text-xl font-bold text-[#8ed5ff]">
                    {currentSlide.timelineStep?.title || currentSlide.heading}
                  </h3>
                  <p className="text-sm sm:text-base leading-relaxed opacity-90">
                    {currentSlide.timelineStep?.description || currentSlide.subheading}
                  </p>
                </div>
              </div>
            )}

            {/* Slide Type 13: Quote Card */}
            {currentSlide.type === 'quote' && (
              <div className="text-center space-y-6 w-full max-w-3xl mx-auto">
                <Quote className="w-12 h-12 text-[#8ed5ff] mx-auto opacity-80" />

                <blockquote className="text-2xl sm:text-4xl font-serif italic leading-relaxed tracking-wide opacity-95">
                  "{currentSlide.quote?.text || currentSlide.heading}"
                </blockquote>

                {(currentSlide.quote?.author || currentSlide.quote?.role) && (
                  <div className="mt-4">
                    <p className="font-bold text-base text-[#8ed5ff]">
                      {currentSlide.quote?.author}
                    </p>
                    {currentSlide.quote?.role && (
                      <p className="text-xs opacity-70 mt-0.5">{currentSlide.quote.role}</p>
                    )}
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Speaker Notes Overlay */}
      {showNotes && (
        <div className="mx-6 mb-4 p-4 rounded-xl bg-[#131b2e] border border-[#38bdf8]/40 text-xs shadow-2xl backdrop-blur-md">
          <div className="flex items-center justify-between mb-2 pb-2 border-b border-white/10">
            <span className="font-bold uppercase tracking-wider text-[#8ed5ff] flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Presenter Notes (Card {currentIndex + 1})</span>
            </span>
            <button onClick={() => setShowNotes(false)} className="text-[#bdc8d1] hover:text-white">
              ✕
            </button>
          </div>
          <p className="text-[#dae2fd] leading-relaxed">
            {currentSlide.speakerNotes ||
              'Emphasize the primary strategic takeaways and transition smoothly to the next visual card.'}
          </p>
        </div>
      )}

      {/* Thumbnails Modal */}
      {showThumbnails && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md p-6 flex flex-col justify-center items-center">
          <div className="max-w-5xl w-full bg-[#131b2e] border border-white/15 rounded-2xl p-6 shadow-2xl space-y-4 max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="font-bold text-lg text-white flex items-center gap-2">
                <Grid className="w-5 h-5 text-[#8ed5ff]" />
                <span>All Visual Cards Overview ({slides.length})</span>
              </h3>
              <button
                onClick={() => setShowThumbnails(false)}
                className="p-1.5 rounded-lg bg-white/10 text-white"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 overflow-y-auto p-1 flex-1">
              {slides.map((s, idx) => (
                <div
                  key={s.id || idx}
                  onClick={() => {
                    setCurrentIndex(idx);
                    setShowThumbnails(false);
                  }}
                  className={`p-3 rounded-xl border transition cursor-pointer text-left flex flex-col justify-between h-36 ${
                    idx === currentIndex
                      ? 'bg-[#38bdf8]/20 border-[#38bdf8] ring-2 ring-[#38bdf8]'
                      : 'bg-[#0b1326] border-white/10 hover:border-white/20'
                  }`}
                >
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#8ed5ff]">
                      Card {idx + 1} • {s.type}
                    </span>
                    <h5 className="font-semibold text-xs text-white line-clamp-2 mt-1">
                      {s.heading}
                    </h5>
                  </div>
                  <span className="text-[10px] text-[#bdc8d1]/70 line-clamp-1">
                    {s.subheading || 'Visual deck card'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Quick Edit Modal */}
      {isEditingSlide && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md p-6 flex items-center justify-center">
          <div className="max-w-lg w-full bg-[#131b2e] border border-white/15 rounded-2xl p-6 shadow-2xl space-y-4">
            <h3 className="font-bold text-base text-white flex items-center gap-2">
              <Edit3 className="w-4 h-4 text-[#8ed5ff]" />
              <span>Edit Card {currentIndex + 1} Content</span>
            </h3>

            <div className="space-y-3">
              <div>
                <label className="block text-xs text-[#bdc8d1] mb-1">Card Headline</label>
                <input
                  type="text"
                  value={editHeading}
                  onChange={(e) => setEditHeading(e.target.value)}
                  className="w-full bg-[#0b1326] text-white text-xs rounded-lg border border-white/10 p-2.5 focus:border-[#8ed5ff] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs text-[#bdc8d1] mb-1">Subheading / Context</label>
                <input
                  type="text"
                  value={editSubheading}
                  onChange={(e) => setEditSubheading(e.target.value)}
                  className="w-full bg-[#0b1326] text-white text-xs rounded-lg border border-white/10 p-2.5 focus:border-[#8ed5ff] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs text-[#bdc8d1] mb-1">Presenter Speaking Notes</label>
                <textarea
                  rows={3}
                  value={editNotes}
                  onChange={(e) => setEditNotes(e.target.value)}
                  className="w-full bg-[#0b1326] text-white text-xs rounded-lg border border-white/10 p-2.5 focus:border-[#8ed5ff] focus:outline-none"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setIsEditingSlide(false)}
                className="px-3 py-1.5 rounded-lg text-xs font-medium text-[#bdc8d1] hover:bg-white/5"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                className="px-4 py-1.5 rounded-lg text-xs font-semibold bg-[#38bdf8] text-[#00354a] hover:bg-[#8ed5ff] flex items-center gap-1"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Save Changes</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Control Navigation Bar */}
      <div className="p-4 sm:p-6 border-t border-white/10 flex items-center justify-between z-10">
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 disabled:opacity-30 border border-white/10 transition"
            title="Previous Card (Left Arrow)"
          >
            <ChevronLeft className="w-5 h-5 text-[#8ed5ff]" />
          </button>

          <button
            onClick={handleNext}
            disabled={currentIndex === slides.length - 1}
            className="p-2.5 rounded-xl bg-[#38bdf8] text-[#00354a] hover:bg-[#8ed5ff] disabled:opacity-30 shadow-lg shadow-[#38bdf8]/20 transition flex items-center gap-1.5 font-bold text-xs px-4 cursor-pointer"
            title="Next Card (Right Arrow / Space)"
          >
            <span>Next Card</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Card Counter Indicator */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-[#bdc8d1]">
            Card {currentIndex + 1} of {slides.length}
          </span>
          <div className="hidden sm:flex gap-1">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-1.5 rounded-full transition-all ${
                  idx === currentIndex ? 'w-6 bg-[#38bdf8]' : 'w-1.5 bg-white/20 hover:bg-white/40'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
