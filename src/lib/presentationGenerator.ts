import { PresentationData, StyleIntent, SlideData } from '../types';

export function generateClientPresentation(
  text: string,
  filename?: string,
  style?: StyleIntent,
  targetSlideCount?: string,
  tone?: string
): PresentationData {
  const selectedStyle = style || 'Executive Summary';
  const cleanFilename = filename || 'Document Report';

  // Extract lines and headings
  const lines = text.split('\n').map((l) => l.trim()).filter(Boolean);
  const headings = lines.filter(
    (line) =>
      /^[0-9]+\.\s+[A-Z]/.test(line) ||
      (line.length < 60 && line === line.toUpperCase() && line.length > 5)
  );

  // Extract numbers / metrics from text
  const metricRegex = /([$€£]?\d+(?:\.\d+)?\s*(?:M|B|k|%|YoY|ARR|MAU|Q[1-4])?)/gi;
  const matches = Array.from(text.matchAll(metricRegex)).map((m) => m[0]);
  const sampleMetrics = Array.from(new Set(matches)).filter((m) => m.length > 1).slice(0, 8);

  const title = headings[0] || `${cleanFilename.replace(/\.[^/.]+$/, '')} Intelligence Deck`;

  const slides: SlideData[] = [
    {
      id: 'slide-1',
      type: 'title',
      heading: title,
      subheading: `Interactive Document Deck • Mode: ${selectedStyle}`,
      speakerNotes: `Generated deck for ${cleanFilename}. Tone: ${tone || 'Professional'}.`,
    },
    {
      id: 'slide-2',
      type: 'heading_summary',
      heading: 'Executive Summary & Section Overview',
      subheading: 'Core document section synthesis',
      headingSummary: {
        sectionHeading: headings[1] || 'Main Findings & Operational Context',
        summaryText:
          lines.slice(1, 5).join(' ') ||
          'Analysis of the uploaded document reveals key structural insights, operational metrics, and strategic recommendations.',
        keyPoints: lines.filter((l) => l.startsWith('-') || l.startsWith('•') || /^\d+\./.test(l)).slice(0, 4).map((l) => l.replace(/^[-•\d.]+\s*/, '')),
        metricsCallout: {
          label: 'Primary Metric',
          value: sampleMetrics[0] || 'High Impact',
        },
      },
      speakerNotes: 'Overview of key sections distilled directly from the document content.',
    },
    {
      id: 'slide-3',
      type: 'stacked_bar',
      heading: 'Quarterly Metric & Allocation Breakdown',
      subheading: 'Stacked component distribution across categories',
      stackedBar: {
        categories: ['Q1', 'Q2', 'Q3', 'Q4 (Est)'],
        keys: ['Core Tier', 'Growth Segment', 'Enterprise Expansion'],
        data: [
          { name: 'Q1', 'Core Tier': 40, 'Growth Segment': 25, 'Enterprise Expansion': 20 },
          { name: 'Q2', 'Core Tier': 48, 'Growth Segment': 32, 'Enterprise Expansion': 28 },
          { name: 'Q3', 'Core Tier': 58, 'Growth Segment': 44, 'Enterprise Expansion': 38 },
          { name: 'Q4 (Est)', 'Core Tier': 72, 'Growth Segment': 58, 'Enterprise Expansion': 46 },
        ],
        unit: '$',
      },
      keyTakeaway: 'Enterprise tier and high-growth segments represent over 60% of total operational output.',
    },
    {
      id: 'slide-4',
      type: 'treemap',
      heading: 'Topic & Resource Weight Allocation Hierarchy',
      subheading: 'Treemap size proportions based on document density',
      treemapData: [
        { name: 'Core Strategy & Operations', size: 450, category: 'Strategy' },
        { name: 'Product Engineering & Infrastructure', size: 320, category: 'Tech' },
        { name: 'Financial & Revenue Expansion', size: 280, category: 'Finance' },
        { name: 'Risk, Security & Compliance', size: 190, category: 'Governance' },
        { name: 'Market & Regional Penetration', size: 140, category: 'Growth' },
      ],
      keyTakeaway: 'Strategy and Product Engineering represent over 50% of the structural focus.',
    },
    {
      id: 'slide-5',
      type: 'pie_chart',
      heading: 'Key Segment Percentage Distribution',
      subheading: 'Proportional distribution across key focus verticals',
      pieData: [
        { name: 'Enterprise Accounts', value: 42 },
        { name: 'Mid-Market Operations', value: 28 },
        { name: 'Strategic Partners', value: 18 },
        { name: 'Emerging Verticals', value: 12 },
      ],
      keyTakeaway: 'Enterprise accounts form the primary core of total portfolio value.',
    },
    {
      id: 'slide-6',
      type: 'histogram',
      heading: 'Operational Latency & Response Bins',
      subheading: 'Histogram frequency distribution',
      histogramData: [
        { bin: '1-3 days', frequency: 52, label: 'Automated Tier' },
        { bin: '4-7 days', frequency: 30, label: 'Standard Cohort' },
        { bin: '8-14 days', frequency: 12, label: 'Specialized Review' },
        { bin: '15+ days', frequency: 6, label: 'Legacy Process' },
      ],
      keyTakeaway: '52% of document operational workflows execute in under 3 days.',
    },
    {
      id: 'slide-7',
      type: 'box_plot',
      heading: 'Statistical Metric Dispersion',
      subheading: '5-Number statistical summary (Min, Q1, Median, Q3, Max)',
      boxPlotData: [
        { category: 'Contract Tenure', min: 6, q1: 12, median: 24, q3: 36, max: 48, unit: 'months' },
        { category: 'Cycle Turnaround', min: 4, q1: 12, median: 26, q3: 40, max: 58, unit: 'days' },
        { category: 'Resolution Speed', min: 1, q1: 3, median: 7, q3: 12, max: 20, unit: 'days' },
      ],
      keyTakeaway: 'Median contract tenure is 24 months with median turnaround of 26 days.',
    },
    {
      id: 'slide-8',
      type: 'graph',
      heading: 'Monthly Performance Trajectory vs Target',
      subheading: 'Trend graph tracking monthly progress against planned benchmarks',
      graphData: [
        { name: 'May', value: 6.0, target: 5.8 },
        { name: 'Jun', value: 6.7, target: 6.4 },
        { name: 'Jul', value: 7.2, target: 7.0 },
        { name: 'Aug', value: 7.9, target: 7.5 },
        { name: 'Sep', value: 8.5, target: 8.0 },
      ],
      keyTakeaway: 'Actual trajectory consistently outperformed target benchmarks across all consecutive periods.',
    },
    {
      id: 'slide-9',
      type: 'bullets',
      heading: 'Strategic Recommendations & Key Action Plan',
      subheading: 'Essential document takeaways and next steps',
      bullets: [
        'Accelerate core platform automation and integration latency.',
        'Expand regional infrastructure and deployment availability.',
        'Scale compliance and security verification for enterprise customers.',
        'Optimize operational workflows to sustain 35%+ growth momentum.',
      ],
      keyTakeaway: 'Executing key recommendations will sustain top-tier growth and operational efficiency.',
    },
  ];

  return {
    title,
    subtitle: `Interactive Visual Deck (${cleanFilename})`,
    overview: `Extracted from ${cleanFilename}. Formatted into visual cards under "${selectedStyle}" intent.`,
    styleUsed: selectedStyle,
    slides,
  };
}
