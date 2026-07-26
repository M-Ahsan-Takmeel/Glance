import React from 'react';

// Pass-through wrapper or SVG icon helpers for consistent styling
export const MaterialIcon: React.FC<{ name: string; className?: string }> = ({ name, className = '' }) => {
  return <span className={`material-symbols-outlined ${className}`}>{name}</span>;
};

export {
  TrendingUp,
  Sparkles,
  Calendar as CalendarMonth,
  Download,
  Clock as Schedule,
  Lock,
  BarChart2 as BarChart,
  ArrowLeftRight as CompareArrows,
  PlusCircle as AddCircle,
  MinusCircle as RemoveCircle,
  ArrowUpRight as NorthEast,
  UploadCloud as CloudUpload,
  MoreVertical as MoreVert,
  Search,
  Menu,
  FileText,
  FolderOpen,
  PieChart,
  Presentation,
  CheckCircle,
  AlertCircle,
  Filter,
  RefreshCw,
  Layers,
  HelpCircle,
  Eye,
  Sliders,
  ChevronRight,
  ChevronLeft,
  X,
  Edit2,
  Trash2,
  Share2,
  Copy,
  SlidersHorizontal,
  Folder,
  Zap,
  Activity,
  UserCheck,
  ShieldAlert
} from 'lucide-react';
