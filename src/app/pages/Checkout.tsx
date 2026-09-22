import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useOrders } from '../context/OrderContext';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group';
import { Textarea } from '../components/ui/textarea';
import { toast } from 'sonner';
import { CheckCircle, Truck, Store } from 'lucide-react';

export function Checkout() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { cart, getCartTotal, clearCart } = useCart();
  const { createOrder } = useOrders();

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
    barangay: user?.barangay || '',
    landmark: user?.landmark || '',
    orderType: 'delivery' as 'delivery' | 'pickup',
    deliveryNotes: '',
  });

  const DELIVERY_FEE = 50;
  const subtotal = getCartTotal();
  const deliveryFee = formData.orderType === 'delivery' ? DELIVERY_FEE : 0;
  const total = subtotal + deliveryFee;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast.error('Please login to place an order');
      navigate('/login');
      return;
    }

    if (cart.length === 0) {
      toast.error('Your cart is empty');
      navigate('/services');
      return;
    }

    const order = createOrder({
      userId: user.id,
      customerName: formData.name,
      customerEmail: formData.email,
      customerPhone: formData.phone,
      deliveryAddress: formData.address,
      barangay: formData.barangay,
      landmark: formData.landmark,
      orderType: formData.orderType,
      deliveryNotes: formData.deliveryNotes,
      items: cart,
      subtotal,
      deliveryFee,
      total,
      paymentMethod: 'Cash on Delivery',
    });

    clearCart();
    toast.success('Order placed successfully!', {
      description: `Order ID: ${order.id}`,
    });
    navigate(`/order-success/${order.id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 md:py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
          Checkout
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Order Type */}
              <Card>
                <CardHeader>
                  <CardTitle>Order Type</CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup
                    value={formData.orderType}
                    onValueChange={(value: 'delivery' | 'pickup') => 
                      setFormData({ ...formData, orderType: value })
                    }
                  >
                    <div className="flex items-center space-x-2 border-2 border-blue-200 rounded-lg p-4 hover:bg-blue-50 cursor-pointer">
                      <RadioGroupItem value="delivery" id="delivery" />
                      <Label htmlFor="delivery" className="flex-1 cursor-pointer flex items-center gap-2">
                        <Truck className="h-5 w-5 text-blue-600" />
                        <div>
                          <div className="font-medium">Delivery</div>
                          <div className="text-sm text-gray-600">We'll deliver to your address (₱50.00 fee)</div>
                        </div>
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2 border-2 border-blue-200 rounded-lg p-4 hover:bg-blue-50 cursor-pointer">
                      <RadioGroupItem value="pickup" id="pickup" />
                      <Label htmlFor="pickup" className="flex-1 cursor-pointer flex items-center gap-2">
                        <Store className="h-5 w-5 text-blue-600" />
                        <div>
                          <div className="font-medium">Store Pickup</div>
                          <div className="text-sm text-gray-600">Pick up at our station (No delivery fee)</div>
                        </div>
                      </Label>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>

              {/* Delivery Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      required
                    />
                  </div>

                  {formData.orderType === 'delivery' && (
                    <>
                      <div>
                        <Label htmlFor="address">Delivery Address *</Label>
                        <Textarea
                          id="address"
                          value={formData.address}
                          onChange={e => setFormData({ ...formData, address: e.target.value })}
                          rows={2}
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="barangay">Barangay *</Label>
                        <Input
                          id="barangay"
                          value={formData.barangay}
                          onChange={e => setFormData({ ...formData, barangay: e.target.value })}
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="landmark">Landmark (Optional)</Label>
                        <Input
                          id="landmark"
                          placeholder="Nearby landmark for easy delivery"
                          value={formData.landmark}
                          onChange={e => setFormData({ ...formData, landmark: e.target.value })}
                        />
                      </div>

                      <div>
                        <Label htmlFor="deliveryNotes">Delivery Notes / Instructions (Optional)</Label>
                        <Textarea
                          id="deliveryNotes"
                          placeholder="E.g., Please call when you arrive, leave at the gate, etc."
                          value={formData.deliveryNotes}
                          onChange={e => setFormData({ ...formData, deliveryNotes: e.target.value })}
                          rows={3}
                        />
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>

              {/* Payment Method */}
              <Card>
                <CardHeader>
                  <CardTitle>Payment Method</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-2 border-2 border-blue-200 rounded-lg p-4 bg-blue-50">
                    <div className="h-5 w-5 rounded-full border-2 border-blue-600 flex items-center justify-center">
                      <div className="h-3 w-3 rounded-full bg-blue-600"></div>
                    </div>
                    <Label className="flex-1">
                      <div className="font-medium">Cash on Delivery</div>
                      <div className="text-sm text-gray-600">Pay when you receive your order</div>
                    </Label>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    {cart.map(item => (
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

                  <div className="border-t pt-4 space-y-2">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal</span>
                      <span>₱{subtotal.toFixed(2)}</span>
                    </div>
                    {formData.orderType === 'delivery' && (
                      <div className="flex justify-between text-gray-600">
                        <span>Delivery Fee</span>
                        <span>₱{deliveryFee.toFixed(2)}</span>
                      </div>
                    )}
                    {formData.orderType === 'pickup' && (
                      <div className="flex justify-between text-green-600">
                        <span>Delivery Fee</span>
                        <span className="line-through">₱50.00</span>
                      </div>
                    )}
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span className="text-blue-600">₱{total.toFixed(2)}</span>
                    </div>
                  </div>

                  <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" size="lg">
                    <CheckCircle className="mr-2 h-5 w-5" />
                    Place Order
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}