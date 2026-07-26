# ⚡ Glance — Interactive Document Deck & AI Data Intelligence Viewer

<p align="center">
  <strong>Transform raw Word documents, strategy papers, and reports into interactive visual data decks powered by Gemini AI.</strong>
</p>

<p align="center">
  <a href="#-key-features">Key Features</a> •
  <a href="#%EF%B8%8F-tech-stack">Tech Stack</a> •
  <a href="#-quick-start">Quick Start</a> •
  <a href="#-environment-variables">Environment Setup</a> •
  <a href="#-architecture">Architecture</a> •
  <a href="#-license">License</a>
</p>

---

## 🌟 Overview

**Glance** is a next-generation document intelligence platform that bridges the gap between static Word documents (`.docx`) and high-impact visual presentations. Using in-browser document parsing and Google's **Gemini 3.6 Flash AI**, Glance extracts key figures, quantitative metrics, and document hierarchy—automatically rendering findings into rich, interactive visual cards including **Stacked Bar Charts, Treemaps, Histograms, Box Plots, Pie Charts, and Trend Graphs**.

---

## ✨ Key Features

- 📑 **In-Browser `.docx` Parsing**: Extract structured text, headers, and word counts securely in the browser using `mammoth.js`.
- 🤖 **Gemini AI Restructuring**: Powered by `@google/genai` (`gemini-3.6-flash`) with structured JSON schema responses for zero-hallucination layout formatting.
- 📊 **Rich Data Visualizations**:
  - **Stacked Bar Charts**: Multi-tier metric distributions across quarters/regions.
  - **Treemaps**: Visual weight & budget allocation hierarchies.
  - **Histograms**: Frequency distributions and operational latency bins.
  - **Box Plots**: 5-number statistical dispersion summaries (Min, Q1, Median, Q3, Max).
  - **Pie & Donut Charts**: Segment percentages and customer share splits.
  - **Trend Graphs**: Multi-month trajectory lines vs target thresholds.
  - **Structured Summaries**: Executive section headings, bullet callouts, and key performance stats.
- 🎨 **Tailored Style Intents**: Choose from *Executive Summary*, *Data Intelligence*, *Strategic Roadmap*, *Pitch Deck*, or *Technical Deep Dive*.
- 🛠️ **Multi-View Workspace**:
  - **Interactive Deck**: Fullscreen presentation mode with keyboard navigation, key takeaways, and speaker notes.
  - **Dashboard**: Centralized hub for uploading documents and tracking analysis status.
  - **Document Explorer**: Includes pre-loaded sample enterprise documents for instant 1-click testing.
  - **Insights View**: High-level visual metrics breakdown across analyzed documents.
- 📥 **Export Capabilities**: Export presentations into HTML, JSON, or printable document formats.

---

## 🛠️ Tech Stack

### **Frontend**
- **Framework**: React 19 + TypeScript + Vite 6
- **Styling**: Tailwind CSS v4 + Custom Dark Theme Design System
- **Charts & Motion**: Recharts + Framer Motion + Lucide Icons
- **Document Parser**: Mammoth.js (`.docx` to HTML/plain text)

### **Backend**
- **Server**: Express.js (Node.js)
- **AI SDK**: `@google/genai` (Gemini 3.6 Flash)
- **Bundler & Runtime**: ESBuild + TSX

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** (v18.x or later)
- **npm** or **bun**
- A **Gemini API Key** from [Google AI Studio](https://aistudio.google.com/)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/M-Ahsan-Takmeel/Glance.git
   cd Glance
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file in the root directory:
   ```bash
   cp .env.example .env
   ```
   Add your Gemini API Key:
   ```env
   GEMINI_API_KEY="your_actual_gemini_api_key_here"
   ```

4. **Start Development Server**:
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:3000`.

---

## 📜 Available Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts the Express server with Vite middleware in hot-reload mode (`http://localhost:3000`) |
| `npm run build` | Builds the Vite frontend production bundle and bundles the server via ESBuild into `dist/server.cjs` |
| `npm run start` | Runs the compiled production server (`node dist/server.cjs`) |
| `npm run lint` | Runs TypeScript type checking without emitting files |
| `npm run clean` | Removes build directories (`dist/`) |

---

## ⚙️ Environment Variables

| Variable | Required | Description |
| :--- | :---: | :--- |
| `GEMINI_API_KEY` | **Yes** | Your API Key from Google AI Studio (used for backend AI slide generation). |
| `APP_URL` | No | Base URL of the deployed application (defaults to `http://localhost:3000`). |

> 🔒 **Security Note**: Real `.env` files are ignored by Git via `.gitignore`. Never commit API keys to public repositories.

---

## 🏛️ Project Architecture

```
Glance/
├── src/
│   ├── components/       # UI Components (Deck, Dashboard, Explorer, Visual Cards)
│   │   ├── Header.tsx
│   │   ├── Sidebar.tsx
│   │   ├── SlideViewer.tsx
│   │   ├── DashboardView.tsx
│   │   ├── ExplorerView.tsx
│   │   ├── InsightsView.tsx
│   │   └── ...
│   ├── lib/              # Document Parsers & Sample Data
│   │   ├── docxParser.ts
│   │   └── sampleDocs.ts
│   ├── App.tsx           # Main Application State & Navigation Router
│   ├── main.tsx          # React Root Entry Point
│   ├── types.ts          # TypeScript Data Contracts & Slide Schemas
│   └── index.css         # Styling & CSS Custom Properties
├── server.ts             # Express Server & Gemini AI API Integration Endpoint
├── .env.example          # Environment Variable Blueprint
├── .gitignore            # Git Exclusions
├── package.json          # Dependencies & Scripts
├── tsconfig.json         # TypeScript Config
└── vite.config.ts        # Vite Build Setup
```

---

## 👨‍💻 Author

Developed with ❤️ by **[Muhammad Ahsan](https://github.com/M-Ahsan-Takmeel)**.

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
