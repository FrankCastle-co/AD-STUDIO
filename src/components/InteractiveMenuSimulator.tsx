import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShoppingCart, Plus, Minus, X, Check, QrCode, 
  Sparkles, Flame, Wifi, Battery, ChevronRight, CornerDownRight 
} from 'lucide-react';
import { SIMULATOR_MENU_ITEMS } from '../data/mockData';
import { MenuItem, CartItem } from '../types';

export default function InteractiveMenuSimulator() {
  const [activeCategory, setActiveCategory] = useState<'pizzas' | 'cafes' | 'desserts' | 'boissons'>('pizzas');
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [extraPrice, setExtraPrice] = useState<number>(0);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isOrdered, setIsOrdered] = useState(false);
  const [tableNumber] = useState<number>(14);

  // Currency selection state & helpers
  const [currency, setCurrency] = useState<'DA' | 'EUR'>('DA');
  const [lastOrderTotal, setLastOrderTotal] = useState<number>(0);
  const [lastOrderCurrency, setLastOrderCurrency] = useState<'DA' | 'EUR'>('DA');

  const formatPrice = (priceInEur: number) => {
    if (currency === 'EUR') {
      return `${priceInEur.toFixed(2)} €`;
    } else {
      return `${Math.round(priceInEur * 200).toLocaleString('fr-FR')} DA`;
    }
  };

  const formatLastOrderPrice = (priceInEur: number) => {
    if (lastOrderCurrency === 'EUR') {
      return `${priceInEur.toFixed(2)} €`;
    } else {
      return `${Math.round(priceInEur * 200).toLocaleString('fr-FR')} DA`;
    }
  };

  // Filter items
  const filteredItems = SIMULATOR_MENU_ITEMS.filter(item => item.category === activeCategory);

  // Open customization modal
  const handleOpenCustomizer = (item: MenuItem) => {
    setSelectedItem(item);
    setSelectedOptions([]);
    setExtraPrice(0);
  };

  // Toggle options
  const handleToggleOption = (optionName: string, optionPrice: number) => {
    if (selectedOptions.includes(optionName)) {
      setSelectedOptions(selectedOptions.filter(o => o !== optionName));
      setExtraPrice(prev => prev - optionPrice);
    } else {
      setSelectedOptions([...selectedOptions, optionName]);
      setExtraPrice(prev => prev + optionPrice);
    }
  };

  // Add to cart
  const handleAddToCart = () => {
    if (!selectedItem) return;

    const finalPrice = selectedItem.price + extraPrice;
    const cartId = `${selectedItem.id}-${selectedOptions.sort().join(',')}`;

    const existingIndex = cart.findIndex(c => c.id === cartId);
    if (existingIndex > -1) {
      const updated = [...cart];
      updated[existingIndex].quantity += 1;
      updated[existingIndex].totalPrice += finalPrice;
      setCart(updated);
    } else {
      const newCartItem: CartItem = {
        id: cartId,
        item: selectedItem,
        quantity: 1,
        selectedOptions: [...selectedOptions],
        totalPrice: finalPrice
      };
      setCart([...cart, newCartItem]);
    }

    setSelectedItem(null);
  };

  // Modify quantity inside cart
  const handleQuantityChange = (cartId: string, delta: number) => {
    const updated = cart.map(c => {
      if (c.id === cartId) {
        const newQty = c.quantity + delta;
        if (newQty <= 0) return null;
        const singlePrice = c.totalPrice / c.quantity;
        return {
          ...c,
          quantity: newQty,
          totalPrice: singlePrice * newQty
        };
      }
      return c;
    }).filter(Boolean) as CartItem[];

    setCart(updated);
  };

  // Calculate cart total
  const cartTotal = cart.reduce((acc, curr) => acc + curr.totalPrice, 0);
  const totalItemsCount = cart.reduce((acc, curr) => acc + curr.quantity, 0);

  // Finalize order
  const triggerOrder = () => {
    setLastOrderTotal(cartTotal);
    setLastOrderCurrency(currency);
    // Save order simulation details to localStorage for Admin view
    try {
      const orderItems = cart.map(item => ({
        name: item.item.name,
        quantity: item.quantity,
        options: item.selectedOptions,
        price: item.totalPrice
      }));

      const newOrder = {
        id: `order-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        tableNumber: tableNumber,
        items: orderItems,
        totalPrice: cartTotal,
        currency: currency,
        createdAt: new Date().toISOString()
      };

      const existingOrdersStr = localStorage.getItem('ad_studio_orders') || '[]';
      const existingOrders = JSON.parse(existingOrdersStr);
      existingOrders.unshift(newOrder); // Add to the beginning of list
      localStorage.setItem('ad_studio_orders', JSON.stringify(existingOrders));
    } catch (e) {
      console.error('Error saving simulated order to localStorage', e);
    }

    setIsOrdered(true);
    setCart([]);
    setIsCartOpen(false);
    setTimeout(() => {
      setIsOrdered(false);
    }, 5500);
  };

  return (
    <section id="simulator" className="py-20 bg-slate-950/40 border-y border-slate-900 relative overflow-hidden">
      {/* Visual background accents with custom palette */}
      <div className="absolute top-1/4 -left-10 w-72 h-72 bg-mint/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-10 w-72 h-72 bg-emerald-accent/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-mint/10 text-mint text-xs font-mono font-medium tracking-wide border border-mint/20 mb-4 uppercase">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" /> Démo Interactive & ROI
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
            Testez l'Expérience Client <span className="bg-clip-text text-transparent bg-gradient-to-r from-mint to-emerald-accent">Ultra-Intuitive</span>
          </h2>
          <p className="text-lg text-slate-400">
            Scannez le QR Code virtuel ci-dessous ou manipulez le téléphone pour voir comment vos futurs clients commanderont en un clin d'œil.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Columns: Explanatory copy & selling arguments */}
          <div className="lg:col-span-5 space-y-8" id="features-explanation">
            <div className="p-6 bg-slate-900/60 rounded-2xl border border-slate-800/80 hover:border-mint/30 transition-all shadow-xl">
              <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                <span className="p-2 rounded-lg bg-mint/10 text-mint">🍕</span>
                Menu Pizzeria & Cafétéria
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Le menu s'adapte à l'identité visuelle de l'établissement. Il est conçu pour donner faim, avec des filtres instantanés, des badges accrocheurs et une lisibilité parfaite de jour comme de nuit.
              </p>
            </div>

            <div className="p-6 bg-slate-900/60 rounded-2xl border border-slate-800/80 hover:border-emerald-accent/30 transition-all shadow-xl">
              <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                <span className="p-2 rounded-lg bg-emerald-accent/10 text-emerald-accent">💰</span>
                Module d'Upselling Intégré (+25% de CA)
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Lorsqu'un client sélectionne une pizza, le système lui propose automatiquement des suppléments pertinents (double fromage, jambon de Parme, boissons). C'est ce qui fait grimper le panier moyen de manière naturelle !
              </p>
            </div>

            <div className="p-6 bg-slate-900/60 rounded-2xl border border-slate-800/80 hover:border-teal-muted/30 transition-all shadow-xl">
              <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                <span className="p-2 rounded-lg bg-teal-muted/10 text-teal-muted">⚡</span>
                Zéro friction : Pas d'application à installer
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Un simple scan de QR Code sur la table ouvre instantanément le menu sur le smartphone du client. Rapidité fulgurante, compatibilité universelle (iOS/Android) et mise à jour en temps réel des stocks.
              </p>
            </div>

            {/* Simulated Live Scan Call-to-Action */}
            <div className="bg-gradient-to-br from-mint/10 to-emerald-accent/10 p-6 rounded-2xl border border-mint/20 shadow-md">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 shadow-inner flex-shrink-0">
                  <QrCode className="w-10 h-10 text-mint" />
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1">Scannez & Commandez</h4>
                  <p className="text-slate-400 text-xs leading-relaxed mb-3">
                    La technologie de QR code génère des liens sécurisés uniques par table pour identifier immédiatement la provenance de la commande.
                  </p>
                  <div className="flex items-center gap-2 text-mint text-xs font-mono font-semibold">
                    <span>Table activée : N° {tableNumber}</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-accent animate-ping inline-block" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Columns: The Smartphone Simulator */}
          <div className="lg:col-span-7 flex justify-center" id="smartphone-wrapper">
            <div className="relative w-full max-w-[380px] h-[780px] bg-slate-950 rounded-[48px] p-3 shadow-[0_0_50px_rgba(0,0,0,0.8)] border-[6px] border-slate-800 ring-1 ring-slate-700 overflow-hidden flex flex-col">
              
              {/* Dynamic Camera Notch / Speaker */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-6 bg-slate-800 rounded-b-2xl z-50 flex items-center justify-center gap-2">
                <div className="w-12 h-1 bg-slate-900 rounded-full" />
                <div className="w-2 h-2 rounded-full bg-slate-900" />
              </div>

              {/* Status Bar */}
              <div className="flex justify-between items-center px-6 pt-2 pb-3 text-white text-xs z-40 bg-slate-900">
                <span className="font-semibold text-[11px] font-mono">12:45</span>
                <div className="flex items-center gap-1.5 text-[11px] text-slate-300">
                  <Wifi className="w-3.5 h-3.5" />
                  <span className="font-mono">5G</span>
                  <Battery className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Simulated Web Application Header */}
              <div className="bg-slate-900 border-b border-slate-800 p-4 text-center relative z-40">
                <span className="text-[10px] text-mint font-mono tracking-widest uppercase block mb-0.5 font-bold">La Pizzeria Rustica</span>
                <h4 className="text-white text-base font-bold tracking-tight">Menu Digital Premium</h4>
                <div className="flex items-center justify-center gap-2 mt-1">
                  <span className="px-1.5 py-0.5 rounded bg-emerald-accent/10 text-emerald-accent text-[9px] font-mono flex items-center gap-1">
                    <span className="w-1 h-1 rounded-full bg-emerald-accent animate-ping" /> Commande Libre
                  </span>
                  <span className="text-slate-500 text-[10px]">•</span>
                  <span className="text-slate-400 text-[10px] font-medium font-mono">Table N° {tableNumber}</span>
                </div>

                {/* Currency Toggler */}
                <div className="flex justify-center mt-2.5">
                  <div className="bg-slate-950 p-0.5 rounded-lg border border-slate-800/80 inline-flex items-center">
                    <button
                      onClick={() => setCurrency('DA')}
                      className={`px-2.5 py-0.5 rounded text-[9px] font-mono font-bold transition-all duration-200 ${
                        currency === 'DA'
                          ? 'bg-mint text-slate-950 font-extrabold shadow'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Dinar (DA)
                    </button>
                    <button
                      onClick={() => setCurrency('EUR')}
                      className={`px-2.5 py-0.5 rounded text-[9px] font-mono font-bold transition-all duration-200 ${
                        currency === 'EUR'
                          ? 'bg-mint text-slate-950 font-extrabold shadow'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Euro (€)
                    </button>
                  </div>
                </div>
              </div>

              {/* Simulator Content Body */}
              <div className="flex-1 overflow-y-auto bg-slate-950 p-3 pb-20 relative scrollbar-none" id="simulator-phone-content">
                
                {/* Simulated Order Success Animation */}
                <AnimatePresence>
                  {isOrdered && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="absolute inset-0 bg-slate-950/95 z-50 flex flex-col items-center justify-center p-6 text-center"
                    >
                      <div className="w-16 h-16 rounded-full bg-emerald-accent/10 text-emerald-accent flex items-center justify-center mb-4 border border-emerald-accent/30">
                        <Check className="w-8 h-8 stroke-[3]" />
                      </div>
                      <h4 className="text-xl font-bold text-white mb-2">Commande Transmise !</h4>
                      <p className="text-slate-400 text-xs leading-relaxed max-w-[240px] mb-6">
                        Votre commande de la <span className="text-mint font-semibold">Table {tableNumber}</span> a été transmise directement en cuisine avec succès.
                      </p>
                      
                      <div className="w-full bg-slate-900 border border-slate-800 rounded-xl p-4 text-left font-mono text-[10px] text-slate-400 mb-6">
                        <div className="text-center border-b border-dashed border-slate-800 pb-2 mb-2 text-white font-bold">
                          TICKET DE CAISSE SIMULÉ
                        </div>
                        <div className="flex justify-between mb-1">
                          <span>Date : {new Date().toLocaleDateString('fr-FR')}</span>
                          <span>Heure : {new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                        <div className="flex justify-between mb-2">
                          <span>Statut : PAYÉ (SIMU)</span>
                          <span>Table : {tableNumber}</span>
                        </div>
                        <div className="border-b border-dashed border-slate-800 pb-1.5 mb-2"></div>
                        <div className="flex justify-between mb-2 font-bold text-white text-xs">
                          <span>TOTAL PAYÉ :</span>
                          <span className="text-mint">{formatLastOrderPrice(lastOrderTotal)}</span>
                        </div>
                        <div className="text-center text-mint text-[9px] font-semibold py-1 bg-mint/5 rounded border border-mint/10">
                          Félicitations ! Démo réussie.
                        </div>
                      </div>

                      <button 
                        onClick={() => setIsOrdered(false)}
                        className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs rounded-lg border border-slate-800 font-semibold transition"
                      >
                        Retourner au Menu
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Categories Tabs inside phone */}
                <div className="flex justify-between gap-1 mb-4 bg-slate-900 p-1 rounded-xl sticky top-0 z-30 border border-slate-800">
                  {(['pizzas', 'cafes', 'desserts', 'boissons'] as const).map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`flex-1 py-1.5 rounded-lg text-[10px] font-bold transition capitalize ${
                        activeCategory === cat 
                          ? 'bg-mint text-slate-950 shadow' 
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {cat === 'cafes' ? 'cafés' : cat}
                    </button>
                  ))}
                </div>

                {/* Interactive list */}
                <div className="space-y-3" id="phone-items-list">
                  <AnimatePresence mode="popLayout">
                    {filteredItems.map((item) => (
                      <motion.div
                        layout
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.25 }}
                        key={item.id}
                        className="p-3 bg-slate-900/80 rounded-xl border border-slate-800/80 hover:border-slate-700/80 transition flex gap-3 relative overflow-hidden"
                      >
                        <div className="w-14 h-14 bg-slate-950 rounded-lg flex items-center justify-center text-2xl shadow-inner flex-shrink-0 border border-slate-800">
                          {item.image}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start mb-0.5">
                            <h5 className="text-xs font-bold text-white truncate">{item.name}</h5>
                            <span className="text-xs font-mono font-bold text-mint">{formatPrice(item.price)}</span>
                          </div>
                          <p className="text-[10px] text-slate-400 line-clamp-2 leading-relaxed mb-2">
                            {item.description}
                          </p>
                          <div className="flex items-center justify-between">
                            <div className="flex gap-1">
                              {item.tags?.slice(0, 1).map(tag => (
                                <span key={tag} className="px-1.5 py-0.5 rounded bg-mint/10 text-mint text-[8px] font-bold font-mono">
                                  {tag}
                                </span>
                              ))}
                            </div>
                            <button
                              onClick={() => handleOpenCustomizer(item)}
                              className="px-2 py-1 rounded bg-mint hover:bg-emerald-accent text-slate-950 text-[9px] font-extrabold flex items-center gap-1 transition-all"
                            >
                              <Plus className="w-2.5 h-2.5" /> Choisir
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>

              {/* Floating Bottom Cart Bar (if items exist) */}
              {totalItemsCount > 0 && (
                <div className="absolute bottom-3 left-3 right-3 bg-slate-900 border border-slate-800 p-3 rounded-2xl shadow-xl z-40">
                  <div className="flex items-center justify-between">
                    <button 
                      onClick={() => setIsCartOpen(true)}
                      className="flex items-center gap-2 text-white"
                    >
                      <div className="relative p-2 bg-mint rounded-lg text-slate-950">
                        <ShoppingCart className="w-3.5 h-3.5 stroke-[2.5]" />
                        <span className="absolute -top-1.5 -right-1.5 bg-rose-500 text-white text-[8px] font-bold w-4 h-4 rounded-full flex items-center justify-center ring-2 ring-slate-900">
                          {totalItemsCount}
                        </span>
                      </div>
                      <div className="text-left">
                        <p className="text-[10px] text-slate-400 leading-none">Mon Panier</p>
                        <p className="text-xs font-bold font-mono text-white">{formatPrice(cartTotal)}</p>
                      </div>
                    </button>
                    
                    <button
                      onClick={triggerOrder}
                      className="px-3.5 py-2 bg-mint hover:bg-emerald-accent text-slate-950 text-xs font-extrabold rounded-lg flex items-center gap-1 transition"
                    >
                      Commander <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              )}

              {/* Customizer Modal / Upselling simulation */}
              <AnimatePresence>
                {selectedItem && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-black/80 z-50 flex items-end justify-center"
                  >
                    <motion.div 
                      initial={{ y: '100%' }}
                      animate={{ y: 0 }}
                      exit={{ y: '100%' }}
                      transition={{ type: 'spring', damping: 25, stiffness: 220 }}
                      className="w-full bg-slate-900 rounded-t-3xl border-t border-slate-800 max-h-[85%] overflow-y-auto p-4 flex flex-col"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{selectedItem.image}</span>
                          <div>
                            <h4 className="text-sm font-bold text-white leading-none">{selectedItem.name}</h4>
                            <span className="text-xs font-mono font-bold text-mint inline-block mt-1">
                              {formatPrice(selectedItem.price)}
                            </span>
                          </div>
                        </div>
                        <button 
                          onClick={() => setSelectedItem(null)}
                          className="p-1.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 transition"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <p className="text-[10px] text-slate-400 leading-relaxed mb-4 pb-3 border-b border-slate-800">
                        {selectedItem.description}
                      </p>

                      {/* Upselling options container */}
                      {selectedItem.options && selectedItem.options.length > 0 && (
                        <div className="mb-6 flex-1">
                          <h5 className="text-[10px] font-mono uppercase text-mint font-bold tracking-wider mb-2 flex items-center gap-1.5">
                            <Flame className="w-3 h-3 text-mint animate-pulse" /> Options recommandées (Upsell)
                          </h5>
                          <div className="space-y-2">
                            {selectedItem.options.map(opt => {
                              const isChecked = selectedOptions.includes(opt.name);
                              return (
                                <button
                                  key={opt.name}
                                  onClick={() => handleToggleOption(opt.name, opt.price)}
                                  className={`w-full p-2.5 rounded-xl border text-left flex items-center justify-between transition ${
                                    isChecked 
                                      ? 'bg-mint/10 border-mint/50 text-white' 
                                      : 'bg-slate-950/50 border-slate-800 text-slate-400 hover:border-slate-700'
                                  }`}
                                >
                                  <div className="flex items-center gap-2">
                                    <div className={`w-4 h-4 rounded flex items-center justify-center border transition ${
                                      isChecked ? 'bg-mint border-mint text-slate-950' : 'border-slate-700 bg-slate-900'
                                    }`}>
                                      {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                                    </div>
                                    <span className="text-[11px] font-medium">{opt.name}</span>
                                  </div>
                                  <span className="text-[10px] font-mono text-mint font-bold">
                                    {opt.price > 0 ? `+${formatPrice(opt.price)}` : 'Gratuit'}
                                  </span>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* Add to selection action button */}
                      <button
                        onClick={handleAddToCart}
                        className="w-full py-2.5 bg-gradient-to-r from-mint to-emerald-accent text-slate-950 hover:from-emerald-accent hover:to-mint rounded-xl text-xs font-extrabold transition flex items-center justify-center gap-1.5"
                      >
                        Ajouter au panier • {formatPrice(selectedItem.price + extraPrice)}
                      </button>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Shopping Cart Drawer */}
              <AnimatePresence>
                {isCartOpen && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-black/80 z-50 flex items-end justify-center"
                  >
                    <motion.div 
                      initial={{ y: '100%' }}
                      animate={{ y: 0 }}
                      exit={{ y: '100%' }}
                      transition={{ type: 'spring', damping: 25, stiffness: 220 }}
                      className="w-full bg-slate-900 rounded-t-3xl border-t border-slate-800 max-h-[85%] overflow-y-auto p-4 flex flex-col"
                    >
                      <div className="flex justify-between items-center mb-4 pb-2 border-b border-slate-800">
                        <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                          <ShoppingCart className="w-4 h-4 text-mint" /> Votre commande
                        </h4>
                        <button 
                          onClick={() => setIsCartOpen(false)}
                          className="p-1 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 transition"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* List items inside cart */}
                      <div className="space-y-3 flex-1 overflow-y-auto mb-6 max-h-[250px] pr-1">
                        {cart.map(cartItem => (
                          <div key={cartItem.id} className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between gap-2">
                            <div className="min-w-0 flex-1">
                              <h5 className="text-[11px] font-bold text-white truncate">{cartItem.item.name}</h5>
                              <p className="text-[10px] text-mint font-mono font-semibold">{formatPrice(cartItem.totalPrice / cartItem.quantity)} l'unité</p>
                              {cartItem.selectedOptions.length > 0 && (
                                <div className="mt-1 flex flex-col gap-0.5 pl-1.5 border-l border-slate-800">
                                  {cartItem.selectedOptions.map(opt => (
                                    <span key={opt} className="text-[8px] text-slate-400 flex items-center gap-1">
                                      <CornerDownRight className="w-2 h-2 text-slate-500" /> {opt}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>
                            
                            {/* Quantity buttons */}
                            <div className="flex items-center gap-2">
                              <button 
                                onClick={() => handleQuantityChange(cartItem.id, -1)}
                                className="p-1 rounded bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-300"
                              >
                                <Minus className="w-2.5 h-2.5" />
                              </button>
                              <span className="text-[11px] font-mono font-bold text-white min-w-[12px] text-center">
                                {cartItem.quantity}
                              </span>
                              <button 
                                onClick={() => handleQuantityChange(cartItem.id, 1)}
                                className="p-1 rounded bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-300"
                              >
                                <Plus className="w-2.5 h-2.5" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Total and Checkout */}
                      <div className="space-y-3 pt-3 border-t border-slate-800">
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-400">Sous-total</span>
                          <span className="font-mono text-white">{formatPrice(cartTotal)}</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-400">Frais de service (Table {tableNumber})</span>
                          <span className="font-mono text-emerald-accent font-semibold">Gratuit</span>
                        </div>
                        <div className="flex justify-between text-sm font-bold pt-2 border-t border-slate-800 border-dashed">
                          <span className="text-white">Total</span>
                          <span className="font-mono text-mint font-bold">{formatPrice(cartTotal)}</span>
                        </div>

                        <button
                          onClick={triggerOrder}
                          className="w-full mt-2 py-3 bg-gradient-to-r from-mint to-emerald-accent hover:from-emerald-accent hover:to-mint text-slate-950 rounded-xl text-xs font-extrabold transition flex items-center justify-center gap-1.5 shadow-lg shadow-mint/5"
                        >
                          Valider la Commande de Table
                        </button>
                      </div>
                    </motion.div>
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
