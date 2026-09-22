import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../../context/AuthContext';
import { useOrders } from '../../context/OrderContext';
import { Eye, Filter } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../../components/ui/dialog';
import { Label } from '../../components/ui/label';
import { toast } from 'sonner';

const AVAILABLE_RIDERS = ['Rider Juan', 'Rider Pedro', 'Rider Maria'];

export function AdminOrders() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { getAllOrders, updateOrderStatus, assignRider } = useOrders();
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  if (!user || user.role !== 'admin') {
    navigate('/');
    return null;
  }

  const orders = getAllOrders();
  const filteredOrders = statusFilter === 'all' 
    ? orders 
    : orders.filter(o => o.status === statusFilter);

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      pending: 'bg-yellow-100 text-yellow-800',
      confirmed: 'bg-blue-100 text-blue-800',
      preparing: 'bg-purple-100 text-purple-800',
      'out-for-delivery': 'bg-orange-100 text-orange-800',
      delivered: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const handleStatusChange = (orderId: string, newStatus: any) => {
    updateOrderStatus(orderId, newStatus);
    toast.success('Order status updated successfully');
  };

  const handleRiderAssignment = (orderId: string, riderId: string) => {
    assignRider(orderId, riderId);
    toast.success(`Order assigned to ${riderId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Order Management</h1>
          
          {/* Filter */}
          <div className="flex items-center gap-4">
            <Filter className="h-5 w-5 text-gray-500" />
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Orders</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="preparing">Preparing</SelectItem>
                <SelectItem value="out-for-delivery">Out for Delivery</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            <span className="text-gray-600 text-sm">
              {filteredOrders.length} order(s) found
            </span>
          </div>
        </div>

        {/* Orders Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Order ID</th>
                    <th className="text-left py-3 px-4">Customer</th>
                    <th className="text-left py-3 px-4">Type</th>
                    <th className="text-left py-3 px-4">Date</th>
                    <th className="text-left py-3 px-4">Total</th>
                    <th className="text-left py-3 px-4">Status</th>
                    <th className="text-left py-3 px-4">Assigned Rider</th>
                    <th className="text-left py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map(order => (
                    <tr key={order.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium">{order.id}</td>
                      <td className="py-3 px-4">
                        <div>
                          <div className="font-medium">{order.customerName}</div>
                          <div className="text-sm text-gray-600">{order.customerPhone}</div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <Badge variant="outline" className="capitalize">
                          {order.orderType}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-sm">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4 font-medium">₱{order.total.toFixed(2)}</td>
                      <td className="py-3 px-4">
                        <Badge className={getStatusColor(order.status)}>
                          {order.status.replace('-', ' ').toUpperCase()}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        {order.orderType === 'delivery' && (order.status === 'pending' || order.status === 'confirmed' || order.status === 'preparing') ? (
                          <Select
                            value={order.assignedRider || ''}
                            onValueChange={(value) => handleRiderAssignment(order.id, value)}
                          >
                            <SelectTrigger className="w-[140px]">
                              <SelectValue placeholder="Assign rider" />
                            </SelectTrigger>
                            <SelectContent>
                              {AVAILABLE_RIDERS.map(rider => (
                                <SelectItem key={rider} value={rider}>
                                  {rider}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        ) : order.assignedRider ? (
                          <span className="text-sm">{order.assignedRider}</span>
                        ) : (
                          <span className="text-sm text-gray-400">
                            {order.orderType === 'pickup' ? 'Pickup' : '-'}
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setSelectedOrder(order)}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filteredOrders.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No orders found
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Order Details Dialog */}
        <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Order Details - {selectedOrder?.id}</DialogTitle>
              <DialogDescription>
                View and manage order information
              </DialogDescription>
            </DialogHeader>

            {selectedOrder && (
              <div className="space-y-6">
                {/* Order Type */}
                <div>
                  <h3 className="font-bold mb-2">Order Type</h3>
                  <Badge variant="outline" className="capitalize text-base px-3 py-1">
                    {selectedOrder.orderType}
                  </Badge>
                </div>

                {/* Customer Info */}
                <div>
                  <h3 className="font-bold mb-3">Customer Information</h3>
                  <div className="space-y-2 text-sm">
                    <p><span className="text-gray-600">Name:</span> {selectedOrder.customerName}</p>
                    <p><span className="text-gray-600">Email:</span> {selectedOrder.customerEmail}</p>
                    <p><span className="text-gray-600">Phone:</span> {selectedOrder.customerPhone}</p>
                    {selectedOrder.orderType === 'delivery' && (
                      <>
                        <p><span className="text-gray-600">Address:</span> {selectedOrder.deliveryAddress}</p>
                        <p><span className="text-gray-600">Barangay:</span> {selectedOrder.barangay}</p>
                        {selectedOrder.landmark && (
                          <p><span className="text-gray-600">Landmark:</span> {selectedOrder.landmark}</p>
                        )}
                        {selectedOrder.deliveryNotes && (
                          <p><span className="text-gray-600">Delivery Notes:</span> <span className="italic">{selectedOrder.deliveryNotes}</span></p>
                        )}
                      </>
                    )}
                  </div>
                </div>

                {/* Order Items */}
                <div>
                  <h3 className="font-bold mb-3">Order Items</h3>
                  <div className="space-y-2">
                    {selectedOrder.items.map((item: any) => (
                      <div key={item.product.id} className="flex justify-between text-sm border-b pb-2">
                        <span className="text-gray-600">
                          {item.product.name} x{item.quantity}
                        </span>
                        <span className="font-medium">
                          ₱{(item.product.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                    <div className="flex justify-between text-sm pt-2">
                      <span className="text-gray-600">Subtotal</span>
                      <span>₱{selectedOrder.subtotal.toFixed(2)}</span>
                    </div>
                    {selectedOrder.orderType === 'delivery' && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Delivery Fee</span>
                        <span>₱{selectedOrder.deliveryFee.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between font-bold pt-2 border-t">
                      <span>Total Amount</span>
                      <span className="text-blue-600">₱{selectedOrder.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Payment Method */}
                <div>
                  <h3 className="font-bold mb-2">Payment Method</h3>
                  <p className="text-sm text-gray-600">{selectedOrder.paymentMethod}</p>
                </div>

                {/* Empties Returned */}
                {selectedOrder.status === 'delivered' && selectedOrder.emptiesReturned !== undefined && (
                  <div>
                    <h3 className="font-bold mb-2">Empties Returned</h3>
                    <p className="text-sm">
                      <span className="text-2xl font-bold text-blue-600">{selectedOrder.emptiesReturned}</span> bottles
                    </p>
                  </div>
                )}

                {/* Update Status */}
                <div>
                  <Label>Update Order Status</Label>
                  <Select
                    value={selectedOrder.status}
                    onValueChange={(value) => {
                      handleStatusChange(selectedOrder.id, value);
                      setSelectedOrder({ ...selectedOrder, status: value });
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="confirmed">Confirmed</SelectItem>
                      <SelectItem value="preparing">Preparing</SelectItem>
                      <SelectItem value="out-for-delivery">Out for Delivery</SelectItem>
                      <SelectItem value="delivered">Delivered</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Timestamps */}
                <div className="text-xs text-gray-500 space-y-1">
                  <p>Created: {new Date(selectedOrder.createdAt).toLocaleString()}</p>
                  <p>Last Updated: {new Date(selectedOrder.updatedAt).toLocaleString()}</p>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}