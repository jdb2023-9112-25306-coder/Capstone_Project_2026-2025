import { Link, useLocation, Outlet, Navigate } from 'react-router';
import { LayoutDashboard, Package, TrendingUp, Home, Boxes } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Button } from './ui/button';

export function AdminLayout() {
  const location = useLocation();
  const { user } = useAuth();

  // Redirect if not logged in or not an admin
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  const navItems = [
    { path: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/admin/orders', icon: Package, label: 'Orders' },
    { path: '/admin/products', icon: Boxes, label: 'Products' },
    { path: '/admin/sales', icon: TrendingUp, label: 'Sales Reports' },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-900 text-white hidden lg:block">
        <div className="p-6">
          <h2 className="text-xl font-bold mb-2">Admin Panel</h2>
          <p className="text-sm text-blue-200">{user?.name}</p>
        </div>
        
        <nav className="px-4 space-y-2">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-blue-800 text-white'
                    : 'text-blue-100 hover:bg-blue-800'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
          
          <Link
            to="/"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-blue-100 hover:bg-blue-800 transition-colors"
          >
            <Home className="h-5 w-5" />
            <span>Back to Site</span>
          </Link>
        </nav>
      </aside>

      {/* Mobile Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-blue-900 text-white z-50 border-t border-blue-800">
        <nav className="flex justify-around p-2">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-blue-800 text-white'
                    : 'text-blue-100'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="text-xs">{item.label}</span>
              </Link>
            );
          })}
          <Link
            to="/"
            className="flex flex-col items-center gap-1 px-4 py-2 rounded-lg text-blue-100"
          >
            <Home className="h-5 w-5" />
            <span className="text-xs">Site</span>
          </Link>
        </nav>
      </div>

      {/* Main Content */}
      <main className="flex-1 pb-20 lg:pb-0">
        <Outlet />
      </main>
    </div>
  );
}