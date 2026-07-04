import { ArrowUp, Mail, Phone, QrCode, Lock } from 'lucide-react';
import AdStudioLogo from './AdStudioLogo';

export default function Footer() {
  const creatorPhone = '0666139036';
  const creatorPhoneFormatted = '06 66 13 90 36';
  const creatorEmail = 'ADstudio31@gmail.com';

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 border-t border-slate-900 py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
          
          {/* Brand Presentation */}
          <div className="md:col-span-5 space-y-4">
            <button 
              onClick={scrollToTop}
              className="flex items-center gap-2.5 text-left group cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-md p-0.5">
                <AdStudioLogo className="w-full h-full" />
              </div>
              <div>
                <span className="font-extrabold text-base tracking-tight text-white block">AD STUDIO</span>
                <span className="text-[10px] font-mono font-bold text-mint block leading-none">SITES & MENUS</span>
              </div>
            </button>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Concepteur expert de sites vitrines haut de gamme, modules Click & Collect et menus QR codes interactifs pour pizzerias, cafétérias et restaurants. Notre mission : rentabiliser au maximum votre visibilité digitale.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-white font-bold text-xs font-mono uppercase tracking-wider">Plan du Site</h4>
            <div className="flex flex-col gap-2 text-xs">
              {[
                { name: 'Nos Services', target: 'services' },
                { name: 'Démo Interactive QR', target: 'simulator' },
                { name: 'Styles & Modèles', target: 'templates' },
                { name: 'Témoignages de Gérants', target: 'testimonials' },
              ].map((link) => (
                <button
                  key={link.target}
                  onClick={() => scrollToSection(link.target)}
                  className="text-slate-400 hover:text-white transition text-left cursor-pointer"
                >
                  {link.name}
                </button>
              ))}
            </div>
          </div>

          {/* Direct Coordinates */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-white font-bold text-xs font-mono uppercase tracking-wider">Contact Direct</h4>
            <div className="space-y-3 text-xs">
              <a 
                href={`tel:${creatorPhone}`} 
                className="flex items-center gap-2.5 text-slate-400 hover:text-white transition group"
              >
                <span className="w-7 h-7 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-mint group-hover:scale-105 transition-transform">
                  <Phone className="w-3.5 h-3.5" />
                </span>
                <span>{creatorPhoneFormatted} (Appel direct)</span>
              </a>

              <a 
                href={`mailto:${creatorEmail}`} 
                className="flex items-center gap-2.5 text-slate-400 hover:text-white transition group"
              >
                <span className="w-7 h-7 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-emerald-accent group-hover:scale-105 transition-transform">
                  <Mail className="w-3.5 h-3.5" />
                </span>
                <span className="truncate">{creatorEmail}</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright and Smooth Scroll Up */}
        <div className="mt-12 pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-[10px] sm:text-xs text-center sm:text-left">
            © {new Date().getFullYear()} AD STUDIO. Tous droits réservés. <br className="sm:hidden" />
            Conçu exclusivement pour les professionnels de la restauration.
            <button
              onClick={() => { window.location.hash = 'admin'; }}
              className="inline-flex ml-2 opacity-10 hover:opacity-100 text-slate-700 hover:text-mint transition cursor-pointer"
              title="Espace Administrateur"
            >
              <Lock className="w-2.5 h-2.5" />
            </button>
          </p>

          <button
            onClick={scrollToTop}
            className="p-3 bg-slate-900 hover:bg-slate-850 rounded-xl border border-slate-800 text-slate-400 hover:text-white transition flex items-center gap-2 text-xs font-semibold cursor-pointer group"
          >
            Retour en haut 
            <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>

      </div>
    </footer>
  );
}
