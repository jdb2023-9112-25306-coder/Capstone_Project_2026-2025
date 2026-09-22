import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../../context/AuthContext';
import { useProducts } from '../../context/ProductContext';
import { Product } from '../../types';
import { Plus, Pencil, Trash2, ToggleLeft, ToggleRight, PackageSearch, X, Check } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';

type FormMode = 'add' | 'edit' | null;

const CATEGORIES = ['Refill', 'Alkaline', 'Distilled', 'Mineral', 'Accessories'];

const emptyForm = {
  name: '',
  description: '',
  price: '',
  image: '',
  category: 'Refill',
  inStock: true,
};

export function AdminProducts() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { products, addProduct, updateProduct, deleteProduct, toggleStock } = useProducts();

  const [formMode, setFormMode] = useState<FormMode>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [filterCategory, setFilterCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  if (!user || user.role !== 'admin') {
    navigate('/');
    return null;
  }

  const categories = ['all', ...CATEGORIES];

  const filteredProducts = products.filter(p => {
    const matchesCategory = filterCategory === 'all' || p.category === filterCategory;
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const openAddForm = () => {
    setForm(emptyForm);
    setEditingId(null);
    setFormMode('add');
  };

  const openEditForm = (product: Product) => {
    setForm({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      image: product.image,
      category: product.category,
      inStock: product.inStock,
    });
    setEditingId(product.id);
    setFormMode('edit');
  };

  const closeForm = () => {
    setFormMode(null);
    setEditingId(null);
    setForm(emptyForm);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const productData = {
      name: form.name,
      description: form.description,
      price: parseFloat(form.price),
      image: form.image,
      category: form.category,
      inStock: form.inStock,
    };

    if (formMode === 'add') {
      addProduct(productData);
    } else if (formMode === 'edit' && editingId) {
      updateProduct(editingId, productData);
    }
    closeForm();
  };

  const handleDelete = (id: string) => {
    deleteProduct(id);
    setDeleteConfirmId(null);
  };

  const inStockCount = products.filter(p => p.inStock).length;
  const outOfStockCount = products.filter(p => !p.inStock).length;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-1">Products / Services</h1>
            <p className="text-gray-600">Manage your water refilling station's offerings</p>
          </div>
          <Button onClick={openAddForm} className="bg-blue-600 hover:bg-blue-700 w-fit">
            <Plus className="h-4 w-4 mr-2" />
            Add Product
          </Button>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-gray-500">Total Products</p>
              <p className="text-2xl font-bold text-blue-600">{products.length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-gray-500">In Stock</p>
              <p className="text-2xl font-bold text-green-600">{inStockCount}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-gray-500">Out of Stock</p>
              <p className="text-2xl font-bold text-red-500">{outOfStockCount}</p>
            </CardContent>
          </Card>
        </div>

        {/* Add / Edit Form */}
        {formMode && (
          <Card className="mb-8 border-blue-200 shadow-md">
            <CardHeader className="pb-2 flex flex-row items-center justify-between">
              <CardTitle className="text-xl text-blue-700">
                {formMode === 'add' ? 'Add New Product' : 'Edit Product'}
              </CardTitle>
              <button
                onClick={closeForm}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-4">
                {/* Name */}
                <div className="space-y-1">
                  <Label htmlFor="prod-name">Product Name *</Label>
                  <Input
                    id="prod-name"
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    placeholder="e.g. 5-Gallon Slim Container"
                    required
                  />
                </div>

                {/* Price */}
                <div className="space-y-1">
                  <Label htmlFor="prod-price">Price (₱) *</Label>
                  <Input
                    id="prod-price"
                    type="number"
                    min="0"
                    step="0.01"
                    value={form.price}
                    onChange={e => setForm(f => ({ ...f, price: e.target.value }))}
                    placeholder="e.g. 30"
                    required
                  />
                </div>

                {/* Category */}
                <div className="space-y-1">
                  <Label htmlFor="prod-category">Category *</Label>
                  <select
                    id="prod-category"
                    value={form.category}
                    onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    required
                  >
                    {CATEGORIES.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                {/* Image URL */}
                <div className="space-y-1">
                  <Label htmlFor="prod-image">Image URL</Label>
                  <Input
                    id="prod-image"
                    value={form.image}
                    onChange={e => setForm(f => ({ ...f, image: e.target.value }))}
                    placeholder="https://..."
                  />
                </div>

                {/* Description */}
                <div className="space-y-1 sm:col-span-2">
                  <Label htmlFor="prod-desc">Description *</Label>
                  <textarea
                    id="prod-desc"
                    value={form.description}
                    onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                    placeholder="Describe the product..."
                    rows={3}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring resize-none"
                    required
                  />
                </div>

                {/* In Stock Toggle */}
                <div className="flex items-center gap-3">
                  <Label>In Stock</Label>
                  <button
                    type="button"
                    onClick={() => setForm(f => ({ ...f, inStock: !f.inStock }))}
                    className="focus:outline-none"
                  >
                    {form.inStock ? (
                      <ToggleRight className="h-7 w-7 text-green-500" />
                    ) : (
                      <ToggleLeft className="h-7 w-7 text-gray-400" />
                    )}
                  </button>
                  <span className={`text-sm ${form.inStock ? 'text-green-600' : 'text-gray-400'}`}>
                    {form.inStock ? 'Available' : 'Unavailable'}
                  </span>
                </div>

                {/* Submit */}
                <div className="sm:col-span-2 flex gap-3 justify-end pt-2">
                  <Button type="button" variant="outline" onClick={closeForm}>
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                    <Check className="h-4 w-4 mr-2" />
                    {formMode === 'add' ? 'Add Product' : 'Save Changes'}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <Input
            placeholder="Search products..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="sm:w-64"
          />
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`px-3 py-1 rounded-full text-sm border transition-colors ${
                  filterCategory === cat
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-gray-600 border-gray-300 hover:border-blue-400'
                }`}
              >
                {cat === 'all' ? 'All' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400">
            <PackageSearch className="h-16 w-16 mb-4 opacity-40" />
            <p className="text-lg">No products found.</p>
            <p className="text-sm mt-1">Try adjusting your search or category filter.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <Card
                key={product.id}
                className={`overflow-hidden flex flex-col transition-shadow hover:shadow-lg ${
                  !product.inStock ? 'opacity-70' : ''
                }`}
              >
                {/* Image */}
                <div className="aspect-square bg-gray-100 relative overflow-hidden">
                  <ImageWithFallback
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  {!product.inStock && (
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                      <Badge variant="destructive" className="text-sm">Out of Stock</Badge>
                    </div>
                  )}
                </div>

                <CardContent className="p-4 flex-1 flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 text-xs">
                      {product.category}
                    </Badge>
                    <span className="text-lg font-bold text-blue-600">₱{product.price}</span>
                  </div>

                  <h3 className="font-semibold text-gray-800 leading-tight">{product.name}</h3>
                  <p className="text-xs text-gray-500 flex-1 line-clamp-2">{product.description}</p>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
                    {/* Toggle Stock */}
                    <button
                      onClick={() => toggleStock(product.id)}
                      title={product.inStock ? 'Mark Out of Stock' : 'Mark In Stock'}
                      className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-md border border-gray-200 text-xs text-gray-600 hover:border-blue-400 hover:text-blue-600 transition-colors"
                    >
                      {product.inStock ? (
                        <ToggleRight className="h-4 w-4 text-green-500" />
                      ) : (
                        <ToggleLeft className="h-4 w-4 text-gray-400" />
                      )}
                      {product.inStock ? 'In Stock' : 'Out of Stock'}
                    </button>

                    {/* Edit */}
                    <button
                      onClick={() => openEditForm(product)}
                      title="Edit"
                      className="p-1.5 rounded-md border border-gray-200 text-gray-500 hover:border-blue-400 hover:text-blue-600 transition-colors"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>

                    {/* Delete */}
                    {deleteConfirmId === product.id ? (
                      <div className="flex gap-1">
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="p-1.5 rounded-md bg-red-500 text-white hover:bg-red-600 transition-colors"
                          title="Confirm Delete"
                        >
                          <Check className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => setDeleteConfirmId(null)}
                          className="p-1.5 rounded-md border border-gray-200 text-gray-500 hover:border-gray-400 transition-colors"
                          title="Cancel"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setDeleteConfirmId(product.id)}
                        title="Delete"
                        className="p-1.5 rounded-md border border-gray-200 text-gray-500 hover:border-red-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
