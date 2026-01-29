type DashboardProps = {
  data: any
}

export default function Dashboard({ data }: DashboardProps) {
  const { products = [], sales = [], expenses = [] } = data

  const totalSales = sales.reduce((sum: number, s: any) => sum + (s.total || 0), 0)
  const totalProfit = sales.reduce((sum: number, s: any) => sum + (s.profit || 0), 0)
  const totalExpenses = expenses.reduce((sum: number, e: any) => sum + (e.amount || 0), 0)
  const netProfit = totalProfit - totalExpenses
  const profitMargin = totalSales > 0 ? (totalProfit / totalSales) * 100 : 0

  const lowStock = products.filter((p: any) => p.stock < p.min_stock)

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(amount)
  }

  return (
    <div>
      <div className="header">
        <h1>Dashboard</h1>
        <p>İşletmenizin genel durumu</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-label">Toplam Satış</div>
          <div className="stat-value">{formatCurrency(totalSales)}</div>
          <div className="stat-change positive">↗ {sales.length} sipariş</div>
        </div>

        <div className="stat-card">
          <div className="stat-label">Net Kar</div>
          <div className="stat-value">{formatCurrency(netProfit)}</div>
          <div className={`stat-change ${profitMargin > 0 ? 'positive' : 'negative'}`}>
            {profitMargin.toFixed(1)}% marj
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-label">Toplam Gider</div>
          <div className="stat-value">{formatCurrency(totalExpenses)}</div>
        </div>

        <div className="stat-card">
          <div className="stat-label">Düşük Stok Uyarısı</div>
          <div className="stat-value">{lowStock.length}</div>
          <div className={`stat-change ${lowStock.length > 0 ? 'negative' : 'positive'}`}>
            {lowStock.length > 0 ? '⚠️ Dikkat' : '✅ Normal'}
          </div>
        </div>
      </div>

      {lowStock.length > 0 && (
        <div className="card">
          <h2>Düşük Stoklu Ürünler</h2>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Ürün</th>
                  <th>Mevcut</th>
                  <th>Minimum</th>
                  <th>Durum</th>
                </tr>
              </thead>
              <tbody>
                {lowStock.slice(0, 10).map((product: any) => (
                  <tr key={product.id}>
                    <td>{product.name}</td>
                    <td>{product.stock}</td>
                    <td>{product.min_stock}</td>
                    <td><span className="badge badge-danger">⚠️ Kritik</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <style jsx>{`
        .header {
          margin-bottom: 2.5rem;
        }

        .header h1 {
          font-size: 2.5rem;
          margin-bottom: 0.5rem;
        }

        .header p {
          color: var(--text-light);
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .stat-card {
          background: var(--card);
          padding: 1.75rem;
          border-radius: 16px;
          box-shadow: 0 2px 12px rgba(0,0,0,0.04);
          border: 1px solid var(--border);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .stat-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.08);
        }

        .stat-label {
          font-size: 0.875rem;
          color: var(--text-light);
          font-weight: 500;
          margin-bottom: 0.5rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .stat-value {
          font-size: 2rem;
          font-weight: 700;
          color: var(--primary);
          margin-bottom: 0.5rem;
        }

        .stat-change {
          font-size: 0.875rem;
        }

        .stat-change.positive {
          color: var(--success);
        }

        .stat-change.negative {
          color: var(--danger);
        }

        .card {
          background: var(--card);
          border-radius: 16px;
          padding: 2rem;
          box-shadow: 0 2px 12px rgba(0,0,0,0.04);
          border: 1px solid var(--border);
          margin-bottom: 1.5rem;
        }

        .card h2 {
          font-size: 1.75rem;
          margin-bottom: 1.5rem;
        }

        .table-container {
          overflow-x: auto;
        }

        table {
          width: 100%;
          border-collapse: collapse;
        }

        th {
          background: var(--secondary);
          padding: 1rem;
          text-align: left;
          font-weight: 600;
          color: var(--primary);
          border-bottom: 2px solid var(--border);
          font-size: 0.875rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        td {
          padding: 1rem;
          border-bottom: 1px solid var(--border);
        }

        .badge {
          display: inline-block;
          padding: 0.35rem 0.75rem;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 600;
        }

        .badge-danger {
          background: rgba(200, 92, 92, 0.15);
          color: var(--danger);
        }

        @media (max-width: 768px) {
          .stats-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  )
}
