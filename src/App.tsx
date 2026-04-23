/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import POS from './pages/POS';
import Inventory from './pages/Inventory';
import Customers from './pages/Customers';
import PPOB from './pages/PPOB';
import Settings from './pages/Settings';
import MainLayout from './components/MainLayout';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="pos" element={<POS />} />
            <Route path="inventory" element={<Inventory />} />
            <Route path="customers" element={<Customers />} />
            <Route path="ppob" element={<PPOB />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </Router>
      <Toaster position="top-center" />
    </QueryClientProvider>
  );
}
