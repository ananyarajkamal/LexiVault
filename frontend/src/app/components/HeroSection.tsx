import { Upload, Shield, Building2, Globe, Download, MoreVertical, Sparkles, AlertTriangle, FileCheck2, Clock } from 'lucide-react';
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
                {/* Curve 1: Risk Alert */}
                <path d="M 150 160 C 165 160, 165 230, 180 230" stroke="#0B7A63" strokeWidth="1.2" strokeOpacity="0.4" fill="none" />
                {/* Curve 2: AI Rec */}
                <path d="M 150 310 C 165 310, 165 250, 180 250" stroke="#0B7A63" strokeWidth="1.2" strokeOpacity="0.4" fill="none" />
                {/* Curve 3: Decision Summary */}
                <path d="M 430 180 C 415 180, 415 230, 400 230" stroke="#0B7A63" strokeWidth="1.2" strokeOpacity="0.4" fill="none" />
                {/* Curve 4: Clause Reference */}
                <path d="M 430 320 C 415 320, 415 250, 400 250" stroke="#0B7A63" strokeWidth="1.2" strokeOpacity="0.4" fill="none" />

                {/* Dots at callout edges */}
                <circle cx="150" cy="160" r="3" fill="#0B7A63" />
                <circle cx="150" cy="310" r="3" fill="#0B7A63" />
                <circle cx="430" cy="180" r="3" fill="#0B7A63" />
                <circle cx="430" cy="320" r="3" fill="#0B7A63" />

                {/* Dots at document highlights */}
                <circle cx="180" cy="230" r="3" fill="#0B7A63" />
                <circle cx="180" cy="250" r="3" fill="#0B7A63" />
                <circle cx="400" cy="230" r="3" fill="#0B7A63" />
                <circle cx="400" cy="250" r="3" fill="#0B7A63" />
              </svg>

              {/* CENTER: Document Viewer Card */}
              <div className="absolute left-[180px] top-[40px] w-[220px] h-[440px] bg-white rounded-2xl border border-neutral-200/80 shadow-2xl flex flex-col overflow-hidden">
                {/* PDF Header */}
                <div className="flex items-center gap-2 px-3.5 py-2.5 border-b border-neutral-100">
                  <div className="w-5 h-5 bg-red-500 rounded flex items-center justify-center text-white font-sans font-black text-[7px] tracking-tighter shrink-0 select-none">
                    PDF
                  </div>
                  <span className="text-neutral-800 font-semibold text-[11px] truncate">Vendor Agreement.pdf</span>
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

              {/* Left Callout 1: Risk Alert */}
              <div className="absolute left-[0px] top-[100px] w-[150px] bg-white rounded-2xl border border-neutral-200/80 p-3 shadow-xl">
                <div className="flex items-center gap-1.5 text-neutral-700">
                  <div className="w-4 h-4 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 shrink-0">
                    <AlertTriangle className="w-2.5 h-2.5" />
                  </div>
                  <span className="font-bold text-[10px]">{language === 'hi' ? 'जोखिम चेतावनी' : 'Risk Alert'}</span>
                </div>
                <div className="mt-2.5">
                  <span className="inline-block text-[8px] font-bold bg-red-50 text-red-600 border border-red-100 rounded px-1.5 py-0.5">{language === 'hi' ? 'उच्च जोखिम' : 'High Risk'}</span>
                </div>
                <div className="mt-1.5 text-neutral-800 font-semibold text-[11px]">
                  {language === 'hi' ? 'देयता सीमा' : 'Liability Cap'}
                </div>
              </div>

              {/* Left Callout 2: AI Recommendation */}
              <div className="absolute left-[0px] top-[260px] w-[150px] bg-white rounded-2xl border border-neutral-200/80 p-3 shadow-xl">
                <div className="flex items-center gap-1.5 text-neutral-700">
                  <div className="w-4 h-4 rounded-full bg-emerald-100 flex items-center justify-center text-[#0B7A63] shrink-0">
                    <Sparkles className="w-2.5 h-2.5" />
                  </div>
                  <span className="font-bold text-[10px]">{language === 'hi' ? 'एआई सिफारिश' : 'AI Recommendation'}</span>
                </div>
                <div className="mt-2.5">
                  <span className="inline-block text-[9px] font-semibold bg-[#EAF5F2] text-[#0B7A63] border border-[#D1ECE5] rounded-lg px-2.5 py-1 text-center w-full">
                    {language === 'hi' ? 'हस्ताक्षर से पहले बातचीत करें' : 'Negotiate before signing'}
                  </span>
                </div>
              </div>

              {/* Right Callout 1: Decision Summary */}
              <div className="absolute right-[0px] top-[110px] w-[150px] bg-white rounded-2xl border border-neutral-200/80 p-3 shadow-xl flex flex-col">
                <div className="flex items-center gap-1.5 text-neutral-700">
                  {/* Little Circular ring indicator */}
                  <svg className="w-4 h-4 text-[#0B7A63] shrink-0" viewBox="0 0 36 36">
                    <circle cx="18" cy="18" r="14" fill="none" stroke="#E6F0ED" strokeWidth="4" />
                    <circle cx="18" cy="18" r="14" fill="none" stroke="currentColor" strokeWidth="4" strokeDasharray="60 100" strokeDashoffset="0" strokeLinecap="round" />
                  </svg>
                  <span className="font-bold text-[10px]">{language === 'hi' ? 'निर्णय सारांश' : 'Decision Summary'}</span>
                </div>
                <div className="mt-3 text-neutral-800 font-bold text-[11px]">
                  {language === 'hi' ? '3 मुद्दों का पता चला' : '3 issues detected'}
                </div>
                <div className="mt-2 text-neutral-400 text-[9px] font-medium leading-none">
                  {language === 'hi' ? 'आत्मविश्वास स्कोर' : 'Confidence Score'}
                </div>
                <div className="mt-0.5 text-neutral-800 font-bold text-[15px]">
                  95%
                </div>
                <div className="mt-1.5 w-full bg-neutral-100 rounded-full h-1">
                  <div className="bg-[#0B7A63] h-1 rounded-full" style={{ width: '95%' }}></div>
                </div>
              </div>

              {/* Right Callout 2: Clause Reference */}
              <div className="absolute right-[0px] top-[290px] w-[150px] bg-white rounded-2xl border border-neutral-200/80 p-3 shadow-xl">
                <div className="flex items-center gap-1.5 text-neutral-700">
                  <div className="w-4 h-4 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 shrink-0">
                    <FileCheck2 className="w-2.5 h-2.5" />
                  </div>
                  <span className="font-bold text-[10px]">{language === 'hi' ? 'खंड संदर्भ' : 'Clause Reference'}</span>
                </div>
                <div className="mt-2 text-neutral-600 font-semibold text-[10px]">
                  {language === 'hi' ? 'पृष्ठ 31 • खंड 12.1' : 'Page 31 • Clause 12.1'}
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
