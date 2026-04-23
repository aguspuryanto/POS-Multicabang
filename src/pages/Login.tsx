/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import * as React from "react"
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, Store, Lock, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { motion } from 'motion/react';

export default function Login() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate login
    setTimeout(() => {
      navigate('/dashboard');
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 font-sans">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20 mb-4">
            <ShoppingCart className="text-white w-10 h-10" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">POS 2026</h1>
          <p className="text-slate-500 font-medium">Sistem Kasir Terintegrasi</p>
        </div>

        <Card className="border-none shadow-xl shadow-slate-200/50">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Masuk</CardTitle>
            <CardDescription>
              Pilih cabang dan masukkan kredensial Anda
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="branch">Cabang</Label>
                <Select defaultValue="b1">
                  <SelectTrigger id="branch" className="bg-slate-50 border-slate-200">
                    <SelectValue placeholder="Pilih Cabang" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="b1">Cabang Utama Jakarta</SelectItem>
                    <SelectItem value="b2">Cabang Bandung</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                  <Input
                    id="username"
                    placeholder="admin"
                    className="pl-10 bg-slate-50 border-slate-200"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className="pl-10 bg-slate-50 border-slate-200"
                    required
                  />
                </div>
              </div>

              <Button className="w-full h-12 text-base font-semibold" type="submit" disabled={isLoading}>
                {isLoading ? "Memproses..." : "Masuk ke Sistem"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <p className="mt-8 text-center text-sm text-slate-400">
          &copy; 2026 POS Multicabang. All rights reserved.
        </p>
      </motion.div>
    </div>
  );
}
