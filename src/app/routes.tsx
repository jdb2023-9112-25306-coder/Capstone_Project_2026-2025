import { createBrowserRouter } from 'react-router';
import { RootLayout } from './components/RootLayout';
import { AdminLayout } from './components/AdminLayout';
import { Home } from './pages/Home';
import { Products } from './pages/Products';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { OrderSuccess } from './pages/OrderSuccess';
import { Orders } from './pages/Orders';
import { Profile } from './pages/Profile';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminOrders } from './pages/admin/AdminOrders';
import { AdminSales } from './pages/admin/AdminSales';
import { AdminProducts } from './pages/admin/AdminProducts';
import { RiderLogin } from './pages/RiderLogin';
import { RiderDashboard } from './pages/RiderDashboard';

function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-6">Page not found</p>
        <a href="/" className="text-blue-600 hover:underline">
          Go back home
        </a>
      </div>
    </div>
  );
}

export const router = createBrowserRouter([
  {
    path: '/',
    Component: RootLayout,
    children: [
      { index: true, Component: Home },
      { path: 'services', Component: Products },
      { path: 'cart', Component: Cart },
      { path: 'checkout', Component: Checkout },
      { path: 'order-success/:orderId', Component: OrderSuccess },
      { path: 'orders', Component: Orders },
      { path: 'profile', Component: Profile },
      { path: 'login', Component: Login },
      { path: 'register', Component: Register },
      { path: 'about', Component: About },
      { path: 'contact', Component: Contact },
    ],
  },
  {
    path: '/admin',
    Component: AdminLayout,
    children: [
      { index: true, Component: AdminDashboard },
      { path: 'orders', Component: AdminOrders },
      { path: 'sales', Component: AdminSales },
      { path: 'products', Component: AdminProducts },
    ],
  },
  {
    path: '/rider',
    children: [
      { path: 'login', Component: RiderLogin },
      { path: 'dashboard', Component: RiderDashboard },
    ],
  },
  { path: '*', Component: NotFound },
]);