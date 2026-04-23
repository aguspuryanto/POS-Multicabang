/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Store, User, Shield, Bell, HelpCircle, LogOut, ChevronRight, Moon, Globe, Printer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useNavigate } from 'react-router-dom';

const settingsGroups = [
  {
    title: 'Akun & Keamanan',
    items: [
      { icon: User, label: 'Profil Saya', color: 'text-blue-600', bg: 'bg-blue-50' },
      { icon: Shield, label: 'Keamanan & Password', color: 'text-emerald-600', bg: 'bg-emerald-50' },
    ]
  },
  {
    title: 'Operasional',
    items: [
      { icon: Store, label: 'Informasi Cabang', color: 'text-orange-600', bg: 'bg-orange-50' },
      { icon: Printer, label: 'Pengaturan Struk', color: 'text-slate-600', bg: 'bg-slate-50' },
      { icon: Globe, label: 'Bahasa & Wilayah', color: 'text-purple-600', bg: 'bg-purple-50' },
    ]
  },
  {
    title: 'Preferensi',
    items: [
      { icon: Bell, label: 'Notifikasi', color: 'text-rose-600', bg: 'bg-rose-50' },
      { icon: Moon, label: 'Mode Gelap', color: 'text-indigo-600', bg: 'bg-indigo-50', toggle: true },
    ]
  },
  {
    title: 'Lainnya',
    items: [
      { icon: HelpCircle, label: 'Pusat Bantuan', color: 'text-slate-600', bg: 'bg-slate-50' },
    ]
  }
];

export default function Settings() {
  const navigate = useNavigate();

  return (
    <div className="p-4 space-y-6">
      <h2 className="text-2xl font-bold tracking-tight text-slate-900">Pengaturan</h2>

      {/* Profile Card */}
      <Card className="border-none shadow-sm overflow-hidden bg-white">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <Avatar className="w-16 h-16 border-2 border-primary/10">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-slate-900">Admin Utama</h3>
              <p className="text-xs font-medium text-slate-500">admin@pos2026.com</p>
              <Badge className="mt-2 bg-primary/10 text-primary border-none text-[10px] font-bold uppercase">Super Admin</Badge>
            </div>
            <Button variant="outline" size="sm" className="rounded-xl h-9">Edit</Button>
          </div>
        </CardContent>
      </Card>

      {/* Settings List */}
      <div className="space-y-6">
        {settingsGroups.map((group) => (
          <div key={group.title} className="space-y-3">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">{group.title}</h3>
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              {group.items.map((item, i) => (
                <div key={item.label}>
                  <button className="w-full p-4 flex items-center justify-between active:bg-slate-50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className={cn("p-2 rounded-xl", item.bg, item.color)}>
                        <item.icon className="w-5 h-5" />
                      </div>
                      <span className="text-sm font-bold text-slate-700">{item.label}</span>
                    </div>
                    {item.toggle ? (
                      <div className="w-10 h-6 bg-slate-200 rounded-full relative">
                        <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm" />
                      </div>
                    ) : (
                      <ChevronRight className="w-5 h-5 text-slate-300" />
                    )}
                  </button>
                  {i < group.items.length - 1 && <Separator className="mx-4 w-auto bg-slate-50" />}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <Button 
        variant="ghost" 
        className="w-full h-14 rounded-2xl text-rose-500 font-bold hover:bg-rose-50 hover:text-rose-600 gap-2"
        onClick={() => navigate('/login')}
      >
        <LogOut className="w-5 h-5" />
        Keluar dari Akun
      </Button>

      <div className="text-center pb-8">
        <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">POS 2026 v1.0.4 (Build 20260415)</p>
      </div>
    </div>
  );
}

import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
