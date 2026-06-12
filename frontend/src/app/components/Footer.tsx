const LogoIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" stroke="url(#logo-gradient)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <defs>
      <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#D92662" />
        <stop offset="100%" stopColor="#F472B6" />
      </linearGradient>
    </defs>
    {/* Antenna / Lightbulb */}
    <path d="M 28 20 A 8 8 0 1 1 42 20 C 42 24, 39 26, 37 28 L 37 32 L 33 32 L 33 28 C 31 26, 28 24, 28 20 Z" stroke="url(#logo-gradient)" strokeWidth="2.5" fill="none" />
    <line x1="33" y1="32" x2="37" y2="32" stroke="url(#logo-gradient)" strokeWidth="3" />
    <line x1="34" y1="35" x2="36" y2="35" stroke="url(#logo-gradient)" strokeWidth="3" />
    <line x1="35" y1="8" x2="35" y2="4" stroke="url(#logo-gradient)" strokeWidth="2" />
    <line x1="25" y1="13" x2="21" y2="10" stroke="url(#logo-gradient)" strokeWidth="2" />
    <line x1="45" y1="13" x2="49" y2="10" stroke="url(#logo-gradient)" strokeWidth="2" />
    {/* Document */}
    <path d="M 12 36 L 42 36 L 42 78 L 12 78 Z" stroke="url(#logo-gradient)" strokeWidth="2.5" fill="none" />
    <line x1="18" y1="48" x2="36" y2="48" stroke="url(#logo-gradient)" strokeWidth="2" />
    <line x1="18" y1="56" x2="36" y2="56" stroke="url(#logo-gradient)" strokeWidth="2" />
    <line x1="18" y1="64" x2="36" y2="64" stroke="url(#logo-gradient)" strokeWidth="2" />
    <line x1="18" y1="70" x2="28" y2="70" stroke="url(#logo-gradient)" strokeWidth="2" />
    {/* Head */}
    <rect x="48" y="24" width="38" height="28" rx="8" stroke="url(#logo-gradient)" strokeWidth="2.5" fill="none" />
    <rect x="44" y="33" width="4" height="10" rx="1.5" fill="url(#logo-gradient)" />
    <rect x="86" y="33" width="4" height="10" rx="1.5" fill="url(#logo-gradient)" />
    <line x1="56" y1="24" x2="52" y2="14" stroke="url(#logo-gradient)" strokeWidth="2" />
    <circle cx="51" cy="12" r="3" fill="url(#logo-gradient)" />
    <line x1="78" y1="24" x2="82" y2="14" stroke="url(#logo-gradient)" strokeWidth="2" />
    <circle cx="83" cy="12" r="3" fill="url(#logo-gradient)" />
    {/* Screen */}
    <rect x="54" y="30" width="26" height="16" rx="4" stroke="url(#logo-gradient)" strokeWidth="2" fill="none" />
    <circle cx="61" cy="37" r="2.5" fill="url(#logo-gradient)" />
    <circle cx="73" cy="37" r="2.5" fill="url(#logo-gradient)" />
    <path d="M 64 42 Q 67 44 70 42" stroke="url(#logo-gradient)" strokeWidth="2" fill="none" />
    {/* Body */}
    <rect x="63" y="52" width="8" height="6" fill="url(#logo-gradient)" />
    <path d="M 52 58 L 82 58 C 84 58, 86 60, 86 63 L 82 92 C 82 95, 80 96, 77 96 L 57 96 C 54 96, 52 95, 52 92 L 48 63 C 48 60, 50 58, 52 58 Z" stroke="url(#logo-gradient)" strokeWidth="2.5" fill="none" />
    <circle cx="67" cy="76" r="13" stroke="url(#logo-gradient)" strokeWidth="2" fill="none" />
    <path d="M 62 70 L 72 70 L 72 75 C 72 80, 67 83, 67 83 C 67 83, 62 80, 62 75 Z" stroke="url(#logo-gradient)" strokeWidth="1.5" fill="none" />
    <circle cx="67" cy="74" r="1.5" fill="url(#logo-gradient)" stroke="none" />
    <path d="M 66.5 75 L 66 79 L 68 79 L 67.5 75" fill="url(#logo-gradient)" stroke="none" />
    {/* Arms */}
    <path d="M 48 64 L 35 76 C 33 78, 30 78, 28 76" stroke="url(#logo-gradient)" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="27" cy="75" r="3" fill="url(#logo-gradient)" />
    <path d="M 85 64 C 91 70, 91 78, 85 84" stroke="url(#logo-gradient)" strokeWidth="2" fill="none" />
  </svg>
);

export default function Footer({ t }: { t: any }) {
  return (
    <footer id="footer" className="bg-[#080709] border-t border-neutral-900/60 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-4 group cursor-pointer">
              <div className="w-9 h-9 text-white flex items-center justify-center shrink-0 group-hover:scale-105 transition-all duration-300">
                <LogoIcon className="w-9 h-9 text-white group-hover:rotate-6 transition-transform duration-300" />
              </div>
              <span className="font-bold text-lg group-hover:text-[#D92662] transition-colors duration-300">LexiVault</span>
            </div>
            <p className="text-sm text-neutral-400 hover:text-[#D92662] transition-colors leading-relaxed max-w-xs font-sans">
              {t.privateAbout}
            </p>
          </div>

          {/* Features */}
          <div>
            <h4 className="font-semibold text-sm mb-4">{t.features}</h4>
            <ul className="space-y-2 text-sm text-neutral-400 hover:text-[#D92662] transition-colors">
              <li>{t.riskAnalysisList}</li>
              <li>{t.plainLanguageList}</li>
              <li>{t.decisionBriefList}</li>
              <li>{t.contradictionList}</li>
              <li>{t.portfolioDashList}</li>
              <li>{t.timelinePredList}</li>
            </ul>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-semibold text-sm mb-4">{t.product}</h4>
            <ul className="space-y-2 text-sm text-neutral-400 hover:text-[#D92662] transition-colors">
              <li>{t.qaChatList}</li>
              <li>{t.redlineAutoList}</li>
              <li>{t.counterpartySimList}</li>
              <li>{t.negotiationSandboxList}</li>
              <li>{t.multiLanguageList}</li>
              <li>{t.wolframLegalList}</li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h4 className="font-semibold text-sm mb-4">{t.about}</h4>
            <ul className="space-y-2 text-sm text-neutral-400 hover:text-[#D92662] transition-colors">
              <li>{t.privateList}</li>
              <li>{t.languagesList}</li>
              <li>{t.openSourceList}</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-neutral-800 mt-10 pt-6 text-center text-xs text-neutral-500 font-sans">
          © {new Date().getFullYear()} LexiVault. {t.allRightsReserved}
        </div>
      </div>
    </footer>
  );
}
