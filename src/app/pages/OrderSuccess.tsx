import { useParams, Link } from 'react-router';
import { CheckCircle, ArrowRight, Package } from 'lucide-react';
import { useOrders } from '../context/OrderContext';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';

export function OrderSuccess() {
  const { orderId } = useParams();
  const { getOrderById } = useOrders();

  const order = orderId ? getOrderById(orderId) : null;

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12">
        <div className="text-center">
          <p className="text-gray-600 mb-6">Order not found</p>
          <Link to="/products">
            <Button className="bg-blue-600 hover:bg-blue-700">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 md:py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Order Placed Successfully!
          </h1>
          <p className="text-lg text-gray-600">
            Thank you for your order. We'll start preparing it right away.
          </p>
        </div>

        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-sm text-gray-600 mb-1">Order ID</p>
                <p className="font-bold text-lg">{order.id}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Status</p>
                <p className="font-bold text-lg text-blue-600 capitalize">{order.status}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Order Type</p>
                <p className="font-bold text-lg capitalize">{order.orderType}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Amount</p>
                <p className="font-bold text-lg text-blue-600">₱{order.total.toFixed(2)}</p>
              </div>
            </div>

            <div className="border-t pt-4 mb-4">
              <h3 className="font-bold mb-3">Contact Information</h3>
              <div className="space-y-2 text-sm">
                <p><span className="text-gray-600">Name:</span> {order.customerName}</p>
                <p><span className="text-gray-600">Email:</span> {order.customerEmail}</p>
                <p><span className="text-gray-600">Phone:</span> {order.customerPhone}</p>
                {order.orderType === 'delivery' && (
                  <>
                    <p><span className="text-gray-600">Address:</span> {order.deliveryAddress}</p>
                    <p><span className="text-gray-600">Barangay:</span> {order.barangay}</p>
                    {order.landmark && (
                      <p><span className="text-gray-600">Landmark:</span> {order.landmark}</p>
                    )}
                  </>
                )}
              </div>
            </div>

            <div className="border-t pt-4 mb-4">
              <h3 className="font-bold mb-3">Order Items</h3>
              <div className="space-y-2">
                {order.items.map(item => (
                  <div key={item.product.id} className="flex justify-between text-sm">
                    <span className="text-gray-600">
                      {item.product.name} x{item.quantity}
                    </span>
                    <span className="font-medium">
                      ₱{(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t pt-4">
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal:</span>
                  <span>₱{order.subtotal.toFixed(2)}</span>
                </div>
                {order.orderType === 'delivery' && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Delivery Fee:</span>
                    <span>₱{order.deliveryFee.toFixed(2)}</span>
                  </div>
                )}
              </div>
              <div className="flex justify-between font-bold text-lg mt-3 pt-3 border-t">
                <span>Total Amount</span>
                <span className="text-blue-600">₱{order.total.toFixed(2)}</span>
              </div>
              <p className="text-sm text-gray-600 mt-2">Payment Method: {order.paymentMethod}</p>
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link to="/orders" className="flex-1">
            <Button className="w-full bg-blue-600 hover:bg-blue-700">
              <Package className="mr-2 h-5 w-5" />
              View My Orders
            </Button>
          </Link>
          <Link to="/services" className="flex-1">
            <Button variant="outline" className="w-full">
              Continue Shopping
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>

        <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-900">
            <strong>What's Next?</strong> We'll send you order updates via email and SMS. 
            You can track your order status anytime from your orders page.
          </p>
        </div>
      </div>
    </div>
  );
}