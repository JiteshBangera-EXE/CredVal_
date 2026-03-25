import { Link, useLocation } from 'react-router-dom';
import { Home, PlusSquare, ShieldCheck, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (path) => location.pathname === path ? 
    "bg-retro-primary text-white shadow-[4px_4px_0px_0px_rgba(44,26,14,1)] translate-x-[2px] translate-y-[2px]" : 
    "bg-transparent hover:bg-retro-secondary hover:text-white hover:shadow-[4px_4px_0px_0px_rgba(44,26,14,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none";

  const links = [
    { path: '/', label: 'HOME', icon: Home },
    { path: '/generate', label: 'GENERATE', icon: PlusSquare },
    { path: '/verify', label: 'VERIFY', icon: ShieldCheck }
  ];

  return (
    <nav className="border-b-4 border-retro-dark bg-[#e6e2d3] sticky top-0 z-50">
      <div className="retro-container px-6 h-20 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-retro-primary border-2 border-retro-dark flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(44,26,14,1)] group-hover:rotate-3 transition-transform">
            <span className="font-retro text-2xl text-white">C</span>
          </div>
          <span className="font-retro text-3xl tracking-wide text-retro-dark group-hover:text-retro-primary transition-colors">
            CREDVAL
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6">
          {links.map((link) => (
            <Link 
              key={link.path}
              to={link.path} 
              className={`flex items-center gap-2 px-4 py-2 border-2 border-retro-dark font-retro text-lg transition-all ${isActive(link.path)}`}
            >
              <link.icon className="w-5 h-5" />
              <span>{link.label}</span>
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2 border-2 border-retro-dark hover:bg-retro-secondary hover:text-white transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden border-t-2 border-retro-dark bg-[#fdfbf7] p-6 absolute w-full shadow-lg">
          <div className="flex flex-col gap-4">
            {links.map((link) => (
              <Link 
                key={link.path}
                to={link.path} 
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 border-2 border-retro-dark font-retro text-xl ${isActive(link.path)}`}
              >
                <link.icon className="w-6 h-6" />
                <span>{link.label}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
