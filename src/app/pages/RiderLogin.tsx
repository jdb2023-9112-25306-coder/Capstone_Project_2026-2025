import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { Bike, Mail, Lock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { toast } from 'sonner';

export function RiderLogin() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const result = await login(formData.email, formData.password, 'rider');
    
    setIsLoading(false);

    if (result.success) {
      toast.success('Login successful!');
      navigate('/rider/dashboard');
    } else {
      toast.error(result.message || 'Invalid rider credentials');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Bike className="h-10 w-10 text-blue-600" />
            <span className="text-3xl font-bold text-gray-900">AquaTrack Rider</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Delivery Staff Login</h1>
          <p className="text-gray-600 mt-2">Access your delivery dashboard</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Rider Login</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="rider@aquatrack.com"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>

              <div>
                <Label htmlFor="password" className="flex items-center gap-2">
                  <Lock className="h-4 w-4" />
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={e => setFormData({ ...formData, password: e.target.value })}
                  required
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-blue-600 hover:bg-blue-700" 
                disabled={isLoading}
              >
                {isLoading ? 'Logging in...' : 'Login as Rider'}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <Link to="/login" className="text-sm text-blue-600 hover:underline">
                Back to main login
              </Link>
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm font-medium mb-2">Demo Rider Credentials:</p>
              <div className="text-xs text-gray-700">
                <p><strong>Email:</strong> rider@aquatrack.com</p>
                <p><strong>Password:</strong> rider123</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
