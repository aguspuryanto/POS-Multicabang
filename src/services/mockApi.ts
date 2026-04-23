/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Product, Category, Branch, User, Customer, Transaction, PPOBProduct } from '../types';

const MOCK_BRANCHES: Branch[] = [
  { id: 'b1', name: 'Cabang Utama Jakarta', address: 'Jl. Sudirman No. 1', phone: '021-123456' },
  { id: 'b2', name: 'Cabang Bandung', address: 'Jl. Asia Afrika No. 10', phone: '022-654321' },
];

const MOCK_CATEGORIES: Category[] = [
  { id: 'c1', name: 'Makanan', slug: 'makanan' },
  { id: 'c2', name: 'Minuman', slug: 'minuman' },
  { id: 'c3', name: 'Snack', slug: 'snack' },
  { id: 'c4', name: 'Kebutuhan Pokok', slug: 'kebutuhan-pokok' },
];

const MOCK_PRODUCTS: Product[] = [
  { id: 'p1', name: 'Indomie Goreng', sku: 'IDM001', price: 3500, costPrice: 2800, stock: 100, categoryId: 'c1', image: 'https://picsum.photos/seed/indomie/200/200' },
  { id: 'p2', name: 'Aqua 600ml', sku: 'AQ001', price: 5000, costPrice: 3500, stock: 50, categoryId: 'c2', image: 'https://picsum.photos/seed/aqua/200/200' },
  { id: 'p3', name: 'Chitato Sapi Panggang', sku: 'CHT001', price: 12000, costPrice: 9500, stock: 30, categoryId: 'c3', image: 'https://picsum.photos/seed/chitato/200/200' },
  { id: 'p4', name: 'Beras Premium 5kg', sku: 'BRS001', price: 75000, costPrice: 65000, stock: 20, categoryId: 'c4', image: 'https://picsum.photos/seed/rice/200/200' },
  { id: 'p5', name: 'Coca Cola 330ml', sku: 'CC001', price: 8000, costPrice: 6000, stock: 40, categoryId: 'c2', image: 'https://picsum.photos/seed/coke/200/200' },
  { id: 'p6', name: 'Kopi Kapal Api', sku: 'KKA001', price: 1500, costPrice: 1000, stock: 200, categoryId: 'c2', image: 'https://picsum.photos/seed/coffee/200/200' },
];

const MOCK_CUSTOMERS: Customer[] = [
  { id: 'cust1', name: 'Budi Santoso', phone: '08123456789', points: 150, email: 'budi@example.com' },
  { id: 'cust2', name: 'Siti Aminah', phone: '08987654321', points: 45, email: 'siti@example.com' },
];

const MOCK_PPOB: PPOBProduct[] = [
  { id: 'ppob1', name: 'Pulsa Telkomsel 10k', category: 'pulsa', provider: 'Telkomsel', price: 12500, cost: 11000 },
  { id: 'ppob2', name: 'Paket Data XL 5GB', category: 'data', provider: 'XL', price: 55000, cost: 51000 },
  { id: 'ppob3', name: 'Token PLN 50k', category: 'pln', provider: 'PLN', price: 52000, cost: 50500 },
];

export const mockApi = {
  getBranches: async () => MOCK_BRANCHES,
  getCategories: async () => MOCK_CATEGORIES,
  getProducts: async (branchId: string) => MOCK_PRODUCTS,
  getCustomers: async () => MOCK_CUSTOMERS,
  getPPOBProducts: async () => MOCK_PPOB,
  createTransaction: async (transaction: Omit<Transaction, 'id' | 'createdAt'>) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: `TRX-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      createdAt: new Date().toISOString(),
    };
    console.log('Transaction Created:', newTransaction);
    return newTransaction;
  },
  getTransactions: async (branchId: string) => {
    // Return some mock history
    return [];
  }
};
