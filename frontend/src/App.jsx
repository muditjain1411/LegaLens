import React, { useState, useEffect } from 'react';
import {
  UploadCloud,
  FileText,
  CheckCircle,
  Download,
  Moon,
  Sun,
  Loader2,
  ShieldCheck,
  AlertTriangle,
  ChevronRight,
  ChevronDown,
  PlusCircle
} from 'lucide-react';

// mockData
const MOCK_CONTRACT_TEXT = `TERMS OF SERVICE AND USER AGREEMENT

1. ACCEPTANCE OF TERMS
By accessing this website, you are agreeing to be bound by these web site Terms and Conditions of Use, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws.

2. DATA OWNERSHIP AND PRIVACY
The Service Provider reserves the right to collect, store, and sell anonymized user data to third-party advertisers for the purpose of improving service delivery and targeted marketing. User content uploaded to the platform becomes the joint intellectual property of the User and the Service Provider. The Service Provider retains a perpetual, irrevocable, worldwide, royalty-free license to use, reproduce, and display such content.

3. SUBSCRIPTION AND BILLING
Subscriptions renew automatically unless cancelled 30 days prior to the renewal date. We reserve the right to increase subscription fees at any time without prior notice to the user. No refunds will be issued for partial months of service.

4. LIMITATION OF LIABILITY
In no event shall the Service Provider or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on the Service Provider's Internet site.

5. ARBITRATION AND GOVERNING LAW
Any claim relating to the Service Provider's web site shall be governed by the laws of the State of Delaware without regard to its conflict of law provisions. Any dispute arising from this agreement shall be settled by binding arbitration conducted in Bermuda, and the user explicitly waives their right to a trial by jury or to participate in a class-action lawsuit.

6. TERMINATION
We may terminate or suspend access to our Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.`;

const MOCK_ANALYSIS = {
  fileName: "startup_service_agreement.pdf",
  summary: [
    "Users grant the platform a perpetual license to their content.",
    "Data can be sold to third-party advertisers.",
    "Subscriptions auto-renew with a 30-day cancellation notice requirement.",
    "Binding arbitration is required, waiving jury trial rights.",
    "Service can be terminated at any time without notice."
  ],
  risks: [
    {
      id: 1,
      type: "High",
      title: "Data Selling & IP Rights",
      snippet: "collect, store, and sell anonymized user data to third-party advertisers",
      explanation: "The provider explicitly states they can sell your data. Additionally, they claim joint ownership of your uploaded content.",
      category: "Privacy"
    },
    {
      id: 2,
      type: "High",
      title: "Binding Arbitration / Class Action Waiver",
      snippet: "binding arbitration conducted in Bermuda, and the user explicitly waives their right",
      explanation: "Forced arbitration in a foreign jurisdiction (Bermuda) makes it extremely expensive and difficult for you to sue them. You also lose the right to join class actions.",
      category: "Legal Recourse"
    },
    {
      id: 3,
      type: "Medium",
      title: "Unilateral Fee Changes",
      snippet: "increase subscription fees at any time without prior notice",
      explanation: "They can raise prices whenever they want without telling you first. Standard clauses usually require 30 days notice.",
      category: "Financial"
    },
    {
      id: 4,
      type: "Medium",
      title: "Termination Without Cause",
      snippet: "terminate or suspend access to our Service immediately, without prior notice",
      explanation: "They can ban you instantly for 'any reason whatsoever', threatening business continuity.",
      category: "Operational"
    }
  ]
};

// Badge
const Badge = ({ type }) => {
  const styles = {
    High: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800",
    Medium: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border-amber-200 dark:border-amber-800",
    Low: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800",
  };

  return (
    <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${styles[type] || styles.Low}`}>
      {type} Risk
    </span>
  );
};

//Navbar
const Navbar = ({ isDarkMode, toggleTheme, reset, status }) => (
  <nav className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md transition-colors duration-300 ease-in-out">
    <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
      <div className="flex items-center gap-2 cursor-pointer" onClick={reset}>
        <div className="bg-indigo-600 p-1.5 rounded-lg shadow-sm">
          <ShieldCheck className="w-5 h-5 text-white" />
        </div>
        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300">
          LegalLens
        </span>
      </div>

      <div className="flex items-center gap-4">
        {status === 'complete' && (
          <button
            onClick={reset}
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors"
          >
            <PlusCircle className="w-4 h-4" />
            New Analysis
          </button>
        )}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
          aria-label="Toggle theme"
        >
          {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
      </div>
    </div>
  </nav>
);

const HeroSection = ({ onUpload, status, progress }) => (
  <div className="flex flex-col items-center justify-center mt-12 sm:mt-24 text-center space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
    <div className="space-y-4 max-w-2xl">
      <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white">
        Don't Agree Blindly. <br />
        <span className="text-indigo-600 dark:text-indigo-400">Know What You're Signing.</span>
      </h1>
      <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
        AI-powered contract analysis. Upload any PDF/Docx to instantly spot red flags,
        unfair clauses, and hidden risks.
      </p>
    </div>

    <div className="w-full max-w-xl transition-all duration-500 ease-in-out">
      {status === 'idle' ? (
        <label
          className="group flex flex-col items-center justify-center w-full h-64 rounded-3xl border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-indigo-500 dark:hover:border-indigo-400 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all cursor-pointer shadow-sm hover:shadow-md"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <div className="p-4 rounded-full bg-indigo-50 dark:bg-indigo-900/20 mb-4 group-hover:scale-110 transition-transform">
              <UploadCloud className="w-10 h-10 text-indigo-600 dark:text-indigo-400" />
            </div>
            <p className="mb-2 text-lg font-semibold text-slate-700 dark:text-slate-200">
              Click to upload or drag and drop
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              PDF, DOCX, or TXT (Max 10MB)
            </p>
          </div>
          <input type="file" className="hidden" onChange={onUpload} accept=".pdf,.doc,.docx,.txt" />
        </label>
      ) : (
        /* In-Place Loader */
        <div className="flex flex-col items-center justify-center w-full h-64 rounded-3xl border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm p-8 animate-in fade-in zoom-in-95 duration-300">
          <div className="w-full max-w-md space-y-6">
            <div className="flex flex-col items-center gap-4">
              {status === 'analyzing' ? (
                <Loader2 className="w-12 h-12 text-indigo-600 dark:text-indigo-400 animate-spin" />
              ) : (
                <FileText className="w-12 h-12 text-slate-400 animate-pulse" />
              )}
              <div className="text-center">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                  {status === 'uploading' ? 'Uploading Document...' : 'Analyzing Clauses...'}
                </h3>
                <p className="text-sm text-slate-500">
                  {status === 'uploading' ? 'Sending to secure server' : 'Searching for hidden risks'}
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs font-medium text-slate-500 dark:text-slate-400">
                <span>Progress</span>
                <span>{progress}%</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-indigo-600 h-2 rounded-full transition-all duration-300 ease-out shadow-[0_0_10px_rgba(79,70,229,0.3)]"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>

    <div className="flex gap-6 text-sm text-slate-400 font-medium">
      <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4" /> 256-bit Encryption</span>
      <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4" /> Privacy First</span>
    </div>
  </div>
);

const SummaryCard = ({ summary, onDownload }) => (
  <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-6">
    <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-4">
      <FileText className="w-5 h-5 text-indigo-500" />
      The Gist
    </h2>
    <ul className="space-y-4">
      {summary.map((point, i) => (
        <li key={i} className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-300">
          <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
          <span className="leading-snug">{point}</span>
        </li>
      ))}
    </ul>
    <button
      onClick={onDownload}
      className="mt-6 w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 transition-colors"
    >
      <Download className="w-4 h-4" />
      Download Summary Report
    </button>
  </div>
);

const RiskList = ({ risks, activeRiskId, onRiskClick }) => (
  <div className="space-y-4">
    <div className="flex items-center justify-between px-1">
      <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
        Risk Assessment
      </h3>
      <span className="text-xs font-medium px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-full">
        {risks.length} Issues Found
      </span>
    </div>

    <div className="space-y-3">
      {risks.map((risk) => (
        <div
          key={risk.id}
          onClick={() => onRiskClick(risk.id)}
          className={`
            group bg-white dark:bg-slate-900 rounded-xl border p-4 cursor-pointer transition-all duration-200 relative overflow-hidden
            ${activeRiskId === risk.id
              ? 'border-indigo-500 shadow-md ring-1 ring-indigo-500 z-10'
              : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
            }
          `}
        >
          {activeRiskId === risk.id && (
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-500" />
          )}

          <div className="flex items-start justify-between mb-2">
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-slate-400 mb-0.5 uppercase tracking-wide">{risk.category}</span>
              <h4 className={`font-semibold text-sm transition-colors ${activeRiskId === risk.id ? 'text-indigo-700 dark:text-indigo-400' : 'text-slate-900 dark:text-white'}`}>
                {risk.title}
              </h4>
            </div>
            <Badge type={risk.type} />
          </div>

          <div className="text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
            {risk.explanation}
          </div>

          <div className="mt-3 flex items-center text-xs font-medium text-indigo-600 dark:text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity">
            View in document <ChevronRight className="w-3 h-3 ml-1" />
          </div>
        </div>
      ))}
    </div>
  </div>
);

const DocumentViewer = ({ data, activeRiskId, setActiveRiskId }) => {
  if (!data) return null;

  // Simplified highlighter logic
  const renderText = () => {
    let textContent = MOCK_CONTRACT_TEXT;
    const sortedRisks = [...data.risks].sort((a, b) => b.snippet.length - a.snippet.length);

    return (
      <div className="font-mono text-sm leading-relaxed whitespace-pre-wrap text-slate-700 dark:text-slate-300">
        {textContent.split('\n').map((line, lineIdx) => {
          let lineContent = [line];

          sortedRisks.forEach(risk => {
            const newContent = [];
            lineContent.forEach(segment => {
              if (typeof segment === 'string' && segment.includes(risk.snippet)) {
                const parts = segment.split(risk.snippet);
                parts.forEach((part, i) => {
                  newContent.push(part);
                  if (i < parts.length - 1) {
                    newContent.push(
                      <span
                        key={`risk-${risk.id}-${lineIdx}-${i}`}
                        id={`risk-highlight-${risk.id}`}
                        className={`
                           cursor-pointer transition-all duration-300 rounded px-1 py-0.5 mx-0.5
                           ${activeRiskId === risk.id ? 'scale-105 shadow-sm ring-2 ring-indigo-500 z-10 relative' : ''}
                           ${risk.type === 'High' ? 'bg-red-200/50 dark:bg-red-900/40 text-red-900 dark:text-red-200 border-b-2 border-red-400' : ''}
                           ${risk.type === 'Medium' ? 'bg-amber-200/50 dark:bg-amber-900/40 text-amber-900 dark:text-amber-200 border-b-2 border-amber-400' : ''}
                         `}
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveRiskId(risk.id);
                        }}
                      >
                        {risk.snippet}
                      </span>
                    );
                  }
                });
              } else {
                newContent.push(segment);
              }
            });
            lineContent = newContent;
          });

          return <div key={lineIdx} className="min-h-[1.5em]">{lineContent}</div>;
        })}
      </div>
    );
  };

  return (
    <div className="md:col-span-8 h-full bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col">
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 z-10">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-red-50 dark:bg-red-900/20 rounded-lg">
            <FileText className="w-5 h-5 text-red-500" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white text-sm sm:text-base">{data.fileName}</h3>
            <p className="text-xs text-slate-500">Scanned just now • 12KB</p>
          </div>
        </div>
        <div className="text-xs font-medium px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full text-slate-500 flex items-center gap-1">
          <ShieldCheck className="w-3 h-3" /> Read Only
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 sm:p-8 bg-slate-50/50 dark:bg-slate-950/50" onClick={() => setActiveRiskId(null)}>
        <div className="max-w-3xl mx-auto bg-white dark:bg-slate-900 shadow-sm border border-slate-200 dark:border-slate-800 min-h-full p-8 sm:p-12 rounded-lg transition-colors">
          {renderText()}
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [status, setStatus] = useState('idle'); // idle, uploading, analyzing, complete
  const [data, setData] = useState(null);
  const [activeRiskId, setActiveRiskId] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Theme Management
  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDarkMode(true);
    }
  }, []);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  // Scroll to highlighted text when a risk is clicked
  const scrollToRisk = (id) => {
    setActiveRiskId(id);
    const element = document.getElementById(`risk-highlight-${id}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  // Simulate File Upload and Analysis
  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setStatus('uploading');
    setUploadProgress(0);

    // Simulate upload progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 15) + 5;
      if (progress > 90) progress = 90; // Hold at 90 until complete
      setUploadProgress(progress);
    }, 200);

    // Simulate Network Request
    setTimeout(() => {
      clearInterval(interval);
      setUploadProgress(100);
      setStatus('analyzing');

      // Simulate Backend Processing
      setTimeout(() => {
        setData(MOCK_ANALYSIS);
        setStatus('complete');
      }, 1500);
    }, 1500);
  };

  const handleReset = () => {
    setStatus('idle');
    setData(null);
    setUploadProgress(0);
    setActiveRiskId(null);
  };

  // Mock download function for the summary
  const handleDownloadSummary = () => {
    if (!data) return;

    // Create formatted text content
    const reportContent = `
LEGAL LENS - CONTRACT ANALYSIS REPORT
=====================================
File Name: ${data.fileName}
Date: ${new Date().toLocaleDateString()}

SUMMARY POINTS:
---------------
${data.summary.map(s => `[x] ${s}`).join('\n')}

RISK ASSESSMENT:
----------------
${data.risks.map(r => `
[${r.type.toUpperCase()} RISK] ${r.title}
Category: ${r.category}
Explanation: ${r.explanation}
Snippet: "${r.snippet}"
`).join('')}
    `.trim();

    // Create blob and trigger download
    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Summary_${data.fileName}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <>
      {/* Dynamic Scrollbar Styles for Dark/Light Mode Integration */}
      <style>{`
        ::-webkit-scrollbar { width: 10px; height: 10px; }
        ::-webkit-scrollbar-track { background: ${isDarkMode ? '#0f172a' : '#f1f5f9'}; }
        ::-webkit-scrollbar-thumb { background: ${isDarkMode ? '#334155' : '#cbd5e1'}; border-radius: 5px; border: 2px solid ${isDarkMode ? '#0f172a' : '#f1f5f9'}; }
        ::-webkit-scrollbar-thumb:hover { background: ${isDarkMode ? '#475569' : '#94a3b8'}; }
        * { scrollbar-width: thin; scrollbar-color: ${isDarkMode ? '#334155 #0f172a' : '#cbd5e1 #f1f5f9'}; }
      `}</style>

      <div
        className={`min-h-screen transition-colors duration-300 ease-in-out ${isDarkMode ? 'dark bg-slate-950' : 'bg-slate-50'}`}
        style={{ colorScheme: isDarkMode ? 'dark' : 'light' }}
      >
        <Navbar isDarkMode={isDarkMode} toggleTheme={toggleTheme} reset={handleReset} status={status} />

        <main className="max-w-7xl mx-auto px-4 py-8">

          {/* Render HeroSection during idle, uploading, AND analyzing states to keep the headline visible */}
          {status !== 'complete' && (
            <HeroSection onUpload={handleFileUpload} status={status} progress={uploadProgress} />
          )}

          {status === 'complete' && data && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-[calc(100vh-8rem)] animate-in fade-in slide-in-from-bottom-8 duration-700">
              {/* LEFT COLUMN: INTELLIGENCE */}
              <div className="md:col-span-4 flex flex-col gap-6 h-full overflow-y-auto pr-2 pb-10 scrollbar-hide">
                <SummaryCard summary={data.summary} onDownload={handleDownloadSummary} />
                <RiskList
                  risks={data.risks}
                  activeRiskId={activeRiskId}
                  onRiskClick={scrollToRisk}
                />
              </div>

              {/* RIGHT COLUMN: EVIDENCE */}
              <DocumentViewer
                data={data}
                activeRiskId={activeRiskId}
                setActiveRiskId={setActiveRiskId}
              />
            </div>
          )}
        </main>
      </div>
    </>
  );
}