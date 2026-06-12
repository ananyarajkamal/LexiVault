import { Bot } from "lucide-react";
export default function Footer({ t }: { t: any }) {
  return (
    <footer id="footer" className="bg-[#080709] border-t border-neutral-900/60 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-4 group cursor-pointer">
              <div className="w-9 h-9 rounded-xl bg-[#D92662] flex items-center justify-center text-white shrink-0 group-hover:bg-[#B71C4F] group-hover:scale-105 transition-all duration-300">
<Bot className="w-5 h-5 text-white group-hover:rotate-6 transition-transform duration-300" />
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
