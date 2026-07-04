import { MenuItem, MenuTemplate } from '../types';

export const SIMULATOR_MENU_ITEMS: MenuItem[] = [
  {
    id: 'pizza-regina',
    name: 'Regina d\'Italia',
    price: 12.50,
    description: 'Sauce tomate San Marzano, mozzarella di bufala, basilic frais, huile d\'olive extra vierge, parmesan râpé.',
    image: '🍕',
    category: 'pizzas',
    tags: ['Best-Seller', 'Classique'],
    options: [
      { name: 'Double Fromage', price: 2.00 },
      { name: 'Supplément Jambon de Parme', price: 3.00 },
      { name: 'Huile piquante artisanale', price: 0.00 }
    ]
  },
  {
    id: 'pizza-truffe',
    name: 'La Truffe Noire',
    price: 17.90,
    description: 'Crème fraîche de Normandie, mozzarella fior di latte, brisures de truffe noire d\'été, roquette fraîche, copeaux de parmigiano reggiano.',
    image: '🍄',
    category: 'pizzas',
    tags: ['Premium', 'Signature'],
    options: [
      { name: 'Moins salé', price: 0.00 },
      { name: 'Huile parfumée à la truffe', price: 1.50 }
    ]
  },
  {
    id: 'pizza-piccante',
    name: 'Diavola Calabrese',
    price: 13.90,
    description: 'Sauce tomate, mozzarella fior di latte, salami piquant de Calabre, n\'duja artisanale, olives noires de Kalamata, origan.',
    image: '🌶️',
    category: 'pizzas',
    tags: ['Piquant'],
    options: [
      { name: 'Double piquant', price: 0.00 },
      { name: 'Supplément Gorgonzola DOP', price: 2.00 }
    ]
  },
  {
    id: 'cafe-pistachio',
    name: 'Pistachio Latte Macchiato',
    price: 5.50,
    description: 'Double shot d\'expresso pur arabica, lait velouté cuit à la vapeur, crème de pistache de Sicile de Bronte, brisures de pistaches torréfiées.',
    image: '☕',
    category: 'cafes',
    tags: ['Tendance', 'Gourmand'],
    options: [
      { name: 'Lait d\'avoine bio', price: 0.60 },
      { name: 'Sirop de vanille de Madagascar', price: 0.50 }
    ]
  },
  {
    id: 'cafe-espresso',
    name: 'Ristretto Intense',
    price: 2.20,
    description: 'Un expresso court et corsé aux notes de cacao amer et de noisettes grillées. Sélection Grand Cru.',
    image: '🍵',
    category: 'cafes',
    tags: ['Classique'],
    options: [
      { name: 'Sucre de canne', price: 0.00 },
      { name: 'Décaféiné', price: 0.20 }
    ]
  },
  {
    id: 'dessert-tiramisu',
    name: 'Tiramisù della Nonna',
    price: 6.80,
    description: 'Mascarpone crémeux battu, biscuits cuillère imbibés d\'expresso fort et d\'Amaretto Disaronno, saupoudré de cacao amer.',
    image: '🍰',
    category: 'desserts',
    tags: ['Fait Maison', 'Incontournable'],
    options: [
      { name: 'Format XXL', price: 2.50 }
    ]
  },
  {
    id: 'dessert-calzone-sweet',
    name: 'Calzone Dolce Nutella',
    price: 8.50,
    description: 'Pâte à pizza moelleuse soufflée au four à bois, fourrée généreusement au Nutella fondant et éclats de noisettes sauvages.',
    image: '🥐',
    category: 'desserts',
    tags: ['Gourmandise'],
    options: [
      { name: 'Boule de glace vanille', price: 1.80 }
    ]
  },
  {
    id: 'boisson-limonata',
    name: 'Limonata di Sorrento',
    price: 4.20,
    description: 'Limonade artisanale italienne à base de citrons de Sorrente pressés, sucre de canne et eau pétillante fraîche.',
    image: '🍹',
    category: 'boissons',
    tags: ['Rafraîchissant', 'Bio'],
    options: [
      { name: 'Feuilles de menthe fraîche', price: 0.00 },
      { name: 'Tranches de gingembre', price: 0.50 }
    ]
  }
];

export const TEMPLATES_DATA: MenuTemplate[] = [
  {
    id: 'temp-pizzeria',
    name: 'Bella Italia',
    type: 'Pizzeria',
    tagline: 'Authentique, chaleureux & visuellement irrésistible',
    primaryColor: '#e11d48', // rose-600 (Cherry/Tomato Red)
    secondaryColor: '#15803d', // green-700
    image: '🍕',
    rating: 4.9,
    features: [
      'Photos haute résolution des pizzas',
      'Filtres d\'ingrédients (sans porc, végétarien, piquant)',
      'Personnalisation complète des pizzas (suppléments fromages, viandes)',
      'Traduction automatique instantanée en 5 langues'
    ]
  },
  {
    id: 'temp-cafe',
    name: 'Mona Lisa Café',
    type: 'Cafétéria',
    tagline: 'Minimaliste, cosy & optimisé pour le click-and-collect',
    primaryColor: '#b45309', // amber-700 (Coffee/Gold)
    secondaryColor: '#78350f', // amber-900
    image: '☕',
    rating: 4.8,
    features: [
      'Menu épuré style ardoise bistrot',
      'Choix des types de lait et arômes en un clic',
      'Badge "Fait Maison" et "Origine locale" mis en avant',
      'Intégration rapide d\'Instagram pour attirer les clients locaux'
    ]
  },
  {
    id: 'temp-restaurant',
    name: 'L\'Épicurien',
    type: 'Restaurant',
    tagline: 'Élégant, haut de gamme & immersif',
    primaryColor: '#0f172a', // slate-900 (Luxury Dark)
    secondaryColor: '#ca8a04', // yellow-600 (Champagne Gold)
    image: '🍽️',
    rating: 5.0,
    features: [
      'Accords mets-vins suggérés pour chaque plat',
      'Affichage des allergènes conforme à la réglementation',
      'Module de réservation de table intégré directement au menu',
      'Effet de parallaxe et vidéos immersives de la cuisine'
    ]
  }
];

export const CORE_SERVICES = [
  {
    id: 'serv-menu',
    title: 'Menus Digitaux QR Code Interactifs',
    description: 'Un menu dynamique qui fait saliver vos clients. Modifiez vos prix, plats et allergènes en temps réel sans jamais réimprimer.',
    benefits: ['+25% de panier moyen grâce à l\'upselling intelligent', 'Zéro coût d\'impression de cartes papier', 'Traduction multilingue pour les touristes', 'Mise en avant automatique des plats rentables'],
    icon: 'QrCode'
  },
  {
    id: 'serv-web',
    title: 'Sites Web Vitrines & Commande en ligne',
    description: 'Un site internet sur-mesure ultra-rapide optimisé pour transformer les visiteurs de Google en clients réguliers.',
    benefits: ['Click & Collect et livraison sans commission', 'Intégration d\'outils de fidélité et de newsletters', 'Parfaitement responsive sur iPhone et Android', 'Réservation de tables en direct sans intermédiaire'],
    icon: 'Globe'
  },
  {
    id: 'serv-seo',
    title: 'SEO Local & Optimisation Google Maps',
    description: 'Faites remonter votre établissement en tête de liste lorsque quelqu\'un recherche "Pizzeria à proximité".',
    benefits: ['Gestion active des avis clients', 'Fiche Google Business Profile configurée à 100%', 'Apparition garantie dans le "Local Pack" Maps', 'Acquisition de clients locaux au quotidien'],
    icon: 'MapPin'
  }
];

export const TESTIMONIALS = [
  {
    id: 'test-1',
    name: 'Mathieu L.',
    role: 'Gérant de la Pizzeria "Bella Napoli"',
    quote: 'Depuis la mise en place du menu QR Code et du nouveau site, notre panier moyen est passé de 14.50€ à 18.20€. Les clients adorent ajouter des suppléments en option sur leurs pizzas. Un investissement rentabilisé en seulement 3 semaines !',
    rating: 5,
    city: 'Nice, France'
  },
  {
    id: 'test-2',
    name: 'Sofia B.',
    role: 'Propriétaire du "Green Café & Bakery"',
    quote: 'Le site de commande en ligne Click & Collect me permet de gagner 1h30 de prise de commande par téléphone chaque midi. Et mon menu est mis à jour instantanément selon nos stocks réels. C\'est magique !',
    rating: 5,
    city: 'Lyon, France'
  },
  {
    id: 'test-3',
    name: 'Jean-Marc D.',
    role: 'Chef étoilé et Propriétaire de "L\'Ardoise Gastronomique"',
    quote: 'Un site web à l\'image de notre cuisine : raffiné, rapide et d\'une fluidité incroyable. Nos réservations en ligne ont augmenté de 40% dès le premier mois d\'activité.',
    rating: 5,
    city: 'Paris, France'
  }
];
