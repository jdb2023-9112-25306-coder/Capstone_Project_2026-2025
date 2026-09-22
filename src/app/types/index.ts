export interface User {
  id: string;
  email: string;
  name: string;
  phone: string;
  address: string;
  barangay?: string;
  landmark?: string;
  borrowedBottles?: number;
  role: 'customer' | 'admin' | 'rider';
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  inStock: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  userId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  deliveryAddress: string;
  barangay?: string;
  landmark?: string;
  deliveryNotes?: string;
  orderType: 'delivery' | 'pickup';
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  status: 'pending' | 'confirmed' | 'preparing' | 'out-for-delivery' | 'delivered' | 'cancelled';
  paymentMethod: string;
  emptiesReturned?: number;
  assignedRider?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Sale {
  id: string;
  orderId: string;
  amount: number;
  date: string;
  customerName: string;
}