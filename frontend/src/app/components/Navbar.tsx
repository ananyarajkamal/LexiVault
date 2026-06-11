import { useState } from 'react';
import { Globe, Menu, X, LogOut } from 'lucide-react';
import type { Language } from '../App';

interface NavbarProps {
  onGetStarted: () => void;
  isLoggedIn: boolean;
  username: string;
  onLoginClick: () => void;
  onLogout: () => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  t: any;
}

export default function Navbar({ 
  onGetStarted, 
  isLoggedIn, 
  username, 
  onLoginClick, 
  onLogout,
  language,
  setLanguage,
  t
}: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const scrollTo = (id: string) => {
    setMobileOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-[#FDFBF7] border-b border-neutral-200/50 py-1">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2 shrink-0 cursor-pointer" onClick={() => scrollTo('workspace')}>
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#092E26] to-[#0A3D32] text-white flex items-center justify-center shrink-0 shadow-md">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2.5" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="w-4.5 h-4.5"
              >
                <path d="M6 3h8l4 4v14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2Z" />
                <path d="M14 3v4h4" />
                <circle cx="12" cy="14" r="3" />
                <path d="M12 11v-2" />
                <path d="M9.5 15.5l-1.5 1.5" />
                <path d="M14.5 15.5l1.5 1.5" />
              </svg>
            </div>
            <span className="font-bold text-[20px] text-[#092E26] tracking-tight font-sans">LexiVault</span>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8 text-sm">
            <button onClick={() => scrollTo('why-us')} className="!text-[#092E26]/80 hover:!text-[#092E26] font-sans font-semibold transition-colors cursor-pointer">
              {t.whyUs}
            </button>
            <button onClick={() => scrollTo('features')} className="!text-[#092E26]/80 hover:!text-[#092E26] font-sans font-semibold transition-colors cursor-pointer">
              {t.features}
            </button>
            <button onClick={() => scrollTo('how-it-works')} className="!text-[#092E26]/80 hover:!text-[#092E26] font-sans font-semibold transition-colors cursor-pointer">
              {t.howItWorks}
            </button>
            <button onClick={() => scrollTo('who-it-is-for')} className="!text-[#092E26]/80 hover:!text-[#092E26] font-sans font-semibold transition-colors cursor-pointer">
              {t.whoItIsFor}
            </button>
            <button onClick={() => scrollTo('workspace')} className="!text-[#092E26]/80 hover:!text-[#092E26] font-sans font-semibold transition-colors cursor-pointer">
              {t.workspace}
            </button>
          </div>

          {/* Right cluster */}
          <div className="flex items-center gap-4">
            {/* Language toggle: English / हिंदी */}
            <div className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-[#092E26]/60">
              <Globe className="w-4 h-4 text-[#092E26]/50" />
              <button 
                onClick={() => setLanguage('en')}
                className={`transition-colors cursor-pointer hover:text-[#092E26] ${language === 'en' ? 'text-[#092E26] font-bold' : 'text-[#092E26]/60 font-normal'}`}
              >
                English
              </button>
              <span className="text-neutral-300">/</span>
              <button 
                onClick={() => setLanguage('hi')}
                className={`transition-colors cursor-pointer hover:text-[#092E26] ${language === 'hi' ? 'text-[#092E26] font-bold' : 'text-[#092E26]/60 font-normal'}`}
              >
                हिंदी
              </button>
            </div>

            {isLoggedIn ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 bg-[#E6F0ED] border border-[#D1E6DF] rounded-lg px-3 py-1.5">
                  <div className="w-5 h-5 rounded-full bg-[#092E26] text-white flex items-center justify-center text-[10px] font-bold uppercase">
                    {username.slice(0, 2)}
                  </div>
                  <span className="text-xs font-semibold text-[#092E26] max-w-[80px] truncate">{username}</span>
                </div>
                <button 
                  onClick={onLogout}
                  className="text-neutral-500 hover:text-red-600 transition-colors cursor-pointer flex items-center gap-1 text-xs font-semibold"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  {t.logout}
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                {/* Login button */}
                <button 
                  onClick={onLoginClick}
                  className="hidden sm:inline-flex items-center justify-center border border-[#092E26]/30 hover:border-[#092E26]/60 text-[#092E26] text-sm font-semibold px-4 py-2 rounded-lg transition-all cursor-pointer bg-white"
                >
                  {t.login}
                </button>

                {/* Get Started button */}
                <button
                  onClick={onGetStarted}
                  className="bg-[#092E26] hover:bg-[#051C17] text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-all cursor-pointer shadow-sm"
                >
                  {t.getStarted}
                </button>
              </div>
            )}

            {/* Hamburger menu for mobile */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden w-9 h-9 rounded-lg border border-neutral-200 flex items-center justify-center text-[#092E26] cursor-pointer"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="md:hidden bg-[#FDFBF7] border-t border-neutral-100 px-4 py-3 space-y-1">
          {[
            { label: t.whyUs, id: 'why-us' },
            { label: t.features, id: 'features' },
            { label: t.howItWorks, id: 'how-it-works' },
            { label: t.whoItIsFor, id: 'who-it-is-for' },
            { label: t.workspace, id: 'workspace' },
          ].map(item => (
            <button
              key={item.label}
              onClick={() => scrollTo(item.id)}
              className="block w-full text-left text-sm font-medium text-[#092E26]/80 hover:text-[#092E26] hover:bg-[#092E26]/5 rounded-lg px-3 py-2.5 transition-colors cursor-pointer"
            >
              {item.label}
            </button>
          ))}
          <div className="pt-2 border-t border-neutral-200/50 flex flex-col gap-2">
            {/* Language switcher for mobile */}
            <div className="flex items-center gap-1.5 text-sm font-medium text-neutral-600 px-3 py-2">
              <Globe className="w-4 h-4 text-neutral-400" />
              <button 
                onClick={() => setLanguage('en')}
                className={`cursor-pointer ${language === 'en' ? 'text-[#092E26] font-bold' : 'text-neutral-500 font-normal'}`}
              >
                English
              </button>
              <span className="text-neutral-300">/</span>
              <button 
                onClick={() => setLanguage('hi')}
                className={`cursor-pointer ${language === 'hi' ? 'text-[#092E26] font-bold' : 'text-neutral-500 font-normal'}`}
              >
                हिंदी
              </button>
            </div>
            {isLoggedIn ? (
              <div className="px-3 py-2 flex flex-col gap-2">
                <div className="text-xs font-bold text-neutral-700">Logged in as {username}</div>
                <button 
                  onClick={() => { setMobileOpen(false); onLogout(); }}
                  className="w-full text-center text-red-600 border border-red-200 text-sm font-semibold py-2 rounded-lg bg-white"
                >
                  {t.logout}
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <button 
                  onClick={() => { setMobileOpen(false); onLoginClick(); }}
                  className="w-full text-center border border-neutral-300 text-neutral-700 text-sm font-semibold py-2 rounded-lg bg-white"
                >
                  {t.login}
                </button>
                <button
                  onClick={() => { setMobileOpen(false); onGetStarted(); }}
                  className="w-full text-center bg-[#092E26] text-white text-sm font-semibold py-2 rounded-lg"
                >
                  {t.getStarted}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
