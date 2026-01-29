// Simple in-memory data store for demo
// In production, use Vercel KV, MongoDB, or PostgreSQL

import initialProducts from '@/data/initial-products.json'

let data = {
  products: initialProducts,
  sales: [] as any[],
  purchases: [] as any[],
  expenses: [] as any[],
}

export const store = {
  getProducts: () => data.products,
  getSales: () => data.sales,
  getPurchases: () => data.purchases,
  getExpenses: () => data.expenses,
  
  updateProduct: (id: string, updates: any) => {
    const index = data.products.findIndex((p: any) => p.id === id)
    if (index !== -1) {
      data.products[index] = { ...data.products[index], ...updates }
      return data.products[index]
    }
    return null
  },
  
  addSale: (sale: any) => {
    data.sales.push(sale)
    // Update stock
    const product = data.products.find((p: any) => p.id === sale.product_id)
    if (product) {
      product.stock -= sale.quantity
    }
    return sale
  },
  
  addPurchase: (purchase: any) => {
    data.purchases.push(purchase)
    // Update stock
    const product = data.products.find((p: any) => p.id === purchase.product_id)
    if (product) {
      product.stock += purchase.quantity
    }
    return purchase
  },
  
  addExpense: (expense: any) => {
    data.expenses.push(expense)
    return expense
  },
  
  deleteSale: (id: string) => {
    data.sales = data.sales.filter((s: any) => s.id !== id)
  },
}
