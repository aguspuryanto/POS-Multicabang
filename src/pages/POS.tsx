/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Search, ShoppingCart, Plus, Minus, Trash2, UserPlus, CreditCard, Banknote, QrCode, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetFooter } from '@/components/ui/sheet';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mockApi } from '@/services/mockApi';
import { Product, CartItem, Category } from '@/types';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner';

export default function POS() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const { data: products = [] } = useQuery({
    queryKey: ['products'],
    queryFn: () => mockApi.getProducts('b1'),
  });

  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: () => mockApi.getCategories(),
  });

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.sku.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || p.categoryId === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [products, search, selectedCategory]);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    toast.success(`${product.name} ditambahkan`);
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(0, item.quantity + delta);
        return newQty === 0 ? null : { ...item, quantity: newQty };
      }
      return item;
    }).filter(Boolean) as CartItem[]);
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="flex flex-col h-full bg-slate-50">
      {/* Search & Categories */}
      <div className="p-4 space-y-4 bg-white border-b sticky top-0 z-30">
        <div className="relative">
          <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
          <Input 
            placeholder="Cari produk atau scan barcode..." 
            className="pl-10 bg-slate-50 border-slate-200 h-11 rounded-xl"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <ScrollArea className="w-full whitespace-nowrap">
          <div className="flex gap-2 pb-2">
            <Button 
              variant={selectedCategory === 'all' ? 'default' : 'outline'} 
              size="sm" 
              className="rounded-full px-4"
              onClick={() => setSelectedCategory('all')}
            >
              Semua
            </Button>
            {categories.map(cat => (
              <Button 
                key={cat.id}
                variant={selectedCategory === cat.id ? 'default' : 'outline'} 
                size="sm" 
                className="rounded-full px-4"
                onClick={() => setSelectedCategory(cat.id)}
              >
                {cat.name}
              </Button>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Product Grid */}
      <ScrollArea className="flex-1 p-4">
        <div className="grid grid-cols-2 gap-4 pb-24">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
              >
                <Card 
                  className="border-none shadow-sm overflow-hidden active:scale-95 transition-transform cursor-pointer"
                  onClick={() => addToCart(product)}
                >
                  <div className="aspect-square bg-slate-100 relative">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <Badge className="absolute top-2 right-2 bg-white/90 text-slate-900 border-none shadow-sm">
                      Stok: {product.stock}
                    </Badge>
                  </div>
                  <CardContent className="p-3 space-y-1">
                    <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">{product.sku}</p>
                    <h3 className="font-bold text-sm text-slate-900 line-clamp-1">{product.name}</h3>
                    <p className="text-primary font-bold">Rp {product.price.toLocaleString('id-ID')}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </ScrollArea>

      {/* Floating Cart Button */}
      <div className="fixed bottom-20 left-0 right-0 p-4 flex justify-center z-40">
        <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
          <SheetTrigger asChild>
            <Button className="w-full max-w-md h-14 rounded-2xl shadow-xl shadow-primary/30 flex items-center justify-between px-6">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <ShoppingCart className="w-6 h-6" />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-rose-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-primary">
                      {cartCount}
                    </span>
                  )}
                </div>
                <div className="text-left">
                  <p className="text-[10px] uppercase font-bold opacity-80">Total Belanja</p>
                  <p className="text-lg font-bold leading-none">Rp {cartTotal.toLocaleString('id-ID')}</p>
                </div>
              </div>
              <div className="bg-white/20 px-3 py-1 rounded-lg font-bold text-sm">
                Bayar
              </div>
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-[90vh] rounded-t-[32px] p-0 border-none">
            <div className="flex flex-col h-full">
              <SheetHeader className="p-6 pb-2">
                <div className="flex items-center justify-between">
                  <SheetTitle className="text-2xl font-bold">Keranjang</SheetTitle>
                  <Button variant="ghost" size="icon" onClick={() => setIsCartOpen(false)}>
                    <X className="w-6 h-6" />
                  </Button>
                </div>
              </SheetHeader>

              <div className="px-6 py-2">
                <Button variant="outline" className="w-full justify-start gap-2 h-11 rounded-xl border-dashed">
                  <UserPlus className="w-4 h-4" />
                  Pilih Pelanggan (Opsional)
                </Button>
              </div>

              <ScrollArea className="flex-1 px-6 py-4">
                <div className="space-y-4">
                  {cart.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-slate-400">
                      <ShoppingCart className="w-16 h-16 mb-4 opacity-20" />
                      <p className="font-medium">Keranjang masih kosong</p>
                    </div>
                  ) : (
                    cart.map((item) => (
                      <div key={item.id} className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-sm text-slate-900 truncate">{item.name}</h4>
                          <p className="text-xs text-slate-500">Rp {item.price.toLocaleString('id-ID')}</p>
                          <div className="flex items-center gap-3 mt-2">
                            <Button 
                              variant="outline" 
                              size="icon" 
                              className="w-7 h-7 rounded-lg"
                              onClick={() => updateQuantity(item.id, -1)}
                            >
                              <Minus className="w-3 h-3" />
                            </Button>
                            <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                            <Button 
                              variant="outline" 
                              size="icon" 
                              className="w-7 h-7 rounded-lg"
                              onClick={() => updateQuantity(item.id, 1)}
                            >
                              <Plus className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-sm">Rp {(item.price * item.quantity).toLocaleString('id-ID')}</p>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="text-rose-500 w-8 h-8 mt-1"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </ScrollArea>

              <div className="p-6 bg-slate-50 border-t space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-slate-600">
                    <span>Subtotal</span>
                    <span>Rp {cartTotal.toLocaleString('id-ID')}</span>
                  </div>
                  <div className="flex justify-between text-sm text-slate-600">
                    <span>Pajak (PPN 11%)</span>
                    <span>Rp {(cartTotal * 0.11).toLocaleString('id-ID')}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold text-slate-900 pt-2 border-t">
                    <span>Total</span>
                    <span className="text-primary">Rp {(cartTotal * 1.11).toLocaleString('id-ID')}</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <Button variant="outline" className="flex-col h-16 gap-1 rounded-xl">
                    <Banknote className="w-5 h-5" />
                    <span className="text-[10px]">Tunai</span>
                  </Button>
                  <Button variant="outline" className="flex-col h-16 gap-1 rounded-xl">
                    <CreditCard className="w-5 h-5" />
                    <span className="text-[10px]">Kartu</span>
                  </Button>
                  <Button variant="outline" className="flex-col h-16 gap-1 rounded-xl">
                    <QrCode className="w-5 h-5" />
                    <span className="text-[10px]">QRIS</span>
                  </Button>
                </div>

                <Button 
                  className="w-full h-14 rounded-2xl text-lg font-bold" 
                  disabled={cart.length === 0}
                  onClick={() => {
                    toast.success('Pembayaran Berhasil!');
                    setCart([]);
                    setIsCartOpen(false);
                  }}
                >
                  Konfirmasi Pembayaran
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}
