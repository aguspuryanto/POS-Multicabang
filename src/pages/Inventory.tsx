/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Package, Search, ArrowUpDown, AlertTriangle, Plus, History, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent } from '@/components/ui/card';
import { mockApi } from '@/services/mockApi';
import { motion } from 'motion/react';

export default function Inventory() {
  const [search, setSearch] = useState('');
  
  const { data: products = [] } = useQuery({
    queryKey: ['products'],
    queryFn: () => mockApi.getProducts('b1'),
  });

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) || 
    p.sku.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Manajemen Stok</h2>
          <p className="text-slate-500 text-sm">Total {products.length} item terdaftar</p>
        </div>
        <Button size="icon" variant="outline" className="rounded-xl">
          <History className="w-5 h-5" />
        </Button>
      </div>

      {/* Search & Filter */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
          <Input 
            placeholder="Cari SKU atau nama barang..." 
            className="pl-10 bg-white border-slate-200 h-11 rounded-xl"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Button variant="outline" size="icon" className="h-11 w-11 rounded-xl">
          <Filter className="w-4 h-4" />
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="border-none shadow-sm bg-rose-50">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 bg-rose-100 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-rose-600" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-rose-600 uppercase">Stok Menipis</p>
              <p className="text-lg font-bold text-rose-900">8 Item</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm bg-blue-50">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Package className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-blue-600 uppercase">Total Unit</p>
              <p className="text-lg font-bold text-blue-900">1.240</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Product List */}
      <div className="space-y-3">
        {filteredProducts.map((product, i) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-slate-100 overflow-hidden flex-shrink-0">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{product.sku}</span>
                  {product.stock < 20 && (
                    <Badge variant="destructive" className="text-[8px] h-4 px-1 uppercase font-bold">Low</Badge>
                  )}
                </div>
                <h4 className="font-bold text-sm text-slate-900 truncate">{product.name}</h4>
                <div className="flex items-center gap-4 mt-1">
                  <div className="flex items-center gap-1">
                    <Package className="w-3 h-3 text-slate-400" />
                    <span className="text-xs font-bold text-slate-700">{product.stock} Unit</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                    <span className="text-xs font-medium text-slate-500">FIFO Batch: 3</span>
                  </div>
                </div>
              </div>
              <Button size="icon" variant="ghost" className="rounded-full text-primary hover:bg-primary/5">
                <Plus className="w-5 h-5" />
              </Button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Floating Action Button */}
      <Button className="fixed bottom-24 right-6 w-14 h-14 rounded-full shadow-xl shadow-primary/30 flex items-center justify-center p-0">
        <Plus className="w-7 h-7" />
      </Button>
    </div>
  );
}
