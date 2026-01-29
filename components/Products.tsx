export default function Products({ data, onRefresh }: any) {
  const updateProduct = async (id: string, field: string, value: any) => {
    await fetch('/api/products', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, [field]: parseFloat(value) })
    })
    onRefresh()
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(amount)
  }

  return (
    <div>
      <div className="header">
        <h1>Ürün Yönetimi</h1>
        <p>Ürün maliyetlerini ve stoklarını güncelleyin</p>
      </div>

      <div className="card">
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Ürün Adı</th>
                <th>Fiyat</th>
                <th>Maliyet</th>
                <th>Stok</th>
                <th>Min. Stok</th>
                <th>Durum</th>
              </tr>
            </thead>
            <tbody>
              {data.map((product: any) => (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>{formatCurrency(product.discount_price || product.price)}</td>
                  <td>
                    <input
                      type="number"
                      defaultValue={product.cost}
                      onBlur={(e) => updateProduct(product.id, 'cost', e.target.value)}
                      className="table-input"
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      defaultValue={product.stock}
                      onBlur={(e) => updateProduct(product.id, 'stock', e.target.value)}
                      className="table-input"
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      defaultValue={product.min_stock}
                      onBlur={(e) => updateProduct(product.id, 'min_stock', e.target.value)}
                      className="table-input"
                    />
                  </td>
                  <td>
                    {product.stock < product.min_stock ? (
                      <span className="badge badge-danger">Düşük</span>
                    ) : (
                      <span className="badge badge-success">Normal</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

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
        .card {
          background: var(--card);
          border-radius: 16px;
          padding: 2rem;
          box-shadow: 0 2px 12px rgba(0,0,0,0.04);
          border: 1px solid var(--border);
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
        }
        td {
          padding: 1rem;
          border-bottom: 1px solid var(--border);
        }
        .table-input {
          width: 100px;
          padding: 0.5rem;
          border: 1px solid var(--border);
          border-radius: 6px;
          font-family: inherit;
        }
        .badge {
          display: inline-block;
          padding: 0.35rem 0.75rem;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 600;
        }
        .badge-success {
          background: rgba(74, 155, 127, 0.15);
          color: var(--success);
        }
        .badge-danger {
          background: rgba(200, 92, 92, 0.15);
          color: var(--danger);
        }
      `}</style>
    </div>
  )
}
