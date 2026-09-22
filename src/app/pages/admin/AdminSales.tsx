import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../../context/AuthContext';
import { useOrders } from '../../context/OrderContext';
import { Calendar, Download, TrendingUp } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

export function AdminSales() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { getAllOrders } = useOrders();
  
  const [dateFrom, setDateFrom] = useState('2026-03-01');
  const [dateTo, setDateTo] = useState('2026-03-31');

  if (!user || user.role !== 'admin') {
    navigate('/');
    return null;
  }

  const orders = getAllOrders();
  
  // Filter orders by date range
  const filteredOrders = orders.filter(order => {
    const orderDate = new Date(order.createdAt);
    const from = new Date(dateFrom);
    const to = new Date(dateTo);
    return orderDate >= from && orderDate <= to;
  });

  // Calculate statistics
  const totalSales = filteredOrders
    .filter(o => o.status === 'delivered')
    .reduce((sum, o) => sum + o.total, 0);
  
  const totalOrders = filteredOrders.length;
  const deliveredOrders = filteredOrders.filter(o => o.status === 'delivered').length;
  const averageOrderValue = deliveredOrders > 0 ? totalSales / deliveredOrders : 0;

  // Sales by product
  const productSales: Record<string, { name: string; quantity: number; revenue: number }> = {};
  filteredOrders
    .filter(o => o.status === 'delivered')
    .forEach(order => {
      order.items.forEach(item => {
        if (!productSales[item.product.id]) {
          productSales[item.product.id] = {
            name: item.product.name,
            quantity: 0,
            revenue: 0,
          };
        }
        productSales[item.product.id].quantity += item.quantity;
        productSales[item.product.id].revenue += item.product.price * item.quantity;
      });
    });

  const productSalesData = Object.values(productSales);

  // Sales by status
  const statusData = [
    { name: 'Delivered', value: filteredOrders.filter(o => o.status === 'delivered').length },
    { name: 'Pending', value: filteredOrders.filter(o => o.status === 'pending').length },
    { name: 'Processing', value: filteredOrders.filter(o => ['confirmed', 'preparing', 'out-for-delivery'].includes(o.status)).length },
    { name: 'Cancelled', value: filteredOrders.filter(o => o.status === 'cancelled').length },
  ];

  const COLORS = ['#10b981', '#f59e0b', '#3b82f6', '#ef4444'];

  const handleDownloadReport = () => {
    // Create CSV content
    const csvContent = [
      ['Sales Report', `${dateFrom} to ${dateTo}`],
      [],
      ['Summary'],
      ['Total Sales', `₱${totalSales.toFixed(2)}`],
      ['Total Orders', totalOrders],
      ['Delivered Orders', deliveredOrders],
      ['Average Order Value', `₱${averageOrderValue.toFixed(2)}`],
      [],
      ['Product Sales'],
      ['Product', 'Quantity Sold', 'Revenue'],
      ...productSalesData.map(p => [p.name, p.quantity, `₱${p.revenue.toFixed(2)}`]),
    ]
      .map(row => row.join(','))
      .join('\n');

    // Download
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sales-report-${dateFrom}-to-${dateTo}.csv`;
    a.click();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Sales Reports</h1>
          
          {/* Date Filter */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
                <div>
                  <Label htmlFor="dateFrom">From Date</Label>
                  <Input
                    id="dateFrom"
                    type="date"
                    value={dateFrom}
                    onChange={(e) => setDateFrom(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="dateTo">To Date</Label>
                  <Input
                    id="dateTo"
                    type="date"
                    value={dateTo}
                    onChange={(e) => setDateTo(e.target.value)}
                  />
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleDownloadReport} variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export CSV
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Sales</p>
                  <p className="text-2xl font-bold text-blue-600">₱{totalSales.toFixed(2)}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Orders</p>
                <p className="text-2xl font-bold">{totalOrders}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div>
                <p className="text-sm text-gray-600 mb-1">Delivered Orders</p>
                <p className="text-2xl font-bold text-green-600">{deliveredOrders}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div>
                <p className="text-sm text-gray-600 mb-1">Avg Order Value</p>
                <p className="text-2xl font-bold text-purple-600">₱{averageOrderValue.toFixed(2)}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Sales by Product</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={productSalesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="revenue" fill="#2563eb" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Order Status Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Product Sales Table */}
        <Card>
          <CardHeader>
            <CardTitle>Product Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Product Name</th>
                    <th className="text-left py-3 px-4">Quantity Sold</th>
                    <th className="text-left py-3 px-4">Revenue</th>
                  </tr>
                </thead>
                <tbody>
                  {productSalesData
                    .sort((a, b) => b.revenue - a.revenue)
                    .map((product, index) => (
                      <tr key={index} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4 font-medium">{product.name}</td>
                        <td className="py-3 px-4">{product.quantity}</td>
                        <td className="py-3 px-4 font-medium text-blue-600">
                          ₱{product.revenue.toFixed(2)}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>

              {productSalesData.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No sales data for the selected period
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
