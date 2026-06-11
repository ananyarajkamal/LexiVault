export default function Footer({ t }: { t: any }) {
  return (
    <footer id="footer" className="bg-neutral-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-4 group cursor-pointer">
              <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-white shrink-0 group-hover:bg-white/20 group-hover:scale-105 transition-all duration-300">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="w-4.5 h-4.5 text-white group-hover:rotate-6 transition-transform duration-300"
                >
                  {/* Shield Outline */}
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" className="group-hover:stroke-neutral-300 transition-colors duration-300" />
                  {/* Book Pages Outline */}
                  <path d="M12 8.5c-2-1-4-1-6 0v6c2-1 4-1 6 0M12 8.5c2-1 4-1 6 0v6c-2-1-4-1-6 0" />
                  {/* Keyhole Silhouette */}
                  <circle cx="12" cy="11.2" r="1.1" fill="currentColor" stroke="none" />
                  <path d="M11.5 12l-0.3 1.8h1.6l-0.3-1.8" fill="currentColor" stroke="none" />
                </svg>
              </div>
              <span className="font-bold text-lg group-hover:text-neutral-300 transition-colors duration-300">LexiVault</span>
            </div>
            <p className="text-sm text-neutral-400 leading-relaxed max-w-xs font-sans">
              {t.privateAbout}
            </p>
          </div>

          {/* Features */}
          <div>
            <h4 className="font-semibold text-sm mb-4">{t.features}</h4>
            <ul className="space-y-2 text-sm text-neutral-400">
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
            <ul className="space-y-2 text-sm text-neutral-400">
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
            <ul className="space-y-2 text-sm text-neutral-400">
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
