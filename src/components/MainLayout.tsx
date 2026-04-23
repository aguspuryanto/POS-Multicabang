/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { LayoutDashboard, ShoppingCart, Package, Users, Smartphone, Settings, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: ShoppingCart, label: 'POS', path: '/pos' },
  { icon: Smartphone, label: 'PPOB', path: '/ppob' },
  { icon: Package, label: 'Stok', path: '/inventory' },
  { icon: Users, label: 'Pelanggan', path: '/customers' },
];

export default function MainLayout() {
  const location = useLocation();

  return (
    <div className="flex flex-col h-screen bg-slate-50 font-sans">
      {/* Header */}
      <header className="bg-white border-b px-4 py-3 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <ShoppingCart className="text-white w-5 h-5" />
          </div>
          <h1 className="font-bold text-lg tracking-tight">POS 2026</h1>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium bg-slate-100 px-2 py-1 rounded text-slate-600">
            Cabang Utama
          </span>
          <Button variant="ghost" size="icon" className="text-slate-500">
            <LogOut className="w-5 h-5" />
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-20">
        <Outlet />
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around items-center px-2 py-2 z-50">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                cn(
                  "flex flex-col items-center gap-1 px-3 py-1 rounded-xl transition-all duration-200",
                  isActive ? "text-primary" : "text-slate-400 hover:text-slate-600"
                )
              }
            >
              <Icon className={cn("w-6 h-6", isActive && "fill-primary/10")} />
              <span className="text-[10px] font-medium">{item.label}</span>
              {isActive && (
                <div className="w-1 h-1 bg-primary rounded-full absolute bottom-1" />
              )}
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
}
