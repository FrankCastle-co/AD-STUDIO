import { useState, useEffect } from 'react';
import { Menu, X, Phone, Mail, QrCode } from 'lucide-react';
import AdStudioLogo from './AdStudioLogo';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const creatorPhone = '0666139036';
  const creatorPhoneFormatted = '06 66 13 90 36';

  // Detect scroll to style navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-slate-950/90 border-b border-slate-900 backdrop-blur-md py-3' 
          : 'bg-transparent py-5'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* Logo / Brand */}
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center gap-2.5 cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-md shadow-mint/10 group-hover:scale-105 transition-transform p-0.5">
                <AdStudioLogo className="w-full h-full" />
              </div>
              <div className="text-left">
                <span className="font-extrabold text-base tracking-tight text-white block">AD STUDIO</span>
                <span className="text-[10px] font-mono font-bold text-mint block leading-none">SITES & MENUS</span>
              </div>
            </button>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-8 text-sm font-medium">
              {[
                { name: 'Services', target: 'services' },
                { name: 'Démo QR', target: 'simulator' },
                { name: 'Styles', target: 'templates' },
                { name: 'Témoignages', target: 'testimonials' },
              ].map((link) => (
                <button
                  key={link.target}
                  onClick={() => scrollToSection(link.target)}
                  className="text-slate-400 hover:text-mint transition cursor-pointer"
                >
                  {link.name}
                </button>
              ))}
            </div>

            {/* Right Action Trigger (Desktop phone number call click) */}
            <div className="hidden md:flex items-center gap-4">
              <a 
                href={`tel:${creatorPhone}`}
                className="px-4.5 py-2.5 bg-slate-900 hover:bg-slate-850 text-white text-xs font-bold rounded-xl border border-slate-800 flex items-center gap-2 transition"
              >
                <Phone className="w-3.5 h-3.5 text-mint" />
                <span>{creatorPhoneFormatted}</span>
              </a>
              <button
                onClick={() => scrollToSection('contact')}
                className="px-4.5 py-2.5 bg-gradient-to-r from-mint to-emerald-accent hover:from-emerald-accent hover:to-mint text-slate-950 text-xs font-extrabold rounded-xl transition shadow-md shadow-mint/5 cursor-pointer"
              >
                Obtenir mon Devis
              </button>
            </div>

            {/* Mobile menu triggers */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Navigation Menu Drawer */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-slate-950/95 border-b border-slate-900 p-6 space-y-6 backdrop-blur-lg absolute top-full left-0 right-0 z-40">
            <div className="flex flex-col gap-4">
              {[
                { name: 'Nos Services', target: 'services' },
                { name: 'Démo Interactive QR', target: 'simulator' },
                { name: 'Modèles de Menus', target: 'templates' },
                { name: 'Avis Clients', target: 'testimonials' },
              ].map((link) => (
                <button
                  key={link.target}
                  onClick={() => scrollToSection(link.target)}
                  className="text-slate-300 hover:text-mint text-left font-semibold text-sm py-2 cursor-pointer"
                >
                  {link.name}
                </button>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-900 flex flex-col gap-3">
              <a 
                href={`tel:${creatorPhone}`}
                className="w-full py-3 bg-slate-900 hover:bg-slate-850 text-white rounded-xl border border-slate-850 flex items-center justify-center gap-2 text-sm font-bold transition"
              >
                <Phone className="w-4 h-4 text-mint" />
                Appeler : {creatorPhoneFormatted}
              </a>
              <button
                onClick={() => scrollToSection('contact')}
                className="w-full py-3 bg-gradient-to-r from-mint to-emerald-accent text-slate-950 text-center text-sm font-extrabold rounded-xl transition cursor-pointer"
              >
                Demander un Devis Gratuit
              </button>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
