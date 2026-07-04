import { motion } from 'motion/react';
import { QrCode, ArrowRight, Sparkles, Phone, Mail, CheckCircle2, TrendingUp } from 'lucide-react';

export default function Hero() {
  const creatorPhone = '0666139036';
  const creatorPhoneFormatted = '06 66 13 90 36';
  const creatorEmail = 'ADstudio31@gmail.com';

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative pt-32 pb-24 overflow-hidden bg-slate-950">
      {/* Dynamic background lights matching the requested palette */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-mint/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-emerald-accent/10 rounded-full blur-3xl pointer-events-none" />
      
      {/* Decorative Grid Patterns */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Hero copy Column */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            
            {/* Tiny welcome badge */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-slate-300 text-xs font-mono"
            >
              <Sparkles className="w-3.5 h-3.5 text-mint animate-pulse" />
              <span>Créateur de Menus Digitaux & Sites Internet Premium</span>
            </motion.div>

            {/* Main Title */}
            <motion.h1 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl xl:text-6xl font-extrabold tracking-tight text-white leading-tight"
            >
              Transformez Votre Carte en <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-mint via-emerald-accent to-teal-muted">
                Machine à Vendre 🚀
              </span>
            </motion.h1>

            {/* Sub-text description */}
            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
            >
              Nous concevons des <strong className="text-white">menus QR code interactifs</strong> et des <strong className="text-white">sites internet de commande</strong> sur-mesure pour pizzerias, cafétérias et restaurants de quartier. Boostez vos paniers de <strong className="text-mint font-semibold">+18% à +25%</strong> de bénéfices réels.
            </motion.p>

            {/* Personal quick contacts badges */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap justify-center lg:justify-start gap-4 text-xs font-mono text-slate-300"
            >
              <a href={`tel:${creatorPhone}`} className="flex items-center gap-2 bg-slate-900 hover:bg-slate-850 px-4 py-2 rounded-xl border border-slate-800 transition">
                <Phone className="w-3.5 h-3.5 text-mint" />
                <span>{creatorPhoneFormatted}</span>
              </a>
              <a href={`mailto:${creatorEmail}`} className="flex items-center gap-2 bg-slate-900 hover:bg-slate-850 px-4 py-2 rounded-xl border border-slate-800 transition">
                <Mail className="w-3.5 h-3.5 text-emerald-400" />
                <span>{creatorEmail}</span>
              </a>
            </motion.div>

            {/* Core Calls to Actions */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 pt-2"
            >
              <button
                onClick={() => scrollToSection('simulator')}
                className="px-8 py-4 bg-gradient-to-r from-mint to-emerald-accent hover:from-emerald-accent hover:to-mint text-slate-950 font-extrabold rounded-xl text-sm transition shadow-lg flex items-center justify-center gap-2 cursor-pointer shadow-mint/5"
              >
                Tester la Démo <ArrowRight className="w-4 h-4" />
              </button>
              
              <button
                onClick={() => scrollToSection('contact')}
                className="px-8 py-4 bg-slate-900 hover:bg-slate-850 text-white font-bold rounded-xl text-sm border border-slate-800 hover:border-mint/40 transition flex items-center justify-center gap-2 cursor-pointer"
              >
                Demander un Devis <ArrowRight className="w-4 h-4 text-mint" />
              </button>
            </motion.div>

            {/* Reassurance items */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 text-slate-500 text-xs text-left max-w-xl mx-auto lg:mx-0 border-t border-slate-900"
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-accent flex-shrink-0" />
                <span>Zéro commission sur vos commandes</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-accent flex-shrink-0" />
                <span>Modification de carte instantanée</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-accent flex-shrink-0" />
                <span>SEO Google Maps inclus</span>
              </div>
            </motion.div>

          </div>

          {/* Right Floating Mockups Column */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end" id="hero-interactive-badge">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, rotate: 1 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative w-full max-w-[340px] aspect-[4/5] bg-gradient-to-b from-slate-900 to-slate-950 p-6 rounded-[36px] border border-slate-800 shadow-2xl flex flex-col justify-between"
            >
              {/* Virtual Glowing QR Code */}
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-slate-850">
                  <div>
                    <span className="text-[10px] font-mono text-mint uppercase tracking-wider block">QR Code Table 04</span>
                    <h4 className="text-white text-sm font-bold">Scannez pour Voir</h4>
                  </div>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-accent animate-ping" />
                </div>

                <div className="bg-white p-4.5 rounded-2xl flex items-center justify-center shadow-inner relative group cursor-pointer" onClick={() => scrollToSection('simulator')}>
                  <div className="absolute inset-0 bg-mint/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[1px]">
                    <span className="bg-slate-950 text-white text-[11px] font-mono px-3 py-1.5 rounded-lg border border-mint/30 font-bold shadow-md">
                      Simuler le scan 📱
                    </span>
                  </div>
                  <QrCode className="w-44 h-44 text-slate-950" strokeWidth={1.5} />
                </div>
              </div>

              {/* Miniature card metrics */}
              <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800 space-y-2 shadow-lg">
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>Panier Moyen</span>
                  <span className="text-mint font-bold font-mono">+25.4%</span>
                </div>
                <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-mint h-full w-[80%]" />
                </div>
                <p className="text-[10px] text-slate-500 leading-normal">
                  Statistiques observées après activation des options d'ingrédients.
                </p>
              </div>

            </motion.div>

            {/* Tiny absolute badge for decor */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
              className="absolute -top-4 -left-4 bg-slate-900 border border-slate-800/80 p-3 rounded-2xl shadow-xl flex items-center gap-2"
            >
              <div className="w-8 h-8 rounded-lg bg-mint/10 text-mint flex items-center justify-center text-lg">🍕</div>
              <div>
                <p className="text-[10px] font-bold text-white leading-none">Pizzeria</p>
                <span className="text-[8px] font-mono text-slate-500 font-semibold">Mise à jour en 1s</span>
              </div>
            </motion.div>

            {/* Tiny absolute badge for coffee */}
            <motion.div 
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut', delay: 0.5 }}
              className="absolute -bottom-4 -right-2 bg-slate-900 border border-slate-800/80 p-3 rounded-2xl shadow-xl flex items-center gap-2"
            >
              <div className="w-8 h-8 rounded-lg bg-emerald-accent/10 text-emerald-accent flex items-center justify-center text-lg">☕</div>
              <div>
                <p className="text-[10px] font-bold text-white leading-none">Cafétéria</p>
                <span className="text-[8px] font-mono text-mint font-semibold">Click & Collect</span>
              </div>
            </motion.div>

          </div>

        </div>
      </div>
    </section>
  );
}
