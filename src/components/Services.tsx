import { motion } from 'motion/react';
import { QrCode, Globe, MapPin, Check, Sparkles } from 'lucide-react';
import { CORE_SERVICES } from '../data/mockData';

export default function Services() {
  // Map icons with built-in transition capabilities
  const getIcon = (iconStr: string) => {
    switch (iconStr) {
      case 'QrCode':
        return (
          <QrCode className="w-6 h-6 text-mint transition-all duration-500 ease-out group-hover:scale-110 group-hover:rotate-12 group-hover:text-emerald-300" />
        );
      case 'Globe':
        return (
          <Globe className="w-6 h-6 text-emerald-accent transition-all duration-500 ease-out group-hover:scale-110 group-hover:-rotate-12 group-hover:text-mint" />
        );
      case 'MapPin':
        return (
          <MapPin className="w-6 h-6 text-teal-muted transition-all duration-500 ease-out group-hover:scale-110 group-hover:-translate-y-1 group-hover:text-mint" />
        );
      default:
        return (
          <QrCode className="w-6 h-6 text-mint transition-all duration-500 ease-out group-hover:scale-110" />
        );
    }
  };

  return (
    <section id="services" className="py-24 bg-slate-950/20 relative overflow-hidden">
      {/* Dynamic atmospheric radial glow backdrop */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-mint/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-mint/10 text-mint text-xs font-mono font-medium tracking-wide border border-mint/20 mb-4 uppercase">
            <Sparkles className="w-3.5 h-3.5" /> Solutions Clés en Main
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
            Nos Services pour <span className="bg-clip-text text-transparent bg-gradient-to-r from-mint to-emerald-accent">Restaurateurs Ambitieux</span>
          </h2>
          <p className="text-lg text-slate-400">
            Augmentez vos ventes, simplifiez le service en salle et devenez l'établissement incontournable de votre zone géographique.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch" id="services-grid">
          {CORE_SERVICES.map((serv, index) => (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ 
                y: -8, 
                scale: 1.015,
                borderColor: "rgba(52, 211, 153, 0.35)",
                boxShadow: "0 20px 40px -15px rgba(0, 0, 0, 0.5), 0 0 25px -5px rgba(52, 211, 153, 0.08)"
              }}
              transition={{ 
                type: "spring",
                stiffness: 300,
                damping: 20,
                delay: index * 0.15 
              }}
              key={serv.id}
              className="bg-slate-900/40 border border-slate-800/80 rounded-3xl p-8 flex flex-col justify-between transition-colors duration-300 relative group overflow-hidden cursor-default"
            >
              {/* Soft ambient lighting gradient inside card on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-mint/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none" />

              <div className="space-y-6 relative z-10">
                {/* Icon wrapper with glow & scale transition */}
                <div className="w-12 h-12 rounded-2xl bg-slate-950 flex items-center justify-center border border-slate-800 shadow-inner group-hover:border-mint/30 group-hover:shadow-mint/5 group-hover:bg-slate-900 transition-all duration-300">
                  {getIcon(serv.icon)}
                </div>

                {/* Info titles */}
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-white group-hover:text-mint transition-colors duration-300">
                    {serv.title}
                  </h3>
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed transition-colors duration-300 group-hover:text-slate-300">
                    {serv.description}
                  </p>
                </div>

                {/* Bullet Points Benefits with sub-hover interactions */}
                <div className="space-y-3 pt-2">
                  <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-bold group-hover:text-slate-400 transition-colors duration-300">Avantages Rentables :</p>
                  <ul className="space-y-2.5">
                    {serv.benefits.map((benefit) => (
                      <li key={benefit} className="text-slate-300 text-xs flex items-start gap-2.5 leading-relaxed group/item cursor-pointer">
                        <span className="w-4.5 h-4.5 rounded-full bg-emerald-accent/10 text-emerald-accent flex items-center justify-center flex-shrink-0 border border-emerald-accent/20 mt-0.5 group-hover/item:scale-110 group-hover/item:bg-emerald-accent/20 group-hover/item:border-emerald-accent/40 transition-all duration-200">
                          <Check className="w-2.5 h-2.5 stroke-[3] transition-transform duration-200 group-hover/item:rotate-12" />
                        </span>
                        <span className="group-hover/item:text-white transition-colors duration-200">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Elegant bottom hover visual indicator line */}
              <div className="absolute bottom-0 left-8 right-8 h-[2px] bg-gradient-to-r from-mint to-emerald-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center rounded-full" />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
