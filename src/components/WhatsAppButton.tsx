import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

export default function WhatsAppButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  // Phone number formatted for international WhatsApp: 213 is the Algeria prefix for 06 66 13 90 36
  const whatsappNumber = '213666139036';
  const customMessage = encodeURIComponent(
    'Bonjour AD STUDIO, je suis intéressé(e) par vos services de menu digital QR et création de site web pour mon commerce.'
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${customMessage}`;

  useEffect(() => {
    // Show the floating button after scrolling down 300px
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    // Trigger tooltip invite 5 seconds after load
    const timer = setTimeout(() => {
      setShowTooltip(true);
    }, 5000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2.5 pointer-events-none">
      
      {/* Tooltip Invitation */}
      <AnimatePresence>
        {isVisible && showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="pointer-events-auto bg-[#1e293b] text-slate-100 px-3.5 py-2 rounded-2xl shadow-xl border border-slate-800 flex items-center gap-2.5 max-w-xs text-xs sm:text-sm font-medium relative mb-1"
            id="whatsapp-tooltip"
          >
            <div className="flex-1 text-left leading-relaxed">
              <span className="font-extrabold text-mint block text-[10px] uppercase tracking-wider mb-0.5">AD Studio</span>
              Besoin d'un menu digital QR ? Discutons-en sur WhatsApp !
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowTooltip(false);
              }}
              className="text-slate-500 hover:text-white transition p-0.5 hover:bg-slate-800 rounded-lg cursor-pointer flex-shrink-0"
              title="Fermer la suggestion"
              id="whatsapp-tooltip-close"
            >
              <X className="w-3.5 h-3.5" />
            </button>
            <div className="absolute bottom-[-6px] right-6 w-3 h-3 bg-[#1e293b] border-r border-b border-slate-800 rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Primary Floating Button */}
      <AnimatePresence>
        {isVisible && (
          <motion.a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0.7, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.7, y: 20 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 350, damping: 18 }}
            className="pointer-events-auto w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-[0_8px_30px_rgb(37,211,102,0.4)] hover:shadow-[0_8px_35px_rgb(37,211,102,0.65)] relative cursor-pointer group"
            title="Contactez-nous sur WhatsApp"
            id="whatsapp-floating-cta"
          >
            {/* Glowing Ring Effect */}
            <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-30 animate-ping group-hover:opacity-0 transition-opacity duration-300 pointer-events-none" />

            {/* Premium WhatsApp SVG Icon */}
            <svg
              className="w-7 h-7 fill-current transition-transform duration-300 group-hover:rotate-[8deg]"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          </motion.a>
        )}
      </AnimatePresence>

    </div>
  );
}
