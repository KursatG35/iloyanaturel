'use client'

import { useState, useEffect } from 'react'
import Dashboard from '@/components/Dashboard'
import Products from '@/components/Products'
import Sales from '@/components/Sales'
import Purchases from '@/components/Purchases'
import Expenses from '@/components/Expenses'
import Reports from '@/components/Reports'
import Sidebar from '@/components/Sidebar'

type Section = 'dashboard' | 'products' | 'sales' | 'purchases' | 'expenses' | 'reports'

export default function Home() {
  const [activeSection, setActiveSection] = useState<Section>('dashboard')
  const [data, setData] = useState({
    products: [],
    sales: [],
    purchases: [],
    expenses: [],
  })

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const [products, sales, purchases, expenses] = await Promise.all([
        fetch('/api/products').then(r => r.json()),
        fetch('/api/sales').then(r => r.json()),
        fetch('/api/purchases').then(r => r.json()),
        fetch('/api/expenses').then(r => r.json()),
      ])
      
      setData({ products, sales, purchases, expenses })
    } catch (error) {
      console.error('Veri yükleme hatası:', error)
    }
  }

  const refreshData = () => {
    loadData()
  }

  return (
    <div className="app-container">
      <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />
      
      <main className="main-content">
        {activeSection === 'dashboard' && <Dashboard data={data} />}
        {activeSection === 'products' && <Products data={data.products} onRefresh={refreshData} />}
        {activeSection === 'sales' && <Sales data={data} onRefresh={refreshData} />}
        {activeSection === 'purchases' && <Purchases data={data} onRefresh={refreshData} />}
        {activeSection === 'expenses' && <Expenses data={data.expenses} onRefresh={refreshData} />}
        {activeSection === 'reports' && <Reports data={data} />}
      </main>

      <style jsx>{`
        .app-container {
          display: flex;
          min-height: 100vh;
        }

        .main-content {
          flex: 1;
          margin-left: 280px;
          padding: 2rem;
          animation: fadeIn 0.4s ease;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 768px) {
          .main-content {
            margin-left: 0;
            padding: 1rem;
          }
        }
      `}</style>
    </div>
  )
}
