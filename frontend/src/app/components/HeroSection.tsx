import { Upload, Shield, Building2, Globe, Download, MoreVertical, Sparkles, AlertTriangle, Clock, Mic, Play, Swords, Binary, Languages, Code } from 'lucide-react';
import type { Language } from '../App';

interface HeroSectionProps {
  onUploadClick: () => void;
  language: Language;
  t: any;
}

export default function HeroSection({ onUploadClick, language, t }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden bg-[radial-gradient(circle_at_75%_50%,#F6F4F0_0%,#FDFBF7_60%,#FDFBF7_100%)] border-b border-neutral-200/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-20 pb-16 sm:pb-24">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-6 items-center">
          
          {/* LEFT - Text & Typography */}
          <div className="lg:col-span-6 flex flex-col justify-center xl:pr-12 lg:pr-6">
            <h1 className="font-serif font-black text-[38px] sm:text-[54px] lg:text-[44px] xl:text-[60px] 2xl:text-[72px] leading-[0.96] tracking-tight uppercase select-none">
              {language === 'en' ? (
                <>
                  <span className="text-neutral-900 block">{t.stopReading}</span>
                  <span className="text-neutral-900 block">{t.contracts}</span>
                  <span className="text-[#0B7A63] block">{t.start}</span>
                  <span className="text-[#0B7A63] block">{t.understanding}</span>
                  <span className="text-[#0B7A63] block">{t.them}</span>
                </>
              ) : (
                <>
                  <span className="text-neutral-900 block normal-case font-sans tracking-normal leading-[1.1] text-[32px] sm:text-[46px] lg:text-[36px] xl:text-[48px] 2xl:text-[58px]">अनुबंध पढ़ना बंद करें।</span>
                  <span className="text-[#0B7A63] block normal-case font-sans tracking-normal leading-[1.1] text-[32px] sm:text-[46px] lg:text-[36px] xl:text-[48px] 2xl:text-[58px] mt-2">उन्हें समझना शुरू करें।</span>
                </>
              )}
            </h1>

            <p className="mt-6 text-neutral-600 text-sm sm:text-base leading-relaxed max-w-md font-sans">
              {t.heroSub}
            </p>

            <div className="mt-8">
              <button
                onClick={onUploadClick}
                className="inline-flex items-center gap-2 bg-[#092E26] hover:bg-[#051C17] text-white font-semibold text-sm px-6 py-3.5 rounded-lg transition-all cursor-pointer shadow-sm shrink-0"
              >
                <Upload className="w-4 h-4" />
                {t.uploadDoc}
              </button>
            </div>

            {/* 4 Trust Badges */}
            <div className="grid grid-cols-2 gap-5 mt-12 max-w-md">
              {/* Private */}
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full flex items-center justify-center bg-[#E6F0ED] text-[#0B7A63] shrink-0 border border-[#D1E6DF]">
                  <Shield className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-neutral-900 leading-none">{t.private}</h4>
                  <p className="text-[10px] text-neutral-500 mt-1">{t.privateSub}</p>
                </div>
              </div>

              {/* Enterprise */}
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full flex items-center justify-center bg-[#FDF6E2] text-[#B45309] shrink-0 border border-[#FBECC3]">
                  <Building2 className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-neutral-900 leading-none">{t.enterprise}</h4>
                  <p className="text-[10px] text-neutral-500 mt-1">{t.enterpriseSub}</p>
                </div>
              </div>

              {/* Languages */}
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full flex items-center justify-center bg-[#FCE8E6] text-[#C2410C] shrink-0 border border-[#FAD2CD]">
                  <Globe className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-neutral-900 leading-none">{t.multiLang}</h4>
                  <p className="text-[10px] text-neutral-500 mt-1">{t.multiLangSub}</p>
                </div>
              </div>

              {/* Intelligence */}
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full flex items-center justify-center bg-[#F3E8FF] text-[#7C3AED] shrink-0 border border-[#E9D5FF]">
                  <Clock className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-neutral-900 leading-none">{t.intelligence}</h4>
                  <p className="text-[10px] text-neutral-500 mt-1">{t.intelligenceSub}</p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT - Interactive Document Mockup */}
          <div className="lg:col-span-6 relative flex justify-center items-center py-4">
            {/* Scalable Mockup Group */}
            <div className="relative w-full max-w-[580px] h-[520px] origin-center scale-[0.7] xs:scale-[0.8] sm:scale-90 md:scale-100 transition-all select-none">
              
              {/* SVG Connectors overlay */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" xmlns="http://www.w3.org/2000/svg">
                {/* Curve 1: Portfolio Risk (Left Card 1) -> Points to top skeleton text lines */}
                <path d="M 150 50 C 170 50, 195 135, 210 135" stroke="#0B7A63" strokeWidth="1.2" strokeOpacity="0.4" fill="none" />
                {/* Curve 2: Lifecycle Timeline (Right Card 1) -> Points to toolbar page number */}
                <path d="M 430 65 C 410 65, 395 70, 380 70" stroke="#0B7A63" strokeWidth="1.2" strokeOpacity="0.4" fill="none" />
                {/* Curve 3: Counterparty Pushback (Left Card 2) -> Points directly to clause number '12.1' */}
                <path d="M 150 170 C 170 170, 185 180, 195 180" stroke="#0B7A63" strokeWidth="1.2" strokeOpacity="0.4" fill="none" />
                {/* Curve 4: Voice Briefing (Right Card 2) -> Points directly to the highlighted financial value '₹50,000' */}
                <path d="M 430 180 C 410 180, 350 198, 330 198" stroke="#0B7A63" strokeWidth="1.2" strokeOpacity="0.4" fill="none" />
                {/* Curve 5: The Shadow (Left Card 3) -> Points to skeleton lines below highlighted block */}
                <path d="M 150 290 C 170 290, 195 245, 210 245" stroke="#0B7A63" strokeWidth="1.2" strokeOpacity="0.4" fill="none" />
                {/* Curve 6: The Residue (Right Card 3) -> Points to Clause 12.2 marker */}
                <path d="M 430 295 C 410 295, 395 305, 380 305" stroke="#0B7A63" strokeWidth="1.2" strokeOpacity="0.4" fill="none" />
                {/* Curve 7: The Echo (Left Card 4) -> Points to bottom skeleton lines */}
                <path d="M 150 410 C 170 410, 195 355, 210 355" stroke="#0B7A63" strokeWidth="1.2" strokeOpacity="0.4" fill="none" />
                {/* Curve 8: The Alchemy (Right Card 4) -> Points to lowest skeleton lines */}
                <path d="M 430 410 C 410 410, 395 390, 380 390" stroke="#0B7A63" strokeWidth="1.2" strokeOpacity="0.4" fill="none" />

                {/* Dots at callout edges */}
                <circle cx="150" cy="50" r="3" fill="#0B7A63" />
                <circle cx="150" cy="170" r="3" fill="#0B7A63" />
                <circle cx="150" cy="290" r="3" fill="#0B7A63" />
                <circle cx="150" cy="410" r="3" fill="#0B7A63" />
                <circle cx="430" cy="65" r="3" fill="#0B7A63" />
                <circle cx="430" cy="180" r="3" fill="#0B7A63" />
                <circle cx="430" cy="295" r="3" fill="#0B7A63" />
                <circle cx="430" cy="410" r="3" fill="#0B7A63" />

                {/* Dots at document highlights (mapping precisely to target elements) */}
                <circle cx="210" cy="135" r="3" fill="#0B7A63" />
                <circle cx="195" cy="180" r="3" fill="#0B7A63" />
                <circle cx="210" cy="245" r="3" fill="#0B7A63" />
                <circle cx="210" cy="355" r="3" fill="#0B7A63" />
                <circle cx="380" cy="70" r="3" fill="#0B7A63" />
                <circle cx="330" cy="198" r="3" fill="#0B7A63" />
                <circle cx="380" cy="305" r="3" fill="#0B7A63" />
                <circle cx="380" cy="390" r="3" fill="#0B7A63" />
              </svg>

              {/* CENTER: Document Viewer Card */}
              <div className="absolute left-[180px] top-[40px] w-[220px] h-[440px] bg-white rounded-2xl border border-neutral-200/80 shadow-2xl flex flex-col overflow-hidden">
                {/* Document Format Tabs */}
                <div className="flex border-b border-neutral-150 bg-[#F4F4F4] select-none text-[10px]">
                  {/* PDF Tab (Active) */}
                  <div className="flex-1 flex items-center gap-1.5 px-3 py-2 bg-white border-r border-neutral-200/50 font-semibold text-neutral-800">
                    <div className="w-5 h-3.5 bg-red-500 rounded-[3px] flex items-center justify-center text-white font-sans font-black text-[6px] tracking-tighter shrink-0">
                      PDF
                    </div>
                    <span className="truncate max-w-[70px]">Vendor.pdf</span>
                  </div>
                  {/* DOCX Tab (Inactive) */}
                  <div className="flex-1 flex items-center gap-1.5 px-3 py-2 text-neutral-400 font-medium">
                    <div className="w-5 h-3.5 bg-blue-500 rounded-[3px] flex items-center justify-center text-white font-sans font-black text-[6px] tracking-tighter shrink-0 opacity-55">
                      DOC
                    </div>
                    <span className="truncate max-w-[70px]">SOW.docx</span>
                  </div>
                </div>

                {/* PDF Toolbar */}
                <div className="flex items-center justify-between px-2 py-1.5 bg-[#FBFBFB] border-b border-neutral-100 text-[9px] text-neutral-500">
                  <div className="flex items-center gap-1">
                    <span className="cursor-pointer hover:text-neutral-800">‹</span>
                    <span className="w-5 py-0.5 border border-neutral-200 rounded text-center text-[8px] bg-white">31</span>
                    <span className="text-[8px] text-neutral-400">/ 47</span>
                    <span className="cursor-pointer hover:text-neutral-800">›</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="cursor-pointer hover:text-neutral-800">-</span>
                    <span className="w-8 py-0.5 border border-neutral-200 rounded text-center text-[8px] bg-white">125%</span>
                    <span className="cursor-pointer hover:text-neutral-800">+</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Download className="w-2.5 h-2.5 cursor-pointer hover:text-neutral-800" />
                    <MoreVertical className="w-2.5 h-2.5 cursor-pointer hover:text-neutral-800" />
                  </div>
                </div>

                {/* Document Content Body */}
                <div className="flex-1 p-3.5 space-y-3 font-mono">
                  {/* Gray Skeleton Lines */}
                  <div className="space-y-1.5">
                    <div className="h-1 bg-neutral-200/70 rounded w-[90%]"></div>
                    <div className="h-1 bg-neutral-200/70 rounded w-[85%]"></div>
                    <div className="h-1 bg-neutral-200/70 rounded w-[95%]"></div>
                    <div className="h-1 bg-neutral-200/70 rounded w-[60%]"></div>
                  </div>

                  {/* Highlighted Clause Box */}
                  <div className="bg-[#FFF8E7] border-l-[3px] border-[#F59E0B] rounded-r p-2 py-2.5 text-neutral-800 text-[9.5px] leading-relaxed font-sans shadow-sm font-medium">
                    <span className="font-bold">12.1</span> {language === 'hi' ? 'विक्रेता की देयता ₹50,000 तक सीमित होगी।' : 'Vendor liability shall be limited to '} 
                    {language === 'en' && <span className="bg-amber-200/60 px-0.5 rounded font-semibold">₹50,000</span>}.
                  </div>

                  {/* Gray Skeleton Lines below */}
                  <div className="space-y-1.5 pt-1">
                    <div className="h-1 bg-neutral-200/70 rounded w-[95%]"></div>
                    <div className="h-1 bg-neutral-200/70 rounded w-[90%]"></div>
                    <div className="h-1 bg-neutral-200/70 rounded w-[80%]"></div>
                    <span className="text-[8px] text-neutral-300 font-sans block mt-2">12.2</span>
                    <div className="h-1 bg-neutral-200/70 rounded w-[85%]"></div>
                    <div className="h-1 bg-neutral-200/70 rounded w-[70%]"></div>
                  </div>
                </div>
              </div>

              {/* Left Callout 1: Portfolio Risk */}
              <div className="absolute left-[0px] top-[15px] w-[150px] bg-white rounded-2xl border border-neutral-200/80 p-3 shadow-xl">
                <div className="flex items-center gap-1.5 text-neutral-700">
                  <div className="w-4 h-4 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 shrink-0">
                    <AlertTriangle className="w-2.5 h-2.5" />
                  </div>
                  <span className="font-bold text-[10px]">{language === 'hi' ? 'पोर्टफोलियो जोखिम' : 'Portfolio Risk'}</span>
                </div>
                <div className="mt-2">
                  <span className="inline-block text-[8px] font-bold bg-red-50 text-red-600 border border-red-100 rounded px-1.5 py-0.5">{language === 'hi' ? 'उच्च देयता' : 'High Liability'}</span>
                </div>
                <div className="mt-1 text-neutral-850 font-semibold text-[10px]">
                  {language === 'hi' ? 'कुल देयता: ₹50,000' : 'Total: ₹50,000 limit'}
                </div>
              </div>

              {/* Left Callout 2: Counterparty Simulation */}
              <div className="absolute left-[0px] top-[135px] w-[150px] bg-white rounded-2xl border border-neutral-200/80 p-3 shadow-xl">
                <div className="flex items-center gap-1.5 text-neutral-700">
                  <div className="w-4 h-4 rounded-full bg-emerald-100 flex items-center justify-center text-[#0B7A63] shrink-0">
                    <Sparkles className="w-2.5 h-2.5" />
                  </div>
                  <span className="font-bold text-[10px]">{language === 'hi' ? 'विरोधी पक्ष पुशबैक' : 'Counterparty Pushback'}</span>
                </div>
                <div className="mt-2">
                  <span className="inline-block text-[8px] font-bold bg-[#EAF5F2] text-[#0B7A63] border border-[#D1ECE5] rounded px-1.5 py-0.5">{language === 'hi' ? 'आक्रामक रवैया' : 'Aggressive Stance'}</span>
                </div>
                <div className="mt-1 text-neutral-850 font-semibold text-[10px]">
                  {language === 'hi' ? 'धारा 12.1 पर आपत्ति' : 'Objection to Clause 12.1'}
                </div>
              </div>

              {/* Left Callout 3: The Shadow */}
              <div className="absolute left-[0px] top-[255px] w-[150px] bg-white rounded-2xl border border-neutral-200/80 p-3 shadow-xl">
                <div className="flex items-center gap-1.5 text-neutral-700">
                  <div className="w-4 h-4 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 shrink-0">
                    <Swords className="w-2.5 h-2.5" />
                  </div>
                  <span className="font-bold text-[10px]">{language === 'hi' ? 'द शैडो' : 'The Shadow'}</span>
                </div>
                <div className="mt-2">
                  <span className="inline-block text-[8px] font-bold bg-slate-50 text-slate-600 border border-slate-100 rounded px-1.5 py-0.5">{language === 'hi' ? 'एआई मुकाबला' : 'AI vs. AI Battle'}</span>
                </div>
                <div className="mt-1 text-neutral-850 font-semibold text-[10px]">
                  {language === 'hi' ? 'वास्तविक समय देयता बहस' : 'Real-time liability debate'}
                </div>
              </div>

              {/* Left Callout 4: The Echo */}
              <div className="absolute left-[0px] top-[375px] w-[150px] bg-white rounded-2xl border border-neutral-200/80 p-3 shadow-xl">
                <div className="flex items-center gap-1.5 text-neutral-700">
                  <div className="w-4 h-4 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 shrink-0">
                    <Languages className="w-2.5 h-2.5" />
                  </div>
                  <span className="font-bold text-[10px]">{language === 'hi' ? 'द इको' : 'The Echo'}</span>
                </div>
                <div className="mt-2">
                  <span className="inline-block text-[8px] font-bold bg-[#EEF2FF] text-[#4F46E5] border border-[#E0E7FF] rounded px-1.5 py-0.5">{language === 'hi' ? 'कानूनी सामंजस्य' : 'Legal Harmonics'}</span>
                </div>
                <div className="mt-1 text-neutral-850 font-semibold text-[10px]">
                  {language === 'hi' ? 'अनुवाद अंतर विश्लेषण' : 'Translation gap audit'}
                </div>
              </div>

              {/* Right Callout 1: Timeline Predictor */}
              <div className="absolute right-[0px] top-[30px] w-[150px] bg-white rounded-2xl border border-neutral-200/80 p-3 shadow-xl flex flex-col">
                <div className="flex items-center gap-1.5 text-neutral-700">
                  <div className="w-4 h-4 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 shrink-0">
                    <Clock className="w-2.5 h-2.5" />
                  </div>
                  <span className="font-bold text-[10px]">{language === 'hi' ? 'समयसीमा भविष्यवक्ता' : 'Lifecycle Timeline'}</span>
                </div>
                <div className="mt-2">
                  <span className="inline-block text-[8px] font-bold bg-purple-50 text-purple-600 border border-purple-100 rounded px-1.5 py-0.5">{language === 'hi' ? 'नवीनीकरण: 12 महीने' : 'Renewal: 12 Months'}</span>
                </div>
                <div className="mt-1 text-neutral-850 font-semibold text-[10px]">
                  {language === 'hi' ? 'अगला क्लिफ: नवंबर 2026' : 'Next Cliff: Nov 2026'}
                </div>
              </div>

              {/* Right Callout 2: Voice Briefing */}
              <div className="absolute right-[0px] top-[145px] w-[150px] bg-white rounded-2xl border border-neutral-200/80 p-3 shadow-xl">
                <div className="flex items-center gap-1.5 text-neutral-700">
                  <div className="w-4 h-4 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 shrink-0">
                    <Mic className="w-2.5 h-2.5" />
                  </div>
                  <span className="font-bold text-[10px]">{language === 'hi' ? 'वॉइस ब्रीफिंग' : 'Voice Briefing'}</span>
                </div>
                <div className="mt-2 flex items-center gap-1.5">
                  <div className="w-5 h-5 rounded-full bg-amber-500 hover:bg-amber-600 flex items-center justify-center text-white cursor-pointer shrink-0">
                    <Play className="w-2 h-2 fill-current" />
                  </div>
                  <span className="text-neutral-600 font-semibold text-[10px]">
                    {language === 'hi' ? 'सुनने के लिए तैयार' : 'Listen to summary'}
                  </span>
                </div>
              </div>

              {/* Right Callout 3: The Residue */}
              <div className="absolute right-[0px] top-[260px] w-[150px] bg-white rounded-2xl border border-neutral-200/80 p-3 shadow-xl">
                <div className="flex items-center gap-1.5 text-neutral-700">
                  <div className="w-4 h-4 rounded-full bg-rose-100 flex items-center justify-center text-rose-600 shrink-0">
                    <Binary className="w-2.5 h-2.5" />
                  </div>
                  <span className="font-bold text-[10px]">{language === 'hi' ? 'द रेजिड्यू' : 'The Residue'}</span>
                </div>
                <div className="mt-2">
                  <span className="inline-block text-[8px] font-bold bg-rose-50 text-rose-600 border border-rose-100 rounded px-1.5 py-0.5">{language === 'hi' ? 'फोरेंसिक रिपोर्ट' : 'Forensics Report'}</span>
                </div>
                <div className="mt-1 text-neutral-850 font-semibold text-[10px] truncate" title="Metadata & boilerplates">
                  {language === 'hi' ? 'छिपा हुआ मेटाडेटा ऑडिट' : 'Metadata & altered boilerplate'}
                </div>
              </div>

              {/* Right Callout 4: The Alchemy */}
              <div className="absolute right-[0px] top-[375px] w-[150px] bg-white rounded-2xl border border-neutral-200/80 p-3 shadow-xl">
                <div className="flex items-center gap-1.5 text-neutral-700">
                  <div className="w-4 h-4 rounded-full bg-teal-100 flex items-center justify-center text-teal-600 shrink-0">
                    <Code className="w-2.5 h-2.5" />
                  </div>
                  <span className="font-bold text-[10px]">{language === 'hi' ? 'द अल्केमी' : 'The Alchemy'}</span>
                </div>
                <div className="mt-2">
                  <span className="inline-block text-[8px] font-bold bg-[#E6F4F1] text-[#0D9488] border border-[#CCFBF1] rounded px-1.5 py-0.5">{language === 'hi' ? 'SLA कंपाइलर' : 'SLA Compiler'}</span>
                </div>
                <div className="mt-1 text-neutral-850 font-semibold text-[10px]">
                  {language === 'hi' ? 'SLA को प्रोमेथियस में बदलें' : 'Compile SLA to Prometheus'}
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
