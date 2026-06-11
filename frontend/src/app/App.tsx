import { useState } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import WorkspaceSection from './components/WorkspaceSection';
import Footer from './components/Footer';
import { 
  AlertCircle, Coins, Clock, Zap, ShieldCheck, 
  Users, SlidersHorizontal
} from 'lucide-react';

// Localization Dictionary
const translations = {
  en: {
    features: "Features",
    howItWorks: "How It Works",
    whyUs: "Overview",
    whoItIsFor: "Use Cases",
    workspace: "Workspace",
    logout: "Logout",
    login: "Login",
    getStarted: "Get Started",
    // Hero
    stopReading: "Stop Reading",
    contracts: "Contracts.",
    start: "Start",
    understanding: "Understanding",
    them: "Them.",
    heroSub: "LexiVault reads contracts, NDAs, vendor agreements and business documents, highlights risks, explains clauses in plain language, compares versions and helps you make confident decisions before you sign.",
    uploadDoc: "Upload Document",
    private: "100% Private",
    privateSub: "Your data stays on your device",
    enterprise: "Enterprise Ready",
    enterpriseSub: "Built for teams and scale",
    multiLang: "Multi-Language Support",
    multiLangSub: "English & Hindi",
    intelligence: "Advanced Intelligence",
    intelligenceSub: "Simulate edits & predict lifecycles",
    // How it works
    howItWorksSub: "Three steps to confident decisions",
    step1Title: "Upload",
    step1Desc: "Drop any PDF contract (NDAs, vendor agreements, policies). LexiVault parses and indexes every page.",
    step2Title: "Analyze",
    step2Desc: "AI extracts every clause, scores risk levels, flags one-sided terms, and pulls Wolfram legal context.",
    step3Title: "Decide",
    step3Desc: "Get plain-language explanations, structured decision briefs, redline comparisons, and clear next steps.",
    // Features section
    featuresSub: "Everything you need to understand documents",
    featuresPill: "Powerful Features",
    featuresLead: "Built for professionals who can't afford to get it wrong.",
    feat1Title: "Plain Language Explanations",
    feat1Desc: "Complex clauses, simplified in clear and concise language.",
    feat2Title: "Decision Brief Generator",
    feat2Desc: "Get a structured summary with key terms, risks and recommendations.",
    feat3Title: "Contract Redline Autopilot",
    feat3Desc: "Compare versions, highlight changes and understand the impact.",
    feat4Title: "Contradiction Detector",
    feat4Desc: "Detect conflicts across multiple documents before you sign.",
    // Login modal
    signIn: "Sign In",
    signUp: "Sign Up",
    username: "Username / Email",
    fullName: "Full Name",
    password: "Password",
    confirmPass: "Confirm Password",
    accessSub: "Access your private workspace",
    createSub: "Create your free local developer account",
    dontHaveAcc: "Don't have an account? Sign Up",
    alreadyHaveAcc: "Already have an account? Sign In",
    signInBtn: "Sign In to LexiVault",
    signUpBtn: "Create Account & Sign In",
    // Core problem
    problemTitle: "The Core Problem",
    problemSub: "Why current legal document review methods fail you.",
    chatgpt: "ChatGPT / Public AI",
    chatgptDesc: "Fast and easy, but leaks your confidential contract data and proprietary terms to public servers.",
    manual: "Manual Review",
    manualDesc: "100% private, but takes 3 to 4 hours per document and humans still miss critical liability clauses.",
    lawyer: "Traditional Lawyers",
    lawyerDesc: "Highly accurate, but costs ₹18,000+ per hour and takes 2 to 3 days to return a simple markup.",
    lexiSolution: "LexiVault Solution",
    lexiSolutionDesc: "Fast (seconds), 100% private (local execution), and highly accurate (expert legal QA system prompt). All three simultaneously.",
    // Who it is for
    whoTitle: "Who It Is For",
    whoSub: "Built for professionals in India who make decisions from documents they cannot afford to misread.",
    founder: "Startup Founders",
    founderDesc: "Sign 40 to 60 legal agreements per year with no dedicated legal team or heavy budget.",
    pm: "Product Managers",
    pmDesc: "Review vendor API agreements, data sharing clauses, and never miss a data ownership term.",
    consultant: "Business Consultants",
    consultantDesc: "Compare multiple service proposals, liability terms, and SLAs quickly and side-by-side.",
    hr: "HR Professionals",
    hrDesc: "Spot conflicts between new candidate offer letters and existing IP/non-compete agreements.",
    // Technical Architecture
    archTitle: "Technical Architecture",
    archSub: "A highly secure, six-stage local pipeline designed to keep your data local.",
    stage1: "1. PDF Ingestion",
    stage1Desc: "Primary parsing with PyMuPDF, pdfplumber fallback for tables, and Tesseract OCR. Preserves page boundaries.",
    stage2: "2. Chunker Split",
    stage2Desc: "Recursive split creating 500-token chunks with 50-token overlap, using clause-boundary separators.",
    stage3: "3. Local Embeddings",
    stage3Desc: "Dense vector conversion powered entirely locally by paraphrase-multilingual-MiniLM-L12-v2 model.",
    stage4: "4. Vector Storage",
    stage4Desc: "FAISS FlatL2 vector index stored locally with strict namespace isolation per document.",
    stage5: "5. Semantic Retrieval",
    stage5Desc: "Top-K semantic search across isolated namespaces simultaneously, with result merging.",
    stage6: "6. Cited Generation",
    stage6Desc: "Language generation via local API keys with strict system prompts preventing hallucination and enforcing citations."
  },
  hi: {
    features: "विशेषताएं",
    howItWorks: "यह कैसे काम करता है",
    whyUs: "अवलोकन",
    whoItIsFor: "उपयोग के मामले",
    workspace: "कार्यक्षेत्र",
    logout: "लॉगआउट",
    login: "लॉगिन",
    getStarted: "शुरू करें",
    // Hero
    stopReading: "अनुबंध पढ़ना",
    contracts: "बंद करें।",
    start: "उन्हें",
    understanding: "समझना",
    them: "शुरू करें।",
    heroSub: "लेक्सीवॉल्ट आपके अनुबंधों, एनडीए, विक्रेता समझौतों और व्यावसायिक दस्तावेजों को पढ़ता है, जोखिमों को उजागर करता है, सरल भाषा में खंडों की व्याख्या करता है, संस्करणों की तुलना करता है और हस्ताक्षर करने से पहले आपको आश्वस्त निर्णय लेने में मदद करता है।",
    uploadDoc: "दस्तावेज़ अपलोड करें",
    private: "100% निजी",
    privateSub: "आपका डेटा आपके डिवाइस पर रहता है",
    enterprise: "एंटरप्राइज तैयार",
    enterpriseSub: "टीमों और बड़े पैमाने के लिए निर्मित",
    multiLang: "बहु-भाषा",
    multiLangSub: "अंग्रेजी और हिंदी",
    intelligence: "उन्नत बुद्धिमत्ता",
    intelligenceSub: "संशोधनों का अनुकरण और जीवनचक्र का अनुमान लगाएं",
    // How it works
    howItWorksSub: "आश्वस्त निर्णयों के लिए तीन कदम",
    step1Title: "अपलोड",
    step1Desc: "कोई भी पीडीएफ अनुबंध छोड़ें (एनडीए, विक्रेता समझौते, नीतियां)। लेक्सीवॉल्ट प्रत्येक पृष्ठ को पार्स और अनुक्रमित करता है।",
    step2Title: "विश्लेषण",
    step2Desc: "एआई प्रत्येक खंड को निकालता है, जोखिम स्तरों को स्कोर करता है, एकतरफा शर्तों को फ़्लैग करता है, और वोल्फ्राम कानूनी संदर्भ खींचता है।",
    step3Title: "निर्णय",
    step3Desc: "सरल-भाषा स्पष्टीकरण, संरचित निर्णय संक्षिप्त विवरण, रेडलाइन तुलना और स्पष्ट अगले कदम प्राप्त करें।",
    // Features section
    featuresSub: "दस्तावेजों को समझने के लिए आवश्यक सब कुछ",
    featuresPill: "शक्तिशाली विशेषताएं",
    featuresLead: "उन पेशेवरों के लिए निर्मित जो गलतियाँ सहन नहीं कर सकते।",
    feat1Title: "सरल भाषा स्पष्टीकरण",
    feat1Desc: "जटिल खंड, स्पष्ट और संक्षिप्त भाषा में सरल बनाए गए।",
    feat2Title: "निर्णय संक्षिप्त जनरेटर",
    feat2Desc: "प्रमुख शर्तों, जोखिमों और सिफारिशों के साथ एक संरचित सारांश प्राप्त करें।",
    feat3Title: "अनुबंध रेडलाइन ऑटोपायलट",
    feat3Desc: "संस्करणों की तुलना करें, परिवर्तनों को उजागर करें और प्रभाव को समझें।",
    feat4Title: "विरोधाभास डिटेक्टर",
    feat4Desc: "हस्ताक्षर करने से पहले कई दस्तावेजों में संघर्षों का पता लगाएं।",
    // Login modal
    signIn: "साइन इन करें",
    signUp: "साइन अप करें",
    username: "उपयोगकर्ता नाम / ईमेल",
    fullName: "पूरा नाम",
    password: "पासवर्ड",
    confirmPass: "पासवर्ड की पुष्टि करें",
    accessSub: "अपने निजी कार्यक्षेत्र तक पहुंचें",
    createSub: "अपना मुफ्त स्थानीय डेवलपर खाता बनाएं",
    dontHaveAcc: "खाता नहीं है? साइन अप करें",
    alreadyHaveAcc: "पहले से खाता है? साइन इन करें",
    signInBtn: "लेक्सीवॉल्ट में साइन इन करें",
    signUpBtn: "खाता बनाएं और साइन इन करें",
    // Core problem
    problemTitle: "मुख्य समस्या",
    problemSub: "वर्तमान कानूनी दस्तावेज़ समीक्षा के तरीके आपको क्यों निराश करते हैं।",
    chatgpt: "चैटजीपीटी / सार्वजनिक एआई",
    chatgptDesc: "तेज़ और आसान, लेकिन आपके गोपनीय अनुबंध डेटा और मालिकाना शर्तों को सार्वजनिक सर्वर पर लीक करता है।",
    manual: "मैनुअल समीक्षा",
    manualDesc: "100% निजी, लेकिन प्रति दस्तावेज़ 3 से 4 घंटे लगते हैं और मनुष्य अभी भी महत्वपूर्ण देयता खंडों को छोड़ देते हैं।",
    lawyer: "पारंपरिक वकील",
    lawyerDesc: "अत्यधिक सटीक, लेकिन प्रति घंटे ₹18,000+ की लागत आती है और एक साधारण मार्कअप वापस करने में 2 से 3 दिन लगते हैं।",
    lexiSolution: "लेक्सीवॉल्ट समाधान",
    lexiSolutionDesc: "तेज़ (सेकंडों में), 100% निजी (स्थानीय निष्पादन), और अत्यधिक सटीक (विशेषज्ञ कानूनी क्यूएंडए प्रणाली संकेत)। तीनों एक साथ।",
    // Who it is for
    whoTitle: "यह किसके लिए है",
    whoSub: "भारत में उन पेशेवरों के लिए निर्मित जो उन दस्तावेजों से निर्णय लेते हैं जिन्हें वे गलत पढ़ने का जोखिम नहीं उठा सकते।",
    founder: "स्टार्टअप संस्थापक",
    founderDesc: "बिना किसी समर्पित कानूनी टीम या भारी बजट के प्रति वर्ष 40 से 60 कानूनी समझौते हस्ताक्षर करें।",
    pm: "उत्पाद प्रबंधक",
    pmDesc: "विक्रेता एपीआई समझौतों, डेटा साझाकरण खंडों की समीक्षा करें, और डेटा स्वामित्व की शर्तों को कभी न छोड़ें।",
    consultant: "व्यावसायिक सलाहकार",
    consultantDesc: "जल्दी और अगल-बगल कई सेवा प्रस्तावों, देयता शर्तों और एसएलए की तुलना करें।",
    hr: "मानव संसाधन पेशेवर",
    hrDesc: "नए उम्मीदवार के प्रस्ताव पत्रों और मौजूदा आईपी/गैर-प्रतिस्पर्धा समझौतों के बीच संघर्षों का पता लगाएं।",
    // Technical Architecture
    archTitle: "तकनीकी संरचना",
    archSub: "आपके डेटा को स्थानीय रखने के लिए डिज़ाइन किया गया एक अत्यधिक सुरक्षित, छह-चरणीय स्थानीय पाइपलाइन।",
    stage1: "1. पीडीएफ अंतर्ग्रहण",
    stage1Desc: "PyMuPDF के साथ प्राथमिक पार्सिंग, तालिकाओं के लिए pdfplumber फॉलबैक, और Tesseract OCR। पृष्ठ सीमाओं को सुरक्षित रखता है।",
    stage2: "2. चंकर स्प्लिट",
    stage2Desc: "खंड-सीमा जागरूक विभाजकों का उपयोग करके 50-टोकन ओवरलैप के साथ 500-टोकन खंड बनाने वाला पुनरावर्ती विभाजक।",
    stage3: "3. स्थानीय एम्बेडिंग",
    stage3Desc: "paraphrase-multilingual-MiniLM-L12-v2 मॉडल द्वारा पूरी तरह से स्थानीय स्तर पर संचालित सघन वेक्टर रूपांतरण।",
    stage4: "4. वेक्टर संग्रहण",
    stage4Desc: "प्रति दस्तावेज़ सख्त नेमस्पेस अलगाव के साथ स्थानीय रूप से संग्रहीत FAISS FlatL2 वेक्टर सूचकांक।",
    stage5: "5. शब्दार्थ पुनर्प्राप्ति",
    stage5Desc: "परिणाम विलय के साथ, एक साथ पृथक नेमस्पेस में टॉप-के सिमेंटिक खोज।",
    stage6: "6. उद्धृत जनरेशन",
    stage6Desc: "मतिभ्रम को रोकने और पृष्ठ उद्धरणों को लागू करने वाले सख्त सिस्टम संकेतों के साथ स्थानीय एपीआई कुंजी के माध्यम से भाषा निर्माण।"
  }
};

export type Language = 'en' | 'hi';

export default function App() {
  const [language, setLanguage] = useState<Language>('en');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  
  // Auth form states
  const [fullName, setFullName] = useState('');
  const [loginUser, setLoginUser] = useState('');
  const [loginPass, setLoginPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');

  const t = translations[language];

  const scrollToWorkspace = () => {
    document.getElementById('workspace')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSignUpMode) {
      if (loginPass !== confirmPass) {
        alert("Passwords do not match!");
        return;
      }
      setIsLoggedIn(true);
      setUsername(fullName || loginUser);
      setShowLoginModal(false);
      resetAuthFields();
    } else {
      if (loginUser.trim()) {
        setIsLoggedIn(true);
        setUsername(loginUser);
        setShowLoginModal(false);
        resetAuthFields();
      }
    }
  };

  const resetAuthFields = () => {
    setFullName('');
    setLoginUser('');
    setLoginPass('');
    setConfirmPass('');
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7]">
      <Navbar 
        onGetStarted={scrollToWorkspace} 
        isLoggedIn={isLoggedIn}
        username={username}
        onLoginClick={() => {
          setIsSignUpMode(false);
          setShowLoginModal(true);
        }}
        onLogout={() => {
          setIsLoggedIn(false);
          setUsername('');
        }}
        language={language}
        setLanguage={setLanguage}
        t={t}
      />
      <HeroSection onUploadClick={scrollToWorkspace} language={language} t={t} />

      {/* CORE PROBLEM COMPARISON */}
      <section id="why-us" className="py-16 sm:py-24 bg-white border-b border-neutral-200/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-[#092E26] font-bold text-xs tracking-[0.2em] uppercase mb-3">{t.problemTitle}</p>
            <h2 className="text-3xl sm:text-4xl font-serif font-black text-neutral-900 tracking-tight">
              {t.problemSub}
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {/* ChatGPT */}
            <div className="bg-[#FDFBF7] border border-neutral-200 rounded-2xl p-6 relative flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 border border-red-100 flex items-center justify-center mb-4">
                  <AlertCircle className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-neutral-950 text-base mb-2">{t.chatgpt}</h3>
                <p className="text-xs text-neutral-500 leading-relaxed font-sans">{t.chatgptDesc}</p>
              </div>
              <div className="mt-6 pt-4 border-t border-neutral-100 flex justify-between items-center text-[11px] font-bold text-red-600">
                <span>Fast & Leaky</span>
                <span>Security Risk</span>
              </div>
            </div>

            {/* Manual Review */}
            <div className="bg-[#FDFBF7] border border-neutral-200 rounded-2xl p-6 relative flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 border border-amber-100 flex items-center justify-center mb-4">
                  <Clock className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-neutral-950 text-base mb-2">{t.manual}</h3>
                <p className="text-xs text-neutral-500 leading-relaxed font-sans">{t.manualDesc}</p>
              </div>
              <div className="mt-6 pt-4 border-t border-neutral-100 flex justify-between items-center text-[11px] font-bold text-amber-700">
                <span>Slow & Private</span>
                <span>Human Error Risk</span>
              </div>
            </div>

            {/* Traditional Lawyer */}
            <div className="bg-[#FDFBF7] border border-neutral-200 rounded-2xl p-6 relative flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 border border-blue-100 flex items-center justify-center mb-4">
                  <Coins className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-neutral-950 text-base mb-2">{t.lawyer}</h3>
                <p className="text-xs text-neutral-500 leading-relaxed font-sans">{t.lawyerDesc}</p>
              </div>
              <div className="mt-6 pt-4 border-t border-neutral-100 flex justify-between items-center text-[11px] font-bold text-blue-700">
                <span>Accurate & Private</span>
                <span>₹18,000 / Hr Cost</span>
              </div>
            </div>

            {/* LexiVault */}
            <div className="bg-[#E6F0ED] border border-[#D1E6DF] rounded-2xl p-6 relative flex flex-col justify-between shadow-lg ring-2 ring-[#0B7A63]/20">
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#092E26] text-white flex items-center justify-center mb-4">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-[#092E26] text-base mb-2">{t.lexiSolution}</h3>
                <p className="text-xs text-[#092E26]/80 leading-relaxed font-sans">{t.lexiSolutionDesc}</p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#D1E6DF] flex justify-between items-center text-[11px] font-bold text-[#0B7A63]">
                <span>Fast, Private & Accurate</span>
                <span>100% Private Analytics</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <FeaturesSection t={t} />

      {/* How It Works */}
      <section id="how-it-works" className="py-16 sm:py-24 bg-white border-t border-neutral-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-[#092E26] font-bold text-xs tracking-[0.2em] uppercase mb-3">{t.howItWorks}</p>
            <h2 className="text-3xl sm:text-4xl font-serif font-black text-neutral-900 tracking-tight">
              {t.howItWorksSub}
            </h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-8">
            {[
              { step: '01', title: t.step1Title, desc: t.step1Desc },
              { step: '02', title: t.step2Title, desc: t.step2Desc },
              { step: '03', title: t.step3Title, desc: t.step3Desc },
            ].map(item => (
              <div key={item.step} className="text-center">
                <div className="w-12 h-12 rounded-2xl bg-[#092E26]/10 flex items-center justify-center mx-auto mb-4">
                  <span className="text-[#092E26] font-bold text-lg">{item.step}</span>
                </div>
                <h3 className="font-bold text-neutral-900 text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-neutral-500 leading-relaxed font-sans">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHO IT IS FOR SECTION */}
      <section id="who-it-is-for" className="py-16 sm:py-24 bg-gradient-to-b from-[#FDFBF7] to-[#F6F4F0] border-t border-neutral-200/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-[#092E26] font-bold text-xs tracking-[0.2em] uppercase mb-3">{t.whoTitle}</p>
            <h2 className="text-3xl sm:text-4xl font-serif font-black text-neutral-900 tracking-tight">
              {t.whoSub}
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Users, title: t.founder, desc: t.founderDesc },
              { icon: SlidersHorizontal, title: t.pm, desc: t.pmDesc },
              { icon: Zap, title: t.consultant, desc: t.consultantDesc },
              { icon: ShieldCheck, title: t.hr, desc: t.hrDesc },
            ].map((item, idx) => (
              <div key={idx} className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-full bg-[#092E26]/10 flex items-center justify-center text-[#092E26] mb-4">
                  <item.icon className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-neutral-950 text-sm mb-2">{item.title}</h3>
                <p className="text-xs text-neutral-500 leading-relaxed font-sans">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <WorkspaceSection globalLanguage={language} />



      <Footer />

      {/* Auth Modal (Sign In / Sign Up) */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-neutral-900/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
          <div className="bg-[#FDFBF7] border border-neutral-200/60 rounded-2xl w-full max-w-[340px] p-6 shadow-2xl relative">
            <button 
              onClick={() => {
                setShowLoginModal(false);
                resetAuthFields();
              }}
              className="absolute right-4 top-4 text-neutral-400 hover:text-neutral-600 font-bold text-lg cursor-pointer"
            >
              ×
            </button>
            <h3 className="font-serif text-[22px] font-black text-[#092E26] mb-1 leading-none uppercase">
              {isSignUpMode ? t.signUp : t.signIn}
            </h3>
            <p className="text-xs text-neutral-500 mb-4">
              {isSignUpMode ? t.createSub : t.accessSub}
            </p>
            
            <form onSubmit={handleAuthSubmit} className="space-y-3">
              {isSignUpMode && (
                <div>
                  <label className="text-[10px] font-bold text-[#092E26]/80 uppercase block mb-1">{t.fullName}</label>
                  <input 
                    type="text" 
                    value={fullName}
                    onChange={e => setFullName(e.target.value)}
                    placeholder="e.g. John Doe"
                    required
                    className="w-full border border-neutral-200 rounded-lg px-3 py-2 text-xs bg-white focus:outline-none focus:border-[#092E26]"
                  />
                </div>
              )}
              
              <div>
                <label className="text-[10px] font-bold text-[#092E26]/80 uppercase block mb-1">{t.username}</label>
                <input 
                  type="text" 
                  value={loginUser}
                  onChange={e => setLoginUser(e.target.value)}
                  placeholder="e.g. johndoe@gmail.com"
                  required
                  className="w-full border border-neutral-200 rounded-lg px-3 py-2 text-xs bg-white focus:outline-none focus:border-[#092E26]"
                />
              </div>
              
              <div>
                <label className="text-[10px] font-bold text-[#092E26]/80 uppercase block mb-1">{t.password}</label>
                <input 
                  type="password" 
                  value={loginPass}
                  onChange={e => setLoginPass(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full border border-neutral-200 rounded-lg px-3 py-2 text-xs bg-white focus:outline-none focus:border-[#092E26]"
                />
              </div>

              {isSignUpMode && (
                <div>
                  <label className="text-[10px] font-bold text-[#092E26]/80 uppercase block mb-1">{t.confirmPass}</label>
                  <input 
                    type="password" 
                    value={confirmPass}
                    onChange={e => setConfirmPass(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full border border-neutral-200 rounded-lg px-3 py-2 text-xs bg-white focus:outline-none focus:border-[#092E26]"
                  />
                </div>
              )}

              <button 
                type="submit" 
                className="w-full bg-[#092E26] hover:bg-[#051C17] text-white font-semibold text-xs py-2.5 rounded-lg mt-4 cursor-pointer transition-colors shadow-sm"
              >
                {isSignUpMode ? t.signUpBtn : t.signInBtn}
              </button>
            </form>

            <div className="mt-4 text-center">
              <button 
                onClick={() => {
                  setIsSignUpMode(!isSignUpMode);
                  resetAuthFields();
                }}
                className="text-[11px] font-semibold text-[#0B7A63] hover:underline cursor-pointer"
              >
                {isSignUpMode ? t.alreadyHaveAcc : t.dontHaveAcc}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
