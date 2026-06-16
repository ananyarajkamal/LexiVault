import { useState } from 'react';
import { Upload, Shield, Building2, Globe, Download, MoreVertical, AlertTriangle, Clock, Swords, Scale, Feather, Play, X } from 'lucide-react';
import type { Language } from '../App';
import { LogoIcon } from './Navbar';

interface HeroSectionProps {
  onUploadClick: () => void;
  language: Language;
  t: any;
}

export default function HeroSection({ onUploadClick, language, t }: HeroSectionProps) {
  const [showVideoModal, setShowVideoModal] = useState(false);
  return (
    <section className="relative overflow-hidden bg-[radial-gradient(circle_at_75%_50%,#200c2e_0%,#0e0617_60%,#0e0617_100%)] border-b border-neutral-900/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-20 pb-16 sm:pb-24">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          
          {/* LEFT - Text & Typography */}
          <div className="lg:col-span-5 flex flex-col justify-center xl:pr-10 lg:pr-6">
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
                onClick={() => setShowVideoModal(true)}
                className="inline-flex items-center justify-center gap-2 border border-neutral-700 hover:border-neutral-500 text-white font-semibold text-sm px-6 py-3.5 rounded-lg transition-all cursor-pointer bg-transparent"
              >
                <Play className="w-4 h-4 text-[#D92662]" />
                {language === 'hi' ? 'लेक्सीवॉल्ट से मिलें' : 'Meet LexiVault'}
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
          <div className="lg:col-span-7 relative flex justify-center items-center py-4">
            {/* Scalable Mockup Group */}
            <div className="relative w-full max-w-[580px] h-[520px] origin-center scale-[0.7] xs:scale-[0.8] sm:scale-90 md:scale-100 transition-all select-none">
              
              {/* SVG Connectors overlay */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="connector-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#D92662" />
                    <stop offset="100%" stopColor="#7C3AED" />
                  </linearGradient>
                </defs>
                {/* Curve 1: Portfolio Risk (Left Card 1) */}
                <path d="M 160 75 C 170 75, 170 120, 180 120" stroke="url(#connector-gradient)" strokeWidth="1.5" className="animate-pulse-flow" fill="none" />
                {/* Curve 2: Counterparty Pushback (Left Card 2) */}
                <path d="M 160 235 C 170 235, 170 180, 180 180" stroke="url(#connector-gradient)" strokeWidth="1.5" className="animate-pulse-flow" fill="none" />
                {/* Curve 3: The Shadow (Left Card 3) */}
                <path d="M 160 395 C 170 395, 170 280, 180 280" stroke="url(#connector-gradient)" strokeWidth="1.5" className="animate-pulse-flow" fill="none" />
                
                {/* Curve 5: Lifecycle Timeline (Right Card 1) */}
                <path d="M 420 135 C 410 135, 410 100, 400 100" stroke="url(#connector-gradient)" strokeWidth="1.5" className="animate-pulse-flow" fill="none" />
                {/* Curve 6: Negotiation Ghostwriter (Right Card 2) */}
                <path d="M 420 335 C 410 335, 410 198, 400 198" stroke="url(#connector-gradient)" strokeWidth="1.5" className="animate-pulse-flow" fill="none" />

                {/* Dots at card edges (start of curves) */}
                <circle cx="160" cy="75" r="3.5" fill="#D92662" className="animate-dot-glow" />
                <circle cx="160" cy="235" r="3.5" fill="#D92662" className="animate-dot-glow" />
                <circle cx="160" cy="395" r="3.5" fill="#D92662" className="animate-dot-glow" />
                <circle cx="420" cy="135" r="3.5" fill="#7C3AED" className="animate-dot-glow" />
                <circle cx="420" cy="335" r="3.5" fill="#7C3AED" className="animate-dot-glow" />

                {/* Dots at mockup edges (end of curves) */}
                <circle cx="180" cy="120" r="3" fill="#D92662" className="animate-dot-glow" />
                <circle cx="180" cy="180" r="3" fill="#D92662" className="animate-dot-glow" />
                <circle cx="180" cy="280" r="3" fill="#D92662" className="animate-dot-glow" />
                <circle cx="400" cy="100" r="3" fill="#7C3AED" className="animate-dot-glow" />
                <circle cx="400" cy="198" r="3" fill="#7C3AED" className="animate-dot-glow" />
              </svg>

              {/* CENTER: Document Viewer Card */}
              <div className="absolute left-[180px] top-[40px] w-[220px] h-[440px] bg-[#12101A]/95 border border-neutral-805 rounded-2xl shadow-[0_15px_50px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden">
                
                {/* Horizontal scanning glowing bar */}
                <div className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#D92662] to-transparent shadow-[0_0_12px_#D92662] pointer-events-none animate-scan-line z-20"></div>

                {/* Document Format Tabs */}
                <div className="flex border-b border-neutral-850 bg-[#171523] select-none text-[10px]">
                  {/* PDF Tab (Active) */}
                  <div className="flex-1 flex items-center gap-1.5 px-3 py-2 bg-[#12101A] border-r border-neutral-850 font-semibold text-neutral-100">
                    <div className="w-5 h-3.5 bg-red-600/90 rounded-[3px] flex items-center justify-center text-white font-sans font-black text-[6px] tracking-tighter shrink-0">
                      PDF
                    </div>
                    <span className="truncate max-w-[70px]">Vendor.pdf</span>
                  </div>
                  {/* DOCX Tab (Inactive) */}
                  <div className="flex-1 flex items-center gap-1.5 px-3 py-2 text-neutral-500 hover:text-neutral-300 transition-colors font-medium">
                    <div className="w-5 h-3.5 bg-blue-600/30 rounded-[3px] flex items-center justify-center text-blue-400/80 font-sans font-black text-[6px] tracking-tighter shrink-0">
                      DOC
                    </div>
                    <span className="truncate max-w-[70px]">SOW.docx</span>
                  </div>
                </div>

                {/* AI Agent Status Banner with Rotating Logo */}
                <div className="flex items-center justify-between px-3 py-1.5 bg-[#161421] border-b border-neutral-850 text-[8px] text-neutral-400 font-sans font-semibold">
                  <div className="flex items-center gap-1.5 text-[#F472B6] animate-heartbeat-glow">
                    <LogoIcon className="w-3.5 h-3.5 text-[#D92662]" />
                    <span>LexiVault Core AI Active</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="w-1 h-1 rounded-full bg-emerald-500 animate-ping"></span>
                    <span className="text-[7.5px] text-neutral-400">Processing</span>
                  </div>
                </div>

                {/* PDF Toolbar */}
                <div className="flex items-center justify-between px-3 py-2 bg-[#14121F] border-b border-neutral-855 text-[9px] text-neutral-400 font-sans">
                  <div className="flex items-center gap-1.5">
                    <span className="w-6 py-0.5 border border-neutral-800 rounded text-center text-[8px] bg-[#1C1A29] font-medium text-neutral-300">31</span>
                    <span className="text-[8px] text-neutral-500">/ 47</span>
                    <span className="cursor-pointer hover:text-white font-bold text-[9px] ml-0.5">›</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="cursor-pointer hover:text-white font-semibold text-[10px]">-</span>
                    <span className="w-10 py-0.5 border border-neutral-800 rounded text-center text-[8px] bg-[#1C1A29] font-medium text-neutral-300">125%</span>
                    <span className="cursor-pointer hover:text-white font-semibold text-[10px]">+</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Download className="w-2.8 h-2.8 cursor-pointer hover:text-white text-neutral-400" />
                    <MoreVertical className="w-2.8 h-2.8 cursor-pointer hover:text-white text-neutral-400" />
                  </div>
                </div>

                {/* Document Content Body */}
                <div className="flex-1 p-3.5 space-y-3 font-mono">
                  {/* Gray Skeleton Lines */}
                  <div className="space-y-2">
                    <div className="h-[3px] bg-neutral-800/60 rounded w-[90%]"></div>
                    <div className="h-[3px] bg-neutral-800/60 rounded w-[70%]"></div>
                  </div>

                  {/* Highlighted Clause Box */}
                  <div className="bg-[#D92662]/10 border-l-[3px] border-[#D92662] rounded-r p-2.5 py-3 text-neutral-100 text-[9.5px] leading-relaxed font-sans font-semibold shadow-[0_0_15px_rgba(217,38,98,0.1)]">
                    <span className="font-bold">12.1</span> {language === 'hi' ? 'विक्रेता की देयता ₹50,000 तक सीमित होगी।' : 'Vendor liability shall be limited to ₹50,000.'}
                  </div>

                  {/* Gray Skeleton Lines below */}
                  <div className="space-y-2 pt-3">
                    <div className="h-[3px] bg-neutral-800/60 rounded w-[95%]"></div>
                    <div className="h-[3px] bg-neutral-800/60 rounded w-[85%]"></div>
                    <div className="h-[3px] bg-neutral-800/60 rounded w-[90%]"></div>
                    <span className="text-[9px] text-neutral-500 font-sans block mt-1.5 font-semibold">12.2</span>
                    <div className="h-[3px] bg-neutral-800/60 rounded w-[80%]"></div>
                  </div>
                </div>
              </div>

              {/* Left Callout 1: Portfolio Risk */}
              <div className="absolute left-[0px] top-[30px] w-[160px] bg-[#161421]/90 backdrop-blur-md border border-neutral-850 hover:border-[#D92662]/60 rounded-2xl p-3 shadow-[0_8px_30px_rgba(0,0,0,0.5)] flex flex-col justify-between hover:scale-[1.03] transition-all duration-300 group cursor-pointer hover:shadow-[0_0_20px_rgba(217,38,98,0.15)] animate-float-1">
                <div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded bg-[#D92662]/10 border border-[#D92662]/20 flex items-center justify-center text-[#D92662] group-hover:bg-[#D92662]/20 transition-all shrink-0">
                      <AlertTriangle className="w-3.5 h-3.5" />
                    </div>
                    <span className="font-sans font-extrabold text-[10.5px] text-neutral-100 group-hover:text-white transition-colors">{language === 'hi' ? 'पोर्टफोलियो जोखिम' : 'Portfolio Risk'}</span>
                  </div>
                  <div className="mt-2.5">
                    <span className="inline-block text-[8px] font-bold bg-[#D92662]/10 text-[#F472B6] border border-[#D92662]/20 rounded px-2 py-0.5">{language === 'hi' ? 'उच्च देयता' : 'High Liability'}</span>
                  </div>
                </div>
                <div className="mt-2 text-neutral-300 font-semibold text-[10px] font-sans">
                  {language === 'hi' ? 'कुल देयता: ₹50,000 limit' : 'Total: ₹50,000 limit'}
                </div>
              </div>

              {/* Left Callout 2: Counterparty Simulation */}
              <div className="absolute left-[0px] top-[190px] w-[160px] bg-[#161421]/90 backdrop-blur-md border border-neutral-850 hover:border-[#D92662]/60 rounded-2xl p-3 shadow-[0_8px_30px_rgba(0,0,0,0.5)] flex flex-col justify-between hover:scale-[1.03] transition-all duration-300 group cursor-pointer hover:shadow-[0_0_20px_rgba(217,38,98,0.15)] animate-float-2">
                <div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded bg-[#D92662]/10 border border-[#D92662]/20 flex items-center justify-center text-[#D92662] group-hover:bg-[#D92662]/20 transition-all shrink-0">
                      <Scale className="w-3.5 h-3.5" />
                    </div>
                    <span className="font-sans font-extrabold text-[10.5px] text-neutral-100 group-hover:text-white transition-colors">{language === 'hi' ? 'विरोधी पक्ष पुशबैक' : 'Counterparty Pushback'}</span>
                  </div>
                  <div className="mt-2.5">
                    <span className="inline-block text-[8px] font-bold bg-[#D92662]/10 text-[#F472B6] border border-[#D92662]/20 rounded px-2 py-0.5">{language === 'hi' ? 'आक्रामक रवैया' : 'Aggressive Stance'}</span>
                  </div>
                </div>
                <div className="mt-2 text-neutral-300 font-semibold text-[10px] font-sans">
                  {language === 'hi' ? 'धारा 12.1 पर आपत्ति' : 'Objection to Clause 12.1'}
                </div>
              </div>

              {/* Left Callout 3: The Shadow */}
              <div className="absolute left-[0px] top-[350px] w-[160px] bg-[#161421]/90 backdrop-blur-md border border-neutral-850 hover:border-[#7C3AED]/60 rounded-2xl p-3 shadow-[0_8px_30px_rgba(0,0,0,0.5)] flex flex-col justify-between hover:scale-[1.03] transition-all duration-300 group cursor-pointer hover:shadow-[0_0_20px_rgba(124,58,237,0.15)] animate-float-3">
                <div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded bg-[#7C3AED]/10 border border-[#7C3AED]/20 flex items-center justify-center text-[#A78BFA] group-hover:bg-[#7C3AED]/20 transition-all shrink-0">
                      <Swords className="w-3.5 h-3.5" />
                    </div>
                    <span className="font-sans font-extrabold text-[10.5px] text-neutral-100 group-hover:text-white transition-colors">{language === 'hi' ? 'द शैडो' : 'The Shadow'}</span>
                  </div>
                  <div className="mt-2.5">
                    <span className="inline-block text-[8px] font-bold bg-[#7C3AED]/10 text-[#C084FC] border border-[#7C3AED]/20 rounded px-2 py-0.5">{language === 'hi' ? 'एआई मुकाबला' : 'AI vs. AI Battle'}</span>
                  </div>
                </div>
                <div className="mt-2 text-neutral-300 font-semibold text-[10px] font-sans">
                  {language === 'hi' ? 'वास्तविक समय देयता बहस' : 'Real-time liability debate'}
                </div>
              </div>

              {/* Right Callout 1: Lifecycle Timeline */}
              <div className="absolute right-[0px] top-[90px] w-[160px] bg-[#161421]/90 backdrop-blur-md border border-neutral-850 hover:border-[#7C3AED]/60 rounded-2xl p-3 shadow-[0_8px_30px_rgba(0,0,0,0.5)] flex flex-col justify-between hover:scale-[1.03] transition-all duration-300 group cursor-pointer hover:shadow-[0_0_20px_rgba(124,58,237,0.15)] animate-float-2">
                <div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded bg-[#7C3AED]/10 border border-[#7C3AED]/20 flex items-center justify-center text-[#A78BFA] group-hover:bg-[#7C3AED]/20 transition-all shrink-0">
                      <Clock className="w-3.5 h-3.5" />
                    </div>
                    <span className="font-sans font-extrabold text-[10.5px] text-neutral-100 group-hover:text-white transition-colors">{language === 'hi' ? 'समयसीमा भविष्यवक्ता' : 'Lifecycle Timeline'}</span>
                  </div>
                  <div className="mt-2.5">
                    <span className="inline-block text-[8px] font-bold bg-[#7C3AED]/10 text-[#C084FC] border border-[#7C3AED]/20 rounded px-2 py-0.5">{language === 'hi' ? 'नवीनीकरण: 12 महीने' : 'Renewal: 12 Months'}</span>
                  </div>
                </div>
                <div className="mt-2 text-neutral-300 font-semibold text-[10px] font-sans">
                  {language === 'hi' ? 'अगला क्लिफ: नवंबर 2026' : 'Next Cliff: Nov 2026'}
                </div>
              </div>

              {/* Right Callout 2: Negotiation Ghostwriter */}
              <div className="absolute right-[0px] top-[290px] w-[160px] bg-[#161421]/90 backdrop-blur-md border border-neutral-850 hover:border-[#D92662]/60 rounded-2xl p-3 shadow-[0_8px_30px_rgba(0,0,0,0.5)] flex flex-col justify-between hover:scale-[1.03] transition-all duration-300 group cursor-pointer hover:shadow-[0_0_20px_rgba(217,38,98,0.15)] animate-float-1">
                <div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded bg-[#D92662]/10 border border-[#D92662]/20 flex items-center justify-center text-[#D92662] group-hover:bg-[#D92662]/20 transition-all shrink-0">
                      <Feather className="w-3.5 h-3.5" />
                    </div>
                    <span className="font-sans font-extrabold text-[10.5px] text-neutral-100 group-hover:text-white transition-colors">{language === 'hi' ? 'नेगोशिएशन घोस्टराइटर' : 'Negotiation Ghostwriter'}</span>
                  </div>
                  <div className="mt-2.5">
                    <span className="inline-block text-[8px] font-bold bg-[#D92662]/10 text-[#F472B6] border border-[#D92662]/20 rounded px-2 py-0.5">{language === 'hi' ? 'समझौता मसौदा' : 'Compromise Draft'}</span>
                  </div>
                </div>
                <div className="mt-2 text-neutral-300 font-semibold text-[10px] font-sans">
                  {language === 'hi' ? 'वैकल्पिक मसौदा तैयार करें' : 'Generate fallback options'}
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      {showVideoModal && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/85 backdrop-blur-md p-4 transition-all duration-300">
          <div className="relative w-full max-w-4xl bg-[#110B1B] border border-white/[0.08] rounded-2xl overflow-hidden shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.05]">
              <h3 className="font-semibold text-white text-base">
                {language === 'hi' ? 'लेक्सीवॉल्ट से मिलें' : 'Meet LexiVault'}
              </h3>
              <button
                onClick={() => setShowVideoModal(false)}
                className="text-neutral-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video Container / Player */}
            <div className="relative aspect-video bg-black flex items-center justify-center w-full h-full">
              <iframe
                src="https://drive.google.com/file/d/1R0EGOmzGW8njfDyc3L5xaFBi5zwGEivr/preview"
                className="w-full h-full border-0 aspect-video"
                allow="autoplay; fullscreen"
                allowFullScreen
                title="Meet LexiVault Walkthrough Video"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
