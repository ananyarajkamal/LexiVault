export default function Footer({ t }: { t: any }) {
  return (
    <footer id="footer" className="bg-neutral-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-white shrink-0">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2.2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="w-4.5 h-4.5 text-white"
                >
                  {/* Shield Outline */}
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  {/* Book Pages Outline */}
                  <path d="M12 8.5c-2-1.2-4.5-1.2-6.5-.2v5.5c2-1 4.5-1 6.5.2M12 8.5c2-1.2 4.5-1.2 6.5-.2v5.5c-2-1-4.5-1-6.5.2" />
                  {/* Spine */}
                  <path d="M12 8.5v5.7" />
                  {/* Keyhole Silhouette */}
                  <circle cx="12" cy="11.2" r="0.95" fill="currentColor" stroke="none" />
                  <path d="M11.6 11.9l-0.2 1.4h1.2l-0.2-1.4" fill="currentColor" stroke="none" />
                </svg>
              </div>
              <span className="font-bold text-lg">LexiVault</span>
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
