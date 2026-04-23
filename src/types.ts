/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'owner' | 'manager' | 'cashier';
  branchId: string;
}

export interface Branch {
  id: string;
  name: string;
  address: string;
  phone: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface Product {
  id: string;
  name: string;
  sku: string;
  price: number;
  costPrice: number; // For FIFO
  stock: number;
  categoryId: string;
  image?: string;
}

export interface CartItem extends Product {
  quantity: number;
  discount?: number;
}

export interface Transaction {
  id: string;
  branchId: string;
  cashierId: string;
  customerId?: string;
  items: CartItem[];
  total: number;
  tax: number;
  discount: number;
  grandTotal: number;
  paymentMethod: 'cash' | 'card' | 'qris';
  createdAt: string;
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  points: number;
  email?: string;
}

export interface CashierShift {
  id: string;
  cashierId: string;
  branchId: string;
  startTime: string;
  endTime?: string;
  startingCash: number;
  endingCash?: number;
  totalSales: number;
  status: 'open' | 'closed';
}

export interface PPOBProduct {
  id: string;
  name: string;
  category: 'pulsa' | 'data' | 'pln' | 'topup';
  provider: string;
  price: number;
  cost: number;
}
