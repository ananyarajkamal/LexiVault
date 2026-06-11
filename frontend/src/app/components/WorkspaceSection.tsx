import React, { useState, useRef, useEffect } from 'react';
import {
  Upload, MessageSquare, ShieldAlert, FileText, Sparkles,
  GitCompareArrows, Search, Send, Loader2, Trash2, AlertTriangle,
  CheckCircle2, XCircle, Scale, Diff
} from 'lucide-react';

const workspaceTranslations = {
  en: {
    title: "Try LexiVault Now",
    subtitle: "Upload documents, ask questions, analyze risks - all in one place.",
    uploadTab: "Upload",
    chatTab: "Chat",
    risksTab: "Risk Analysis",
    plainTab: "Plain Language",
    briefTab: "Decision Brief",
    redlineTab: "Redline Compare",
    contraTab: "Contradictions",
    uploadHeader: "Upload Documents",
    uploadSub: "Upload PDF contracts to start analysis. Supports multiple files.",
    uploadClick: "Click to upload or drag and drop",
    pdfOnly: "PDF files only",
    uploadedDocs: "Uploaded Documents",
    successMsg: "Indexed successfully",
    uploadingMsg: "Uploading & indexing...",
    chatHeader: "Ask LexiVault",
    chatSub: "Ask questions in English or Hindi about your uploaded documents",
    clearBtn: "Clear",
    placeholderChat: "Ask about your documents...",
    thinking: "Thinking...",
    noDocsChat: "Upload documents first, then ask anything.",
    risksHeader: "Risk Analysis",
    risksSub: "AI-powered clause extraction and risk scoring with Wolfram legal context",
    analyzeBtn: "Analyze Risks",
    analyzingBtn: "Analyzing...",
    noRisks: "Upload documents first. Click \"Analyze Risks\" to start.",
    wolframHeader: "Wolfram Legal Context",
    highRisk: "High Risk",
    medRisk: "Medium Risk",
    lowRisk: "Low Risk",
    plainHeader: "Plain Language Translator",
    plainSub: "Paste any complex legal clause and get a simple one-sentence explanation",
    langLabel: "Language:",
    placeholderPlain: "Paste a complex legal clause here...",
    explainBtn: "Explain in Plain Language",
    explainingBtn: "Explaining...",
    plainResultHeader: "Plain Language Explanation",
    briefHeader: "Decision Brief Generator",
    briefSub: "Generate a structured cross-document summary with risks and recommendations",
    generateBriefBtn: "Generate Brief",
    generatingBriefBtn: "Generating...",
    noBrief: "Upload documents first. Click \"Generate Brief\" to create a summary.",
    redlineHeader: "Contract Redline Autopilot",
    redlineSub: "Upload two versions of the same document to compare changes and assess impact",
    ver1Label: "Version 1 (Original)",
    ver2Label: "Version 2 (Revised)",
    compareBtn: "Compare Versions",
    comparingBtn: "Comparing...",
    contraHeader: "Contradiction Detector",
    contraSub: "Find conflicts across multiple uploaded documents (requires 2+ documents)",
    detectBtn: "Detect Contradictions",
    detectingBtn: "Detecting...",
    noContra: "Upload at least 2 documents to detect contradictions. Click \"Detect Contradictions\" to find conflicts.",
    negotiationTab: "Negotiation Sandbox",
    semanticDiffTab: "Semantic Diff",
    negotiationHeader: "AI Negotiation Sandbox",
    negotiationSub: "Simulate a contract clause debate between Buyer and Seller counsel to see a compromise",
    semanticDiffHeader: "Semantic Diff Analyzer",
    semanticDiffSub: "Compare two clauses to see character changes, semantic similarity, and AI shift analysis",
    buyerLabel: "Buyer Stance",
    sellerLabel: "Seller Stance",
    clauseTypeLabel: "Clause Focus",
    simulateBtn: "Simulate Negotiation",
    simulatingBtn: "Negotiating...",
    compromiseResultHeader: "Mediated Compromise Clause",
    explanationHeader: "Mediator Explanation",
    runDiffBtn: "Run Semantic Diff",
    runningDiffBtn: "Analyzing...",
    semanticMatchHeader: "Semantic Similarity Score",
    literalDiffHeader: "Literal Text Comparison",
    shiftExplanationHeader: "AI Legal Shift Audit"
  },
  hi: {
    title: "लेक्सीवॉल्ट का अभी प्रयास करें",
    subtitle: "दस्तावेज़ अपलोड करें, प्रश्न पूछें, जोखिमों का विश्लेषण करें - सब एक ही स्थान पर।",
    uploadTab: "अपलोड",
    chatTab: "चैट",
    risksTab: "जोखिम विश्लेषण",
    plainTab: "सरल भाषा",
    briefTab: "निर्णय संक्षिप्त",
    redlineTab: "रेडलाइन तुलना",
    contraTab: "विरोधाभास",
    uploadHeader: "दस्तावेज़ अपलोड करें",
    uploadSub: "विश्लेषण शुरू करने के लिए पीडीएफ अनुबंध अपलोड करें। कई दस्तावेजों का समर्थन करता है।",
    uploadClick: "अपलोड करने के लिए क्लिक करें या खींचकर छोड़ें",
    pdfOnly: "केवल पीडीएफ फाइलें",
    uploadedDocs: "अपलोड किए गए दस्तावेज़",
    successMsg: "सफलतापूर्वक अनुक्रमित किया गया",
    uploadingMsg: "अपलोड और अनुक्रमण जारी है...",
    chatHeader: "लेक्सीवॉल्ट से पूछें",
    chatSub: "अपने अपलोड किए गए दस्तावेजों के बारे में अंग्रेजी या हिंदी में प्रश्न पूछें",
    clearBtn: "साफ़ करें",
    placeholderChat: "अपने दस्तावेजों के बारे में पूछें...",
    thinking: "सोच रहा हूँ...",
    noDocsChat: "पहले दस्तावेज़ अपलोड करें, फिर कुछ भी पूछें।",
    risksHeader: "जोखिम विश्लेषण",
    risksSub: "वोल्फ्राम कानूनी संदर्भ के साथ एआई-संचालित खंड निष्कर्षण और जोखिम स्कोरिंग",
    analyzeBtn: "जोखिमों का विश्लेषण करें",
    analyzingBtn: "विश्लेषण हो रहा है...",
    noRisks: "पहले दस्तावेज़ अपलोड करें। शुरू करने के लिए \"जोखिमों का विश्लेषण करें\" पर क्लिक करें।",
    wolframHeader: "वोल्फ्राम कानूनी संदर्भ",
    highRisk: "उच्च जोखिम",
    medRisk: "मध्यम जोखिम",
    lowRisk: "कम जोखिम",
    plainHeader: "सरल भाषा अनुवादक",
    plainSub: "किसी भी जटिल कानूनी खंड को पेस्ट करें और एक सरल स्पष्टीकरण प्राप्त करें",
    langLabel: "भाषा:",
    placeholderPlain: "यहाँ एक जटिल कानूनी खंड पेस्ट करें...",
    explainBtn: "सरल भाषा में समझाएं",
    explainingBtn: "समझाया जा रहा है...",
    plainResultHeader: "सरल भाषा स्पष्टीकरण",
    briefHeader: "निर्णय संक्षिप्त जनरेटर",
    briefSub: "जोखिमों और सिफारिशों के साथ एक संरचित क्रॉस-दस्तावेज़ सारांश उत्पन्न करें",
    generateBriefBtn: "संक्षिप्त विवरण बनाएं",
    generatingBriefBtn: "बनाया जा रहा है...",
    noBrief: "पहले दस्तावेज़ अपलोड करें। सारांश बनाने के लिए \"संक्षिप्त विवरण बनाएं\" पर क्लिक करें।",
    redlineHeader: "अनुबंध रेडलाइन ऑटोपायलट",
    redlineSub: "परिवर्तनों की तुलना करने और प्रभाव का आकलन करने के लिए एक ही दस्तावेज़ के दो संस्करण अपलोड करें",
    ver1Label: "संस्करण 1 (मूल)",
    ver2Label: "संस्करण 2 (संशोधित)",
    compareBtn: "संस्करणों की तुलना करें",
    comparingBtn: "तुलना हो रही है...",
    contraHeader: "विरोधाभास डिटेक्टर",
    contraSub: "अपलोड किए गए कई दस्तावेजों में संघर्ष खोजें (कम से कम 2 दस्तावेजों की आवश्यकता है)",
    detectBtn: "विरोधाभासों का पता लगाएं",
    detectingBtn: "पता लगाया जा रहा है...",
    noContra: "विरोधाभासों का पता लगाने के लिए कम से कम 2 दस्तावेज़ अपलोड करें। संघर्षों को खोजने के लिए \"विरोधाभासों का पता लगाएं\" पर क्लिक करें।",
    negotiationTab: "वार्ता सैंडबॉक्स",
    semanticDiffTab: "शब्दार्थ अंतर",
    negotiationHeader: "एआई वार्ता सैंडबॉक्स",
    negotiationSub: "एक समझौता देखने के लिए खरीदार और विक्रेता वकील के बीच एक खंड बहस का अनुकरण करें",
    semanticDiffHeader: "शब्दार्थ अंतर विश्लेषक",
    semanticDiffSub: "चरित्र परिवर्तन, शब्दार्थ समानता और एआई परिवर्तन विश्लेषण देखने के लिए दो खंडों की तुलना करें",
    buyerLabel: "खरीदार का रुख",
    sellerLabel: "विक्रेता का रुख",
    clauseTypeLabel: "खंड फोकस",
    simulateBtn: "वार्ता का अनुकरण करें",
    simulatingBtn: "वार्ता जारी...",
    compromiseResultHeader: "मध्यस्थता समझौता खंड",
    explanationHeader: "मध्यस्थ का स्पष्टीकरण",
    runDiffBtn: "शब्दार्थ अंतर चलाएं",
    runningDiffBtn: "विश्लेषण जारी...",
    semanticMatchHeader: "शब्दार्थ समानता स्कोर",
    literalDiffHeader: "शाब्दिक पाठ तुलना",
    shiftExplanationHeader: "एआई कानूनी बदलाव ऑडिट"
  }
};

const API_BASE = `http://${window.location.hostname}:8000/api`;

type Tab = 'upload' | 'chat' | 'risks' | 'plain' | 'brief' | 'redline' | 'contradictions' | 'negotiation' | 'semanticDiff';

export default function WorkspaceSection({ globalLanguage }: { globalLanguage: 'en' | 'hi' }) {
  const t = workspaceTranslations[globalLanguage];

  const tabs: { id: Tab; label: string; icon: any }[] = [
    { id: 'upload', label: t.uploadTab, icon: Upload },
    { id: 'chat', label: t.chatTab, icon: MessageSquare },
    { id: 'risks', label: t.risksTab, icon: ShieldAlert },
    { id: 'plain', label: t.plainTab, icon: FileText },
    { id: 'brief', label: t.briefTab, icon: Sparkles },
    { id: 'redline', label: t.redlineTab, icon: GitCompareArrows },
    { id: 'contradictions', label: t.contraTab, icon: Search },
    { id: 'negotiation', label: t.negotiationTab, icon: Scale },
    { id: 'semanticDiff', label: t.semanticDiffTab, icon: Diff },
  ];

  const [activeTab, setActiveTab] = useState<Tab>('upload');

  // Upload state
  const [isUploading, setIsUploading] = useState(false);
  const [documents, setDocuments] = useState<any[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Chat state
  const [chatInput, setChatInput] = useState('');
  const [chatHistory, setChatHistory] = useState<{ role: string; content: string; sources?: string[] }[]>([]);
  const [isAsking, setIsAsking] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Risks state
  const [risks, setRisks] = useState<any[]>([]);
  const [wolframCtx, setWolframCtx] = useState<any[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Plain language state
  const [clauseInput, setClauseInput] = useState('');
  const [plainLang, setPlainLang] = useState('English');
  const [plainResult, setPlainResult] = useState('');
  const [isExplaining, setIsExplaining] = useState(false);

  // Decision brief state
  const [briefLang, setBriefLang] = useState('English');
  const [briefResult, setBriefResult] = useState('');
  const [isBriefing, setIsBriefing] = useState(false);

  // Redline state
  const [redlineV1, setRedlineV1] = useState<File | null>(null);
  const [redlineV2, setRedlineV2] = useState<File | null>(null);
  const [redlineLang, setRedlineLang] = useState('English');
  const [redlineResult, setRedlineResult] = useState('');
  const [isRedlining, setIsRedlining] = useState(false);

  // Contradictions state
  const [contraLang, setContraLang] = useState('English');
  const [contraResult, setContraResult] = useState('');
  const [isDetecting, setIsDetecting] = useState(false);

  // Negotiation Sandbox state
  const [negotiationText, setNegotiationText] = useState('');
  const [negotiationClauseType, setNegotiationClauseType] = useState('Limitation of Liability');
  const [buyerStance, setBuyerStance] = useState('Conservative');
  const [sellerStance, setSellerStance] = useState('Aggressive');
  const [negotiationLang, setNegotiationLang] = useState('English');
  const [negotiationTranscript, setNegotiationTranscript] = useState<any[]>([]);
  const [negotiationCompromise, setNegotiationCompromise] = useState('');
  const [negotiationExplanation, setNegotiationExplanation] = useState('');
  const [isNegotiating, setIsNegotiating] = useState(false);

  // Semantic Diff state
  const [diffTextV1, setDiffTextV1] = useState('');
  const [diffTextV2, setDiffTextV2] = useState('');
  const [diffLang, setDiffLang] = useState('English');
  const [diffSimilarity, setDiffSimilarity] = useState<number | null>(null);
  const [diffExplanation, setDiffExplanation] = useState('');
  const [isDiffing, setIsDiffing] = useState(false);

  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [chatHistory]);

  useEffect(() => {
    const l = globalLanguage === 'hi' ? 'Hindi' : 'English';
    setPlainLang(l);
    setBriefLang(l);
    setRedlineLang(l);
    setContraLang(l);
    setNegotiationLang(l);
    setDiffLang(l);
  }, [globalLanguage]);

  // ---- API Handlers ----

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    setIsUploading(true);
    const formData = new FormData();
    for (let i = 0; i < e.target.files.length; i++) formData.append('files', e.target.files[i]);
    try {
      const res = await fetch(`${API_BASE}/upload`, { method: 'POST', body: formData });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || 'Upload failed');
      const newDocs = data.results.map((r: any) => ({
        name: r.file, status: r.status, namespace: r.namespace,
        message: r.message || (r.status === 'success' ? t.successMsg : 'Failed'),
      }));
      setDocuments(prev => [...newDocs, ...prev]);
    } catch (err: any) { alert('Upload error: ' + err.message); }
    finally { setIsUploading(false); if (fileInputRef.current) fileInputRef.current.value = ''; }
  };

  const handleAsk = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || isAsking) return;
    const q = chatInput.trim();
    setChatInput('');
    setChatHistory(prev => [...prev, { role: 'user', content: q }]);
    setIsAsking(true);
    try {
      const res = await fetch(`${API_BASE}/ask`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: q }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || 'Error');
      setChatHistory(prev => [...prev, { role: 'assistant', content: data.answer, sources: data.sources }]);
    } catch (err: any) {
      setChatHistory(prev => [...prev, { role: 'assistant', content: `❌ ${err.message}` }]);
    } finally { setIsAsking(false); }
  };

  const handleClearChat = async () => {
    try { await fetch(`${API_BASE}/clear-chat`, { method: 'POST' }); } catch {}
    setChatHistory([]);
  };

  const handleRisks = async () => {
    setIsAnalyzing(true);
    try {
      const res = await fetch(`${API_BASE}/risks`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || 'Error');
      setRisks(data.risks || []);
      setWolframCtx(data.wolfram_context || []);
    } catch (err: any) { alert('Risk analysis error: ' + err.message); }
    finally { setIsAnalyzing(false); }
  };

  const handlePlainLanguage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clauseInput.trim()) return;
    setIsExplaining(true);
    try {
      const res = await fetch(`${API_BASE}/features/plain-language`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ clause_text: clauseInput, language: plainLang }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || 'Error');
      setPlainResult(data.explanation);
    } catch (err: any) { setPlainResult('❌ ' + err.message); }
    finally { setIsExplaining(false); }
  };

  const handleBrief = async () => {
    setIsBriefing(true);
    try {
      const res = await fetch(`${API_BASE}/features/decision-brief`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ language: briefLang }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || 'Error');
      setBriefResult(data.brief);
    } catch (err: any) { setBriefResult('❌ ' + err.message); }
    finally { setIsBriefing(false); }
  };

  const handleRedline = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!redlineV1 || !redlineV2) return;
    setIsRedlining(true);
    const formData = new FormData();
    formData.append('file_v1', redlineV1);
    formData.append('file_v2', redlineV2);
    formData.append('language', redlineLang);
    try {
      const res = await fetch(`${API_BASE}/features/redline`, { method: 'POST', body: formData });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || 'Error');
      setRedlineResult(data.redline);
    } catch (err: any) { setRedlineResult('❌ ' + err.message); }
    finally { setIsRedlining(false); }
  };

  const handleContradictions = async () => {
    setIsDetecting(true);
    try {
      const res = await fetch(`${API_BASE}/features/contradictions`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ language: contraLang }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || 'Error');
      setContraResult(data.contradictions);
    } catch (err: any) { setContraResult('❌ ' + err.message); }
    finally { setIsDetecting(false); }
  };

  const handleNegotiation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!negotiationText.trim()) return;
    setIsNegotiating(true);
    setNegotiationTranscript([]);
    setNegotiationCompromise('');
    setNegotiationExplanation('');
    try {
      const res = await fetch(`${API_BASE}/features/negotiate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clause_text: negotiationText,
          clause_type: negotiationClauseType,
          buyer_stance: buyerStance,
          seller_stance: sellerStance,
          language: negotiationLang,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || 'Error');
      setNegotiationTranscript(data.transcript || []);
      setNegotiationCompromise(data.compromise_clause || '');
      setNegotiationExplanation(data.explanation || '');
    } catch (err: any) {
      setNegotiationExplanation('❌ ' + err.message);
    } finally {
      setIsNegotiating(false);
    }
  };

  const handleSemanticDiff = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!diffTextV1.trim() || !diffTextV2.trim()) return;
    setIsDiffing(true);
    setDiffSimilarity(null);
    setDiffExplanation('');
    try {
      const res = await fetch(`${API_BASE}/features/semantic-diff`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text_v1: diffTextV1,
          text_v2: diffTextV2,
          language: diffLang,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || 'Error');
      setDiffSimilarity(data.similarity_score);
      setDiffExplanation(data.explanation || '');
    } catch (err: any) {
      setDiffExplanation('❌ ' + err.message);
    } finally {
      setIsDiffing(false);
    }
  };

  // ---- Language selector helper (Updated with Hinglish) ----
  const LangSelect = ({ value, onChange }: { value: string; onChange: (v: string) => void }) => (
    <select value={value} onChange={e => onChange(e.target.value)}
      className="border border-neutral-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:border-[#092E26] cursor-pointer font-medium text-neutral-800">
      <option value="English">English</option>
      <option value="Hindi">Hindi</option>
      <option value="Hinglish">Hinglish</option>
    </select>
  );

  // ---- Helper to format text (remove raw ** and render bold) ----
  const renderFormattedText = (text: string) => {
    if (!text) return null;
    const lines = text.split('\n');
    return lines.map((line, idx) => {
      const parts = line.split(/\*\*([^*]+)\*\*/g);
      return (
        <React.Fragment key={idx}>
          {parts.map((part, i) => i % 2 === 1 ? <strong key={i} className="font-bold text-[#092E26]">{part}</strong> : part)}
          {idx < lines.length - 1 && <br />}
        </React.Fragment>
      );
    });
  };

  // ---- Tab content renderers ----

  const renderUpload = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold text-neutral-900 mb-1">{t.uploadHeader}</h3>
        <p className="text-sm text-neutral-500">{t.uploadSub}</p>
      </div>
      <input type="file" multiple accept=".pdf" className="hidden" ref={fileInputRef} onChange={handleUpload} />
      <div
        onClick={() => fileInputRef.current?.click()}
        className="border-2 border-dashed border-neutral-300 hover:border-[#092E26] rounded-2xl p-10 text-center cursor-pointer transition-colors group bg-neutral-50 hover:bg-[#092E26]/5"
      >
        <Upload className="w-10 h-10 text-neutral-400 group-hover:text-[#092E26] mx-auto mb-3 transition-colors" />
        {isUploading ? (
          <div className="flex items-center justify-center gap-2 text-[#092E26] font-semibold">
            <Loader2 className="w-4 h-4 animate-spin" /> {t.uploadingMsg}
          </div>
        ) : (
          <>
            <p className="text-sm font-semibold text-neutral-700 group-hover:text-[#092E26] transition-colors">
              {t.uploadClick}
            </p>
            <p className="text-xs text-neutral-400 mt-1">{t.pdfOnly}</p>
          </>
        )}
      </div>
      {documents.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-neutral-700">{t.uploadedDocs} ({documents.length})</h4>
          {documents.map((doc, i) => (
            <div key={i} className="flex items-center gap-3 p-3 bg-neutral-50 rounded-xl border border-neutral-100">
              {doc.status === 'success'
                ? <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                : <XCircle className="w-5 h-5 text-red-500 shrink-0" />}
              <div className="min-w-0 flex-1">
                <div className="text-sm font-medium text-neutral-800 truncate">{doc.name}</div>
                <div className="text-xs text-neutral-400">{doc.message}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderChat = () => (
    <div className="flex flex-col h-[500px]">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-bold text-neutral-900">{t.chatHeader}</h3>
          <p className="text-xs text-neutral-500">{t.chatSub}</p>
        </div>
        <button onClick={handleClearChat} className="text-xs text-neutral-500 hover:text-red-500 flex items-center gap-1 cursor-pointer">
          <Trash2 className="w-3.5 h-3.5" /> {t.clearBtn}
        </button>
      </div>
      <div className="flex-1 overflow-y-auto space-y-4 pr-2 mb-4">
        {chatHistory.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-neutral-400">
            <MessageSquare className="w-10 h-10 mb-3 opacity-40 text-[#092E26]" />
            <p className="text-sm">{t.noDocsChat}</p>
          </div>
        )}
        {chatHistory.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
              msg.role === 'user'
                ? 'bg-[#092E26] text-white rounded-br-md'
                : 'bg-neutral-100 text-neutral-800 rounded-bl-md'
            }`}>
              <div className="whitespace-pre-wrap">{renderFormattedText(msg.content)}</div>
              {msg.sources && msg.sources.length > 0 && (
                <div className="mt-2 pt-2 border-t border-neutral-200/50 text-[10px] text-neutral-400">
                  Sources: {msg.sources.length} chunks referenced
                </div>
              )}
            </div>
          </div>
        ))}
        {isAsking && (
          <div className="flex justify-start">
            <div className="bg-neutral-100 rounded-2xl rounded-bl-md px-4 py-3 flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin text-[#092E26]" />
              <span className="text-sm text-neutral-500">{t.thinking}</span>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>
      <form onSubmit={handleAsk} className="flex gap-2">
        <input type="text" value={chatInput} onChange={e => setChatInput(e.target.value)}
          placeholder={t.placeholderChat}
          disabled={documents.length === 0}
          className="flex-1 border border-neutral-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#092E26] disabled:opacity-50 disabled:cursor-not-allowed" />
        <button type="submit" disabled={!chatInput.trim() || isAsking || documents.length === 0}
          className="w-11 h-11 bg-[#092E26] hover:bg-[#051C17] disabled:bg-neutral-200 text-white rounded-xl flex items-center justify-center transition-colors cursor-pointer disabled:cursor-not-allowed shrink-0">
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );

  const renderRisks = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-neutral-900">{t.risksHeader}</h3>
          <p className="text-xs text-neutral-500">{t.risksSub}</p>
        </div>
        <button onClick={handleRisks} disabled={isAnalyzing || documents.length === 0}
          className="bg-[#092E26] hover:bg-[#051C17] disabled:bg-neutral-200 text-white text-sm font-semibold px-5 py-2.5 rounded-lg flex items-center gap-2 transition-colors cursor-pointer disabled:cursor-not-allowed">
          {isAnalyzing ? <Loader2 className="w-4 h-4 animate-spin" /> : <ShieldAlert className="w-4 h-4" />}
          {isAnalyzing ? t.analyzingBtn : t.analyzeBtn}
        </button>
      </div>
      {risks.length === 0 ? (
        <div className="text-center py-16 text-neutral-400">
          <ShieldAlert className="w-10 h-10 mx-auto mb-3 opacity-40" />
          <p className="text-sm">{documents.length === 0 ? t.noDocsChat : t.noRisks}</p>
        </div>
      ) : (
        <div className="space-y-4">
          {(['High', 'Medium', 'Low'] as const).map(level => {
            const items = risks.filter(r => r.risk_level === level);
            if (items.length === 0) return null;
            const colors = { High: 'border-red-200 bg-red-50', Medium: 'border-amber-200 bg-amber-50', Low: 'border-green-200 bg-green-50' };
            const textColors = { High: 'text-red-600', Medium: 'text-amber-600', Low: 'text-green-600' };
            const badgeColors = { High: 'bg-red-100 text-red-700', Medium: 'bg-amber-100 text-amber-700', Low: 'bg-green-100 text-green-700' };
            const levelLabel = level === 'High' ? t.highRisk : level === 'Medium' ? t.medRisk : t.lowRisk;
            return (
              <div key={level} className={`rounded-xl border p-4 ${colors[level]}`}>
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className={`w-4 h-4 ${textColors[level]}`} />
                  <span className={`font-bold text-sm ${textColors[level]}`}>{levelLabel} ({items.length})</span>
                </div>
                <div className="space-y-2">
                  {items.map((r: any, i: number) => (
                    <div key={i} className="bg-white rounded-lg p-3 border border-neutral-100">
                      <div className="flex justify-between items-start gap-2 mb-1">
                        <span className="text-sm font-semibold text-neutral-800">{r.clause_name}</span>
                        <span className={`text-[10px] font-bold rounded-full px-2 py-0.5 shrink-0 ${badgeColors[level]}`}>{levelLabel}</span>
                      </div>
                      <p className="text-xs text-neutral-600 leading-relaxed">{r.value}</p>
                      <p className="text-[10px] text-neutral-400 mt-1">Document: {r.document}</p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
          {wolframCtx.length > 0 && (
            <div className="rounded-xl border border-[#092E26]/20 bg-[#092E26]/5 p-4">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-4 h-4 text-[#092E26]" />
                <span className="font-bold text-sm text-[#092E26]">{t.wolframHeader}</span>
              </div>
              {wolframCtx.map((w: any, i: number) => (
                <div key={i} className="bg-white rounded-lg p-3 border border-neutral-100 mb-2 last:mb-0">
                  <div className="text-sm font-semibold text-neutral-800">{w.clause} ({w.document})</div>
                  <p className="text-xs text-neutral-600 mt-1">{w.context}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );

  const renderPlainLanguage = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold text-neutral-900">{t.plainHeader}</h3>
        <p className="text-xs text-neutral-500">{t.plainSub}</p>
      </div>
      <form onSubmit={handlePlainLanguage} className="space-y-4">
        <div className="flex items-center gap-3">
          <label className="text-sm font-medium text-neutral-700">{t.langLabel}</label>
          <LangSelect value={plainLang} onChange={setPlainLang} />
        </div>
        <textarea value={clauseInput} onChange={e => setClauseInput(e.target.value)}
          placeholder={t.placeholderPlain}
          className="w-full border border-neutral-200 rounded-xl px-4 py-3 text-sm h-32 resize-none focus:outline-none focus:border-[#092E26]" />
        <button type="submit" disabled={!clauseInput.trim() || isExplaining}
          className="bg-[#092E26] hover:bg-[#051C17] text-white text-sm font-semibold px-6 py-2.5 rounded-lg flex items-center gap-2 transition-colors cursor-pointer disabled:cursor-not-allowed">
          {isExplaining ? <Loader2 className="w-4 h-4 animate-spin" /> : <FileText className="w-4 h-4" />}
          {isExplaining ? t.explainingBtn : t.explainBtn}
        </button>
      </form>
      {plainResult && (
        <div className="bg-[#092E26]/5 border border-[#092E26]/20 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-[#092E26]" />
            <span className="font-bold text-sm text-[#092E26]">{t.plainResultHeader}</span>
          </div>
          <div className="text-sm text-neutral-700 leading-relaxed whitespace-pre-wrap">{renderFormattedText(plainResult)}</div>
        </div>
      )}
    </div>
  );

  const renderBrief = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold text-neutral-900">{t.briefHeader}</h3>
        <p className="text-xs text-neutral-500">{t.briefSub}</p>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          <label className="text-sm font-medium text-neutral-700">{t.langLabel}</label>
          <LangSelect value={briefLang} onChange={setBriefLang} />
        </div>
        <button onClick={handleBrief} disabled={isBriefing || documents.length === 0}
          className="bg-[#092E26] hover:bg-[#051C17] text-white text-sm font-semibold px-6 py-2.5 rounded-lg flex items-center gap-2 transition-colors cursor-pointer disabled:cursor-not-allowed">
          {isBriefing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
          {isBriefing ? t.generatingBriefBtn : t.generateBriefBtn}
        </button>
      </div>
      {briefResult ? (
        <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-6">
          <div className="text-sm text-neutral-700 leading-relaxed whitespace-pre-wrap">{renderFormattedText(briefResult)}</div>
        </div>
      ) : (
        <div className="text-center py-16 text-neutral-400">
          <Sparkles className="w-10 h-10 mx-auto mb-3 opacity-40" />
          <p className="text-sm">{documents.length === 0 ? t.noDocsChat : t.noBrief}</p>
        </div>
      )}
    </div>
  );

  const renderRedline = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold text-neutral-900">{t.redlineHeader}</h3>
        <p className="text-xs text-neutral-500">{t.redlineSub}</p>
      </div>
      <form onSubmit={handleRedline} className="space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-neutral-700 mb-1.5 block">{t.ver1Label}</label>
            <input type="file" accept=".pdf" onChange={e => e.target.files?.[0] && setRedlineV1(e.target.files[0])}
              className="w-full text-sm border border-neutral-200 rounded-lg p-2 file:mr-3 file:py-1 file:px-3 file:rounded-md file:border-0 file:bg-[#092E26]/10 file:text-[#092E26] file:font-semibold file:text-xs file:cursor-pointer" />
          </div>
          <div>
            <label className="text-sm font-medium text-neutral-700 mb-1.5 block">{t.ver2Label}</label>
            <input type="file" accept=".pdf" onChange={e => e.target.files?.[0] && setRedlineV2(e.target.files[0])}
              className="w-full text-sm border border-neutral-200 rounded-lg p-2 file:mr-3 file:py-1 file:px-3 file:rounded-md file:border-0 file:bg-[#092E26]/10 file:text-[#092E26] file:font-semibold file:text-xs file:cursor-pointer" />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <label className="text-sm font-medium text-neutral-700">{t.langLabel}</label>
            <LangSelect value={redlineLang} onChange={setRedlineLang} />
          </div>
          <button type="submit" disabled={!redlineV1 || !redlineV2 || isRedlining}
            className="bg-[#092E26] hover:bg-[#051C17] text-white text-sm font-semibold px-6 py-2.5 rounded-lg flex items-center gap-2 transition-colors cursor-pointer disabled:cursor-not-allowed">
            {isRedlining ? <Loader2 className="w-4 h-4 animate-spin" /> : <GitCompareArrows className="w-4 h-4" />}
            {isRedlining ? t.comparingBtn : t.compareBtn}
          </button>
        </div>
      </form>
      {redlineResult && (
        <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-6">
          <div className="text-sm text-neutral-700 leading-relaxed whitespace-pre-wrap">{renderFormattedText(redlineResult)}</div>
        </div>
      )}
    </div>
  );

  const renderContradictions = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold text-neutral-900">{t.contraHeader}</h3>
        <p className="text-xs text-neutral-500">{t.contraSub}</p>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          <label className="text-sm font-medium text-neutral-700">{t.langLabel}</label>
          <LangSelect value={contraLang} onChange={setContraLang} />
        </div>
        <button onClick={handleContradictions} disabled={isDetecting || documents.filter(d => d.status === 'success').length < 2}
          className="bg-[#092E26] hover:bg-[#051C17] text-white text-sm font-semibold px-6 py-2.5 rounded-lg flex items-center gap-2 transition-colors cursor-pointer disabled:cursor-not-allowed">
          {isDetecting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
          {isDetecting ? t.detectingBtn : t.detectBtn}
        </button>
      </div>
      {contraResult ? (
        <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-6">
          <div className="text-sm text-neutral-700 leading-relaxed whitespace-pre-wrap">{renderFormattedText(contraResult)}</div>
        </div>
      ) : (
        <div className="text-center py-16 text-neutral-400">
          <Search className="w-10 h-10 mx-auto mb-3 opacity-40" />
          <p className="text-sm">
            {documents.filter(d => d.status === 'success').length < 2
              ? t.noContra
              : t.detectBtn}
          </p>
        </div>
      )}
    </div>
  );

  const renderNegotiation = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-neutral-900">{t.negotiationHeader}</h3>
          <p className="text-xs text-neutral-500">{t.negotiationSub}</p>
        </div>
      </div>
      <form onSubmit={handleNegotiation} className="space-y-4">
        <div className="grid sm:grid-cols-3 gap-4">
          <div>
            <label className="text-xs font-semibold text-neutral-600 block mb-1.5">{t.clauseTypeLabel}</label>
            <select value={negotiationClauseType} onChange={e => setNegotiationClauseType(e.target.value)}
              className="w-full border border-neutral-200 rounded-lg p-2.5 text-sm bg-white focus:outline-none focus:border-[#092E26] cursor-pointer">
              <option value="Limitation of Liability">Limitation of Liability</option>
              <option value="Indemnification">Indemnification</option>
              <option value="IP Ownership">Intellectual Property</option>
              <option value="Termination">Termination Rights</option>
              <option value="Governing Law">Governing Law</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold text-neutral-600 block mb-1.5">{t.buyerLabel}</label>
            <select value={buyerStance} onChange={e => setBuyerStance(e.target.value)}
              className="w-full border border-neutral-200 rounded-lg p-2.5 text-sm bg-white focus:outline-none focus:border-[#092E26] cursor-pointer">
              <option value="Conservative (Protects Buyer strictly)">Conservative</option>
              <option value="Standard (Balanced risk)">Standard</option>
              <option value="Aggressive (Pushes liability onto Seller)">Aggressive</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold text-neutral-600 block mb-1.5">{t.sellerLabel}</label>
            <select value={sellerStance} onChange={e => setSellerStance(e.target.value)}
              className="w-full border border-neutral-200 rounded-lg p-2.5 text-sm bg-white focus:outline-none focus:border-[#092E26] cursor-pointer">
              <option value="Conservative (Protects Seller strictly)">Conservative</option>
              <option value="Standard (Balanced risk)">Standard</option>
              <option value="Aggressive (Pushes liability onto Buyer)">Aggressive</option>
            </select>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <label className="text-sm font-medium text-neutral-700">{t.langLabel}</label>
          <LangSelect value={negotiationLang} onChange={setNegotiationLang} />
        </div>

        <div>
          <label className="text-xs font-semibold text-neutral-600 block mb-1.5">Paste Clause to Negotiate</label>
          <textarea value={negotiationText} onChange={e => setNegotiationText(e.target.value)}
            placeholder="Paste the original contract clause here..."
            className="w-full border border-neutral-200 rounded-xl px-4 py-3 text-sm h-32 resize-none focus:outline-none focus:border-[#092E26]" />
        </div>

        <button type="submit" disabled={!negotiationText.trim() || isNegotiating}
          className="bg-[#092E26] hover:bg-[#051C17] text-white text-sm font-semibold px-6 py-2.5 rounded-lg flex items-center gap-2 transition-colors cursor-pointer disabled:cursor-not-allowed">
          {isNegotiating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Scale className="w-4 h-4" />}
          {isNegotiating ? t.simulatingBtn : t.simulateBtn}
        </button>
      </form>

      {/* Transcript Simulation dialogue */}
      {negotiationTranscript.length > 0 && (
        <div className="space-y-4 border-t border-neutral-100 pt-6">
          <h4 className="text-sm font-bold text-neutral-700">Negotiation Dialogue Transcript</h4>
          <div className="space-y-3 bg-neutral-50 rounded-xl p-4 border border-neutral-150 max-h-[300px] overflow-y-auto">
            {negotiationTranscript.map((turn, i) => (
              <div key={i} className={`p-3 rounded-lg border text-xs leading-relaxed ${
                turn.role.includes("Buyer") 
                  ? "bg-blue-50/50 border-blue-100 text-blue-900 ml-4 rounded-br-none" 
                  : "bg-amber-50/50 border-amber-100 text-amber-900 mr-4 rounded-bl-none"
              }`}>
                <span className="font-bold block mb-1">{turn.role}:</span>
                <div className="whitespace-pre-wrap">{turn.message}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Final Compromise Output */}
      {(negotiationCompromise || negotiationExplanation) && (
        <div className="grid md:grid-cols-2 gap-4 border-t border-neutral-100 pt-6">
          {negotiationCompromise && (
            <div className="bg-[#092E26]/5 border border-[#092E26]/20 rounded-xl p-5">
              <h4 className="font-bold text-sm text-[#092E26] mb-2">{t.compromiseResultHeader}</h4>
              <div className="text-xs text-neutral-800 leading-relaxed whitespace-pre-wrap bg-white border border-neutral-100 p-3 rounded-lg">
                {renderFormattedText(negotiationCompromise)}
              </div>
            </div>
          )}
          {negotiationExplanation && (
            <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-5">
              <h4 className="font-bold text-sm text-neutral-700 mb-2">{t.explanationHeader}</h4>
              <div className="text-xs text-neutral-600 leading-relaxed whitespace-pre-wrap">
                {renderFormattedText(negotiationExplanation)}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );

  const renderSemanticDiff = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold text-neutral-900">{t.semanticDiffHeader}</h3>
        <p className="text-xs text-neutral-500">{t.semanticDiffSub}</p>
      </div>
      <form onSubmit={handleSemanticDiff} className="space-y-4">
        <div className="flex items-center gap-3">
          <label className="text-sm font-medium text-neutral-700">{t.langLabel}</label>
          <LangSelect value={diffLang} onChange={setDiffLang} />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-neutral-600 block mb-1.5">Version 1 (Original Text)</label>
            <textarea value={diffTextV1} onChange={e => setDiffTextV1(e.target.value)}
              placeholder="Paste original clause or wording..."
              className="w-full border border-neutral-200 rounded-xl px-4 py-3 text-sm h-36 resize-none focus:outline-none focus:border-[#092E26]" />
          </div>
          <div>
            <label className="text-xs font-semibold text-neutral-600 block mb-1.5">Version 2 (Revised Text)</label>
            <textarea value={diffTextV2} onChange={e => setDiffTextV2(e.target.value)}
              placeholder="Paste revised clause or wording..."
              className="w-full border border-neutral-200 rounded-xl px-4 py-3 text-sm h-36 resize-none focus:outline-none focus:border-[#092E26]" />
          </div>
        </div>

        <button type="submit" disabled={!diffTextV1.trim() || !diffTextV2.trim() || isDiffing}
          className="bg-[#092E26] hover:bg-[#051C17] text-white text-sm font-semibold px-6 py-2.5 rounded-lg flex items-center gap-2 transition-colors cursor-pointer disabled:cursor-not-allowed">
          {isDiffing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Diff className="w-4 h-4" />}
          {isDiffing ? t.runningDiffBtn : t.runDiffBtn}
        </button>
      </form>

      {/* Similarity score & Explanation */}
      {(diffSimilarity !== null || diffExplanation) && (
        <div className="space-y-4 border-t border-neutral-100 pt-6">
          {diffSimilarity !== null && (
            <div className="flex items-center gap-4 bg-neutral-50 rounded-xl p-4 border border-neutral-150">
              <div className="shrink-0 flex items-center justify-center w-16 h-16 rounded-full border-4 border-[#092E26] bg-[#092E26]/5">
                <span className="font-bold text-base text-[#092E26]">{diffSimilarity}%</span>
              </div>
              <div>
                <h4 className="text-sm font-bold text-neutral-800">{t.semanticMatchHeader}</h4>
                <p className="text-xs text-neutral-500 mt-0.5">
                  {diffSimilarity > 90 
                    ? "Very High semantic match. The wording changed but the core legal intent/meaning is preserved." 
                    : diffSimilarity > 70 
                    ? "Moderate semantic match. Standard modifications or small obligations added/removed." 
                    : "Low semantic match. Significant legal shifts in rights, liabilities, or responsibilities detected."}
                </p>
              </div>
            </div>
          )}

          {diffExplanation && (
            <div className="bg-[#092E26]/5 border border-[#092E26]/20 rounded-xl p-5">
              <h4 className="font-bold text-sm text-[#092E26] mb-2">{t.shiftExplanationHeader}</h4>
              <div className="text-xs text-neutral-700 leading-relaxed whitespace-pre-wrap bg-white border border-neutral-100 p-3 rounded-lg">
                {renderFormattedText(diffExplanation)}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );

  const renderers = {
    upload: renderUpload, chat: renderChat, risks: renderRisks,
    plain: renderPlainLanguage, brief: renderBrief,
    redline: renderRedline, contradictions: renderContradictions,
    negotiation: renderNegotiation, semanticDiff: renderSemanticDiff,
  };

  return (
    <section id="workspace" className="py-16 sm:py-24 bg-[#F6F4F0]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <p className="text-[#092E26] font-bold text-xs tracking-[0.2em] uppercase mb-3">{t.uploadTab}</p>
          <h2 className="text-3xl sm:text-4xl font-serif font-black text-neutral-900 tracking-tight">
            {t.title}
          </h2>
          <p className="mt-3 text-neutral-500 text-sm font-sans">{t.subtitle}</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-neutral-200 overflow-hidden">
          {/* Tab bar */}
          <div className="border-b border-neutral-200 overflow-x-auto">
            <div className="flex min-w-max">
              {tabs.map(t => (
                <button key={t.id} onClick={() => setActiveTab(t.id)}
                  className={`flex items-center gap-2 px-4 sm:px-5 py-3.5 text-xs sm:text-sm font-medium whitespace-nowrap transition-colors cursor-pointer border-b-2 ${
                    activeTab === t.id
                      ? 'border-[#092E26] text-[#092E26] bg-[#092E26]/5'
                      : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:bg-neutral-50'
                  }`}>
                  <t.icon className="w-4 h-4" />
                  <span>{t.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Tab content */}
          <div className="p-5 sm:p-8">
            {renderers[activeTab]()}
          </div>
        </div>
      </div>
    </section>
  );
}
