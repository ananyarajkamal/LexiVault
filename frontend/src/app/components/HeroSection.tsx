import { Upload, Shield, Building2, Globe, Download, MoreVertical, Sparkles, AlertTriangle, Clock, Swords, Languages, Scale, Feather, Fingerprint } from 'lucide-react';
import type { Language } from '../App';

interface HeroSectionProps {
  onUploadClick: () => void;
  language: Language;
  t: any;
}

export default function HeroSection({ onUploadClick, language, t }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden bg-[radial-gradient(circle_at_75%_50%,#1B1218_0%,#080709_60%,#080709_100%)] border-b border-neutral-900/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-20 pb-16 sm:pb-24">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-6 items-center">
          
          {/* LEFT - Text & Typography */}
          <div className="lg:col-span-6 flex flex-col justify-center xl:pr-12 lg:pr-6">
            <h1 className="font-serif font-black text-[38px] sm:text-[54px] lg:text-[44px] xl:text-[60px] 2xl:text-[72px] leading-[0.96] tracking-tight uppercase select-none">
              {language === 'en' ? (
                <>
                  <span className="text-white block">{t.stopReading}</span>
                  <span className="text-white block">{t.contracts}</span>
                  <span className="text-[#D92662] block">{t.start}</span>
                  <span className="text-[#D92662] block">{t.understanding}</span>
                  <span className="text-[#D92662] block">{t.them}</span>
                </>
              ) : (
                <>
                  <span className="text-white block normal-case font-sans tracking-normal leading-[1.1] text-[32px] sm:text-[46px] lg:text-[36px] xl:text-[48px] 2xl:text-[58px]">अनुबंध पढ़ना बंद करें।</span>
                  <span className="text-[#D92662] block normal-case font-sans tracking-normal leading-[1.1] text-[32px] sm:text-[46px] lg:text-[36px] xl:text-[48px] 2xl:text-[58px] mt-2">उन्हें समझना शुरू करें।</span>
                </>
              )}
            </h1>

            <p className="mt-6 text-neutral-400 text-sm sm:text-base leading-relaxed max-w-md font-sans">
              {t.heroSub}
            </p>

            <div className="mt-8 flex items-center gap-4">
              <button
                onClick={onUploadClick}
                className="inline-flex items-center gap-2 bg-[#D92662] hover:bg-[#B71C4F] text-white font-semibold text-sm px-6 py-3.5 rounded-lg transition-all cursor-pointer shadow-sm shrink-0"
              >
                <Upload className="w-4 h-4" />
                {t.uploadDoc}
              </button>
              <button
                onClick={onUploadClick}
                className="inline-flex items-center justify-center border border-neutral-700 hover:border-neutral-500 text-white font-semibold text-sm px-6 py-3.5 rounded-lg transition-all cursor-pointer bg-transparent"
              >
                {language === 'hi' ? 'एक नमूना आज़माएं' : 'Try a Sample'}
              </button>
            </div>

            {/* 4 Trust Badges */}
            <div className="grid grid-cols-2 gap-5 mt-12 max-w-md">
              {/* Private */}
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full flex items-center justify-center bg-neutral-900 text-[#D92662] shrink-0 border border-neutral-800">
                  <Shield className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-neutral-100 leading-none">{t.private}</h4>
                  <p className="text-[10px] text-neutral-400 mt-1">{t.privateSub}</p>
                </div>
              </div>

              {/* Enterprise */}
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full flex items-center justify-center bg-neutral-900 text-[#D92662] shrink-0 border border-neutral-800">
                  <Building2 className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-neutral-100 leading-none">{t.enterprise}</h4>
                  <p className="text-[10px] text-neutral-400 mt-1">{t.enterpriseSub}</p>
                </div>
              </div>

              {/* Languages */}
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full flex items-center justify-center bg-neutral-900 text-[#D92662] shrink-0 border border-neutral-800">
                  <Globe className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-neutral-100 leading-none">{t.multiLang}</h4>
                  <p className="text-[10px] text-neutral-400 mt-1">{t.multiLangSub}</p>
                </div>
              </div>

              {/* Intelligence */}
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full flex items-center justify-center bg-neutral-900 text-[#D92662] shrink-0 border border-neutral-800">
                  <Clock className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-neutral-100 leading-none">{t.intelligence}</h4>
                  <p className="text-[10px] text-neutral-400 mt-1">{t.intelligenceSub}</p>
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
                {/* Curve 1: Portfolio Risk (Left Card 1) */}
                <path d="M 160 60 C 170 60, 170 135, 180 135" stroke="#D92662" strokeWidth="1.2" strokeOpacity="0.8" strokeDasharray="3 3" fill="none" />
                {/* Curve 2: Counterparty Pushback (Left Card 2) */}
                <path d="M 160 180 C 170 180, 170 180, 180 180" stroke="#D92662" strokeWidth="1.2" strokeOpacity="0.8" strokeDasharray="3 3" fill="none" />
                {/* Curve 3: The Shadow (Left Card 3) */}
                <path d="M 160 300 C 170 300, 170 245, 180 245" stroke="#D92662" strokeWidth="1.2" strokeOpacity="0.8" strokeDasharray="3 3" fill="none" />
                {/* Curve 4: The Echo (Left Card 4) */}
                <path d="M 160 420 C 170 420, 170 355, 180 355" stroke="#D92662" strokeWidth="1.2" strokeOpacity="0.8" strokeDasharray="3 3" fill="none" />
                
                {/* Curve 5: Lifecycle Timeline (Right Card 1) */}
                <path d="M 420 60 C 410 60, 410 70, 400 70" stroke="#D92662" strokeWidth="1.2" strokeOpacity="0.8" strokeDasharray="3 3" fill="none" />
                {/* Curve 6: Negotiation Ghostwriter (Right Card 2) */}
                <path d="M 420 180 C 410 180, 410 198, 400 198" stroke="#D92662" strokeWidth="1.2" strokeOpacity="0.8" strokeDasharray="3 3" fill="none" />
                {/* Curve 7: The Residue (Right Card 3) */}
                <path d="M 420 300 C 410 300, 410 305, 400 305" stroke="#D92662" strokeWidth="1.2" strokeOpacity="0.8" strokeDasharray="3 3" fill="none" />
                {/* Curve 8: The Alchemy (Right Card 4) */}
                <path d="M 420 420 C 410 420, 410 390, 400 390" stroke="#D92662" strokeWidth="1.2" strokeOpacity="0.8" strokeDasharray="3 3" fill="none" />

                {/* Dots at card edges (start of curves) */}
                <circle cx="160" cy="60" r="3" fill="#D92662" />
                <circle cx="160" cy="180" r="3" fill="#D92662" />
                <circle cx="160" cy="300" r="3" fill="#D92662" />
                <circle cx="160" cy="420" r="3" fill="#D92662" />
                <circle cx="420" cy="60" r="3" fill="#D92662" />
                <circle cx="420" cy="180" r="3" fill="#D92662" />
                <circle cx="420" cy="300" r="3" fill="#D92662" />
                <circle cx="420" cy="420" r="3" fill="#D92662" />

                {/* Dots at mockup edges (end of curves) */}
                <circle cx="180" cy="135" r="3" fill="#D92662" />
                <circle cx="180" cy="180" r="3" fill="#D92662" />
                <circle cx="180" cy="245" r="3" fill="#D92662" />
                <circle cx="180" cy="355" r="3" fill="#D92662" />
                <circle cx="400" cy="70" r="3" fill="#D92662" />
                <circle cx="400" cy="198" r="3" fill="#D92662" />
                <circle cx="400" cy="305" r="3" fill="#D92662" />
                <circle cx="400" cy="390" r="3" fill="#D92662" />
              </svg>

              {/* CENTER: Document Viewer Card */}
              <div className="absolute left-[180px] top-[40px] w-[220px] h-[440px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden">
                {/* Document Format Tabs */}
                <div className="flex border-b border-neutral-200 bg-[#F4F4F5] select-none text-[10px]">
                  {/* PDF Tab (Active) */}
                  <div className="flex-1 flex items-center gap-1.5 px-3 py-2 bg-white border-r border-neutral-200 font-semibold text-neutral-800">
                    <div className="w-5 h-3.5 bg-red-600 rounded-[3px] flex items-center justify-center text-white font-sans font-black text-[6px] tracking-tighter shrink-0">
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
                <div className="flex items-center justify-between px-3 py-2 bg-[#FBFBFB] border-b border-neutral-200 text-[9px] text-neutral-500 font-sans">
                  <div className="flex items-center gap-1.5">
                    <span className="w-6 py-0.5 border border-neutral-200 rounded text-center text-[8px] bg-white font-medium text-neutral-700">31</span>
                    <span className="text-[8px] text-neutral-400">/ 47</span>
                    <span className="cursor-pointer hover:text-neutral-800 font-bold text-[9px] ml-0.5">›</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="cursor-pointer hover:text-neutral-800 font-semibold text-[10px]">-</span>
                    <span className="w-10 py-0.5 border border-neutral-200 rounded text-center text-[8px] bg-white font-medium text-neutral-700">125%</span>
                    <span className="cursor-pointer hover:text-neutral-800 font-semibold text-[10px]">+</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Download className="w-2.8 h-2.8 cursor-pointer hover:text-neutral-800 text-neutral-500" />
                    <MoreVertical className="w-2.8 h-2.8 cursor-pointer hover:text-neutral-800 text-neutral-500" />
                  </div>
                </div>

                {/* Document Content Body */}
                <div className="flex-1 p-3.5 space-y-3 font-mono">
                  {/* Gray Skeleton Lines */}
                  <div className="space-y-2">
                    <div className="h-[3px] bg-neutral-200/80 rounded w-[90%]"></div>
                    <div className="h-[3px] bg-neutral-200/80 rounded w-[70%]"></div>
                  </div>

                  {/* Highlighted Clause Box */}
                  <div className="bg-[#FFF0F3] border-l-[3px] border-[#D92662] rounded-r p-2.5 py-3 text-neutral-900 text-[9.5px] leading-relaxed font-sans font-semibold shadow-sm">
                    <span className="font-bold">12.1</span> {language === 'hi' ? 'विक्रेता की देयता ₹50,000 तक सीमित होगी।' : 'Vendor liability shall be limited to ₹50,000.'}
                  </div>

                  {/* Gray Skeleton Lines below */}
                  <div className="space-y-2 pt-3">
                    <div className="h-[3px] bg-neutral-200/80 rounded w-[95%]"></div>
                    <div className="h-[3px] bg-neutral-200/80 rounded w-[85%]"></div>
                    <div className="h-[3px] bg-neutral-200/80 rounded w-[90%]"></div>
                    <span className="text-[9px] text-neutral-350 font-sans block mt-1.5 font-semibold">12.2</span>
                    <div className="h-[3px] bg-neutral-200/80 rounded w-[80%]"></div>
                  </div>
                </div>
              </div>

              {/* Left Callout 1: Portfolio Risk */}
              <div className="absolute left-[0px] top-[15px] w-[160px] bg-white rounded-[20px] p-3 shadow-lg flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-[#D92662] shrink-0" />
                    <span className="font-sans font-extrabold text-[10.5px] text-neutral-900">{language === 'hi' ? 'पोर्टफोलियो जोखिम' : 'Portfolio Risk'}</span>
                  </div>
                  <div className="mt-2">
                    <span className="inline-block text-[8px] font-bold bg-[#FFF0F3] text-[#D92662] rounded px-2 py-0.5">{language === 'hi' ? 'उच्च देयता' : 'High Liability'}</span>
                  </div>
                </div>
                <div className="mt-2 text-neutral-800 font-semibold text-[10px] font-sans">
                  {language === 'hi' ? 'कुल देयता: ₹50,000 limit' : 'Total: ₹50,000 limit'}
                </div>
              </div>

              {/* Left Callout 2: Counterparty Simulation */}
              <div className="absolute left-[0px] top-[135px] w-[160px] bg-white rounded-[20px] p-3 shadow-lg flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <Scale className="w-4 h-4 text-[#D92662] shrink-0" />
                    <span className="font-sans font-extrabold text-[10.5px] text-neutral-900">{language === 'hi' ? 'विरोधी पक्ष पुशबैक' : 'Counterparty Pushback'}</span>
                  </div>
                  <div className="mt-2">
                    <span className="inline-block text-[8px] font-bold bg-[#FFF0F3] text-[#D92662] rounded px-2 py-0.5">{language === 'hi' ? 'आक्रामक रवैया' : 'Aggressive Stance'}</span>
                  </div>
                </div>
                <div className="mt-2 text-neutral-800 font-semibold text-[10px] font-sans">
                  {language === 'hi' ? 'धारा 12.1 पर आपत्ति' : 'Objection to Clause 12.1'}
                </div>
              </div>

              {/* Left Callout 3: The Shadow */}
              <div className="absolute left-[0px] top-[255px] w-[160px] bg-white rounded-[20px] p-3 shadow-lg flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <Swords className="w-4 h-4 text-[#D92662] shrink-0" />
                    <span className="font-sans font-extrabold text-[10.5px] text-neutral-900">{language === 'hi' ? 'द शैडो' : 'The Shadow'}</span>
                  </div>
                  <div className="mt-2">
                    <span className="inline-block text-[8px] font-bold bg-[#F3E8FF] text-[#7C3AED] rounded px-2 py-0.5">{language === 'hi' ? 'एआई मुकाबला' : 'AI vs. AI Battle'}</span>
                  </div>
                </div>
                <div className="mt-2 text-neutral-800 font-semibold text-[10px] font-sans">
                  {language === 'hi' ? 'वास्तविक समय देयता बहस' : 'Real-time liability debate'}
                </div>
              </div>

              {/* Left Callout 4: The Echo */}
              <div className="absolute left-[0px] top-[375px] w-[160px] bg-white rounded-[20px] p-3 shadow-lg flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <Languages className="w-4 h-4 text-[#D92662] shrink-0" />
                    <span className="font-sans font-extrabold text-[10.5px] text-neutral-900">{language === 'hi' ? 'द इको' : 'The Echo'}</span>
                  </div>
                  <div className="mt-2">
                    <span className="inline-block text-[8px] font-bold bg-[#F3E8FF] text-[#7C3AED] rounded px-2 py-0.5">{language === 'hi' ? 'कानूनी सामंजस्य' : 'Legal Harmonics'}</span>
                  </div>
                </div>
                <div className="mt-2 text-neutral-800 font-semibold text-[10px] font-sans">
                  {language === 'hi' ? 'अनुवाद अंतर विश्लेषण' : 'Translation gap audit'}
                </div>
              </div>

              {/* Right Callout 1: Lifecycle Timeline */}
              <div className="absolute right-[0px] top-[15px] w-[160px] bg-white rounded-[20px] p-3 shadow-lg flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#D92662] shrink-0" />
                    <span className="font-sans font-extrabold text-[10.5px] text-neutral-900">{language === 'hi' ? 'समयसीमा भविष्यवक्ता' : 'Lifecycle Timeline'}</span>
                  </div>
                  <div className="mt-2">
                    <span className="inline-block text-[8px] font-bold bg-[#F3E8FF] text-[#7C3AED] rounded px-2 py-0.5">{language === 'hi' ? 'नवीनीकरण: 12 महीने' : 'Renewal: 12 Months'}</span>
                  </div>
                </div>
                <div className="mt-2 text-neutral-800 font-semibold text-[10px] font-sans">
                  {language === 'hi' ? 'अगला क्लिफ: नवंबर 2026' : 'Next Cliff: Nov 2026'}
                </div>
              </div>

              {/* Right Callout 2: Negotiation Ghostwriter */}
              <div className="absolute right-[0px] top-[135px] w-[160px] bg-white rounded-[20px] p-3 shadow-lg flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <Feather className="w-4 h-4 text-[#D92662] shrink-0" />
                    <span className="font-sans font-extrabold text-[10.5px] text-neutral-900">{language === 'hi' ? 'नेगोशिएशन घोस्टराइटर' : 'Negotiation Ghostwriter'}</span>
                  </div>
                  <div className="mt-2">
                    <span className="inline-block text-[8px] font-bold bg-[#FFF0F3] text-[#D92662] rounded px-2 py-0.5">{language === 'hi' ? 'समझौता मसौदा' : 'Compromise Draft'}</span>
                  </div>
                </div>
                <div className="mt-2 text-neutral-800 font-semibold text-[10px] font-sans">
                  {language === 'hi' ? 'वैकल्पिक मसौदा तैयार करें' : 'Generate fallback options'}
                </div>
              </div>

              {/* Right Callout 3: The Residue */}
              <div className="absolute right-[0px] top-[255px] w-[160px] bg-white rounded-[20px] p-3 shadow-lg flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <Fingerprint className="w-4 h-4 text-[#D92662] shrink-0" />
                    <span className="font-sans font-extrabold text-[10.5px] text-neutral-900">{language === 'hi' ? 'द रेजिड्यू' : 'The Residue'}</span>
                  </div>
                  <div className="mt-2">
                    <span className="inline-block text-[8px] font-bold bg-[#FFF0F3] text-[#D92662] rounded px-2 py-0.5">{language === 'hi' ? 'फोरेंसिक रिपोर्ट' : 'Forensics Report'}</span>
                  </div>
                </div>
                <div className="mt-2 text-neutral-800 font-semibold text-[10px] font-sans truncate" title="Metadata & boilerplates">
                  {language === 'hi' ? 'छिपा हुआ मेटाडेटा ऑडिट' : 'Metadata & altered boilerplate'}
                </div>
              </div>

              {/* Right Callout 4: The Alchemy */}
              <div className="absolute right-[0px] top-[375px] w-[160px] bg-white rounded-[20px] p-3 shadow-lg flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#D92662] shrink-0" />
                    <span className="font-sans font-extrabold text-[10.5px] text-neutral-900">{language === 'hi' ? 'द अल्केमी' : 'The Alchemy'}</span>
                  </div>
                  <div className="mt-2">
                    <span className="inline-block text-[8px] font-bold bg-[#F3E8FF] text-[#7C3AED] rounded px-2 py-0.5">{language === 'hi' ? 'SLA कंपाइलर' : 'SLA Compiler'}</span>
                  </div>
                </div>
                <div className="mt-2 text-neutral-800 font-semibold text-[10px] font-sans">
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
