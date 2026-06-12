import { useState } from 'react';
import { Globe, Menu, X, LogOut, Bot } from 'lucide-react';
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
            <div className="w-9 h-9 rounded-xl bg-[#D92662] text-white flex items-center justify-center shrink-0 shadow-md group-hover:shadow-lg group-hover:scale-105 transition-all duration-300">
              <Bot className="w-5 h-5 text-white group-hover:rotate-6 transition-transform duration-300" />
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
                  className="hidden sm:inline-flex items-center justify-center border border-[#092E26]/30 hover:border-[#092E26]/60 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-all cursor-pointer bg-white"
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
