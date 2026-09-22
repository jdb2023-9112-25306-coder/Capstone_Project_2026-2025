import React, { createContext, useContext, useState, useEffect } from 'react';
import { Order, CartItem } from '../types';

interface OrderContextType {
  orders: Order[];
  createOrder: (orderData: {
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
    paymentMethod: string;
  }) => Order;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  assignRider: (orderId: string, riderId: string) => void;
  updateEmptiesReturned: (orderId: string, emptiesReturned: number) => void;
  getOrderById: (orderId: string) => Order | undefined;
  getUserOrders: (userId: string) => Order[];
  getAllOrders: () => Order[];
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

// Mock initial orders
const INITIAL_ORDERS: Order[] = [
  {
    id: 'ORD-001',
    userId: 'user-1',
    customerName: 'John Doe',
    customerEmail: 'customer@example.com',
    customerPhone: '+1234567891',
    deliveryAddress: '456 Customer Ave',
    barangay: 'Barangay Poblacion',
    landmark: 'Near 7-Eleven',
    orderType: 'delivery',
    items: [
      {
        product: {
          id: '1',
          name: '5-Gallon Purified Water',
          description: 'Premium purified drinking water',
          price: 25,
          image: 'https://images.unsplash.com/photo-1727233431893-e38a524d7f4b?w=400',
          category: 'Refill',
          inStock: true,
        },
        quantity: 2,
      },
    ],
    subtotal: 50,
    deliveryFee: 50,
    total: 100,
    status: 'delivered',
    paymentMethod: 'Cash on Delivery',
    emptiesReturned: 2,
    assignedRider: 'Rider Juan',
    createdAt: '2026-03-10T10:30:00Z',
    updatedAt: '2026-03-12T14:20:00Z',
  },
  {
    id: 'ORD-002',
    userId: 'user-1',
    customerName: 'John Doe',
    customerEmail: 'customer@example.com',
    customerPhone: '+1234567891',
    deliveryAddress: '456 Customer Ave',
    barangay: 'Barangay Poblacion',
    orderType: 'delivery',
    deliveryNotes: 'Please call when you arrive',
    items: [
      {
        product: {
          id: '2',
          name: '3-Gallon Purified Water',
          description: 'Fresh purified drinking water',
          price: 18,
          image: 'https://images.unsplash.com/photo-1727233431893-e38a524d7f4b?w=400',
          category: 'Refill',
          inStock: true,
        },
        quantity: 3,
      },
    ],
    subtotal: 54,
    deliveryFee: 50,
    total: 104,
    status: 'out-for-delivery',
    paymentMethod: 'Cash on Delivery',
    assignedRider: 'Rider Juan',
    createdAt: '2026-03-15T09:15:00Z',
    updatedAt: '2026-03-15T11:00:00Z',
  },
];

export function OrderProvider({ children }: { children: React.ReactNode }) {
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);

  useEffect(() => {
    // Load orders from localStorage
    const storedOrders = localStorage.getItem('aquatrack_orders');
    if (storedOrders) {
      setOrders(JSON.parse(storedOrders));
    }
  }, []);

  useEffect(() => {
    // Save orders to localStorage
    localStorage.setItem('aquatrack_orders', JSON.stringify(orders));
  }, [orders]);

  const createOrder = (orderData: {
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
    paymentMethod: string;
  }): Order => {
    const newOrder: Order = {
      id: `ORD-${Date.now().toString().slice(-6)}`,
      ...orderData,
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setOrders(prev => [newOrder, ...prev]);
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders(prev =>
      prev.map(order =>
        order.id === orderId
          ? { ...order, status, updatedAt: new Date().toISOString() }
          : order
      )
    );
  };

  const assignRider = (orderId: string, riderId: string) => {
    setOrders(prev =>
      prev.map(order =>
        order.id === orderId
          ? { ...order, assignedRider: riderId, updatedAt: new Date().toISOString() }
          : order
      )
    );
  };

  const updateEmptiesReturned = (orderId: string, emptiesReturned: number) => {
    setOrders(prev =>
      prev.map(order =>
        order.id === orderId
          ? { ...order, emptiesReturned, updatedAt: new Date().toISOString() }
          : order
      )
    );
  };

  const getOrderById = (orderId: string) => {
    return orders.find(order => order.id === orderId);
  };

  const getUserOrders = (userId: string) => {
    return orders.filter(order => order.userId === userId);
  };

  const getAllOrders = () => {
    return orders;
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        createOrder,
        updateOrderStatus,
        assignRider,
        updateEmptiesReturned,
        getOrderById,
        getUserOrders,
        getAllOrders,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export function useOrders() {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrders must be used within OrderProvider');
  }
  return context;
}