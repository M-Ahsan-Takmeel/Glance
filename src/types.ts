export type ActiveTab = 'Dashboard' | 'Explorer' | 'Insights' | 'Deck' | 'About' | 'Working';

export type StyleIntent =
  | 'Executive Summary'
  | 'Deep Dive'
  | 'Timeline / Story'
  | 'Data Highlights';

export type PresentationTheme =
  | 'midnight'
  | 'clean-light'
  | 'corporate-navy'
  | 'emerald-dark'
  | 'warm-editorial';

export type SlideType =
  | 'title'
  | 'bullets'
  | 'heading_summary'
  | 'stat'
  | 'stacked_bar'
  | 'treemap'
  | 'pie_chart'
  | 'histogram'
  | 'box_plot'
  | 'graph'
  | 'timeline_step'
  | 'quote'
  | 'grid';

export interface StatData {
  value: string;
  label: string;
  change?: string;
  context?: string;
}

export interface StackedBarData {
  categories: string[]; // e.g. ['Q1', 'Q2', 'Q3', 'Q4']
  keys: string[]; // e.g. ['Direct', 'Partner', 'Enterprise']
  data: Array<Record<string, string | number>>; // e.g. [{ name: 'Q1', Direct: 40, Partner: 24, Enterprise: 20 }]
  unit?: string;
}

export interface TreemapNode {
  name: string;
  size: number;
  category?: string;
  color?: string;
  value?: number;
}

export interface PieChartData {
  name: string;
  value: number;
  color?: string;
}

export interface HistogramBin {
  bin: string; // e.g. "0-20", "21-40"
  frequency: number;
  label?: string;
}

export interface BoxPlotItem {
  category: string;
  min: number;
  q1: number;
  median: number;
  q3: number;
  max: number;
  outliers?: number[];
  unit?: string;
}

export interface GraphPoint {
  name: string; // X axis
  value: number; // Y axis primary
  value2?: number; // Y axis secondary
  target?: number;
}

export interface HeadingSummaryData {
  sectionHeading: string;
  summaryText: string;
  keyPoints: string[];
  metricsCallout?: { label: string; value: string };
}

export interface TimelineStepData {
  stepNumber?: number;
  phase?: string;
  title: string;
  description: string;
}

export interface QuoteData {
  text: string;
  author?: string;
  role?: string;
}

export interface GridItemData {
  title: string;
  desc: string;
  badge?: string;
}

export interface Slide {
  id: string;
  type: SlideType;
  heading: string;
  subheading?: string;
  bullets?: string[];
  headingSummary?: HeadingSummaryData;
  stat?: StatData;
  stackedBar?: StackedBarData;
  treemapData?: TreemapNode[];
  pieData?: PieChartData[];
  histogramData?: HistogramBin[];
  boxPlotData?: BoxPlotItem[];
  graphData?: GraphPoint[];
  timelineStep?: TimelineStepData;
  quote?: QuoteData;
  gridItems?: GridItemData[];
  speakerNotes?: string;
  keyTakeaway?: string;
}

export interface PresentationData {
  title: string;
  subtitle: string;
  overview?: string;
  readingTimeMinutes?: number;
  styleUsed?: string;
  slides: Slide[];
}

export interface StyleOptionInfo {
  id: StyleIntent;
  title: string;
  tagline: string;
  description: string;
  iconName?: string;
  badge: string;
}

export interface SampleDoc {
  id: string;
  title: string;
  category: string;
  description: string;
  filename: string;
  wordCount: number;
  content: string;
}

