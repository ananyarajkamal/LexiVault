export default function Footer() {
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
                  strokeWidth="2.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="w-4.5 h-4.5"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="M9 8h6" strokeWidth="2" />
                  <path d="M9 12h6" strokeWidth="2" />
                  <path d="M9 16h3" strokeWidth="2" />
                </svg>
              </div>
              <span className="font-bold text-lg">LexiVault</span>
            </div>
            <p className="text-sm text-neutral-400 leading-relaxed max-w-xs">
              Private AI for document decisions. Upload contracts, understand risks, sign with confidence.
            </p>
          </div>

          {/* Features */}
          <div>
            <h4 className="font-semibold text-sm mb-4">Features</h4>
            <ul className="space-y-2 text-sm text-neutral-400">
              <li>Risk Analysis</li>
              <li>Plain Language Explanations</li>
              <li>Decision Brief Generator</li>
              <li>Contradiction Detector</li>
            </ul>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-semibold text-sm mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-neutral-400">
              <li>Q&A Chat</li>
              <li>Redline Autopilot</li>
              <li>Multi-Language Support</li>
              <li>Wolfram Legal Context</li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h4 className="font-semibold text-sm mb-4">About</h4>
            <ul className="space-y-2 text-sm text-neutral-400">
              <li>100% Private</li>
              <li>Local AI Processing</li>
              <li>Hindi & English</li>
              <li>Open Source</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-neutral-800 mt-10 pt-6 text-center text-xs text-neutral-500">
          © {new Date().getFullYear()} LexiVault. All rights reserved. Your data never leaves your device.
        </div>
      </div>
    </footer>
  );
}
