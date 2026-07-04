import { motion } from 'motion/react';
import { Star, Check, ArrowRight, Sparkles } from 'lucide-react';
import { TEMPLATES_DATA } from '../data/mockData';

interface TemplatesPreviewProps {
  onSelectTemplate: (type: 'Pizzeria' | 'Cafétéria' | 'Restaurant') => void;
}

export default function TemplatesPreview({ onSelectTemplate }: TemplatesPreviewProps) {
  return (
    <section id="templates" className="py-24 bg-slate-900/10 border-t border-slate-900/40 relative">
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-mint/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-mint/10 text-mint text-xs font-mono font-medium tracking-wide border border-mint/20 mb-4 uppercase">
            <Sparkles className="w-3.5 h-3.5" /> Designs sur-mesure
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
            Des Templates <span className="bg-clip-text text-transparent bg-gradient-to-r from-mint to-emerald-accent">Haute Performance</span>
          </h2>
          <p className="text-lg text-slate-400">
            Chaque établissement possède une âme différente. Nous concevons l'interface qui correspond parfaitement à l'expérience que vous offrez en salle.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch" id="templates-grid">
          {TEMPLATES_DATA.map((tmpl) => (
            <motion.div
              key={tmpl.id}
              whileHover={{ y: -6 }}
              className="bg-slate-900/40 border border-slate-800/80 rounded-3xl p-6 flex flex-col justify-between shadow-lg hover:border-mint/30 transition-all relative overflow-hidden group"
            >
              {/* Top Accent Color Bar */}
              <div 
                className="absolute top-0 left-0 right-0 h-1.5 transition-all duration-300" 
                style={{ backgroundColor: tmpl.primaryColor }}
              />

              <div className="space-y-6">
                {/* Header info */}
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <span className="w-12 h-12 rounded-2xl bg-slate-950 flex items-center justify-center text-2xl border border-slate-800">
                      {tmpl.image}
                    </span>
                    <div>
                      <span className="text-[10px] font-mono font-semibold uppercase px-2 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-slate-400">
                        {tmpl.type}
                      </span>
                      <h3 className="text-lg font-bold text-white mt-1 group-hover:text-mint transition-colors">
                        {tmpl.name}
                      </h3>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 px-2.5 py-1 bg-slate-950 rounded-lg border border-slate-800 text-amber-400 text-xs font-mono font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-400 stroke-none" /> {tmpl.rating.toFixed(1)}
                  </div>
                </div>

                {/* Tagline */}
                <p className="text-slate-300 text-xs italic font-medium leading-relaxed bg-slate-950/40 p-3 rounded-xl border border-slate-800/50">
                  "{tmpl.tagline}"
                </p>

                {/* Features list */}
                <div className="space-y-3">
                  <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-semibold">Inclus dans la formule :</p>
                  <ul className="space-y-2.5">
                    {tmpl.features.map((feat) => (
                      <li key={feat} className="text-slate-300 text-xs flex items-start gap-2.5 leading-relaxed">
                        <span className="w-4.5 h-4.5 rounded-full bg-emerald-accent/10 text-emerald-accent flex items-center justify-center flex-shrink-0 border border-emerald-accent/20 mt-0.5">
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action trigger */}
              <div className="pt-6 mt-6 border-t border-slate-850">
                <button
                  onClick={() => onSelectTemplate(tmpl.type)}
                  className="w-full py-3 bg-slate-950 hover:bg-slate-850 hover:text-mint text-white text-xs font-bold rounded-xl border border-slate-800 flex items-center justify-center gap-2 transition group/btn"
                >
                  Choisir l'Identité {tmpl.type}
                  <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1.5 transition-transform" />
                </button>
              </div>

            </motion.div>
          ))}
        </div>

        {/* Highlight Banner */}
        <div className="mt-16 bg-gradient-to-r from-mint/10 via-emerald-accent/10 to-transparent p-8 rounded-3xl border border-mint/20 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
          <div className="space-y-2 max-w-2xl text-center md:text-left">
            <h4 className="text-white font-bold text-lg">Besoin d'une personnalisation totale ?</h4>
            <p className="text-slate-400 text-xs leading-relaxed">
              Nous n'utilisons aucun outil de bloc générique pré-conçu. Votre site et votre menu interactif sont codés sur-mesure à la ligne de code près pour s'adapter à la charte graphique exacte de votre salle.
            </p>
          </div>
          <button 
            onClick={() => onSelectTemplate('Restaurant')}
            className="px-6 py-3 bg-mint hover:bg-emerald-accent text-slate-950 text-xs font-extrabold rounded-xl transition flex-shrink-0 cursor-pointer"
          >
            Créer un Design Unique
          </button>
        </div>

      </div>
    </section>
  );
}
