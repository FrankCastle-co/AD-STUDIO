import { motion } from 'motion/react';
import { Star, Quote, MessageSquare, Sparkles } from 'lucide-react';
import { TESTIMONIALS } from '../data/mockData';

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 bg-slate-900/10 border-t border-slate-900/40 relative">
      <div className="absolute top-1/4 -right-10 w-80 h-80 bg-mint/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-mint/10 text-mint text-xs font-mono font-medium tracking-wide border border-mint/20 mb-4 uppercase">
            <MessageSquare className="w-3.5 h-3.5" /> Témoignages Clients
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
            Ce Qu'en Disent Les <span className="bg-clip-text text-transparent bg-gradient-to-r from-mint to-emerald-accent">Restaurateurs</span>
          </h2>
          <p className="text-lg text-slate-400">
            Ils ont franchi le pas du numérique et constatent chaque jour la hausse de leur panier moyen et le gain de temps pour leurs équipes.
          </p>
        </div>

        {/* Testimonials grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch" id="testimonials-grid">
          {TESTIMONIALS.map((test, index) => (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              key={test.id}
              className="bg-slate-900/40 border border-slate-800/80 rounded-3xl p-8 flex flex-col justify-between shadow-lg hover:border-mint/20 transition-all duration-300 relative group"
            >
              {/* Decorative Quote Icon */}
              <div className="absolute top-6 right-6 text-slate-800/40 pointer-events-none">
                <Quote className="w-12 h-12 stroke-[1.5]" />
              </div>

              <div className="space-y-6 relative z-10">
                {/* Stars container */}
                <div className="flex gap-1">
                  {[...Array(test.rating)].map((_, i) => (
                    <Star key={i} className="w-4.5 h-4.5 text-amber-400 fill-amber-400 stroke-none" />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed italic">
                  "{test.quote}"
                </p>
              </div>

              {/* Author Info */}
              <div className="pt-6 mt-6 border-t border-slate-850 flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-mint/20 to-emerald-accent/20 text-mint font-extrabold text-xs flex items-center justify-center border border-mint/20">
                  {test.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm">{test.name}</h4>
                  <p className="text-[10px] text-slate-500 font-medium">
                    {test.role} • <span className="text-mint font-semibold">{test.city}</span>
                  </p>
                </div>
              </div>

            </motion.div>
          ))}
        </div>

        {/* Dynamic conversion trust prompt */}
        <div className="mt-20 text-center bg-slate-900/40 p-6 rounded-2xl border border-slate-800/80 max-w-xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-4">
          <div className="flex -space-x-2">
            {['M', 'S', 'J'].map((char, i) => (
              <div key={i} className="w-8 h-8 rounded-full bg-slate-950 border-2 border-slate-900 flex items-center justify-center text-[10px] font-bold text-slate-400 font-mono">
                {char}
              </div>
            ))}
          </div>
          <span className="text-slate-400 text-xs">
            Rejoignez plus de <strong className="text-white">12+ restaurateurs locaux</strong> satisfaits ce mois-ci.
          </span>
        </div>

      </div>
    </section>
  );
}
