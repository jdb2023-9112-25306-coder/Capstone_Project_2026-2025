import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role?: 'customer' | 'admin' | 'rider') => Promise<{ success: boolean; message?: string }>;
  register: (userData: Omit<User, 'id' | 'role' | 'borrowedBottles'> & { password: string }) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
  updateProfile: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demonstration
const MOCK_USERS: (User & { password: string })[] = [
  {
    id: 'admin-1',
    email: 'admin@aquatrack.com',
    password: 'admin123',
    name: 'Admin User',
    phone: '+1234567890',
    address: '123 Admin St',
    barangay: 'Barangay Centro',
    role: 'admin',
    borrowedBottles: 0,
  },
  {
    id: 'user-1',
    email: 'customer@example.com',
    password: 'customer123',
    name: 'John Doe',
    phone: '+1234567891',
    address: '456 Customer Ave',
    barangay: 'Barangay Poblacion',
    landmark: 'Near 7-Eleven',
    role: 'customer',
    borrowedBottles: 2,
  },
  {
    id: 'rider-1',
    email: 'rider@aquatrack.com',
    password: 'rider123',
    name: 'Rider Juan',
    phone: '+1234567892',
    address: '789 Rider St',
    barangay: 'Barangay Centro',
    role: 'rider',
    borrowedBottles: 0,
  },
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem('aquatrack_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string, role?: 'customer' | 'admin' | 'rider') => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const foundUser = MOCK_USERS.find(
      u => u.email === email && u.password === password && (role ? u.role === role : true)
    );

    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem('aquatrack_user', JSON.stringify(userWithoutPassword));
      return { success: true };
    }

    return { success: false, message: 'Invalid credentials' };
  };

  const register = async (userData: Omit<User, 'id' | 'role' | 'borrowedBottles'> & { password: string }) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));

    // Check if email already exists
    const existingUser = MOCK_USERS.find(u => u.email === userData.email);
    if (existingUser) {
      return { success: false, message: 'Email already registered' };
    }

    const newUser: User = {
      id: `user-${Date.now()}`,
      email: userData.email,
      name: userData.name,
      phone: userData.phone,
      address: userData.address,
      barangay: userData.barangay,
      landmark: userData.landmark,
      role: 'customer',
      borrowedBottles: 0,
    };

    MOCK_USERS.push({ ...newUser, password: userData.password });
    setUser(newUser);
    localStorage.setItem('aquatrack_user', JSON.stringify(newUser));

    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('aquatrack_user');
  };

  const updateProfile = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem('aquatrack_user', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}