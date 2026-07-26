import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// Body parser
app.use(express.json({ limit: '15mb' }));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', app: 'Glance' });
});

// Initialize Gemini client lazily
function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY environment variable is missing.');
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// Generate Presentation endpoint
app.post('/api/generate', async (req, res) => {
  try {
    const { text, filename, style, targetSlideCount, tone } = req.body;

    if (!text || typeof text !== 'string' || text.trim().length === 0) {
      return res.status(400).json({ error: 'Document text is empty or invalid.' });
    }

    const ai = getGeminiClient();

    const selectedStyle = style || 'Executive Summary';
    const numSlides = targetSlideCount || 'Auto (6-10 slides)';
    const selectedTone = tone || 'Professional & Engaging';

    const systemPrompt = `You are Glance's document intelligence engine.
Your mission is to analyze raw document text and transform it into an interactive in-app visual data deck. Glance is an interactive document deck system where data, findings, and summaries are displayed in visual cards equipped with rich charts, points, summaries, and graphs.

You MUST extract factual metrics, quantitative figures, key trends, section summaries, and structured data from the document to populate the visual deck.

Choose from these diverse slide card visual types:
1. "title": Executive document title card with key document metadata, duration, and high-level summary.
2. "heading_summary": Structured card with main section heading, executive summary paragraph, key takeaway bullet points, and an optional metric callout.
3. "bullets": Structured takeaways with 3-5 concise, high-impact bullet points and a bottom core callout.
4. "stat": Big key performance metrics (e.g., $14.2M, +32%, 98.4%) with context, trend change badge, and breakdown.
5. "stacked_bar": Stacked Bar Chart breakdown showing categories (e.g. Q1-Q4, or Regions) and stacked component metrics (e.g. Revenue, Cost, Profit).
6. "treemap": Treemap visualization showing hierarchical topic areas or proportion sizes (e.g., market segments, budget allocations, document topic density).
7. "pie_chart": Donut or Pie chart showing proportional percentage distributions (e.g., sentiment split, category share, risk levels).
8. "histogram": Frequency distribution chart (e.g. variance across clause lengths, response frequency bins, score ranges).
9. "box_plot": Box plot statistical dispersion card with min, q1, median, q3, max, and outlier values for statistical metrics (e.g. contract tenure, performance spread, quarterly range).
10. "graph": Line / Area trend chart showing trajectory over time (e.g. 6-12 month metrics, growth curves).
11. "grid": Side-by-side pillar cards comparing strategies or findings.
12. "timeline_step": Sequential story or roadmap phase.
13. "quote": Executive quote or core policy directive.

Always aim to include a balanced mix of visual card types (including charts, graphs, box plots, histograms, stacked bars, treemaps, pie charts, bullets, headings, and summaries) based on the document's content!

Target Slide Count: ${numSlides}
Selected Tone: ${selectedTone}
Document Filename: ${filename || 'Document'}`;

    const userPrompt = `Document Content:
---
${text.slice(0, 30000)}
---

Generate the structured presentation JSON according to style "${selectedStyle}".`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: userPrompt,
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.3,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING, description: 'Overall Presentation Title' },
            subtitle: { type: Type.STRING, description: 'Subtitle or tagline' },
            overview: { type: Type.STRING, description: '1-2 sentence executive overview' },
            readingTimeMinutes: { type: Type.NUMBER, description: 'Estimated presentation duration in minutes' },
            styleUsed: { type: Type.STRING, description: 'Style applied' },
            slides: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING, description: 'Unique slide id e.g. slide-1' },
                  type: {
                    type: Type.STRING,
                    description: 'Slide visual card type: title | heading_summary | bullets | stat | stacked_bar | treemap | pie_chart | histogram | box_plot | graph | timeline_step | quote | grid',
                  },
                  heading: { type: Type.STRING, description: 'Slide title/headline' },
                  subheading: { type: Type.STRING, description: 'Optional slide takeaway or context' },
                  bullets: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                    description: 'List of key bullet points if applicable',
                  },
                  headingSummary: {
                    type: Type.OBJECT,
                    properties: {
                      sectionHeading: { type: Type.STRING },
                      summaryText: { type: Type.STRING },
                      keyPoints: { type: Type.ARRAY, items: { type: Type.STRING } },
                      metricsCallout: {
                        type: Type.OBJECT,
                        properties: {
                          label: { type: Type.STRING },
                          value: { type: Type.STRING },
                        },
                      },
                    },
                    description: 'Structured section heading and summary with key points',
                  },
                  stat: {
                    type: Type.OBJECT,
                    properties: {
                      value: { type: Type.STRING, description: 'Big metric e.g. 84% or $2.5M' },
                      label: { type: Type.STRING, description: 'Label for metric e.g. Year-over-Year Growth' },
                      change: { type: Type.STRING, description: 'Optional change badge e.g. +14%' },
                      context: { type: Type.STRING, description: 'Brief context sentence' },
                    },
                  },
                  stackedBar: {
                    type: Type.OBJECT,
                    properties: {
                      categories: { type: Type.ARRAY, items: { type: Type.STRING } },
                      keys: { type: Type.ARRAY, items: { type: Type.STRING } },
                      data: {
                        type: Type.ARRAY,
                        items: { type: Type.OBJECT },
                        description: 'Array of objects e.g. [{ name: "Q1", Direct: 40, Partner: 25 }]',
                      },
                      unit: { type: Type.STRING },
                    },
                  },
                  treemapData: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        name: { type: Type.STRING },
                        size: { type: Type.NUMBER },
                        category: { type: Type.STRING },
                      },
                    },
                  },
                  pieData: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        name: { type: Type.STRING },
                        value: { type: Type.NUMBER },
                      },
                    },
                  },
                  histogramData: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        bin: { type: Type.STRING },
                        frequency: { type: Type.NUMBER },
                        label: { type: Type.STRING },
                      },
                    },
                  },
                  boxPlotData: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        category: { type: Type.STRING },
                        min: { type: Type.NUMBER },
                        q1: { type: Type.NUMBER },
                        median: { type: Type.NUMBER },
                        q3: { type: Type.NUMBER },
                        max: { type: Type.NUMBER },
                        unit: { type: Type.STRING },
                      },
                    },
                  },
                  graphData: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        name: { type: Type.STRING },
                        value: { type: Type.NUMBER },
                        value2: { type: Type.NUMBER },
                        target: { type: Type.NUMBER },
                      },
                    },
                  },
                  timelineStep: {
                    type: Type.OBJECT,
                    properties: {
                      stepNumber: { type: Type.NUMBER },
                      phase: { type: Type.STRING },
                      title: { type: Type.STRING },
                      description: { type: Type.STRING },
                    },
                  },
                  quote: {
                    type: Type.OBJECT,
                    properties: {
                      text: { type: Type.STRING },
                      author: { type: Type.STRING },
                      role: { type: Type.STRING },
                    },
                  },
                  gridItems: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        title: { type: Type.STRING },
                        desc: { type: Type.STRING },
                        badge: { type: Type.STRING },
                      },
                    },
                  },
                  speakerNotes: { type: Type.STRING },
                  keyTakeaway: { type: Type.STRING },
                },
                required: ['id', 'type', 'heading'],
              },
            },
          },
          required: ['title', 'subtitle', 'slides'],
        },
      },
    });

    const jsonText = response.text?.trim() || '';
    if (!jsonText) {
      throw new Error('Gemini model returned an empty response.');
    }

    const presentation = JSON.parse(jsonText);
    res.json({ success: true, presentation });
  } catch (error: any) {
    console.error('Error generating presentation:', error);
    res.status(500).json({
      error: error.message || 'An unexpected error occurred while generating slides.',
    });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Glance app running on http://localhost:${PORT}`);
  });
}

startServer();
