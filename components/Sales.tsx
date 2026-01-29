import { useState } from 'react'

export default function Sales({ data, onRefresh }: any) {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    channel: '',
    product_id: '',
    quantity: 1
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await fetch('/api/sales', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
    setFormData({
      date: new Date().toISOString().split('T')[0],
      channel: '',
      product_id: '',
      quantity: 1
    })
    onRefresh()
    alert('✅ Satış kaydedildi!')
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(amount)
  }

  return (
    <div>
      <div className="header">
        <h1>Satış Yönetimi</h1>
        <p>Yeni satış ekleyin</p>
      </div>

      <div className="card">
        <h2>Yeni Satış Ekle</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div>
              <label>Tarih</label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
                required
              />
            </div>
            <div>
              <label>Satış Kanalı</label>
              <select
                value={formData.channel}
                onChange={(e) => setFormData({...formData, channel: e.target.value})}
                required
              >
                <option value="">Seçiniz</option>
                <option value="Website">Website</option>
                <option value="Trendyol">Trendyol</option>
                <option value="Hepsiburada">Hepsiburada</option>
              </select>
            </div>
            <div>
              <label>Ürün</label>
              <select
                value={formData.product_id}
                onChange={(e) => setFormData({...formData, product_id: e.target.value})}
                required
              >
                <option value="">Seçiniz</option>
                {data.products.map((p: any) => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label>Adet</label>
              <input
                type="number"
                value={formData.quantity}
                onChange={(e) => setFormData({...formData, quantity: parseInt(e.target.value)})}
                min="1"
                required
              />
            </div>
          </div>
          <button type="submit" className="btn">Satış Ekle</button>
        </form>
      </div>

      <div className="card">
        <h2>Satış Geçmişi</h2>
        <table>
          <thead>
            <tr>
              <th>Tarih</th>
              <th>Kanal</th>
              <th>Ürün</th>
              <th>Adet</th>
              <th>Tutar</th>
              <th>Kar</th>
            </tr>
          </thead>
          <tbody>
            {data.sales.length === 0 ? (
              <tr><td colSpan={6} style={{textAlign: 'center', padding: '2rem'}}>Henüz satış kaydı yok</td></tr>
            ) : (
              data.sales.slice().reverse().map((sale: any) => (
                <tr key={sale.id}>
                  <td>{new Date(sale.date).toLocaleDateString('tr-TR')}</td>
                  <td><span className="badge">{sale.channel}</span></td>
                  <td>{sale.product_name}</td>
                  <td>{sale.quantity}</td>
                  <td>{formatCurrency(sale.total)}</td>
                  <td style={{color: sale.profit > 0 ? 'var(--success)' : 'var(--danger)'}}>
                    {formatCurrency(sale.profit)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <style jsx>{`
        .header { margin-bottom: 2.5rem; }
        .header h1 { font-size: 2.5rem; margin-bottom: 0.5rem; }
        .header p { color: var(--text-light); }
        .card { background: var(--card); border-radius: 16px; padding: 2rem; box-shadow: 0 2px 12px rgba(0,0,0,0.04); border: 1px solid var(--border); margin-bottom: 1.5rem; }
        .card h2 { font-size: 1.75rem; margin-bottom: 1.5rem; }
        .form-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.25rem; margin-bottom: 1.5rem; }
        label { display: block; margin-bottom: 0.5rem; font-weight: 500; }
        input, select { width: 100%; padding: 0.875rem 1rem; border: 2px solid var(--border); border-radius: 10px; font-family: inherit; }
        .btn { padding: 0.875rem 2rem; border: none; border-radius: 10px; font-weight: 600; cursor: pointer; background: var(--primary); color: white; }
        .btn:hover { background: #1f2e3d; }
        table { width: 100%; border-collapse: collapse; }
        th { background: var(--secondary); padding: 1rem; text-align: left; font-weight: 600; border-bottom: 2px solid var(--border); font-size: 0.875rem; text-transform: uppercase; }
        td { padding: 1rem; border-bottom: 1px solid var(--border); }
        .badge { background: rgba(74, 155, 127, 0.15); color: var(--success); padding: 0.35rem 0.75rem; border-radius: 20px; font-size: 0.8rem; font-weight: 600; }
      `}</style>
    </div>
  )
}
