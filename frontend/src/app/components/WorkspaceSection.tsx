import React, { useState, useRef, useEffect } from 'react';
import {
  Upload, MessageSquare, ShieldAlert, FileText, Sparkles,
  GitCompareArrows, Search, Send, Loader2, Trash2, AlertTriangle,
  CheckCircle2, XCircle, Scale, Diff, Mic, Clock, LayoutDashboard,
  Swords, Binary, Languages, Code, Maximize2, Minimize2
} from 'lucide-react';
import { LogoIcon } from './Navbar';

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
    uploadSub: "Upload PDF or Word contracts to start analysis. Supports multiple files.",
    uploadClick: "Click to upload or drag and drop",
    pdfOnly: "PDF or Word files (.docx, .doc)",
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
    negModeSelfPlay: "AI Counsel Self-Play",
    negModePushback: "Opposing Counsel Pushback",
    negModeGhostwriter: "Negotiation Ghostwriter",
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
    shiftExplanationHeader: "AI Legal Shift Audit",
    timelineTab: "Timeline",
    portfolioTab: "Portfolio",
    timelineHeader: "Lifecycle Timeline Predictor",
    timelineSub: "Analyze estimated negotiation duration, amendment frequency, renewal risks, and expiration cascades",
    portfolioHeader: "Portfolio Risk Dashboard",
    portfolioSub: "Cross-document dashboard of liabilities, concentration risk, and renewal cliffs",
    shadowTab: "The Shadow",
    shadowHeader: "AI vs. AI Contract Battle",
    shadowSub: "Watch opposing AI counsel debate the high-risk clauses in your contract in real-time.",
    residueTab: "The Residue",
    residueHeader: "Invisible Document Forensics",
    residueSub: "Extract hidden PDF metadata and check for suspect modifications to standard boilerplate text.",
    echoTab: "The Echo",
    echoHeader: "Cross-Language Legal Harmonics",
    echoSub: "Analyze cross-language semantic gaps and translation traps across English, Hindi, and Hinglish.",
    alchemyTab: "The Alchemy",
    alchemyHeader: "Contract to Code Compiler",
    alchemySub: "Extract SLA constraints (uptime, latency, resolution times) and compile them into Prometheus Alert Rules."
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
    uploadSub: "विश्लेषण शुरू करने के लिए पीडीएफ या वर्ड अनुबंध अपलोड करें। कई दस्तावेजों का समर्थन करता है।",
    uploadClick: "अपलोड करने के लिए क्लिक करें या खींचकर छोड़ें",
    pdfOnly: "केवल पीडीएफ या वर्ड फाइलें (.docx, .doc)",
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
    negModeSelfPlay: "एआई वकील सेल्फ-प्ले",
    negModePushback: "विरोधी वकील पुशबैक",
    negModeGhostwriter: "वार्ता घोस्टराइटर",
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
    shiftExplanationHeader: "एआई कानूनी बदलाव ऑडिट",
    timelineTab: "समयरेखा",
    portfolioTab: "पोर्टफोलियो",
    timelineHeader: "जीवनचक्र समयरेखा भविष्यवक्ता",
    timelineSub: "बातचीत की अवधि, संशोधन आवृत्ति, नवीनीकरण जोखिमों और समाप्ति प्रभावों का अनुमान लगाएं",
    portfolioHeader: "पोर्टफोलियो जोखिम डैशबोर्ड",
    portfolioSub: "वित्तीय दायित्वों, विक्रेता संकेंद्रण जोखिम और आगामी नवीनीकरण का क्रॉस-दस्तावेज़ डैशबोर्ड",
    shadowTab: "द शैडो",
    shadowHeader: "द शैडो: AI बनाम AI मुकाबला",
    shadowSub: "अपने अनुबंध में उच्च-जोखिम वाले खंडों पर विरोधी एआई वकीलों की बहस देखें।",
    residueTab: "द रेजिड्यू",
    residueHeader: "द रेजिड्यू: दस्तावेज़ फोरेंसिक",
    residueSub: "छिपे हुए पीडीएफ मेटाडेटा को निकालें और मानक बॉयलरप्लेट टेक्स्ट में संदिग्ध संशोधनों की जांच करें।",
    echoTab: "द इको",
    echoHeader: "द इको: कानूनी सामंजस्य",
    echoSub: "अंग्रेजी, हिंदी और हिंग्लिश में क्रॉस-लैंग्वेज अर्थगत अंतराल और अनुवाद जाल का विश्लेषण करें।",
    alchemyTab: "द अल्केमी",
    alchemyHeader: "द अल्केमी: SLA कंपाइलर",
    alchemySub: "SLA सीमाओं (अपटाइम, विलंबता, रिज़ॉल्यूशन समय) को निकालें और उन्हें प्रोमेथियस अलर्ट नियमों में संकलित करें।"
  }
};

const API_BASE = import.meta.env.VITE_API_URL || `http://${window.location.hostname}:8000/api`;

type Tab = 'upload' | 'chat' | 'risks' | 'plain' | 'brief' | 'redline' | 'contradictions' | 'negotiation' | 'semanticDiff' | 'timeline' | 'portfolioDashboard' | 'shadow' | 'residue' | 'echo' | 'alchemy';
type Category = 'core' | 'negotiation' | 'advanced';

const categoryTabs: Record<Category, Tab[]> = {
  core: ['upload', 'chat', 'risks', 'plain', 'brief', 'redline', 'contradictions'],
  negotiation: ['negotiation', 'semanticDiff', 'timeline', 'portfolioDashboard', 'shadow'],
  advanced: ['residue', 'echo', 'alchemy']
};

export default function WorkspaceSection({ 
  globalLanguage,
  isFullscreen,
  setIsFullscreen
}: { 
  globalLanguage: 'en' | 'hi';
  isFullscreen: boolean;
  setIsFullscreen: (val: boolean) => void;
}) {
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
    { id: 'timeline', label: t.timelineTab, icon: Clock },
    { id: 'portfolioDashboard', label: t.portfolioTab, icon: LayoutDashboard },
    { id: 'shadow', label: t.shadowTab, icon: Swords },
    { id: 'residue', label: t.residueTab, icon: Binary },
    { id: 'echo', label: t.echoTab, icon: Languages },
    { id: 'alchemy', label: t.alchemyTab, icon: Code },
  ];

  const [activeTab, setActiveTab] = useState<Tab>('upload');
  const [activeCategory, setActiveCategory] = useState<Category>('core');

  const handleCategoryChange = (cat: Category) => {
    setActiveCategory(cat);
    setActiveTab(categoryTabs[cat][0]);
  };

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
  const [hasAnalyzedRisks, setHasAnalyzedRisks] = useState(false);

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

  // Counterparty Simulator state
  const [negMode, setNegMode] = useState<'selfPlay' | 'counterparty' | 'ghostwriter'>('selfPlay');
  const [counterOriginal, setCounterOriginal] = useState('');
  const [counterProposed, setCounterProposed] = useState('');
  const [ghostOriginal, setGhostOriginal] = useState('');
  const [ghostCounter, setGhostCounter] = useState('');
  const [ghostResult, setGhostResult] = useState<{
    accept_with_modification: string;
    reject_with_rationale: string;
  } | null>(null);
  const [isGhostwriting, setIsGhostwriting] = useState(false);
  const [counterSimResult, setCounterSimResult] = useState<{
    counter_arguments: string;
    pushback_clauses: string;
    recommendation: string;
  } | null>(null);
  const [isCounterSimulating, setIsCounterSimulating] = useState(false);

  // Timeline Predictor state
  const [selectedTimelineDoc, setSelectedTimelineDoc] = useState('');
  const [timelineResult, setTimelineResult] = useState<{
    negotiation_duration_days: number;
    amendment_frequency: string;
    renewal_risk_score: number;
    cascade_effects: string;
  } | null>(null);
  const [isPredictingTimeline, setIsPredictingTimeline] = useState(false);

  // Portfolio Dashboard state
  const [portfolioStats, setPortfolioStats] = useState<{
    total_contracts: number;
    total_liability: number;
    concentration_risk: { vendor: string; value: number; share: number }[];
    upcoming_renewals: { contract: string; vendor: string; expiration_date: string; days_remaining: number }[];
  } | null>(null);
  const [isFetchingPortfolio, setIsFetchingPortfolio] = useState(false);

  // Alchemy copy state
  const [copiedAlchemy, setCopiedAlchemy] = useState(false);

  // Shadow state
  const [selectedShadowDoc, setSelectedShadowDoc] = useState('');
  const [shadowResult, setShadowResult] = useState<{
    clause_focus: string;
    attacker_turn: string;
    defender_turn: string;
    assessment: string;
  } | null>(null);
  const [isBattling, setIsBattling] = useState(false);
  const [shadowLang, setShadowLang] = useState('English');

  // Residue state
  const [selectedResidueDoc, setSelectedResidueDoc] = useState('');
  const [residueResult, setResidueResult] = useState<{
    metadata: {
      author: string;
      creator: string;
      producer: string;
      creation_date: string;
      mod_date: string;
      page_count: number;
      file_size_bytes: number;
    };
    forensics_report: string;
  } | null>(null);
  const [isInspecting, setIsInspecting] = useState(false);

  // Echo state
  const [echoInput, setEchoInput] = useState('');
  const [echoLang, setEchoLang] = useState('English');
  const [echoResult, setEchoResult] = useState('');
  const [isEchoing, setIsEchoing] = useState(false);

  // Alchemy state
  const [selectedAlchemyDoc, setSelectedAlchemyDoc] = useState('');
  const [alchemyResult, setAlchemyResult] = useState<{
    parameters: {
      uptime_target: string;
      latency_target: string;
      resolution_target: string;
    };
    code_block: string;
  } | null>(null);
  const [isCompiling, setIsCompiling] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedAlchemy(true);
    setTimeout(() => setCopiedAlchemy(false), 2000);
  };

  // Voice State & Helpers
  const [isListening, setIsListening] = useState(false);

  const startSpeechRecognition = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Voice input is not supported in this browser. Please use Chrome, Edge, or Safari.");
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = globalLanguage === 'hi' ? 'hi-IN' : 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error", event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onresult = (event: any) => {
      const speechToText = event.results[0][0].transcript;
      setChatInput(speechToText);
    };

    recognition.start();
  };


  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [chatHistory]);

  useEffect(() => {
    const l = globalLanguage === 'hi' ? 'Hindi' : 'English';
    setPlainLang(l);
    setBriefLang(l);
    setRedlineLang(l);
    setContraLang(l);
    setNegotiationLang(l);
    setDiffLang(l);
    setEchoLang(l);
    setShadowLang(l);
  }, [globalLanguage]);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const res = await fetch(`${API_BASE}/documents`);
        const data = await res.json();
        if (res.ok && data.documents) {
          setDocuments(data.documents);
        }
      } catch (err) {
        console.error("Failed to fetch active documents:", err);
      }
    };
    fetchDocuments();
  }, []);

  useEffect(() => {
    const successDocs = documents.filter(d => d.status === 'success');
    if (successDocs.length > 0) {
      if (!selectedTimelineDoc) setSelectedTimelineDoc(successDocs[0].namespace);
      if (!selectedShadowDoc) setSelectedShadowDoc(successDocs[0].namespace);
      if (!selectedResidueDoc) setSelectedResidueDoc(successDocs[0].namespace);
      if (!selectedAlchemyDoc) setSelectedAlchemyDoc(successDocs[0].namespace);
    }
  }, [documents, selectedTimelineDoc, selectedShadowDoc, selectedResidueDoc, selectedAlchemyDoc]);

  useEffect(() => {
    if (activeTab === 'portfolioDashboard') {
      fetchPortfolioStats();
    }
  }, [activeTab]);

  const fetchPortfolioStats = async () => {
    setIsFetchingPortfolio(true);
    try {
      const res = await fetch(`${API_BASE}/portfolio/dashboard`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || 'Failed to fetch portfolio stats');
      setPortfolioStats(data);
    } catch (err: any) {
      console.error(err);
    } finally {
      setIsFetchingPortfolio(false);
    }
  };

  const handlePredictTimeline = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTimelineDoc) return;
    setIsPredictingTimeline(true);
    setTimelineResult(null);
    try {
      const res = await fetch(`${API_BASE}/features/predict-timeline`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          namespace: selectedTimelineDoc,
          language: globalLanguage === 'hi' ? 'Hindi' : 'English',
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || 'Timeline prediction failed');
      setTimelineResult(data);
    } catch (err: any) {
      alert(err.message);
    } finally {
      setIsPredictingTimeline(false);
    }
  };

  const handleShadowBattle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedShadowDoc) return;
    setIsBattling(true);
    setShadowResult(null);
    try {
      const res = await fetch(`${API_BASE}/features/shadow`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          namespace: selectedShadowDoc,
          language: shadowLang,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || 'Shadow battle failed');
      setShadowResult(data);
    } catch (err: any) {
      alert(err.message);
    } finally {
      setIsBattling(false);
    }
  };

  const handleResidueForensics = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedResidueDoc) return;
    setIsInspecting(true);
    setResidueResult(null);
    try {
      const res = await fetch(`${API_BASE}/features/residue`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          namespace: selectedResidueDoc,
          language: globalLanguage === 'hi' ? 'Hindi' : 'English',
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || 'Residue forensics failed');
      setResidueResult(data);
    } catch (err: any) {
      alert(err.message);
    } finally {
      setIsInspecting(false);
    }
  };

  const handleEchoHarmonics = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!echoInput.trim()) return;
    setIsEchoing(true);
    setEchoResult('');
    try {
      const res = await fetch(`${API_BASE}/features/echo`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clause_text: echoInput,
          language: echoLang,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || 'Echo harmonics analysis failed');
      setEchoResult(data.harmonics_report || '');
    } catch (err: any) {
      setEchoResult('❌ ' + err.message);
    } finally {
      setIsEchoing(false);
    }
  };

  const handleAlchemyCompile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAlchemyDoc) return;
    setIsCompiling(true);
    setAlchemyResult(null);
    try {
      const res = await fetch(`${API_BASE}/features/alchemy`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          namespace: selectedAlchemyDoc,
          language: globalLanguage === 'hi' ? 'Hindi' : 'English',
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || 'Alchemy compilation failed');
      setAlchemyResult(data);
    } catch (err: any) {
      alert(err.message);
    } finally {
      setIsCompiling(false);
    }
  };

  const handleCounterpartySim = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!counterOriginal.trim() || !counterProposed.trim()) return;
    setIsCounterSimulating(true);
    setCounterSimResult(null);
    try {
      const res = await fetch(`${API_BASE}/features/counterparty-sim`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clause_text: counterOriginal,
          proposed_edit: counterProposed,
          language: globalLanguage === 'hi' ? 'Hindi' : 'English',
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || 'Counterparty simulation failed');
      setCounterSimResult(data);
    } catch (err: any) {
      alert(err.message);
    } finally {
      setIsCounterSimulating(false);
    }
  };

  const handleGhostwrite = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ghostOriginal.trim() || !ghostCounter.trim()) return;
    setIsGhostwriting(true);
    setGhostResult(null);
    try {
      const res = await fetch(`${API_BASE}/features/ghostwrite`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clause_text: ghostOriginal,
          redlined_text: ghostCounter,
          language: negotiationLang,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || 'Ghostwriting failed');
      setGhostResult(data);
    } catch (err: any) {
      alert(err.message);
    } finally {
      setIsGhostwriting(false);
    }
  };

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

  const handleDeleteDocument = async (namespace: string) => {
    if (!confirm("Are you sure you want to remove this document?")) return;
    try {
      const res = await fetch(`${API_BASE}/documents/${namespace}`, { method: 'DELETE' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || 'Delete failed');
      setDocuments(prev => {
        const remaining = prev.filter(doc => doc.namespace !== namespace);
        if (remaining.length === 0) {
          setRisks([]);
          setHasAnalyzedRisks(false);
        }
        return remaining;
      });
      alert('Document removed successfully.');
    } catch (err: any) {
      alert('Delete error: ' + err.message);
    }
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
      setHasAnalyzedRisks(true);
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
      className="border border-neutral-850 rounded-lg px-3 py-2 text-sm bg-[#1A1821] focus:outline-none focus:border-[#D92662] cursor-pointer font-medium text-neutral-200">
      <option value="English">English</option>
      <option value="Hindi">Hindi</option>
      <option value="Hinglish">Hinglish</option>
    </select>
  );

  // ---- Helper to format text (remove raw ** and render bold, parse headers) ----
  const renderFormattedText = (text: string) => {
    if (!text) return null;
    const lines = text.split('\n');
    return lines.map((line, idx) => {
      // Robust regex header matching for # to ######
      const headerMatch = line.match(/^(#{1,6})\s+(.*)$/);
      if (headerMatch) {
        const level = headerMatch[1].length;
        const headerText = headerMatch[2];
        const parts = headerText.split(/\*\*([^*]+)\*\*/g);
        const content = parts.map((part, i) => 
          i % 2 === 1 ? <strong key={i} className="font-bold text-[#D92662]">{part}</strong> : part
        );

        const classNames = [
          "text-xl font-bold text-neutral-100 mt-4 mb-2",       // h1
          "text-lg font-bold text-neutral-100 mt-3 mb-1.5",     // h2
          "text-base font-bold text-neutral-100 mt-2.5 mb-1",   // h3
          "text-sm font-bold text-neutral-100 mt-2 mb-1",       // h4
          "text-xs font-bold text-neutral-100 mt-1.5 mb-1",     // h5
          "text-xs font-bold text-neutral-100 mt-1 mb-1"        // h6
        ];
        const headingClass = classNames[Math.min(level - 1, 5)];
        const TagName = `h${Math.min(level, 6)}`;
        return React.createElement(TagName, { key: idx, className: headingClass }, content);
      }

      const parts = line.split(/\*\*([^*]+)\*\*/g);
      const content = parts.map((part, i) => 
        i % 2 === 1 ? <strong key={i} className="font-bold text-[#D92662]">{part}</strong> : part
      );

      return (
        <React.Fragment key={idx}>
          {content}
          {idx < lines.length - 1 && <br />}
        </React.Fragment>
      );
    });
  };

  // ---- Tab content renderers ----

  const renderUpload = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold text-neutral-100 mb-1">{t.uploadHeader}</h3>
        <p className="text-sm text-neutral-450">{t.uploadSub}</p>
      </div>
      <input type="file" multiple accept=".pdf,.docx,.doc" className="hidden" ref={fileInputRef} onChange={handleUpload} />
      <div
        onClick={() => fileInputRef.current?.click()}
        className="border-2 border-dashed border-neutral-300 hover:border-[#D92662] rounded-2xl p-10 text-center cursor-pointer transition-colors group bg-[#1A1821] hover:bg-[#D92662]/5"
      >
        <Upload className="w-10 h-10 text-neutral-400 group-hover:text-[#D92662] mx-auto mb-3 transition-colors" />
        {isUploading ? (
          <div className="flex items-center justify-center gap-2 text-[#D92662] font-semibold">
            <Loader2 className="w-4 h-4 animate-spin" /> {t.uploadingMsg}
          </div>
        ) : (
          <>
            <p className="text-sm font-semibold text-neutral-300 group-hover:text-[#D92662] transition-colors">
              {t.uploadClick}
            </p>
            <p className="text-xs text-neutral-400 mt-1">{t.pdfOnly}</p>
          </>
        )}
      </div>
      {documents.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-neutral-300">{t.uploadedDocs} ({documents.length})</h4>
          {documents.map((doc, i) => (
            <div key={i} className="flex items-center gap-3 p-3 bg-[#1A1821] rounded-xl border border-neutral-850">
              {doc.status === 'success'
                ? <CheckCircle2 className="w-5 h-5 text-[#D92662] shrink-0" />
                : <XCircle className="w-5 h-5 text-red-500 shrink-0" />}
              <div className="min-w-0 flex-1">
                <div className="text-sm font-medium text-neutral-200 truncate">{doc.name}</div>
                <div className="text-xs text-neutral-400">{doc.message}</div>
              </div>
              {doc.status === 'success' && (
                <button
                  onClick={() => handleDeleteDocument(doc.namespace)}
                  className="text-neutral-400 hover:text-red-500 p-1.5 rounded-lg hover:bg-red-900/20 transition-colors cursor-pointer shrink-0"
                  title="Remove document"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderChat = () => (
    <div className={`flex flex-col ${isFullscreen ? 'h-full flex-1' : 'h-[500px]'}`}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-bold text-neutral-100">{t.chatHeader}</h3>
          <p className="text-xs text-neutral-450">{t.chatSub}</p>
        </div>
        <button onClick={handleClearChat} className="text-xs text-neutral-450 hover:text-red-500 flex items-center gap-1 cursor-pointer">
          <Trash2 className="w-3.5 h-3.5" /> {t.clearBtn}
        </button>
      </div>
      <div className="flex-1 overflow-y-auto space-y-4 pr-2 mb-4">
        {chatHistory.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-neutral-400">
            <MessageSquare className="w-10 h-10 mb-3 opacity-40 text-[#D92662]" />
            <p className="text-sm">{t.noDocsChat}</p>
          </div>
        )}
        {chatHistory.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
              msg.role === 'user'
                ? 'bg-[#38111D] text-neutral-100 border border-[#D92662]/20 rounded-br-md'
                : 'bg-[#1A1821] text-neutral-200 rounded-bl-md'
            }`}>
              <div className="whitespace-pre-wrap">{renderFormattedText(msg.content)}</div>
              {msg.sources && msg.sources.length > 0 && (
                <div className="mt-2 pt-2 border-t border-neutral-850/50 text-[10px] text-neutral-400">
                  Sources: {msg.sources.length} chunks referenced
                </div>
              )}
              
            </div>
          </div>
        ))}
        {isAsking && (
          <div className="flex justify-start">
            <div className="bg-[#1A1821] rounded-2xl rounded-bl-md px-4 py-3 flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin text-[#D92662]" />
              <span className="text-sm text-neutral-450">{t.thinking}</span>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>
      <form onSubmit={handleAsk} className="flex gap-2">
        <input type="text" value={chatInput} onChange={e => setChatInput(e.target.value)}
          placeholder={t.placeholderChat}
          disabled={documents.length === 0}
          className="flex-1 bg-[#1A1821] text-white border border-neutral-850 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#D92662] disabled:opacity-50 disabled:cursor-not-allowed" />
        <button type="button" onClick={startSpeechRecognition} disabled={documents.length === 0}
          className={`w-11 h-11 border text-neutral-450 rounded-xl flex items-center justify-center transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shrink-0 ${
            isListening ? 'bg-red-50 border-red-200 text-red-500 animate-pulse' : 'bg-[#131118] border-neutral-850 hover:bg-[#1A1821] hover:text-[#D92662]'
          }`}
          title="Voice Input"
        >
          <Mic className="w-4 h-4" />
        </button>
        <button type="submit" disabled={!chatInput.trim() || isAsking || documents.length === 0}
          className="w-11 h-11 bg-[#D92662] hover:bg-[#B71C4F] disabled:bg-[#222026] disabled:text-[#909098] disabled:opacity-100 text-white rounded-xl flex items-center justify-center transition-colors cursor-pointer disabled:cursor-not-allowed shrink-0">
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );

  const renderRisks = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-neutral-100">{t.risksHeader}</h3>
          <p className="text-xs text-neutral-450">{t.risksSub}</p>
        </div>
        <button onClick={handleRisks} disabled={isAnalyzing || documents.length === 0}
          className="bg-[#D92662] hover:bg-[#B71C4F] disabled:bg-[#222026] disabled:text-[#909098] disabled:opacity-100 text-white text-sm font-semibold px-5 py-2.5 rounded-lg flex items-center gap-2 transition-colors cursor-pointer disabled:cursor-not-allowed">
          {isAnalyzing ? <Loader2 className="w-4 h-4 animate-spin" /> : <ShieldAlert className="w-4 h-4" />}
          {isAnalyzing ? t.analyzingBtn : t.analyzeBtn}
        </button>
      </div>
      {risks.length === 0 ? (
        <div className="text-center py-16 text-neutral-400">
          <ShieldAlert className="w-10 h-10 mx-auto mb-3 opacity-40" />
          <p className="text-sm">
            {documents.length === 0 
              ? t.noDocsChat 
              : hasAnalyzedRisks 
                ? (globalLanguage === 'hi' ? "इस दस्तावेज़ में कोई कानूनी जोखिम नहीं मिला।" : "No legal risks detected in the uploaded documents.")
                : t.noRisks}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {(['High', 'Medium', 'Low'] as const).map(level => {
            const items = risks.filter(r => r.risk_level === level);
            if (items.length === 0) return null;
            const colors = { High: 'border-red-900/30 bg-red-950/20', Medium: 'border-amber-900/30 bg-amber-950/20', Low: 'border-[#D92662]/30 bg-[#1C1115]/30' };
            const textColors = { High: 'text-red-400', Medium: 'text-amber-400', Low: 'text-[#F472B6]' };
            const badgeColors = { High: 'bg-red-950/40 text-red-400 border border-red-900/40', Medium: 'bg-amber-950/40 text-amber-400 border border-amber-900/40', Low: 'bg-[#D92662]/10 text-[#F472B6] border border-[#D92662]/20' };
            const levelLabel = level === 'High' ? t.highRisk : level === 'Medium' ? t.medRisk : t.lowRisk;
            return (
              <div key={level} className={`rounded-xl border p-4 ${colors[level]}`}>
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className={`w-4 h-4 ${textColors[level]}`} />
                  <span className={`font-bold text-sm ${textColors[level]}`}>{levelLabel} ({items.length})</span>
                </div>
                <div className="space-y-2">
                  {items.map((r: any, i: number) => (
                    <div key={i} className="bg-[#1A1821] rounded-lg p-3 border border-neutral-850">
                      <div className="flex justify-between items-start gap-2 mb-1">
                        <span className="text-sm font-semibold text-neutral-200">{r.clause_name}</span>
                        <span className={`text-[10px] font-bold rounded-full px-2 py-0.5 shrink-0 ${badgeColors[level]}`}>{levelLabel}</span>
                      </div>
                      <p className="text-xs text-neutral-400 leading-relaxed">{r.value}</p>
                      <p className="text-[10px] text-neutral-400 mt-1">Document: {r.document}</p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
          {wolframCtx.length > 0 && (
            <div className="rounded-xl border border-[#D92662]/20 bg-[#D92662]/5 p-4">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-4 h-4 text-[#D92662]" />
                <span className="font-bold text-sm text-[#D92662]">{t.wolframHeader}</span>
              </div>
              {wolframCtx.map((w: any, i: number) => (
                <div key={i} className="bg-[#1A1821] rounded-lg p-3 border border-neutral-850 mb-2 last:mb-0">
                  <div className="text-sm font-semibold text-neutral-200">{w.clause} ({w.document})</div>
                  <p className="text-xs text-neutral-400 mt-1">{w.context}</p>
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
        <h3 className="text-lg font-bold text-neutral-100">{t.plainHeader}</h3>
        <p className="text-xs text-neutral-450">{t.plainSub}</p>
      </div>
      <form onSubmit={handlePlainLanguage} className="space-y-4">
        <div className="flex items-center gap-3">
          <label className="text-sm font-medium text-neutral-300">{t.langLabel}</label>
          <LangSelect value={plainLang} onChange={setPlainLang} />
        </div>
        <textarea value={clauseInput} onChange={e => setClauseInput(e.target.value)}
          placeholder={t.placeholderPlain}
          className="w-full bg-[#131118] border border-neutral-850 text-neutral-100 placeholder-neutral-500 rounded-xl px-4 py-3 text-sm h-32 resize-none focus:outline-none focus:border-[#D92662]" />
        <button type="submit" disabled={!clauseInput.trim() || isExplaining}
          className="bg-[#D92662] hover:bg-[#B71C4F] disabled:bg-[#222026] disabled:text-[#909098] text-white text-sm font-semibold px-6 py-2.5 rounded-lg flex items-center gap-2 transition-colors cursor-pointer disabled:cursor-not-allowed">
          {isExplaining ? <Loader2 className="w-4 h-4 animate-spin" /> : <FileText className="w-4 h-4" />}
          {isExplaining ? t.explainingBtn : t.explainBtn}
        </button>
      </form>
      {plainResult && (
        <div className="bg-[#1D1016]/40 border border-[#D92662]/20 rounded-xl p-5 text-neutral-200">
          <div className="flex items-center justify-between mb-3 border-b border-[#D92662]/20 pb-2">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#D92662]" />
              <span className="font-bold text-sm text-[#D92662]">{t.plainResultHeader}</span>
            </div>
          </div>
          <div className="text-sm text-neutral-300 leading-relaxed whitespace-pre-wrap">{renderFormattedText(plainResult)}</div>
        </div>
      )}
    </div>
  );

  const renderBrief = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold text-neutral-100">{t.briefHeader}</h3>
        <p className="text-xs text-neutral-450">{t.briefSub}</p>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          <label className="text-sm font-medium text-neutral-300">{t.langLabel}</label>
          <LangSelect value={briefLang} onChange={setBriefLang} />
        </div>
        <button onClick={handleBrief} disabled={isBriefing || documents.length === 0}
          className="bg-[#D92662] hover:bg-[#B71C4F] disabled:bg-[#222026] disabled:text-[#909098] text-white text-sm font-semibold px-6 py-2.5 rounded-lg flex items-center gap-2 transition-colors cursor-pointer disabled:cursor-not-allowed">
          {isBriefing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
          {isBriefing ? t.generatingBriefBtn : t.generateBriefBtn}
        </button>
      </div>
      {briefResult ? (
        <div className="bg-[#131118] border border-neutral-850 rounded-xl p-6">
          <div className="flex justify-between items-center mb-4 border-b border-neutral-850 pb-2.5">
            <span className="text-xs font-bold uppercase text-neutral-400">Brief Output</span>
          </div>
          <div className="text-sm text-neutral-300 leading-relaxed whitespace-pre-wrap">{renderFormattedText(briefResult)}</div>
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
        <h3 className="text-lg font-bold text-neutral-100">{t.redlineHeader}</h3>
        <p className="text-xs text-neutral-450">{t.redlineSub}</p>
      </div>
      <form onSubmit={handleRedline} className="space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-neutral-300 mb-1.5 block">{t.ver1Label}</label>
            <input type="file" accept=".pdf,.docx,.doc" onChange={e => e.target.files?.[0] && setRedlineV1(e.target.files[0])}
              className="w-full text-neutral-300 text-sm border border-neutral-850 rounded-lg p-2 file:mr-3 file:py-1 file:px-3 file:rounded-md file:border-0 file:bg-[#D92662]/10 file:text-[#D92662] file:font-semibold file:text-xs file:cursor-pointer" />
          </div>
          <div>
            <label className="text-sm font-medium text-neutral-300 mb-1.5 block">{t.ver2Label}</label>
            <input type="file" accept=".pdf,.docx,.doc" onChange={e => e.target.files?.[0] && setRedlineV2(e.target.files[0])}
              className="w-full text-neutral-300 text-sm border border-neutral-850 rounded-lg p-2 file:mr-3 file:py-1 file:px-3 file:rounded-md file:border-0 file:bg-[#D92662]/10 file:text-[#D92662] file:font-semibold file:text-xs file:cursor-pointer" />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <label className="text-sm font-medium text-neutral-300">{t.langLabel}</label>
            <LangSelect value={redlineLang} onChange={setRedlineLang} />
          </div>
          <button type="submit" disabled={!redlineV1 || !redlineV2 || isRedlining}
            className="bg-[#D92662] hover:bg-[#B71C4F] disabled:bg-[#222026] disabled:text-[#909098] disabled:opacity-100 text-white text-sm font-semibold px-6 py-2.5 rounded-lg flex items-center gap-2 transition-colors cursor-pointer disabled:cursor-not-allowed">
            {isRedlining ? <Loader2 className="w-4 h-4 animate-spin" /> : <GitCompareArrows className="w-4 h-4" />}
            {isRedlining ? t.comparingBtn : t.compareBtn}
          </button>
        </div>
      </form>
      {redlineResult && (
        <div className="bg-[#131118] border border-neutral-850 rounded-xl p-6">
          <div className="flex justify-between items-center mb-4 border-b border-neutral-850 pb-2.5">
            <span className="text-xs font-bold uppercase text-neutral-400">Redline Audit</span>
          </div>
          <div className="text-sm text-neutral-300 leading-relaxed whitespace-pre-wrap">{renderFormattedText(redlineResult)}</div>
        </div>
      )}
    </div>
  );

  const renderContradictions = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold text-neutral-100">{t.contraHeader}</h3>
        <p className="text-xs text-neutral-450">{t.contraSub}</p>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          <label className="text-sm font-medium text-neutral-300">{t.langLabel}</label>
          <LangSelect value={contraLang} onChange={setContraLang} />
        </div>
        <button onClick={handleContradictions} disabled={isDetecting || documents.filter(d => d.status === 'success').length < 2}
          className="bg-[#D92662] hover:bg-[#B71C4F] disabled:bg-[#222026] disabled:text-[#909098] text-white text-sm font-semibold px-6 py-2.5 rounded-lg flex items-center gap-2 transition-colors cursor-pointer disabled:cursor-not-allowed">
          {isDetecting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
          {isDetecting ? t.detectingBtn : t.detectBtn}
        </button>
      </div>
      {contraResult ? (
        <div className="bg-[#131118] border border-neutral-850 rounded-xl p-6">
          <div className="flex justify-between items-center mb-4 border-b border-neutral-850 pb-2.5">
            <span className="text-xs font-bold uppercase text-neutral-400">Contradictions Audit</span>
          </div>
          <div className="text-sm text-neutral-300 leading-relaxed whitespace-pre-wrap">{renderFormattedText(contraResult)}</div>
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
          <h3 className="text-lg font-bold text-neutral-100">{t.negotiationHeader}</h3>
          <p className="text-xs text-neutral-450">{t.negotiationSub}</p>
        </div>
      </div>

      <div className="flex gap-2 p-1 bg-[#1A1821] rounded-lg max-w-lg mb-4">
        <button
          type="button"
          onClick={() => setNegMode('selfPlay')}
          className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
            negMode === 'selfPlay'
              ? 'bg-[#D92662] text-white shadow'
              : 'text-neutral-400 hover:text-neutral-200'
          }`}
        >
          {t.negModeSelfPlay}
        </button>
        <button
          type="button"
          onClick={() => setNegMode('counterparty')}
          className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
            negMode === 'counterparty'
              ? 'bg-[#D92662] text-white shadow'
              : 'text-neutral-400 hover:text-neutral-200'
          }`}
        >
          {t.negModePushback}
        </button>
        <button
          type="button"
          onClick={() => setNegMode('ghostwriter')}
          className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
            negMode === 'ghostwriter'
              ? 'bg-[#D92662] text-white shadow'
              : 'text-neutral-400 hover:text-neutral-200'
          }`}
        >
          {t.negModeGhostwriter}
        </button>
      </div>

      {negMode === 'selfPlay' && (
        <>
          <form onSubmit={handleNegotiation} className="space-y-4">
            <div className="grid sm:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-semibold text-neutral-400 block mb-1.5">{t.clauseTypeLabel}</label>
                <select value={negotiationClauseType} onChange={e => setNegotiationClauseType(e.target.value)}
                  className="w-full border border-neutral-850 rounded-lg p-2.5 text-sm bg-[#131118] focus:outline-none focus:border-[#D92662] cursor-pointer">
                  <option value="Limitation of Liability">Limitation of Liability</option>
                  <option value="Indemnification">Indemnification</option>
                  <option value="IP Ownership">Intellectual Property</option>
                  <option value="Termination">Termination Rights</option>
                  <option value="Governing Law">Governing Law</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-neutral-400 block mb-1.5">{t.buyerLabel}</label>
                <select value={buyerStance} onChange={e => setBuyerStance(e.target.value)}
                  className="w-full border border-neutral-850 rounded-lg p-2.5 text-sm bg-[#131118] focus:outline-none focus:border-[#D92662] cursor-pointer">
                  <option value="Conservative (Protects Buyer strictly)">Conservative</option>
                  <option value="Standard (Balanced risk)">Standard</option>
                  <option value="Aggressive (Pushes liability onto Seller)">Aggressive</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-neutral-400 block mb-1.5">{t.sellerLabel}</label>
                <select value={sellerStance} onChange={e => setSellerStance(e.target.value)}
                  className="w-full border border-neutral-850 rounded-lg p-2.5 text-sm bg-[#131118] focus:outline-none focus:border-[#D92662] cursor-pointer">
                  <option value="Conservative (Protects Seller strictly)">Conservative</option>
                  <option value="Standard (Balanced risk)">Standard</option>
                  <option value="Aggressive (Pushes liability onto Buyer)">Aggressive</option>
                </select>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <label className="text-sm font-medium text-neutral-300">{t.langLabel}</label>
              <LangSelect value={negotiationLang} onChange={setNegotiationLang} />
            </div>

            <div>
              <label className="text-xs font-semibold text-neutral-400 block mb-1.5">Paste Clause to Negotiate</label>
              <textarea value={negotiationText} onChange={e => setNegotiationText(e.target.value)}
                placeholder="Paste the original contract clause here..."
                className="w-full bg-[#131118] border border-neutral-850 text-neutral-100 placeholder-neutral-500 rounded-xl px-4 py-3 text-sm h-32 resize-none focus:outline-none focus:border-[#D92662]" />
            </div>

            <button type="submit" disabled={!negotiationText.trim() || isNegotiating}
              className="bg-[#D92662] hover:bg-[#B71C4F] disabled:bg-[#222026] disabled:text-[#909098] text-white text-sm font-semibold px-6 py-2.5 rounded-lg flex items-center gap-2 transition-colors cursor-pointer disabled:cursor-not-allowed">
              {isNegotiating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Scale className="w-4 h-4" />}
              {isNegotiating ? t.simulatingBtn : t.simulateBtn}
            </button>
          </form>

          {negotiationTranscript.length > 0 && (
            <div className="space-y-4 border-t border-neutral-850 pt-6">
              <h4 className="text-sm font-bold text-neutral-300">Negotiation Dialogue Transcript</h4>
              <div className="space-y-3 bg-[#131118] rounded-xl p-4 border border-neutral-850 max-h-[300px] overflow-y-auto">
                {negotiationTranscript.map((turn, i) => (
                  <div key={i} className={`p-3 rounded-lg border text-xs leading-relaxed ${
                    turn.role.includes("Buyer") 
                      ? "bg-blue-955/20 border-blue-900/30 text-blue-300 ml-4 rounded-br-none" 
                      : "bg-amber-955/20 border-amber-900/30 text-amber-300 mr-4 rounded-bl-none"
                  }`}>
                    <span className="font-bold block mb-1">{turn.role}:</span>
                    <div className="whitespace-pre-wrap">{turn.message}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {(negotiationCompromise || negotiationExplanation) && (
            <div className="grid md:grid-cols-2 gap-4 border-t border-neutral-850 pt-6">
              {negotiationCompromise && (
                <div className="bg-[#1D1016]/40 border border-[#D92662]/20 rounded-xl p-5 text-neutral-200">
                  <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-[#D92662]/10">
                    <h4 className="font-bold text-sm text-[#D92662]">{t.compromiseResultHeader}</h4>
                  </div>
                  <div className="text-xs text-neutral-200 leading-relaxed whitespace-pre-wrap bg-[#131118] border border-neutral-850 p-3 rounded-lg">
                    {renderFormattedText(negotiationCompromise)}
                  </div>
                </div>
              )}
              {negotiationExplanation && (
                <div className="bg-[#131118] border border-neutral-850 rounded-xl p-5">
                  <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-neutral-850">
                    <h4 className="font-bold text-sm text-neutral-300">{t.explanationHeader}</h4>
                  </div>
                  <div className="text-xs text-neutral-400 leading-relaxed whitespace-pre-wrap">
                    {renderFormattedText(negotiationExplanation)}
                  </div>
                </div>
              )}
            </div>
          )}
        </>
      )}

      {negMode === 'counterparty' && (
        <>
          <form onSubmit={handleCounterpartySim} className="space-y-4">
            <div className="flex items-center gap-3">
              <label className="text-sm font-medium text-neutral-300">{t.langLabel}</label>
              <LangSelect value={negotiationLang} onChange={setNegotiationLang} />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-neutral-400 block mb-1.5">Original Clause</label>
                <textarea 
                  value={counterOriginal} 
                  onChange={e => setCounterOriginal(e.target.value)}
                  placeholder="Paste the original contract clause here..."
                  className="w-full bg-[#131118] border border-neutral-850 text-neutral-100 placeholder-neutral-500 rounded-xl px-4 py-3 text-sm h-32 resize-none focus:outline-none focus:border-[#D92662]" 
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-neutral-400 block mb-1.5">Your Proposed Edit</label>
                <textarea 
                  value={counterProposed} 
                  onChange={e => setCounterProposed(e.target.value)}
                  placeholder="Paste or describe your proposed amendment or edit here..."
                  className="w-full bg-[#131118] border border-neutral-850 text-neutral-100 placeholder-neutral-500 rounded-xl px-4 py-3 text-sm h-32 resize-none focus:outline-none focus:border-[#D92662]" 
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={!counterOriginal.trim() || !counterProposed.trim() || isCounterSimulating}
              className="bg-[#D92662] hover:bg-[#B71C4F] disabled:bg-[#222026] disabled:text-[#909098] text-white text-sm font-semibold px-6 py-2.5 rounded-lg flex items-center gap-2 transition-colors cursor-pointer disabled:cursor-not-allowed"
            >
              {isCounterSimulating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Scale className="w-4 h-4" />}
              {isCounterSimulating ? "Simulating Counsel..." : "Predict Opposition"}
            </button>
          </form>

          {counterSimResult && (
            <div className="space-y-6 border-t border-neutral-850 pt-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-red-950/20 border border-red-900/30 rounded-xl p-5">
                  <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-red-900/20">
                    <h4 className="font-bold text-sm text-red-400">Opposing Counsel Objections & Arguments</h4>
                  </div>
                  <div className="text-xs text-neutral-300 leading-relaxed whitespace-pre-wrap bg-[#131118] border border-[#D92662]/20 p-3 rounded-lg">
                    {renderFormattedText(counterSimResult.counter_arguments)}
                  </div>
                </div>
                <div className="bg-[#1D1016]/40 border border-[#D92662]/20 rounded-xl p-5 text-neutral-200">
                  <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-[#D92662]/10">
                    <h4 className="font-bold text-sm text-[#D92662]">Opposing Counter-Proposals</h4>
                  </div>
                  <div className="text-xs text-neutral-300 leading-relaxed whitespace-pre-wrap bg-[#131118] border border-neutral-850 p-3 rounded-lg">
                    {renderFormattedText(counterSimResult.pushback_clauses)}
                  </div>
                </div>
              </div>

              <div className="bg-[#131118] border border-neutral-850 rounded-xl p-5">
                <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-neutral-850">
                  <h4 className="font-bold text-sm text-neutral-200">Negotiation Strategy Recommendation</h4>
                </div>
                <div className="text-xs text-neutral-400 leading-relaxed whitespace-pre-wrap">
                  {renderFormattedText(counterSimResult.recommendation)}
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {negMode === 'ghostwriter' && (
        <>
          <form onSubmit={handleGhostwrite} className="space-y-4">
            <div className="flex items-center gap-3">
              <label className="text-sm font-medium text-neutral-300">{t.langLabel}</label>
              <LangSelect value={negotiationLang} onChange={setNegotiationLang} />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-neutral-400 block mb-1.5">Original Clause</label>
                <textarea 
                  value={ghostOriginal} 
                  onChange={e => setGhostOriginal(e.target.value)}
                  placeholder="Paste the original contract clause here..."
                  className="w-full bg-[#131118] border border-neutral-850 text-neutral-100 placeholder-neutral-500 rounded-xl px-4 py-3 text-sm h-32 resize-none focus:outline-none focus:border-[#D92662]" 
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-neutral-400 block mb-1.5">Counterparty's Redlined Edit</label>
                <textarea 
                  value={ghostCounter} 
                  onChange={e => setGhostCounter(e.target.value)}
                  placeholder="Paste the counterparty's proposed edit or redline here..."
                  className="w-full bg-[#131118] border border-neutral-850 text-neutral-100 placeholder-neutral-500 rounded-xl px-4 py-3 text-sm h-32 resize-none focus:outline-none focus:border-[#D92662]" 
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={!ghostOriginal.trim() || !ghostCounter.trim() || isGhostwriting}
              className="bg-[#D92662] hover:bg-[#B71C4F] disabled:bg-[#222026] disabled:text-[#909098] text-white text-sm font-semibold px-6 py-2.5 rounded-lg flex items-center gap-2 transition-colors cursor-pointer disabled:cursor-not-allowed"
            >
              {isGhostwriting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Scale className="w-4 h-4" />}
              {isGhostwriting ? "Drafting..." : "Ghostwrite Response"}
            </button>
          </form>

          {ghostResult && (
            <div className="space-y-6 border-t border-neutral-850 pt-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-[#1D1016]/40 border border-[#D92662]/20 rounded-xl p-5 text-neutral-200">
                  <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-[#D92662]/10">
                    <h4 className="font-bold text-sm text-[#D92662] font-sans">Accept with Modification</h4>
                  </div>
                  <div className="text-xs text-neutral-300 leading-relaxed whitespace-pre-wrap bg-[#131118] border border-neutral-850 p-3 rounded-lg">
                    {renderFormattedText(ghostResult.accept_with_modification)}
                  </div>
                </div>
                <div className="bg-red-950/20 border border-red-900/30 rounded-xl p-5">
                  <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-red-900/20">
                    <h4 className="font-bold text-sm text-red-400 font-sans">Reject with Rationale & Precedent</h4>
                  </div>
                  <div className="text-xs text-neutral-300 leading-relaxed whitespace-pre-wrap bg-[#131118] border border-[#D92662]/20 p-3 rounded-lg">
                    {renderFormattedText(ghostResult.reject_with_rationale)}
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );

  const renderSemanticDiff = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold text-neutral-100">{t.semanticDiffHeader}</h3>
        <p className="text-xs text-neutral-450">{t.semanticDiffSub}</p>
      </div>
      <form onSubmit={handleSemanticDiff} className="space-y-4">
        <div className="flex items-center gap-3">
          <label className="text-sm font-medium text-neutral-300">{t.langLabel}</label>
          <LangSelect value={diffLang} onChange={setDiffLang} />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-neutral-400 block mb-1.5">Version 1 (Original Text)</label>
            <textarea value={diffTextV1} onChange={e => setDiffTextV1(e.target.value)}
              placeholder="Paste original clause or wording..."
              className="w-full bg-[#131118] border border-neutral-850 text-neutral-100 placeholder-neutral-500 rounded-xl px-4 py-3 text-sm h-36 resize-none focus:outline-none focus:border-[#D92662]" />
          </div>
          <div>
            <label className="text-xs font-semibold text-neutral-400 block mb-1.5">Version 2 (Revised Text)</label>
            <textarea value={diffTextV2} onChange={e => setDiffTextV2(e.target.value)}
              placeholder="Paste revised clause or wording..."
              className="w-full bg-[#131118] border border-neutral-850 text-neutral-100 placeholder-neutral-500 rounded-xl px-4 py-3 text-sm h-36 resize-none focus:outline-none focus:border-[#D92662]" />
          </div>
        </div>

        <button type="submit" disabled={!diffTextV1.trim() || !diffTextV2.trim() || isDiffing}
          className="bg-[#D92662] hover:bg-[#B71C4F] disabled:bg-[#222026] disabled:text-[#909098] text-white text-sm font-semibold px-6 py-2.5 rounded-lg flex items-center gap-2 transition-colors cursor-pointer disabled:cursor-not-allowed">
          {isDiffing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Diff className="w-4 h-4" />}
          {isDiffing ? t.runningDiffBtn : t.runDiffBtn}
        </button>
      </form>

      {(diffSimilarity !== null || diffExplanation) && (
        <div className="space-y-4 border-t border-neutral-850 pt-6">
          {diffSimilarity !== null && (
            <div className="flex items-center gap-4 bg-[#131118] rounded-xl p-4 border border-neutral-850">
              <div className="shrink-0 flex items-center justify-center w-16 h-16 rounded-full border-4 border-[#D92662] bg-[#D92662]/5">
                <span className="font-bold text-base text-[#D92662]">{diffSimilarity}%</span>
              </div>
              <div>
                <h4 className="text-sm font-bold text-neutral-200">{t.semanticMatchHeader}</h4>
                <p className="text-xs text-neutral-450 mt-0.5">
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
            <div className="bg-[#1D1016]/40 border border-[#D92662]/20 rounded-xl p-5 text-neutral-200">
              <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-[#D92662]/10">
                <h4 className="font-bold text-sm text-[#D92662]">{t.shiftExplanationHeader}</h4>
              </div>
              <div className="text-xs text-neutral-300 leading-relaxed whitespace-pre-wrap bg-[#131118] border border-neutral-850 p-3 rounded-lg">
                {renderFormattedText(diffExplanation)}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );

  const renderTimeline = () => {
    const successDocs = documents.filter(d => d.status === 'success');
    
    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-bold text-neutral-100">{t.timelineHeader}</h3>
          <p className="text-xs text-neutral-450">{t.timelineSub}</p>
        </div>
        
        {successDocs.length === 0 ? (
          <div className="text-center py-16 text-neutral-400">
            <Clock className="w-10 h-10 mx-auto mb-3 opacity-40 text-[#D92662]" />
            <p className="text-sm">Upload documents first to predict contract timelines.</p>
          </div>
        ) : (
          <form onSubmit={handlePredictTimeline} className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-end gap-4">
              <div className="flex-1">
                <label className="text-xs font-semibold text-neutral-400 block mb-1.5">Select Document</label>
                <select 
                  value={selectedTimelineDoc} 
                  onChange={e => setSelectedTimelineDoc(e.target.value)}
                  className="w-full border border-neutral-850 rounded-lg p-2.5 text-sm bg-[#131118] focus:outline-none focus:border-[#D92662] cursor-pointer"
                >
                  {successDocs.map((doc, i) => (
                    <option key={i} value={doc.namespace}>{doc.name}</option>
                  ))}
                </select>
              </div>
              <button 
                type="submit" 
                disabled={isPredictingTimeline}
                className="bg-[#D92662] hover:bg-[#B71C4F] disabled:bg-[#222026] disabled:text-[#909098] text-white text-sm font-semibold px-6 py-2.5 rounded-lg flex items-center gap-2 transition-colors cursor-pointer disabled:cursor-not-allowed h-[42px] shrink-0"
              >
                {isPredictingTimeline ? <Loader2 className="w-4 h-4 animate-spin" /> : <Clock className="w-4 h-4" />}
                {isPredictingTimeline ? "Predicting..." : "Predict Timeline"}
              </button>
            </div>
          </form>
        )}

        {timelineResult && (
          <div className="grid md:grid-cols-2 gap-6 border-t border-neutral-850 pt-6">
            <div className="bg-[#131118] border border-neutral-850 rounded-xl p-5 space-y-4">
              <h4 className="font-bold text-sm text-neutral-200">Visual Contract Lifecycle Timeline</h4>
              
              <div className="relative pl-6 border-l-2 border-[#D92662]/20 space-y-6 py-2">
                <div className="relative">
                  <div className="absolute -left-[31px] top-0.5 w-4 h-4 rounded-full border-2 border-[#D92662] bg-[#131118] flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#D92662]"></div>
                  </div>
                  <h5 className="text-xs font-bold text-neutral-200">Negotiation Stage</h5>
                  <p className="text-xs text-neutral-450 mt-0.5">
                    Estimated Duration: <span className="font-semibold text-[#D92662]">{timelineResult.negotiation_duration_days} days</span>
                  </p>
                </div>
                
                <div className="relative">
                  <div className="absolute -left-[31px] top-0.5 w-4 h-4 rounded-full border-2 border-[#D92662] bg-[#131118] flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#D92662]"></div>
                  </div>
                  <h5 className="text-xs font-bold text-neutral-200">Active Monitoring Stage</h5>
                  <p className="text-xs text-neutral-450 mt-0.5">
                    Effective date initialized and obligations tracked.
                  </p>
                </div>
                
                <div className="relative">
                  <div className="absolute -left-[31px] top-0.5 w-4 h-4 rounded-full border-2 border-[#D92662] bg-[#131118] flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#D92662]"></div>
                  </div>
                  <h5 className="text-xs font-bold text-neutral-200">Amendment / Change Cliffs</h5>
                  <p className="text-xs text-neutral-450 mt-0.5">
                    Likely Update Frequency: <span className="font-semibold text-neutral-300">{timelineResult.amendment_frequency}</span>
                  </p>
                </div>
                
                <div className="relative">
                  <div className="absolute -left-[31px] top-0.5 w-4 h-4 rounded-full border-2 border-[#D92662] bg-[#131118] flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#D92662]"></div>
                  </div>
                  <h5 className="text-xs font-bold text-neutral-200">Expiration & Renewal</h5>
                  <p className="text-xs text-neutral-450 mt-0.5">
                    Critical renewal tracking based on contract dates.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-[#131118] border border-neutral-850 rounded-xl p-5">
                <h4 className="font-bold text-sm text-neutral-200 mb-3">Renewal Risk Audit</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-medium text-neutral-400">Renewal Risk Score:</span>
                    <span className={`font-bold ${
                      timelineResult.renewal_risk_score > 70 ? 'text-red-400' : timelineResult.renewal_risk_score > 30 ? 'text-amber-400' : 'text-[#D92662]'
                    }`}>{timelineResult.renewal_risk_score} / 100</span>
                  </div>
                  
                  <div className="h-3 w-full bg-neutral-800 rounded-full overflow-hidden relative">
                    <div 
                      className={`h-full rounded-full ${
                        timelineResult.renewal_risk_score > 70 
                          ? 'bg-red-500' 
                          : timelineResult.renewal_risk_score > 30 
                          ? 'bg-amber-500' 
                          : 'bg-[#D92662]'
                      }`}
                      style={{ width: `${timelineResult.renewal_risk_score}%` }}
                    />
                  </div>
                  <p className="text-[10px] text-neutral-400 mt-1">
                    Risk calculations based on termination clauses, notification periods, and governing law clauses.
                  </p>
                </div>
              </div>

              <div className="bg-[#1D1016]/40 border border-[#D92662]/20 rounded-xl p-5 text-neutral-200">
                <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-[#D92662]/10">
                  <h4 className="font-bold text-sm text-[#D92662]">Cascade Gaps & Dependency Warnings</h4>
                </div>
                <div className="text-xs text-neutral-300 leading-relaxed whitespace-pre-wrap bg-[#131118] border border-neutral-850 p-3 rounded-lg">
                  {renderFormattedText(timelineResult.cascade_effects)}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderPortfolioDashboard = () => {
    if (isFetchingPortfolio && !portfolioStats) {
      return (
        <div className="flex items-center justify-center py-20 gap-2">
          <Loader2 className="w-6 h-6 animate-spin text-[#D92662]" />
          <span className="text-sm text-neutral-450 font-semibold">Loading dashboard stats...</span>
        </div>
      );
    }

    if (!portfolioStats || portfolioStats.total_contracts === 0) {
      return (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-neutral-100">{t.portfolioHeader}</h3>
              <p className="text-xs text-neutral-450">{t.portfolioSub}</p>
            </div>
            <button 
              onClick={fetchPortfolioStats}
              className="bg-[#D92662] hover:bg-[#B71C4F] text-white text-xs font-semibold px-4 py-2 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Loader2 className={`w-3.5 h-3.5 ${isFetchingPortfolio ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          </div>
          <div className="text-center py-16 text-neutral-400">
            <LayoutDashboard className="w-10 h-10 mx-auto mb-3 opacity-40 text-[#D92662]" />
            <p className="text-sm">Upload PDF contracts to begin building your portfolio dashboard.</p>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-neutral-100">{t.portfolioHeader}</h3>
            <p className="text-xs text-neutral-450">{t.portfolioSub}</p>
          </div>
          <button 
            onClick={fetchPortfolioStats}
            className="bg-[#D92662] hover:bg-[#B71C4F] text-white text-xs font-semibold px-4 py-2 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Loader2 className={`w-3.5 h-3.5 ${isFetchingPortfolio ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-[#131118] border border-neutral-850 rounded-xl p-5 flex flex-col justify-between">
            <span className="text-xs font-bold text-neutral-450 uppercase tracking-wider">Total Active Contracts</span>
            <span className="text-3xl font-serif font-black text-[#D92662] mt-2">{portfolioStats.total_contracts}</span>
          </div>
          <div className="bg-[#131118] border border-neutral-850 rounded-xl p-5 flex flex-col justify-between">
            <span className="text-xs font-bold text-neutral-450 uppercase tracking-wider">Total Portfolio Liability Cap</span>
            <span className="text-3xl font-serif font-black text-[#D92662] mt-2">
              ₹{portfolioStats.total_liability.toLocaleString()}
            </span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-[#131118] border border-neutral-850 rounded-xl p-5 space-y-4">
            <h4 className="font-bold text-sm text-neutral-200">Vendor Concentration Risk</h4>
            {portfolioStats.concentration_risk.length === 0 ? (
              <p className="text-xs text-neutral-400">No concentration risk metrics calculated.</p>
            ) : (
              <div className="space-y-3">
                {portfolioStats.concentration_risk.map((item, idx) => (
                  <div key={idx} className="space-y-1.5">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-neutral-300">{item.vendor}</span>
                      <span className="text-neutral-450 font-semibold">
                        ₹{item.value.toLocaleString()} ({item.share}%)
                      </span>
                    </div>
                    <div className="h-2.5 w-full bg-neutral-800 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-[#D92662] rounded-full transition-all duration-500" 
                        style={{ width: `${item.share}%` }} 
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="bg-[#131118] border border-neutral-850 rounded-xl p-5 space-y-4">
            <h4 className="font-bold text-sm text-neutral-200">Upcoming Renewal Timeline Cliffs</h4>
            {portfolioStats.upcoming_renewals.length === 0 ? (
              <p className="text-xs text-neutral-400">No upcoming renewals found.</p>
            ) : (
              <div className="space-y-2">
                {portfolioStats.upcoming_renewals.map((renewal, idx) => {
                  let badgeClass = "bg-[#1C1115] text-[#F472B6] border-[#D92662]/20";
                  if (renewal.days_remaining < 30) {
                    badgeClass = "bg-red-950/40 text-red-400 border-red-900/40 animate-pulse";
                  } else if (renewal.days_remaining < 90) {
                    badgeClass = "bg-amber-955/40 text-amber-400 border-amber-900/40";
                  }
                  
                  return (
                    <div key={idx} className="bg-[#1A1821] border border-neutral-850 rounded-lg p-3 flex justify-between items-center gap-3">
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-neutral-200 truncate">{renewal.vendor}</div>
                        <div className="text-[10px] text-neutral-400 mt-0.5">Expires: {renewal.expiration_date}</div>
                      </div>
                      <span className={`text-[10px] font-bold border px-2 py-0.5 rounded-full shrink-0 ${badgeClass}`}>
                        {renewal.days_remaining} Days Left
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderShadow = () => {
    const successDocs = documents.filter(d => d.status === 'success');

    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-bold text-neutral-100">{t.shadowHeader}</h3>
          <p className="text-xs text-neutral-450">{t.shadowSub}</p>
        </div>

        {successDocs.length === 0 ? (
          <div className="text-center py-16 text-neutral-400">
            <Swords className="w-10 h-10 mx-auto mb-3 opacity-40 text-[#D92662]" />
            <p className="text-sm">Upload documents first to start a Shadow Battle.</p>
          </div>
        ) : (
          <form onSubmit={handleShadowBattle} className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-end gap-4">
              <div className="flex-1">
                <label className="text-xs font-semibold text-neutral-400 block mb-1.5">Select Document</label>
                <select
                  value={selectedShadowDoc}
                  onChange={e => setSelectedShadowDoc(e.target.value)}
                  className="w-full border border-neutral-850 rounded-lg p-2.5 text-sm bg-[#131118] focus:outline-none focus:border-[#D92662] cursor-pointer"
                >
                  {successDocs.map((doc, i) => (
                    <option key={i} value={doc.namespace}>{doc.name}</option>
                  ))}
                </select>
              </div>
              <div className="flex items-center gap-3">
                <label className="text-sm font-medium text-neutral-300">{t.langLabel}</label>
                <LangSelect value={shadowLang} onChange={setShadowLang} />
              </div>
              <button
                type="submit"
                disabled={isBattling}
                className="bg-[#D92662] hover:bg-[#B71C4F] disabled:bg-[#222026] disabled:text-[#909098] text-white text-sm font-semibold px-6 py-2.5 rounded-lg flex items-center gap-2 transition-colors cursor-pointer disabled:cursor-not-allowed h-[42px] shrink-0"
              >
                {isBattling ? <Loader2 className="w-4 h-4 animate-spin" /> : <Swords className="w-4 h-4" />}
                {isBattling ? "Conducting Battle..." : "Start Battle"}
              </button>
            </div>
          </form>
        )}

        {shadowResult && (
          <div className="space-y-6 border-t border-neutral-850 pt-6">
            <div className="bg-amber-955/20 border border-amber-900/30 rounded-xl p-5">
              <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">Clause Under Debate</h4>
              <p className="text-xs text-neutral-200 leading-relaxed font-mono whitespace-pre-wrap bg-[#131118] border border-amber-900/40 p-3 rounded-lg">
                {shadowResult.clause_focus}
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="text-sm font-bold text-neutral-200">Counsel Debate Rounds</h4>
              
              <div className="bg-red-955/20 border border-red-900/30 rounded-xl p-5 relative">
                <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-red-900/20">
                  <div className="flex items-center gap-2">
                    <Swords className="w-4 h-4 text-red-500" />
                    <span className="font-bold text-sm text-red-400">Attacker Counsel</span>
                  </div>
                </div>
                <div className="text-xs text-neutral-300 leading-relaxed whitespace-pre-wrap bg-[#131118] border border-[#D92662]/20 p-3 rounded-lg">
                  {renderFormattedText(shadowResult.attacker_turn)}
                </div>
              </div>

              <div className="bg-blue-955/20 border border-blue-900/30 rounded-xl p-5 relative">
                <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-blue-900/20">
                  <div className="flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4 text-blue-400" />
                    <span className="font-bold text-sm text-blue-400">Defender Counsel</span>
                  </div>
                </div>
                <div className="text-xs text-neutral-300 leading-relaxed whitespace-pre-wrap bg-[#131118] border border-blue-900/30 p-3 rounded-lg">
                  {renderFormattedText(shadowResult.defender_turn)}
                </div>
              </div>
            </div>

            <div className="bg-[#1D1016]/40 border border-[#D92662]/20 rounded-xl p-5 text-neutral-200">
              <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-[#D92662]/10">
                <h4 className="font-bold text-sm text-[#D92662]">Legal Risk Assessment & Verdict</h4>
              </div>
              <div className="text-xs text-neutral-300 leading-relaxed whitespace-pre-wrap bg-[#131118] border border-neutral-850 p-3 rounded-lg">
                {renderFormattedText(shadowResult.assessment)}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderResidue = () => {
    const successDocs = documents.filter(d => d.status === 'success');

    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-bold text-neutral-100">{t.residueHeader}</h3>
          <p className="text-xs text-neutral-450">{t.residueSub}</p>
        </div>

        {successDocs.length === 0 ? (
          <div className="text-center py-16 text-neutral-400">
            <Binary className="w-10 h-10 mx-auto mb-3 opacity-40 text-[#D92662]" />
            <p className="text-sm">Upload documents first to run document forensics.</p>
          </div>
        ) : (
          <form onSubmit={handleResidueForensics} className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-end gap-4">
              <div className="flex-1">
                <label className="text-xs font-semibold text-neutral-400 block mb-1.5">Select Document</label>
                <select
                  value={selectedResidueDoc}
                  onChange={e => setSelectedResidueDoc(e.target.value)}
                  className="w-full border border-neutral-850 rounded-lg p-2.5 text-sm bg-[#131118] focus:outline-none focus:border-[#D92662] cursor-pointer"
                >
                  {successDocs.map((doc, i) => (
                    <option key={i} value={doc.namespace}>{doc.name}</option>
                  ))}
                </select>
              </div>
              <button
                type="submit"
                disabled={isInspecting}
                className="bg-[#D92662] hover:bg-[#B71C4F] disabled:bg-[#222026] disabled:text-[#909098] text-white text-sm font-semibold px-6 py-2.5 rounded-lg flex items-center gap-2 transition-colors cursor-pointer disabled:cursor-not-allowed h-[42px] shrink-0"
              >
                {isInspecting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Binary className="w-4 h-4" />}
                {isInspecting ? "Inspecting..." : "Extract & Analyze"}
              </button>
            </div>
          </form>
        )}

        {residueResult && (
          <div className="space-y-6 border-t border-neutral-850 pt-6">
            <div className="bg-[#131118] border border-neutral-850 rounded-xl p-5 space-y-3">
              <h4 className="font-bold text-sm text-neutral-200">Extracted PDF File Metadata</h4>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-neutral-850 text-xs">
                  <thead>
                    <tr className="text-left text-neutral-450 uppercase tracking-wider font-bold">
                      <th className="py-2 px-3">Metadata Field</th>
                      <th className="py-2 px-3">Value</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-850 text-neutral-300 bg-[#131118]">
                    <tr>
                      <td className="py-2.5 px-3 font-semibold text-neutral-400">Author</td>
                      <td className="py-2.5 px-3">{residueResult.metadata.author || 'Unknown'}</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-semibold text-neutral-400">Creator / Application</td>
                      <td className="py-2.5 px-3">{residueResult.metadata.creator || 'Unknown'}</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-semibold text-neutral-400">PDF Producer</td>
                      <td className="py-2.5 px-3">{residueResult.metadata.producer || 'Unknown'}</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-semibold text-neutral-400">Creation Date</td>
                      <td className="py-2.5 px-3">{residueResult.metadata.creation_date || 'Unknown'}</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-semibold text-neutral-400">Modification Date</td>
                      <td className="py-2.5 px-3">{residueResult.metadata.mod_date || 'Unknown'}</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-semibold text-neutral-400">Page Count</td>
                      <td className="py-2.5 px-3">{residueResult.metadata.page_count || 0}</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-semibold text-neutral-400">File Size</td>
                      <td className="py-2.5 px-3">
                        {residueResult.metadata.file_size_bytes 
                          ? `${(residueResult.metadata.file_size_bytes / 1024).toFixed(1)} KB` 
                          : 'Unknown'}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Forensic AI Audits */}
            <div className="bg-[#1D1016]/40 border border-[#D92662]/20 rounded-xl p-5 text-neutral-200">
              <div className="flex items-center justify-between mb-3 border-b border-[#D92662]/20 pb-2">
                <div className="flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-[#D92662]" />
                  <h4 className="font-bold text-sm text-[#D92662]">Forensic Text Alteration Audit</h4>
                </div>
                
              </div>
              <div className="text-xs text-neutral-300 leading-relaxed whitespace-pre-wrap bg-[#1A1821] border border-neutral-850 p-3 rounded-lg">
                {renderFormattedText(residueResult.forensics_report)}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderEcho = () => {
    const templates = [
      { label: "Best vs. Reasonable Efforts", text: "Party A shall use best efforts to deliver the services, while Party B shall use reasonable efforts to support integration." },
      { label: "Sole Discretion vs. Consent", text: "Seller may approve modifications in its sole discretion, and Buyer shall not withhold consent unreasonably." },
      { label: "Indemnity vs. Hold Harmless", text: "The Contractor agrees to indemnify, defend, and hold harmless the Client from and against any third-party claims." },
    ];

    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-bold text-neutral-100">{t.echoHeader}</h3>
          <p className="text-xs text-neutral-450">{t.echoSub}</p>
        </div>

        <form onSubmit={handleEchoHarmonics} className="space-y-4">
          <div className="flex items-center gap-3">
            <label className="text-sm font-medium text-neutral-300">{t.langLabel}</label>
            <LangSelect value={echoLang} onChange={setEchoLang} />
          </div>

          <div>
            <label className="text-xs font-semibold text-neutral-400 block mb-1.5">Legal Phrase or Clause to Analyze</label>
            <textarea
              value={echoInput}
              onChange={e => setEchoInput(e.target.value)}
              placeholder="Paste a clause (or enter a term like 'best efforts') to audit cross-language semantic trapping..."
              className="w-full bg-[#1A1821] border border-neutral-850 text-neutral-100 placeholder-neutral-500 rounded-xl px-4 py-3 text-sm h-32 resize-none focus:outline-none focus:border-[#D92662]"
            />
          </div>

          {/* Quick templates */}
          <div className="space-y-1.5">
            <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">Quick Templates</span>
            <div className="flex flex-wrap gap-2">
              {templates.map((tpl, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setEchoInput(tpl.text)}
                  className="px-2.5 py-1.5 bg-[#1A1821] hover:bg-neutral-200 text-neutral-300 rounded-md text-xs font-medium cursor-pointer transition-colors border border-neutral-850/50"
                >
                  {tpl.label}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={!echoInput.trim() || isEchoing}
            className="bg-[#D92662] hover:bg-[#B71C4F] disabled:bg-[#222026] disabled:text-[#909098] disabled:opacity-100 text-white text-sm font-semibold px-6 py-2.5 rounded-lg flex items-center gap-2 transition-colors cursor-pointer disabled:cursor-not-allowed"
          >
            {isEchoing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Languages className="w-4 h-4" />}
            {isEchoing ? "Analyzing Harmonics..." : "Evaluate Harmonics"}
          </button>
        </form>

        {echoResult && (
          <div className="bg-[#1D1016]/40 border border-[#D92662]/20 rounded-xl p-5 text-neutral-200">
            <div className="flex items-center justify-between mb-3 border-b border-[#D92662]/20 pb-2">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#D92662]" />
                <h4 className="font-bold text-sm text-[#D92662]">Cross-Language Translation Trap Audit</h4>
              </div>
              
            </div>
            <div className="text-xs text-neutral-300 leading-relaxed whitespace-pre-wrap bg-[#1A1821] border border-neutral-850 p-3 rounded-lg">
              {renderFormattedText(echoResult)}
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderAlchemy = () => {
    const successDocs = documents.filter(d => d.status === 'success');

    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-bold text-neutral-100">{t.alchemyHeader}</h3>
          <p className="text-xs text-neutral-450">{t.alchemySub}</p>
        </div>

        {successDocs.length === 0 ? (
          <div className="text-center py-16 text-neutral-400">
            <Code className="w-10 h-10 mx-auto mb-3 opacity-40 text-[#D92662]" />
            <p className="text-sm">Upload documents first to compile SLA metrics.</p>
          </div>
        ) : (
          <form onSubmit={handleAlchemyCompile} className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-end gap-4">
              <div className="flex-1">
                <label className="text-xs font-semibold text-neutral-400 block mb-1.5">Select Document</label>
                <select
                  value={selectedAlchemyDoc}
                  onChange={e => setSelectedAlchemyDoc(e.target.value)}
                  className="w-full border border-neutral-850 rounded-lg p-2.5 text-sm bg-[#131118] focus:outline-none focus:border-[#D92662] cursor-pointer"
                >
                  {successDocs.map((doc, i) => (
                    <option key={i} value={doc.namespace}>{doc.name}</option>
                  ))}
                </select>
              </div>
              <button
                type="submit"
                disabled={isCompiling}
                className="bg-[#D92662] hover:bg-[#B71C4F] disabled:bg-[#222026] disabled:text-[#909098] text-white text-sm font-semibold px-6 py-2.5 rounded-lg flex items-center gap-2 transition-colors cursor-pointer disabled:cursor-not-allowed h-[42px] shrink-0"
              >
                {isCompiling ? <Loader2 className="w-4 h-4 animate-spin" /> : <Code className="w-4 h-4" />}
                {isCompiling ? "Compiling..." : "Compile to Prometheus YAML"}
              </button>
            </div>
          </form>
        )}

        {alchemyResult && (
          <div className="space-y-6 border-t border-neutral-150 pt-6">
            {/* Metric Targets Cards */}
            <div className="space-y-3">
              <h4 className="font-bold text-sm text-neutral-200">Extracted SLA Targets</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-[#1A1821] border border-neutral-850 rounded-xl p-4 flex flex-col justify-between">
                  <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Uptime Target</span>
                  <span className="text-base font-bold text-[#D92662] mt-1">
                    {alchemyResult.parameters.uptime_target || 'N/A'}
                  </span>
                </div>
                <div className="bg-[#1A1821] border border-neutral-850 rounded-xl p-4 flex flex-col justify-between">
                  <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Latency Target</span>
                  <span className="text-base font-bold text-[#D92662] mt-1">
                    {alchemyResult.parameters.latency_target || 'N/A'}
                  </span>
                </div>
                <div className="bg-[#1A1821] border border-neutral-850 rounded-xl p-4 flex flex-col justify-between">
                  <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Resolution Target</span>
                  <span className="text-base font-bold text-[#D92662] mt-1">
                    {alchemyResult.parameters.resolution_target || 'N/A'}
                  </span>
                </div>
              </div>
            </div>

            {/* Generated Prometheus Rule */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-sm text-neutral-200">Compiled Prometheus Alert Rules (.yml)</h4>
                <button
                  type="button"
                  onClick={() => copyToClipboard(alchemyResult.code_block)}
                  className="px-3 py-1 bg-[#D92662]/10 hover:bg-[#D92662]/20 text-[#D92662] rounded-md text-xs font-semibold cursor-pointer transition-colors"
                >
                  {copiedAlchemy ? "Copied!" : "Copy Code"}
                </button>
              </div>
              <pre className="bg-neutral-900 text-neutral-200 p-5 rounded-xl text-xs font-mono overflow-x-auto max-h-[400px] border border-neutral-850 leading-relaxed">
                <code>{alchemyResult.code_block}</code>
              </pre>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderers = {
    upload: renderUpload, chat: renderChat, risks: renderRisks,
    plain: renderPlainLanguage, brief: renderBrief,
    redline: renderRedline, contradictions: renderContradictions,
    negotiation: renderNegotiation, semanticDiff: renderSemanticDiff,
    timeline: renderTimeline, portfolioDashboard: renderPortfolioDashboard,
    shadow: renderShadow, residue: renderResidue,
    echo: renderEcho, alchemy: renderAlchemy,
  };

  return (
    <section id="workspace" className={
      isFullscreen 
        ? "bg-[#0e0617] overflow-hidden flex flex-col h-[calc(100vh-64px)] w-full" 
        : "bg-[#0e0617] overflow-hidden flex flex-col py-16 sm:py-24"
    }>
      <div className={
        isFullscreen 
          ? "transition-all duration-300 ease-in-out flex flex-col flex-1 min-h-0 max-w-full w-full p-0" 
          : "transition-all duration-300 ease-in-out flex flex-col flex-1 min-h-0 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full"
      }>
        {!isFullscreen && (
          <div className="text-center max-w-2xl mx-auto mb-10">
            {/* Animated Floating Logo */}
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 rounded-3xl bg-neutral-900 border border-neutral-800/80 flex items-center justify-center shadow-xl relative overflow-hidden group animate-float">
                {/* Glowing backdrop */}
                <div className="absolute inset-0 bg-gradient-to-tr from-[#D92662]/15 to-[#F472B6]/15 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute inset-0 bg-[#D92662]/5 animate-pulse"></div>
                <LogoIcon className="w-9 h-9 text-white relative z-10 transition-transform duration-500 group-hover:rotate-12" />
              </div>
            </div>
            <p className="text-[#D92662] font-bold text-xs tracking-[0.2em] uppercase mb-3">{t.uploadTab}</p>
            <h2 className="text-3xl sm:text-4xl font-serif font-black text-neutral-100 tracking-tight">
              {t.title}
            </h2>
            <p className="mt-3 text-neutral-450 text-sm font-sans">{t.subtitle}</p>
          </div>
        )}

        <div className={
          isFullscreen 
            ? "bg-[#131118] overflow-hidden flex flex-col flex-1 min-h-0 rounded-none border-0" 
            : "bg-[#131118] border border-neutral-850 overflow-hidden flex flex-col flex-1 min-h-0 rounded-2xl shadow-xl"
        }>
          {/* Pillar / Category Selector Header */}
          <div className="flex border-b border-neutral-850 bg-[#17151D] px-2 py-2 gap-2">
            <button 
              type="button"
              onClick={() => handleCategoryChange('core')}
              className={`flex-1 py-2 text-xs sm:text-sm font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer text-center ${
                activeCategory === 'core' 
                  ? 'bg-[#D92662] text-white shadow-lg shadow-[#D92662]/10' 
                  : 'text-neutral-450 hover:text-neutral-200 hover:bg-[#1A1821]'
              }`}
            >
              {globalLanguage === 'hi' ? "1. मुख्य विश्लेषण" : "1. Core Analysis"}
            </button>
            <button 
              type="button"
              onClick={() => handleCategoryChange('negotiation')}
              className={`flex-1 py-2 text-xs sm:text-sm font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer text-center ${
                activeCategory === 'negotiation' 
                  ? 'bg-[#D92662] text-white shadow-lg shadow-[#D92662]/10' 
                  : 'text-neutral-450 hover:text-neutral-200 hover:bg-[#1A1821]'
              }`}
            >
              {globalLanguage === 'hi' ? "2. समझौता वार्ता" : "2. Negotiation Sandbox"}
            </button>
            <button 
              type="button"
              onClick={() => handleCategoryChange('advanced')}
              className={`flex-1 py-2 text-xs sm:text-sm font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer text-center ${
                activeCategory === 'advanced' 
                  ? 'bg-[#D92662] text-white shadow-lg shadow-[#D92662]/10' 
                  : 'text-neutral-450 hover:text-neutral-200 hover:bg-[#1A1821]'
              }`}
            >
              {globalLanguage === 'hi' ? "3. उन्नत उपकरण" : "3. Advanced Utilities"}
            </button>
          </div>

          {/* Sub-Tab bar */}
          <div className="border-b border-neutral-850 flex items-center justify-between bg-[#131118] pr-4">
            <div className="flex-1 overflow-x-auto min-w-0">
              <div className="flex min-w-max">
                {tabs.filter(t => categoryTabs[activeCategory].includes(t.id)).map(t => (
                  <button key={t.id} onClick={() => setActiveTab(t.id)}
                    className={`flex items-center gap-2 px-4 sm:px-5 py-3.5 text-xs sm:text-sm font-medium whitespace-nowrap transition-colors cursor-pointer border-b-2 ${
                      activeTab === t.id
                        ? 'border-[#D92662] text-[#D92662] bg-[#D92662]/5'
                        : 'border-transparent text-neutral-450 hover:text-neutral-300 hover:bg-[#1A1821]'
                    }`}>
                    <t.icon className="w-4 h-4" />
                    <span>{t.label}</span>
                  </button>
                ))}
              </div>
            </div>
            {/* Maximize Toggle Button */}
            <button
              type="button"
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="ml-2 p-2 text-neutral-450 hover:text-[#D92662] hover:bg-[#1A1821] rounded-lg transition-colors cursor-pointer shrink-0 flex items-center justify-center"
              title={isFullscreen ? "Exit Fullscreen" : "Fullscreen Workspace"}
            >
              {isFullscreen ? (
                <Minimize2 className="w-4.5 h-4.5" />
              ) : (
                <Maximize2 className="w-4.5 h-4.5" />
              )}
            </button>
          </div>

          {/* Tab content */}
          <div className="p-5 sm:p-8 overflow-y-auto flex-1 min-h-0 bg-[#131118]">
            {renderers[activeTab]()}
          </div>
        </div>
      </div>
    </section>
  );
}
