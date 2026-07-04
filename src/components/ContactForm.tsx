import { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Mail, Phone, Send, Check, AlertCircle, Copy, 
  Sparkles, Coffee, Store, Flame, Compass 
} from 'lucide-react';
import { ContactInquiry } from '../types';

interface ContactFormProps {
  selectedType?: 'Pizzeria' | 'Cafétéria' | 'Restaurant' | 'Autre';
}

export default function ContactForm({ selectedType = 'Pizzeria' }: ContactFormProps) {
  const [formData, setFormData] = useState<ContactInquiry>({
    name: '',
    restaurantName: '',
    email: '',
    phone: '',
    type: selectedType,
    needs: [],
    message: ''
  });

  // Keep type synchronized if selected from templates preview cards
  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      type: selectedType
    }));
  }, [selectedType]);

  const [isCopiedEmail, setIsCopiedEmail] = useState(false);
  const [isCopiedPhone, setIsCopiedPhone] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Contact info
  const creatorEmail = 'ADstudio31@gmail.com';
  const creatorPhone = '0666139036';
  const creatorPhoneFormatted = '06 66 13 90 36';

  // Toggle needs checklists
  const handleToggleNeed = (need: string) => {
    if (formData.needs.includes(need)) {
      setFormData({
        ...formData,
        needs: formData.needs.filter(n => n !== need)
      });
    } else {
      setFormData({
        ...formData,
        needs: [...formData.needs, need]
      });
    }
  };

  // Copy helper
  const copyToClipboard = (text: string, type: 'email' | 'phone') => {
    navigator.clipboard.writeText(text);
    if (type === 'email') {
      setIsCopiedEmail(true);
      setTimeout(() => setIsCopiedEmail(false), 2000);
    } else {
      setIsCopiedPhone(true);
      setTimeout(() => setIsCopiedPhone(false), 2000);
    }
  };

  // Submit Handler (Simulated server or direct local save for preview)
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.restaurantName || !formData.email || !formData.phone) {
      setErrorMsg('Veuillez remplir tous les champs obligatoires (*).');
      return;
    }
    setErrorMsg('');

    // Save requests to localStorage for Admin view
    try {
      const newRequest = {
        id: `request-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        name: formData.name,
        restaurantName: formData.restaurantName,
        email: formData.email,
        phone: formData.phone,
        type: formData.type,
        needs: [...formData.needs],
        message: formData.message,
        createdAt: new Date().toISOString()
      };

      const existingRequestsStr = localStorage.getItem('ad_studio_requests') || '[]';
      const existingRequests = JSON.parse(existingRequestsStr);
      existingRequests.unshift(newRequest); // Add to beginning of list
      localStorage.setItem('ad_studio_requests', JSON.stringify(existingRequests));
    } catch (err) {
      console.error('Error saving simulated request to localStorage', err);
    }

    setIsSubmitted(true);
  };

  return (
    <section id="contact" className="py-24 bg-slate-950 border-t border-slate-900 relative">
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-mint/5 to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Column: Coordinates & Pitch */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-mint/10 text-mint text-xs font-mono font-medium tracking-wide border border-mint/20 mb-4 uppercase">
                <Sparkles className="w-3.5 h-3.5" /> Discutons de votre projet
              </div>
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
                Prêt à Booster <span className="bg-clip-text text-transparent bg-gradient-to-r from-mint to-emerald-accent">Vos Ventes ?</span>
              </h2>
              <p className="text-slate-400 text-base leading-relaxed">
                Que vous soyez gérant d'une pizzeria familiale, propriétaire d'un café branché ou chef d'un grand restaurant, nous concevons un outil sur-mesure pour votre rentabilité.
              </p>
            </div>

            {/* Premium Direct Coordinates Cards */}
            <div className="space-y-4">
              {/* Phone card */}
              <div className="p-5 bg-slate-900/40 rounded-2xl border border-slate-800 flex items-center justify-between hover:border-mint/30 transition-all shadow-md group">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-mint/10 text-mint flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-mono uppercase text-slate-500 tracking-wider">Téléphone direct</p>
                    <a href={`tel:${creatorPhone}`} className="text-lg font-bold text-white hover:text-mint transition-colors">
                      {creatorPhoneFormatted}
                    </a>
                  </div>
                </div>
                <button
                  onClick={() => copyToClipboard(creatorPhone, 'phone')}
                  className="p-2 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white transition cursor-pointer"
                  title="Copier le numéro"
                >
                  {isCopiedPhone ? <Check className="w-4 h-4 text-emerald-accent" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Email card */}
              <div className="p-5 bg-slate-900/40 rounded-2xl border border-slate-800 flex items-center justify-between hover:border-mint/30 transition-all shadow-md group">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-mint/10 text-mint flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] font-mono uppercase text-slate-500 tracking-wider">Email professionnel</p>
                    <a href={`mailto:${creatorEmail}`} className="text-sm sm:text-base font-bold text-white hover:text-mint transition-colors truncate block">
                      {creatorEmail}
                    </a>
                  </div>
                </div>
                <button
                  onClick={() => copyToClipboard(creatorEmail, 'email')}
                  className="p-2 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white transition flex-shrink-0 cursor-pointer"
                  title="Copier l'email"
                >
                  {isCopiedEmail ? <Check className="w-4 h-4 text-emerald-accent" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Quick trust arguments */}
            <div className="bg-slate-900/20 rounded-2xl border border-slate-800/60 p-5 space-y-3.5 text-xs text-slate-400">
              <div className="flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-accent" />
                <span>Réponse garantie sous 24h ouvrées</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-accent" />
                <span>Accompagnement de A à Z (Photos, QR, Impression de stands)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-accent" />
                <span>Aucun abonnement caché ni commission sur vos ventes</span>
              </div>
            </div>
          </div>

          {/* Right Column: Contact form with states */}
          <div className="lg:col-span-7">
            <div className="bg-slate-900/50 rounded-3xl border border-slate-800/80 p-8 sm:p-10 shadow-xl backdrop-blur-sm relative overflow-hidden">
              
              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.form 
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit} 
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-300">Votre Nom Complet *</label>
                        <input
                          type="text"
                          required
                          placeholder="Ex: Jean Dupont"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-mint focus:ring-1 focus:ring-mint transition"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-300">Nom de votre Établissement *</label>
                        <input
                          type="text"
                          required
                          placeholder="Ex: Bella Napoli Pizzeria"
                          value={formData.restaurantName}
                          onChange={(e) => setFormData({ ...formData, restaurantName: e.target.value })}
                          className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-mint focus:ring-1 focus:ring-mint transition"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-300">Email de Contact *</label>
                        <input
                          type="email"
                          required
                          placeholder="Ex: dupont@gmail.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-mint focus:ring-1 focus:ring-mint transition"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-300">Numéro de Téléphone *</label>
                        <input
                          type="tel"
                          required
                          placeholder="Ex: 06 12 34 56 78"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-mint focus:ring-1 focus:ring-mint transition"
                        />
                      </div>
                    </div>

                    {/* Establishment Type Selector */}
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-slate-300">Type de Commerce</label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {[
                          { value: 'Pizzeria', label: '🍕 Pizzeria' },
                          { value: 'Cafétéria', label: '☕ Cafétéria' },
                          { value: 'Restaurant', label: '🍽️ Restaurant' },
                          { value: 'Autre', label: '✨ Autre' }
                        ].map((item) => (
                          <button
                            key={item.value}
                            type="button"
                            onClick={() => setFormData({ ...formData, type: item.value as any })}
                            className={`py-2.5 rounded-xl border text-xs font-semibold transition cursor-pointer ${
                              formData.type === item.value 
                                ? 'bg-mint/15 border-mint text-white' 
                                : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-white'
                            }`}
                          >
                            {item.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Needs checklist */}
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-slate-300">Quels sont vos besoins ? (Plusieurs choix possibles)</label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {[
                          { id: 'need-menu', label: 'Menu QR Code Interactif' },
                          { id: 'need-site', label: 'Site Internet Vitrine / Identité' },
                          { id: 'need-collect', label: 'Commande en ligne (Click & Collect)' },
                          { id: 'need-seo', label: 'Référencement Google Maps / SEO' }
                        ].map((need) => {
                          const isSelected = formData.needs.includes(need.label);
                          return (
                            <button
                              key={need.id}
                              type="button"
                              onClick={() => handleToggleNeed(need.label)}
                              className={`p-3 rounded-xl border text-left flex items-center justify-between transition cursor-pointer ${
                                isSelected 
                                  ? 'bg-mint/10 border-mint/50 text-white' 
                                  : 'bg-slate-950/40 border-slate-800 text-slate-400 hover:border-slate-700'
                              }`}
                            >
                              <span className="text-xs font-medium">{need.label}</span>
                              <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition ${
                                isSelected ? 'bg-mint border-mint text-slate-950 font-bold' : 'border-slate-700'
                              }`}>
                                {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Custom Message input */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-300">Votre Message / Particularités du commerce</label>
                      <textarea
                        rows={3}
                        placeholder="Ex: Nous avons une terrasse de 40 places et voulons lancer notre menu QR code avant la saison d'été."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-mint focus:ring-1 focus:ring-mint transition"
                      />
                    </div>

                    {errorMsg && (
                      <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center gap-2 text-rose-400 text-xs">
                        <AlertCircle className="w-4 h-4 flex-shrink-0" />
                        <span>{errorMsg}</span>
                      </div>
                    )}

                    <button
                      type="submit"
                      className="w-full py-4 bg-gradient-to-r from-mint to-emerald-accent text-slate-950 rounded-xl text-sm font-extrabold transition flex items-center justify-center gap-2 shadow-lg shadow-mint/10 cursor-pointer hover:opacity-95"
                    >
                      <Send className="w-4 h-4" /> Envoyer ma Demande Gratuite
                    </button>
                  </motion.form>
                ) : (
                  <motion.div 
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center py-8"
                  >
                    <div className="w-16 h-16 rounded-full bg-emerald-accent/10 text-emerald-accent flex items-center justify-center mx-auto mb-6 border border-emerald-accent/20">
                      <Check className="w-8 h-8 stroke-[3]" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">Merci pour Votre Demande !</h3>
                    <p className="text-slate-400 text-sm max-w-md mx-auto leading-relaxed mb-8">
                      Félicitations <span className="text-white font-semibold">{formData.name}</span>, votre demande pour <span className="text-mint font-semibold">{formData.restaurantName}</span> a été simulée et validée avec succès !
                    </p>

                    <div className="bg-slate-950/80 rounded-2xl border border-slate-800 p-6 text-left max-w-lg mx-auto space-y-4 text-xs font-mono text-slate-400">
                      <h4 className="text-white font-bold border-b border-slate-800 pb-2 flex items-center justify-between">
                        <span>RÉCAPITULATIF DE LA DEMANDE</span>
                        <span className="px-2 py-0.5 rounded bg-mint/10 text-mint text-[10px] font-bold">SIMULÉ</span>
                      </h4>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <span className="text-slate-500">Nom :</span> <span className="text-slate-300">{formData.name}</span>
                        </div>
                        <div>
                          <span className="text-slate-500">Commerce :</span> <span className="text-slate-300">{formData.restaurantName} ({formData.type})</span>
                        </div>
                        <div>
                          <span className="text-slate-500">Téléphone :</span> <span className="text-slate-300">{formData.phone}</span>
                        </div>
                        <div>
                          <span className="text-slate-500">Email :</span> <span className="text-slate-300 truncate block">{formData.email}</span>
                        </div>
                      </div>
                      {formData.needs.length > 0 && (
                        <div>
                          <span className="text-slate-500">Besoins exprimés :</span>
                          <div className="flex flex-wrap gap-1 mt-1.5">
                            {formData.needs.map(need => (
                              <span key={need} className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[9px] text-emerald-accent font-bold">
                                {need}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="mt-8 flex justify-center gap-4">
                      <button 
                        onClick={() => setIsSubmitted(false)}
                        className="px-5 py-2.5 bg-slate-950 hover:bg-slate-850 text-slate-400 hover:text-white rounded-xl border border-slate-800 text-xs font-semibold transition cursor-pointer"
                      >
                        Nouveau formulaire
                      </button>
                      
                      <a 
                        href={`tel:${creatorPhone}`}
                        className="px-5 py-2.5 bg-mint hover:bg-emerald-accent text-slate-950 rounded-xl text-xs font-extrabold transition flex items-center gap-1.5 cursor-pointer"
                      >
                        Appeler Directement
                      </a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
