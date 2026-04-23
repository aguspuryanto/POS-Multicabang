/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, Users, Package, ShoppingBag, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'motion/react';

const data = [
  { name: '08:00', sales: 4000 },
  { name: '10:00', sales: 3000 },
  { name: '12:00', sales: 2000 },
  { name: '14:00', sales: 2780 },
  { name: '16:00', sales: 1890 },
  { name: '18:00', sales: 2390 },
  { name: '20:00', sales: 3490 },
];

const stats = [
  { label: 'Total Penjualan', value: 'Rp 12.450.000', icon: TrendingUp, trend: '+12.5%', trendUp: true, color: 'text-blue-600', bg: 'bg-blue-50' },
  { label: 'Transaksi', value: '142', icon: ShoppingBag, trend: '+5.2%', trendUp: true, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { label: 'Pelanggan Baru', value: '12', icon: Users, trend: '-2.1%', trendUp: false, color: 'text-orange-600', bg: 'bg-orange-50' },
  { label: 'Stok Rendah', value: '8 Item', icon: Package, trend: 'Perlu Cek', trendUp: false, color: 'text-rose-600', bg: 'bg-rose-50' },
];

export default function Dashboard() {
  return (
    <div className="p-4 space-y-6">
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">Ringkasan Hari Ini</h2>
        <p className="text-slate-500 text-sm">Update terakhir: 15 April 2026, 23:15</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="border-none shadow-sm overflow-hidden">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className={cn("p-2 rounded-lg", stat.bg)}>
                    <stat.icon className={cn("w-5 h-5", stat.color)} />
                  </div>
                  <div className={cn("flex items-center text-[10px] font-bold px-1.5 py-0.5 rounded-full", 
                    stat.trendUp ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-600")}>
                    {stat.trendUp ? <ArrowUpRight className="w-3 h-3 mr-0.5" /> : <ArrowDownRight className="w-3 h-3 mr-0.5" />}
                    {stat.trend}
                  </div>
                </div>
                <div className="space-y-0.5">
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">{stat.label}</p>
                  <p className="text-lg font-bold text-slate-900">{stat.value}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Chart */}
      <Card className="border-none shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold">Grafik Penjualan</CardTitle>
        </CardHeader>
        <CardContent className="p-0 h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 10, fill: '#94a3b8' }} 
                dy={10}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 10, fill: '#94a3b8' }} 
              />
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
              />
              <Area 
                type="monotone" 
                dataKey="sales" 
                stroke="#3b82f6" 
                strokeWidth={2}
                fillOpacity={1} 
                fill="url(#colorSales)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Recent Transactions */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold">Transaksi Terakhir</h3>
          <Button variant="link" className="text-xs text-primary p-0 h-auto">Lihat Semua</Button>
        </div>
        <div className="space-y-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white p-3 rounded-xl flex items-center justify-between shadow-sm border border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold">
                  {i === 1 ? 'BS' : i === 2 ? 'SA' : 'C'}
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">
                    {i === 1 ? 'Budi Santoso' : i === 2 ? 'Siti Aminah' : 'Cash Customer'}
                  </p>
                  <p className="text-[10px] text-slate-500">TRX-98234{i} • 14:2{i}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-slate-900">Rp {i * 45000}</p>
                <p className="text-[10px] text-emerald-600 font-medium">Selesai</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
