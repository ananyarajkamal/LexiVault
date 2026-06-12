import { useState } from 'react';
import { Globe, Menu, X, LogOut } from 'lucide-react';
import type { Language } from '../App';

export const LogoIcon = ({ className }: { className?: string }) => (
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


interface NavbarProps {
  onGetStarted: () => void;
  isLoggedIn: boolean;
  username: string;
  onLoginClick: () => void;
  onLogout: () => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  t: any;
  isFullscreen: boolean;
  setIsFullscreen: (val: boolean) => void;
}

export default function Navbar({ 
  onGetStarted, 
  isLoggedIn, 
  username, 
  onLoginClick, 
  onLogout,
  language,
  setLanguage,
  t,
  isFullscreen,
  setIsFullscreen
}: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNavClick = (id: string) => {
    setMobileOpen(false);
    if (id === 'workspace') {
      setIsFullscreen(true);
      return;
    }
    
    if (isFullscreen) {
      setIsFullscreen(false);
      setTimeout(() => {
        const element = document.getElementById(id);
        element?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const element = document.getElementById(id);
      element?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-[#080709] border-b border-neutral-900/60 py-1 backdrop-blur-md bg-opacity-95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div 
            className="flex items-center gap-2 shrink-0 cursor-pointer group" 
            onClick={() => {
              setIsFullscreen(false);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <div className="w-9 h-9 text-white flex items-center justify-center shrink-0 group-hover:scale-105 transition-all duration-300">
              <LogoIcon className="w-9 h-9 text-white group-hover:rotate-6 transition-transform duration-300" />
            </div>
            <span className="font-bold text-[20px] text-white tracking-tight font-sans group-hover:text-[#D92662] transition-colors duration-300">LexiVault</span>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8 text-sm">
            <button onClick={() => handleNavClick('why-us')} className="text-neutral-300 hover:text-white font-sans font-semibold transition-colors cursor-pointer">
              {t.whyUs}
            </button>
            <button onClick={() => handleNavClick('features')} className="text-neutral-300 hover:text-white font-sans font-semibold transition-colors cursor-pointer">
              {t.features}
            </button>
            <button onClick={() => handleNavClick('how-it-works')} className="text-neutral-300 hover:text-white font-sans font-semibold transition-colors cursor-pointer">
              {t.howItWorks}
            </button>
            <button onClick={() => handleNavClick('who-it-is-for')} className="text-neutral-300 hover:text-white font-sans font-semibold transition-colors cursor-pointer">
              {t.whoItIsFor}
            </button>
            <button onClick={() => handleNavClick('workspace')} className="text-neutral-300 hover:text-white font-sans font-semibold transition-colors cursor-pointer">
              {t.workspace}
            </button>
          </div>

          {/* Right cluster */}
          <div className="flex items-center gap-4">
            {/* Language toggle: English / हिंदी */}
            <div className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-neutral-400">
              <Globe className="w-4 h-4 text-neutral-500" />
              <button 
                onClick={() => setLanguage('en')}
                className={`transition-colors cursor-pointer hover:text-white ${language === 'en' ? 'text-white font-bold' : 'text-neutral-400 font-normal'}`}
              >
                English
              </button>
              <span className="text-neutral-300">/</span>
              <button 
                onClick={() => setLanguage('hi')}
                className={`transition-colors cursor-pointer hover:text-white ${language === 'hi' ? 'text-white font-bold' : 'text-neutral-400 font-normal'}`}
              >
                हिंदी
              </button>
            </div>

            {isLoggedIn ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-1.5">
                  <div className="w-5 h-5 rounded-full bg-[#D92662] text-white flex items-center justify-center text-[10px] font-bold uppercase">
                    {username.slice(0, 2)}
                  </div>
                  <span className="text-xs font-semibold text-white max-w-[80px] truncate">{username}</span>
                </div>
                <button 
                  onClick={onLogout}
                  className="text-neutral-400 hover:text-[#D92662] transition-colors cursor-pointer flex items-center gap-1 text-xs font-semibold"
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
                  className="hidden sm:inline-flex items-center justify-center border border-white/20 hover:border-white/40 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-all cursor-pointer bg-transparent hover:bg-white/5"
                >
                  {t.login}
                </button>

                {/* Get Started button */}
                <button
                  onClick={onGetStarted}
                  className="bg-[#D92662] hover:bg-[#B71C4F] text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-all cursor-pointer shadow-sm"
                >
                  {t.getStarted}
                </button>
              </div>
            )}

            {/* Hamburger menu for mobile */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden w-9 h-9 rounded-lg border border-neutral-200 flex items-center justify-center text-white cursor-pointer"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="md:hidden bg-[#131118] border-t border-neutral-850 px-4 py-3 space-y-1">
          {[
            { label: t.whyUs, id: 'why-us' },
            { label: t.features, id: 'features' },
            { label: t.howItWorks, id: 'how-it-works' },
            { label: t.whoItIsFor, id: 'who-it-is-for' },
            { label: t.workspace, id: 'workspace' },
          ].map(item => (
            <button
              key={item.label}
              onClick={() => handleNavClick(item.id)}
              className="block w-full text-left text-sm font-medium text-white/80 hover:text-white hover:bg-[#092E26]/5 rounded-lg px-3 py-2.5 transition-colors cursor-pointer"
            >
              {item.label}
            </button>
          ))}
          <div className="pt-2 border-t border-neutral-200/50 flex flex-col gap-2">
            {/* Language switcher for mobile */}
            <div className="flex items-center gap-1.5 text-sm font-medium text-neutral-400 px-3 py-2">
              <Globe className="w-4 h-4 text-neutral-400" />
              <button 
                onClick={() => setLanguage('en')}
                className={`cursor-pointer ${language === 'en' ? 'text-white font-bold' : 'text-neutral-500 font-normal'}`}
              >
                English
              </button>
              <span className="text-neutral-300">/</span>
              <button 
                onClick={() => setLanguage('hi')}
                className={`cursor-pointer ${language === 'hi' ? 'text-white font-bold' : 'text-neutral-500 font-normal'}`}
              >
                हिंदी
              </button>
            </div>
            {isLoggedIn ? (
              <div className="px-3 py-2 flex flex-col gap-2">
                <div className="text-xs font-bold text-neutral-400">Logged in as {username}</div>
                <button 
                  onClick={() => { setMobileOpen(false); onLogout(); }}
                  className="w-full text-center text-red-500 border border-red-900/30 text-sm font-semibold py-2 rounded-lg bg-transparent hover:bg-red-950/20"
                >
                  {t.logout}
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <button 
                  onClick={() => { setMobileOpen(false); onLoginClick(); }}
                  className="w-full text-center border border-neutral-800 text-neutral-300 text-sm font-semibold py-2 rounded-lg bg-transparent hover:bg-neutral-900"
                >
                  {t.login}
                </button>
                <button
                  onClick={() => { setMobileOpen(false); onGetStarted(); }}
                  className="w-full text-center bg-[#D92662] text-white text-sm font-semibold py-2 rounded-lg"
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
