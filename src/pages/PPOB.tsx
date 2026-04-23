/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Smartphone, Zap, Wifi, Tv, CreditCard, Search, ChevronRight, History } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mockApi } from '@/services/mockApi';
import { motion } from 'motion/react';
import { toast } from 'sonner';

const categories = [
  { id: 'pulsa', label: 'Pulsa', icon: Smartphone, color: 'text-blue-600', bg: 'bg-blue-50' },
  { id: 'data', label: 'Paket Data', icon: Wifi, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { id: 'pln', label: 'Token PLN', icon: Zap, color: 'text-orange-600', bg: 'bg-orange-50' },
  { id: 'topup', label: 'E-Wallet', icon: CreditCard, color: 'text-purple-600', bg: 'bg-purple-50' },
];

export default function PPOB() {
  const [activeTab, setActiveTab] = useState('pulsa');
  const [phoneNumber, setPhoneNumber] = useState('');

  const { data: ppobProducts = [] } = useQuery({
    queryKey: ['ppob-products'],
    queryFn: () => mockApi.getPPOBProducts(),
  });

  const filteredProducts = ppobProducts.filter(p => p.category === activeTab);

  const handleTransaction = (productName: string) => {
    if (!phoneNumber) {
      toast.error('Masukkan nomor tujuan terlebih dahulu');
      return;
    }
    toast.success(`Transaksi ${productName} untuk ${phoneNumber} sedang diproses`);
    setPhoneNumber('');
  };

  return (
    <div className="p-4 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Layanan Digital</h2>
          <p className="text-slate-500 text-sm">Pulsa, Paket Data, & Tagihan</p>
        </div>
        <Button size="icon" variant="outline" className="rounded-xl">
          <History className="w-5 h-5" />
        </Button>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-4 gap-3">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveTab(cat.id)}
            className={cn(
              "flex flex-col items-center gap-2 p-3 rounded-2xl transition-all duration-200 border",
              activeTab === cat.id ? "bg-white border-primary shadow-sm" : "bg-white border-transparent shadow-none"
            )}
          >
            <div className={cn("p-2.5 rounded-xl", activeTab === cat.id ? "bg-primary text-white" : cn(cat.bg, cat.color))}>
              <cat.icon className="w-6 h-6" />
            </div>
            <span className={cn("text-[10px] font-bold uppercase tracking-tight", activeTab === cat.id ? "text-primary" : "text-slate-500")}>
              {cat.label}
            </span>
          </button>
        ))}
      </div>

      {/* Input Section */}
      <Card className="border-none shadow-sm overflow-hidden">
        <CardContent className="p-4 space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Nomor Tujuan / ID Pelanggan</label>
            <div className="relative">
              <Input 
                placeholder="Contoh: 08123456789" 
                className="h-12 text-lg font-bold tracking-widest bg-slate-50 border-slate-200 rounded-xl"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
              <div className="absolute right-3 top-3.5 flex gap-1">
                <div className="w-5 h-5 bg-blue-600 rounded-full" />
                <div className="w-5 h-5 bg-red-600 rounded-full -ml-2" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Product List */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider px-1">Pilih Produk</h3>
        <div className="space-y-2">
          {filteredProducts.map((product, i) => (
            <motion.button
              key={product.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="w-full bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between active:scale-[0.98] transition-transform"
              onClick={() => handleTransaction(product.name)}
            >
              <div className="text-left">
                <p className="text-sm font-bold text-slate-900">{product.name}</p>
                <p className="text-xs text-slate-500">{product.provider}</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm font-bold text-primary">Rp {product.price.toLocaleString('id-ID')}</p>
                  <p className="text-[10px] text-slate-400 line-through">Rp {(product.price + 2000).toLocaleString('id-ID')}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-300" />
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}

import { cn } from '@/lib/utils';
