import React, { useState } from 'react';
import { PresentationData } from '../types';
import { Copy, Check, FileText, Download, X } from 'lucide-react';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  presentation: PresentationData;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  presentation,
}) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'markdown' | 'outline'>('markdown');

  if (!isOpen) return null;

  // Generate Markdown
  const generateMarkdown = (): string => {
    let md = `# ${presentation.title}\n`;
    if (presentation.subtitle) md += `*${presentation.subtitle}*\n\n`;
    if (presentation.overview) md += `> **Executive Overview:** ${presentation.overview}\n\n`;

    presentation.slides.forEach((slide, idx) => {
      md += `---\n## Slide ${idx + 1}: ${slide.heading}\n`;
      if (slide.subheading) md += `*${slide.subheading}*\n\n`;

      if (slide.bullets && slide.bullets.length > 0) {
        slide.bullets.forEach((b) => {
          md += `- ${b}\n`;
        });
        md += '\n';
      }

      if (slide.stat) {
        md += `**Key Metric:** ${slide.stat.value} — ${slide.stat.label}\n`;
        if (slide.stat.change) md += `*Change:* ${slide.stat.change}\n`;
        if (slide.stat.context) md += `*Context:* ${slide.stat.context}\n`;
        md += '\n';
      }

      if (slide.timelineStep) {
        md += `**Phase:** ${slide.timelineStep.phase || 'Step'} | **Title:** ${slide.timelineStep.title}\n`;
        md += `${slide.timelineStep.description}\n\n`;
      }

      if (slide.quote) {
        md += `> "${slide.quote.text}" — ${slide.quote.author || 'Source'}\n\n`;
      }

      if (slide.gridItems) {
        slide.gridItems.forEach((gi) => {
          md += `- **${gi.title}**: ${gi.desc}\n`;
        });
        md += '\n';
      }

      if (slide.speakerNotes) {
        md += `*Speaker Notes:* ${slide.speakerNotes}\n\n`;
      }
    });

    return md;
  };

  const markdownContent = generateMarkdown();

  const handleCopy = () => {
    navigator.clipboard.writeText(markdownContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadFile = () => {
    const blob = new Blob([markdownContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${presentation.title.replace(/\s+/g, '_')}_Presentation.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md p-4 sm:p-6 flex items-center justify-center animate-fadeIn">
      <div className="max-w-2xl w-full bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-4 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-indigo-400" />
            <h3 className="font-bold text-base text-white">Export Presentation Outline</h3>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Action Toolbar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs">
            <button
              onClick={() => setActiveTab('markdown')}
              className={`px-3 py-1 rounded-md font-medium transition ${
                activeTab === 'markdown' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Markdown Format
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy Text'}</span>
            </button>

            <button
              onClick={handleDownloadFile}
              className="px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1.5 transition shadow"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download .md</span>
            </button>
          </div>
        </div>

        {/* Text View */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 font-mono overflow-y-auto max-h-96 whitespace-pre-wrap flex-1">
          {markdownContent}
        </div>
      </div>
    </div>
  );
};
