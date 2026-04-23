/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Users, Search, UserPlus, Phone, Mail, Award, ChevronRight, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mockApi } from '@/services/mockApi';
import { motion } from 'motion/react';

export default function Customers() {
  const [search, setSearch] = useState('');

  const { data: customers = [] } = useQuery({
    queryKey: ['customers'],
    queryFn: () => mockApi.getCustomers(),
  });

  const filteredCustomers = customers.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) || 
    c.phone.includes(search)
  );

  return (
    <div className="p-4 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Pelanggan</h2>
          <p className="text-slate-500 text-sm">{customers.length} Member terdaftar</p>
        </div>
        <Button size="icon" variant="outline" className="rounded-xl">
          <UserPlus className="w-5 h-5" />
        </Button>
      </div>

      {/* Search */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
          <Input 
            placeholder="Cari nama atau nomor HP..." 
            className="pl-10 bg-white border-slate-200 h-11 rounded-xl"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Button variant="outline" size="icon" className="h-11 w-11 rounded-xl">
          <Filter className="w-4 h-4" />
        </Button>
      </div>

      {/* Loyalty Banner */}
      <Card className="border-none bg-gradient-to-br from-primary to-blue-700 text-white shadow-lg shadow-primary/20">
        <CardContent className="p-6 flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="text-lg font-bold">Loyalty Program</h3>
            <p className="text-white/80 text-xs">Berikan poin untuk setiap transaksi pelanggan Anda.</p>
            <Button variant="secondary" size="sm" className="mt-2 h-8 text-xs font-bold rounded-lg">
              Atur Program
            </Button>
          </div>
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
            <Award className="w-8 h-8 text-white" />
          </div>
        </CardContent>
      </Card>

      {/* Customer List */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider px-1">Daftar Member</h3>
        <div className="space-y-3">
          {filteredCustomers.map((customer, i) => (
            <motion.div
              key={customer.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
            >
              <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold text-lg">
                  {customer.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-sm text-slate-900 truncate">{customer.name}</h4>
                  <div className="flex flex-col gap-0.5 mt-1">
                    <div className="flex items-center gap-1.5 text-slate-500">
                      <Phone className="w-3 h-3" />
                      <span className="text-[11px] font-medium">{customer.phone}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-500">
                      <Award className="w-3 h-3 text-orange-500" />
                      <span className="text-[11px] font-bold text-orange-600">{customer.points} Poin</span>
                    </div>
                  </div>
                </div>
                <Button size="icon" variant="ghost" className="text-slate-300">
                  <ChevronRight className="w-6 h-6" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
