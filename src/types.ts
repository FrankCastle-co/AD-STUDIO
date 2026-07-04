export interface MenuItem {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: 'pizzas' | 'cafes' | 'desserts' | 'boissons';
  tags?: string[];
  options?: {
    name: string;
    price: number;
  }[];
}

export interface CartItem {
  id: string; // unique cart line ID
  item: MenuItem;
  quantity: number;
  selectedOptions: string[];
  totalPrice: number;
}

export interface MenuTemplate {
  id: string;
  name: string;
  type: 'Pizzeria' | 'Cafétéria' | 'Restaurant';
  tagline: string;
  primaryColor: string;
  secondaryColor: string;
  image: string;
  rating: number;
  features: string[];
}

export interface ContactInquiry {
  name: string;
  restaurantName: string;
  email: string;
  phone: string;
  type: 'Pizzeria' | 'Cafétéria' | 'Restaurant' | 'Autre';
  needs: string[];
  message: string;
}

export interface SavedOrder {
  id: string;
  tableNumber: number;
  items: {
    name: string;
    quantity: number;
    options: string[];
    price: number;
  }[];
  totalPrice: number;
  currency?: 'DA' | 'EUR';
  createdAt: string;
}

export interface SavedRequest {
  id: string;
  name: string;
  restaurantName: string;
  email: string;
  phone: string;
  type: string;
  needs: string[];
  message: string;
  createdAt: string;
}

