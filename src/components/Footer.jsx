import { Github, Twitter, Mail, Code2, Globe, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t-4 border-retro-dark bg-[#e6e2d3] relative">
      <div className="retro-container py-12 px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12 border-b-2 border-dashed border-retro-muted pb-8">
          
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-xl font-retro mb-4 flex items-center gap-2 text-retro-primary">
              <Code2 className="w-5 h-5" />
              CREDVAL_CORE
            </h3>
            <p className="font-mono text-sm leading-relaxed text-retro-dark/80">
              BLOCKCHAIN_V: 1.0.4<br/>
              NODE_STATUS: ONLINE<br/>
              LAST_SYNC: 12ms<br/>
              NETWORK: SEPOLIA
            </p>
          </div>

          <div className="col-span-1 md:col-span-1">
            <h3 className="text-xl font-retro mb-4">QUICK_LINKS</h3>
            <ul className="space-y-2 font-mono text-sm">
              {['Documentation', 'API Access', 'Validator Node', 'Whitepaper'].map((link) => (
                <li key={link}>
                  <a href="#" className="hover:text-retro-primary hover:underline decoration-wavy decoration-retro-primary transition-colors flex items-center gap-2">
                    <span className="text-retro-muted">›</span>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-1 md:col-span-1">
            <h3 className="text-xl font-retro mb-4">LEGAL_INFO</h3>
            <ul className="space-y-2 font-mono text-sm">
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
              <li>Disclaimer</li>
            </ul>
          </div>

          <div className="col-span-1 md:col-span-1">
            <h3 className="text-xl font-retro mb-4">COMMUNITY</h3>
            <div className="flex gap-4">
              {[Github, Twitter, Mail].map((Icon, i) => (
                <a 
                  key={i} 
                  href="#" 
                  className="w-10 h-10 border-2 border-retro-dark flex items-center justify-center hover:bg-retro-secondary hover:text-white hover:shadow-[3px_3px_0px_0px_rgba(44,26,14,1)] active:translate-y-1 active:shadow-none transition-all"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 font-mono text-xs text-retro-muted">
          <div className="flex items-center gap-2">
            <span>© 2024 CREDVAL PROTOCOL</span>
            <span className="hidden md:inline">|</span>
            <span className="flex items-center gap-1">
              BUILT_WITH <Heart className="w-3 h-3 text-red-500 fill-current" /> ON ETHEREUM
            </span>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 animate-pulse">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span>SYSTEM_OPERATIONAL</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative scanline effect specific to footer */}
      <div className="absolute inset-0 pointer-events-none opacity-5 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-[1] bg-[length:100%_2px,3px_100%]"></div>
    </footer>
  );
}
