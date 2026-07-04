import { useState, useEffect, FormEvent } from 'react';
import { motion } from 'motion/react';
import { 
  Lock, ArrowLeft, RefreshCw, Trash2, CheckCircle, Clock, 
  Search, Calendar, ShoppingBag, Mail, Phone, Store, Clipboard, 
  TrendingUp, Table, Check, Eye, EyeOff, ShieldCheck
} from 'lucide-react';
import { SavedOrder, SavedRequest } from '../types';

interface AdminDashboardProps {
  onClose: () => void;
}

export default function AdminDashboard({ onClose }: AdminDashboardProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'orders' | 'requests'>('orders');
  
  const [orders, setOrders] = useState<SavedOrder[]>([]);
  const [requests, setRequests] = useState<SavedRequest[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [processedItems, setProcessedItems] = useState<Record<string, boolean>>({});

  // Check existing session on mount
  useEffect(() => {
    const session = sessionStorage.getItem('ad_studio_admin_session');
    if (session === 'true') {
      setIsAuthenticated(true);
    }
    loadData();
  }, []);

  const loadData = () => {
    try {
      const savedOrdersStr = localStorage.getItem('ad_studio_orders');
      const savedRequestsStr = localStorage.getItem('ad_studio_requests');

      let loadedOrders = savedOrdersStr ? JSON.parse(savedOrdersStr) : [];
      let loadedRequests = savedRequestsStr ? JSON.parse(savedRequestsStr) : [];

      // Pre-seed mock data if empty for demonstrative purposes
      if (loadedOrders.length === 0) {
        loadedOrders = [
          {
            id: 'demo-order-1',
            tableNumber: 12,
            items: [
              { name: 'Pizza Regina', quantity: 2, options: ['Taille XL', 'Supplément Mozzarella di Bufala'], price: 34.00 },
              { name: 'Café Espresso', quantity: 2, options: [], price: 4.40 }
            ],
            totalPrice: 38.40,
            createdAt: new Date(Date.now() - 3600000 * 2).toISOString() // 2 hours ago
          },
          {
            id: 'demo-order-2',
            tableNumber: 4,
            items: [
              { name: 'Pizza Tartufo', quantity: 1, options: [], price: 19.50 },
              { name: 'Tiramisu Maison', quantity: 1, options: ['Sauce Caramel Salé'], price: 8.50 },
              { name: 'Soda Bio Cola', quantity: 1, options: [], price: 4.50 }
            ],
            totalPrice: 32.50,
            createdAt: new Date(Date.now() - 3600000 * 5).toISOString() // 5 hours ago
          }
        ];
        localStorage.setItem('ad_studio_orders', JSON.stringify(loadedOrders));
      }

      if (loadedRequests.length === 0) {
        loadedRequests = [
          {
            id: 'demo-req-1',
            name: 'Luigi Rossi',
            restaurantName: 'Bella Napoli',
            email: 'contact@bellanapoli.fr',
            phone: '06 12 34 56 78',
            type: 'Pizzeria',
            needs: ['Site Internet Vitrine', 'Menu Digital QR Code (Table)'],
            message: 'Bonjour, nous souhaitons moderniser nos menus papier. Notre restaurant dispose d\'une cinquantaine de places assises.',
            createdAt: new Date(Date.now() - 3600000 * 24).toISOString() // 1 day ago
          },
          {
            id: 'demo-req-2',
            name: 'Sarah Martin',
            restaurantName: 'Le Petit Café',
            email: 'smartin@lepetitcafe.com',
            phone: '07 98 76 54 32',
            type: 'Cafétéria',
            needs: ['Menu Digital QR Code (Table)', 'Optimisation SEO Google Maps'],
            message: 'Intéressée par vos offres de menus QR codes et pour améliorer notre référencement local sur Google Maps.',
            createdAt: new Date(Date.now() - 3600000 * 48).toISOString() // 2 days ago
          }
        ];
        localStorage.setItem('ad_studio_requests', JSON.stringify(loadedRequests));
      }

      setOrders(loadedOrders);
      setRequests(loadedRequests);

      // Load processed statuses from localStorage
      const processed = localStorage.getItem('ad_studio_processed_items');
      if (processed) {
        setProcessedItems(JSON.parse(processed));
      }
    } catch (e) {
      console.error('Error loading admin data:', e);
    }
  };

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    if (password === 'adamsim@2003') {
      setIsAuthenticated(true);
      setAuthError('');
      sessionStorage.setItem('ad_studio_admin_session', 'true');
    } else {
      setAuthError('Mot de passe incorrect. Veuillez réessayer.');
    }
  };

  const toggleProcessed = (id: string) => {
    const updated = { ...processedItems, [id]: !processedItems[id] };
    setProcessedItems(updated);
    localStorage.setItem('ad_studio_processed_items', JSON.stringify(updated));
  };

  const handleDeleteOrder = (id: string) => {
    if (window.confirm('Voulez-vous vraiment supprimer cette commande ?')) {
      const updated = orders.filter(o => o.id !== id);
      setOrders(updated);
      localStorage.setItem('ad_studio_orders', JSON.stringify(updated));
    }
  };

  const handleDeleteRequest = (id: string) => {
    if (window.confirm('Voulez-vous vraiment supprimer cette demande ?')) {
      const updated = requests.filter(r => r.id !== id);
      setRequests(updated);
      localStorage.setItem('ad_studio_requests', JSON.stringify(updated));
    }
  };

  const handleClearAll = () => {
    if (window.confirm('Êtes-vous sûr de vouloir réinitialiser toutes les données ? Les données d\'exemples seront re-générées.')) {
      localStorage.removeItem('ad_studio_orders');
      localStorage.removeItem('ad_studio_requests');
      localStorage.removeItem('ad_studio_processed_items');
      setProcessedItems({});
      loadData();
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('ad_studio_admin_session');
    setIsAuthenticated(false);
    setPassword('');
  };

  // Filters
  const filteredOrders = orders.filter(order => 
    order.tableNumber.toString().includes(searchQuery) ||
    order.items.some(i => i.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
    order.totalPrice.toString().includes(searchQuery)
  );

  const filteredRequests = requests.filter(req => 
    req.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    req.restaurantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    req.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    req.phone.includes(searchQuery) ||
    req.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Statistics & Currency Helpers
  const formatOrderPrice = (priceInEur: number, orderCurrency?: 'DA' | 'EUR') => {
    if (orderCurrency === 'DA') {
      return `${Math.round(priceInEur * 200).toLocaleString('fr-FR')} DA`;
    }
    return `${priceInEur.toFixed(2)} €`;
  };

  const totalRevenueSimulated = orders.reduce((sum, o) => sum + o.totalPrice, 0);
  const pendingRequestsCount = requests.filter(r => !processedItems[r.id]).length;
  const activeTablesCount = new Set(orders.map(o => o.tableNumber)).size;

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#060913] flex items-center justify-center px-4 relative overflow-hidden">
        {/* Decorative ambient blobs */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-mint/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-md w-full bg-slate-900/60 border border-slate-800 backdrop-blur-xl rounded-3xl p-8 shadow-2xl relative z-10">
          <button 
            onClick={onClose}
            className="absolute top-6 left-6 text-slate-400 hover:text-white flex items-center gap-1.5 text-xs font-semibold bg-slate-950/40 px-3 py-1.5 rounded-xl border border-slate-800/80 transition cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Client
          </button>

          <div className="text-center mt-6 mb-8">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-mint to-emerald-accent flex items-center justify-center text-slate-950 mx-auto mb-4 shadow-lg shadow-mint/10">
              <Lock className="w-6 h-6 stroke-[2.5]" />
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight uppercase">AD STUDIO ADMIN</h2>
            <p className="text-slate-400 text-xs mt-1.5">
              Accès protégé pour l'administration des commandes et demandes de devis.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <label className="text-slate-300 text-xs font-semibold uppercase tracking-wider block">
                Mot de Passe de Connexion
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Entrez le mot de passe admin"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-mint focus:ring-1 focus:ring-mint transition"
                  required
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {authError && (
              <p className="text-xs text-rose-400 bg-rose-500/10 border border-rose-500/20 p-2.5 rounded-lg font-mono text-center">
                {authError}
              </p>
            )}

            <button
              type="submit"
              className="w-full py-3.5 bg-mint hover:bg-emerald-accent text-slate-950 text-sm font-extrabold rounded-xl transition flex items-center justify-center gap-2 shadow-lg shadow-mint/10 cursor-pointer"
            >
              Se Connecter <ShieldCheck className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#060913] text-slate-100 flex flex-col font-sans">
      {/* Admin Header */}
      <header className="border-b border-slate-900 bg-slate-950/80 backdrop-blur-md sticky top-0 z-30 px-4 py-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-mint to-emerald-accent flex items-center justify-center text-slate-950 font-black shadow-md">
              <Store className="w-5.5 h-5.5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-extrabold text-white tracking-tight">AD STUDIO</h1>
                <span className="px-2 py-0.5 rounded bg-mint/10 text-mint text-[9px] font-mono font-bold border border-mint/20 uppercase tracking-wider">
                  ADMINISTRATEUR
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Suivi en temps réel des démos clients et des fiches contacts de devis.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={loadData}
              className="p-2.5 bg-slate-900 hover:bg-slate-850 text-slate-400 hover:text-white rounded-xl border border-slate-800 transition cursor-pointer"
              title="Actualiser les données"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <button
              onClick={handleClearAll}
              className="px-3.5 py-2.5 bg-slate-950 hover:bg-rose-500/15 text-slate-400 hover:text-rose-400 rounded-xl border border-slate-800 hover:border-rose-500/30 text-xs font-semibold transition cursor-pointer flex items-center gap-2"
              title="Tout effacer"
            >
              <Trash2 className="w-3.5 h-3.5" /> Réinitialiser
            </button>
            <button
              onClick={handleLogout}
              className="px-3.5 py-2.5 bg-slate-900 hover:bg-slate-850 text-slate-300 hover:text-white rounded-xl border border-slate-800 text-xs font-semibold transition cursor-pointer"
            >
              Déconnexion
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2.5 bg-mint hover:bg-emerald-accent text-slate-950 text-xs font-extrabold rounded-xl transition cursor-pointer flex items-center gap-1.5 shadow-md shadow-mint/5"
            >
              <ArrowLeft className="w-3.5 h-3.5 stroke-[2.5]" /> Retour Site
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Dashboard */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Key Metrics Widgets */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-mint/5 rounded-full blur-2xl pointer-events-none" />
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 rounded-xl bg-mint/10 border border-mint/20 flex items-center justify-center text-mint">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono font-bold text-mint bg-mint/5 px-2 py-0.5 rounded border border-mint/10">
                Simulations Commandes
              </span>
            </div>
            <h4 className="text-slate-400 text-xs font-mono uppercase tracking-wider">Commandes Simulées</h4>
            <div className="flex items-baseline gap-2 mt-1.5">
              <span className="text-2xl font-extrabold text-white">{orders.length}</span>
              <span className="text-xs text-slate-500 font-medium">reçues en démo</span>
            </div>
            <div className="flex items-center gap-1 mt-2 text-[11px] font-mono text-emerald-accent">
              <TrendingUp className="w-3.5 h-3.5" /> 
              <span>Panier estimé cumulé : {totalRevenueSimulated.toFixed(2)} € / {(totalRevenueSimulated * 200).toLocaleString('fr-FR')} DA</span>
            </div>
          </div>

          <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-accent/5 rounded-full blur-2xl pointer-events-none" />
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-accent/10 border border-emerald-accent/20 flex items-center justify-center text-emerald-accent">
                <Mail className="w-5 h-5" />
              </div>
              {pendingRequestsCount > 0 ? (
                <span className="text-[10px] font-mono font-bold text-amber-400 bg-amber-400/5 px-2 py-0.5 rounded border border-amber-400/20 animate-pulse">
                  {pendingRequestsCount} Nouvelles
                </span>
              ) : (
                <span className="text-[10px] font-mono font-bold text-slate-400 bg-slate-950/40 px-2 py-0.5 rounded border border-slate-800">
                  À jour
                </span>
              )}
            </div>
            <h4 className="text-slate-400 text-xs font-mono uppercase tracking-wider">Demandes de Devis</h4>
            <div className="flex items-baseline gap-2 mt-1.5">
              <span className="text-2xl font-extrabold text-white">{requests.length}</span>
              <span className="text-xs text-slate-500 font-medium">formulations</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-2 font-mono">
              Dont {pendingRequestsCount} demandes en attente de traitement.
            </p>
          </div>

          <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-full blur-2xl pointer-events-none" />
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                <Table className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono font-bold text-blue-400 bg-blue-500/5 px-2 py-0.5 rounded border border-blue-500/10">
                Activité Simulator
              </span>
            </div>
            <h4 className="text-slate-400 text-xs font-mono uppercase tracking-wider">Tables Utilisées</h4>
            <div className="flex items-baseline gap-2 mt-1.5">
              <span className="text-2xl font-extrabold text-white">{activeTablesCount}</span>
              <span className="text-xs text-slate-500 font-medium">tables distinctes</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-2 font-mono">
              Montre l'engagement des utilisateurs sur la démo QR.
            </p>
          </div>
        </div>

        {/* Search, Tabs, and Filter Layout */}
        <div className="bg-slate-900/20 border border-slate-800/80 rounded-3xl p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-800/80 pb-6">
            <div className="flex border border-slate-800 bg-slate-950 p-1 rounded-xl w-fit">
              <button
                onClick={() => { setActiveTab('orders'); setSearchQuery(''); }}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
                  activeTab === 'orders' 
                    ? 'bg-mint text-slate-950 shadow-md' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <ShoppingBag className="w-3.5 h-3.5" /> Commandes Simulées ({orders.length})
              </button>
              <button
                onClick={() => { setActiveTab('requests'); setSearchQuery(''); }}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
                  activeTab === 'requests' 
                    ? 'bg-mint text-slate-950 shadow-md' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Mail className="w-3.5 h-3.5" /> Demandes de Devis ({requests.length})
              </button>
            </div>

            <div className="relative max-w-xs w-full">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
                <Search className="w-4 h-4" />
              </span>
              <input
                type="text"
                placeholder={activeTab === 'orders' ? "Filtrer par table, article, total..." : "Filtrer par nom, restaurant, type..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-mint focus:ring-1 focus:ring-mint transition"
              />
            </div>
          </div>

          {/* Active Tab View */}
          {activeTab === 'orders' ? (
            <div className="space-y-4">
              {filteredOrders.length === 0 ? (
                <div className="text-center py-12 text-slate-500">
                  <ShoppingBag className="w-8 h-8 mx-auto mb-3 text-slate-600 stroke-[1.5]" />
                  <p className="text-sm">Aucune commande ne correspond à votre recherche.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4">
                  {filteredOrders.map((order) => {
                    const isProcessed = processedItems[order.id] || false;
                    const isDemo = order.id.startsWith('demo-');
                    return (
                      <div 
                        key={order.id} 
                        className={`bg-slate-950/60 border rounded-2xl p-5 hover:border-slate-700 transition relative overflow-hidden flex flex-col justify-between ${
                          isProcessed ? 'border-emerald-accent/20 bg-emerald-accent/5' : 'border-slate-800'
                        }`}
                      >
                        {isDemo && (
                          <div className="absolute top-0 right-0 bg-blue-500/10 text-blue-400 border-l border-b border-blue-500/20 text-[8px] font-mono font-bold px-2 py-0.5 rounded-bl uppercase">
                            EXEMPLE
                          </div>
                        )}
                        <div>
                          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-850 pb-3 mb-3">
                            <div className="flex items-center gap-2.5">
                              <span className="px-2.5 py-1 rounded-xl bg-mint/10 text-mint text-xs font-mono font-bold border border-mint/20 flex items-center gap-1.5">
                                <Table className="w-3.5 h-3.5" /> Table {order.tableNumber}
                              </span>
                              <span className="text-[11px] text-slate-500 font-mono flex items-center gap-1">
                                <Calendar className="w-3 h-3" /> {new Date(order.createdAt).toLocaleString('fr-FR', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit' })}
                              </span>
                            </div>
                            
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => toggleProcessed(order.id)}
                                className={`px-2.5 py-1.5 rounded-lg text-[10px] font-bold border font-mono transition flex items-center gap-1 cursor-pointer ${
                                  isProcessed 
                                    ? 'bg-emerald-accent/20 border-emerald-accent/40 text-emerald-accent' 
                                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-white'
                                }`}
                              >
                                {isProcessed ? (
                                  <>
                                    <CheckCircle className="w-3.5 h-3.5" /> Servie
                                  </>
                                ) : (
                                  <>
                                    <Clock className="w-3.5 h-3.5" /> En cours
                                  </>
                                )}
                              </button>
                              <button
                                onClick={() => handleDeleteOrder(order.id)}
                                className="p-1.5 bg-slate-900 hover:bg-rose-500/15 border border-slate-800 hover:border-rose-500/30 text-slate-400 hover:text-rose-400 rounded-lg transition cursor-pointer"
                                title="Supprimer"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>

                          {/* Order Items Table */}
                          <div className="space-y-2 mb-4">
                            {order.items.map((item, idx) => (
                              <div key={idx} className="flex justify-between text-xs py-1.5 px-3 bg-slate-900/30 rounded-lg border border-slate-850/40">
                                <div>
                                  <span className="font-bold text-white font-mono bg-slate-950 px-1.5 py-0.5 rounded border border-slate-850 mr-2">
                                    {item.quantity}x
                                  </span>
                                  <span className="text-slate-200 font-medium">{item.name}</span>
                                  {item.options.length > 0 && (
                                    <div className="flex flex-wrap gap-1.5 mt-1 pl-6">
                                      {item.options.map((opt, oIdx) => (
                                        <span key={oIdx} className="text-[9px] font-mono text-slate-500 bg-slate-950 px-1.5 py-0.5 rounded">
                                          + {opt}
                                        </span>
                                      ))}
                                    </div>
                                  )}
                                </div>
                                <span className="text-slate-300 font-mono font-semibold">{formatOrderPrice(item.price, order.currency)}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="flex justify-between items-center pt-3 border-t border-slate-850 mt-1">
                          <span className="text-[10px] text-slate-500 font-mono">
                            ID: {order.id} 
                            {order.currency && (
                              <span className="ml-1.5 px-1.5 py-0.5 rounded bg-mint/10 text-mint text-[8px] font-mono font-bold border border-mint/10">
                                {order.currency}
                              </span>
                            )}
                          </span>
                          <span className="text-sm font-extrabold text-white font-mono bg-mint/10 border border-mint/20 px-3 py-1 rounded-xl">
                            TOTAL : <span className="text-mint">{formatOrderPrice(order.totalPrice, order.currency)}</span>
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredRequests.length === 0 ? (
                <div className="text-center py-12 text-slate-500">
                  <Mail className="w-8 h-8 mx-auto mb-3 text-slate-600 stroke-[1.5]" />
                  <p className="text-sm">Aucune demande de devis ne correspond à votre recherche.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-5">
                  {filteredRequests.map((req) => {
                    const isProcessed = processedItems[req.id] || false;
                    const isDemo = req.id.startsWith('demo-');
                    return (
                      <div 
                        key={req.id} 
                        className={`bg-slate-950/60 border rounded-2xl p-6 hover:border-slate-700 transition relative overflow-hidden ${
                          isProcessed ? 'border-emerald-accent/20 bg-emerald-accent/5' : 'border-slate-800'
                        }`}
                      >
                        {isDemo && (
                          <div className="absolute top-0 right-0 bg-blue-500/10 text-blue-400 border-l border-b border-blue-500/20 text-[8px] font-mono font-bold px-2 py-0.5 rounded-bl uppercase">
                            EXEMPLE
                          </div>
                        )}
                        
                        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-850 pb-4 mb-4">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="px-2 py-0.5 text-[10px] font-mono font-bold uppercase rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                                {req.type}
                              </span>
                              <h3 className="text-base font-extrabold text-white flex items-center gap-1.5">
                                <Store className="w-4 h-4 text-slate-400" /> {req.restaurantName}
                              </h3>
                            </div>
                            <p className="text-xs text-slate-400 font-medium">
                              Gérant : <span className="text-white">{req.name}</span>
                            </p>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => toggleProcessed(req.id)}
                              className={`px-3 py-1.5 rounded-lg text-[10px] font-bold border font-mono transition flex items-center gap-1.5 cursor-pointer ${
                                isProcessed 
                                  ? 'bg-emerald-accent/20 border-emerald-accent/40 text-emerald-accent' 
                                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-white'
                              }`}
                            >
                              {isProcessed ? (
                                <>
                                  <CheckCircle className="w-3.5 h-3.5" /> Traitée
                                </>
                              ) : (
                                <>
                                  <Clock className="w-3.5 h-3.5" /> Nouvelle
                                </>
                              )}
                            </button>
                            <button
                              onClick={() => handleDeleteRequest(req.id)}
                              className="p-2 bg-slate-900 hover:bg-rose-500/15 border border-slate-800 hover:border-rose-500/30 text-slate-400 hover:text-rose-400 rounded-lg transition cursor-pointer"
                              title="Supprimer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        {/* Request Core Specs */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 text-xs font-mono">
                          <div className="space-y-2 p-3 bg-slate-900/30 border border-slate-850 rounded-xl">
                            <div className="flex items-center gap-2 text-slate-400">
                              <Mail className="w-3.5 h-3.5 text-mint" /> 
                              <a href={`mailto:${req.email}`} className="text-white hover:underline truncate">
                                {req.email}
                              </a>
                            </div>
                            <div className="flex items-center gap-2 text-slate-400">
                              <Phone className="w-3.5 h-3.5 text-mint" /> 
                              <a href={`tel:${req.phone}`} className="text-white hover:underline">
                                {req.phone}
                              </a>
                            </div>
                            <div className="flex items-center gap-2 text-slate-400">
                              <Calendar className="w-3.5 h-3.5 text-mint" />
                              <span className="text-slate-300">
                                {new Date(req.createdAt).toLocaleString('fr-FR')}
                              </span>
                            </div>
                          </div>

                          <div className="p-3 bg-slate-900/30 border border-slate-850 rounded-xl space-y-1.5">
                            <h4 className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Besoins Exprimés</h4>
                            <div className="flex flex-wrap gap-1">
                              {req.needs.length > 0 ? (
                                req.needs.map((need, idx) => (
                                  <span key={idx} className="px-2 py-0.5 rounded bg-slate-950 border border-slate-850 text-[9px] text-emerald-accent font-semibold flex items-center gap-1">
                                    <Check className="w-2.5 h-2.5 stroke-[3]" /> {need}
                                  </span>
                                ))
                              ) : (
                                <span className="text-slate-600 italic">Aucun besoin coché</span>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Client Message */}
                        {req.message && (
                          <div className="p-4 bg-slate-950/80 border border-slate-850 rounded-xl">
                            <h4 className="text-[10px] text-slate-500 font-mono uppercase tracking-wider mb-1.5 font-bold flex items-center gap-1">
                              <Clipboard className="w-3 h-3" /> Message du Client
                            </h4>
                            <p className="text-slate-300 text-xs leading-relaxed italic">
                              "{req.message}"
                            </p>
                          </div>
                        )}

                        <div className="mt-3 flex justify-between items-center text-[10px] text-slate-500 font-mono">
                          <span>ID: {req.id}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      {/* Admin Footer */}
      <footer className="py-6 border-t border-slate-900 bg-slate-950/50 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center text-[10px] text-slate-600 font-mono">
          AD STUDIO PRIVATE BACKOFFICE V1.0 • TOUTES LES TRANSMISSIONS SONT STOCKÉES EN LOCAL DE FAÇON SÉCURISÉE.
        </div>
      </footer>
    </div>
  );
}
