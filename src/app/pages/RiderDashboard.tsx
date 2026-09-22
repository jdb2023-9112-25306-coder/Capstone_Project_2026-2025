import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { useOrders } from '../context/OrderContext';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { LogOut, Bike, MapPin, Package, Phone, FileText } from 'lucide-react';
import { toast } from 'sonner';

export function RiderDashboard() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { getAllOrders, updateOrderStatus, updateEmptiesReturned } = useOrders();
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [emptiesReceived, setEmptiesReceived] = useState<number>(0);

  if (!user || user.role !== 'rider') {
    navigate('/rider/login');
    return null;
  }

  // Get orders assigned to this rider
  const riderOrders = getAllOrders().filter(
    order => order.assignedRider === user.name && 
    (order.status === 'out-for-delivery' || order.status === 'confirmed' || order.status === 'preparing')
  );

  const handleViewOrder = (order: any) => {
    setSelectedOrder(order);
    setEmptiesReceived(0);
  };

  const handleMarkAsCompleted = () => {
    if (selectedOrder) {
      updateEmptiesReturned(selectedOrder.id, emptiesReceived);
      updateOrderStatus(selectedOrder.id, 'delivered');
      toast.success(`Order ${selectedOrder.id} marked as completed!`);
      setSelectedOrder(null);
      setEmptiesReceived(0);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/rider/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile-Friendly Header */}
      <div className="bg-blue-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bike className="h-8 w-8" />
              <div>
                <h1 className="text-lg font-bold">Rider Dashboard</h1>
                <p className="text-sm text-blue-100">{user.name}</p>
              </div>
            </div>
            <Button 
              variant="secondary" 
              size="sm"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Assigned Deliveries</p>
                  <p className="text-3xl font-bold text-blue-600">{riderOrders.length}</p>
                </div>
                <Package className="h-12 w-12 text-blue-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <h2 className="text-xl font-bold text-gray-900 mb-4">My Deliveries</h2>

        <div className="space-y-4">
          {riderOrders.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center text-gray-500">
                <Package className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                <p>No deliveries assigned at the moment</p>
              </CardContent>
            </Card>
          ) : (
            riderOrders.map(order => (
              <Card key={order.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-bold text-lg">Order #{order.id}</p>
                        <p className="text-sm text-gray-600">{order.customerName}</p>
                      </div>
                      <Badge className={
                        order.status === 'confirmed' ? 'bg-blue-100 text-blue-800' :
                        order.status === 'preparing' ? 'bg-purple-100 text-purple-800' :
                        'bg-orange-100 text-orange-800'
                      }>
                        {order.status.replace('-', ' ').toUpperCase()}
                      </Badge>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex items-start gap-2">
                        <Phone className="h-4 w-4 mt-0.5 text-gray-500" />
                        <span>{order.customerPhone}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <MapPin className="h-4 w-4 mt-0.5 text-gray-500" />
                        <div>
                          <p>{order.deliveryAddress}</p>
                          <p className="text-gray-600">Barangay: {order.barangay}</p>
                          {order.landmark && (
                            <p className="text-blue-600">Landmark: {order.landmark}</p>
                          )}
                        </div>
                      </div>
                      {order.deliveryNotes && (
                        <div className="flex items-start gap-2">
                          <FileText className="h-4 w-4 mt-0.5 text-gray-500" />
                          <p className="text-gray-600 italic">{order.deliveryNotes}</p>
                        </div>
                      )}
                    </div>

                    <div className="pt-2 border-t">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm text-gray-600">Total Amount:</span>
                        <span className="font-bold text-lg text-blue-600">₱{order.total.toFixed(2)}</span>
                      </div>
                      <Button 
                        onClick={() => handleViewOrder(order)}
                        className="w-full bg-blue-600 hover:bg-blue-700"
                      >
                        Complete Delivery
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>

      {/* Complete Delivery Dialog */}
      <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Complete Delivery - {selectedOrder?.id}</DialogTitle>
            <DialogDescription>
              Record delivery completion and empty bottles received
            </DialogDescription>
          </DialogHeader>

          {selectedOrder && (
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Customer</p>
                <p className="font-medium">{selectedOrder.customerName}</p>
              </div>

              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Amount to Collect</p>
                <p className="text-2xl font-bold text-blue-600">₱{selectedOrder.total.toFixed(2)}</p>
              </div>

              <div>
                <Label htmlFor="empties">Number of Empty Bottles Received</Label>
                <Input
                  id="empties"
                  type="number"
                  min="0"
                  value={emptiesReceived}
                  onChange={(e) => setEmptiesReceived(parseInt(e.target.value) || 0)}
                  placeholder="Enter number of empties"
                  className="mt-1"
                />
                <p className="text-xs text-gray-600 mt-1">
                  Record how many empty bottles the customer returned
                </p>
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setSelectedOrder(null)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleMarkAsCompleted}
                  className="flex-1 bg-green-600 hover:bg-green-700"
                >
                  Mark as Completed
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
