import { useState } from 'react'

export default function Purchases({ data, onRefresh }: any) {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    supplier: '',
    product_id: '',
    quantity: 1,
    unit_cost: 0
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await fetch('/api/purchases', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
    setFormData({
      date: new Date().toISOString().split('T')[0],
      supplier: '',
      product_id: '',
      quantity: 1,
      unit_cost: 0
    })
    onRefresh()
    alert('✅ Alım kaydedildi!')
  }

  const formatCurrency = (amount: number) => new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(amount)

  return (
    <div>
      <div className="header">
        <h1>Alım Yönetimi</h1>
        <p>Tedarikçi alımlarını kaydedin</p>
      </div>

      <div className="card">
        <h2>Yeni Alım Ekle</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div><label>Tarih</label><input type="date" value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} required /></div>
            <div><label>Tedarikçi</label><input type="text" value={formData.supplier} onChange={(e) => setFormData({...formData, supplier: e.target.value})} required /></div>
            <div><label>Ürün</label><select value={formData.product_id} onChange={(e) => setFormData({...formData, product_id: e.target.value})} required><option value="">Seçiniz</option>{data.products.map((p: any) => (<option key={p.id} value={p.id}>{p.name}</option>))}</select></div>
            <div><label>Adet</label><input type="number" value={formData.quantity} onChange={(e) => setFormData({...formData, quantity: parseInt(e.target.value)})} min="1" required /></div>
            <div><label>Birim Maliyet (₺)</label><input type="number" step="0.01" value={formData.unit_cost} onChange={(e) => setFormData({...formData, unit_cost: parseFloat(e.target.value)})} required /></div>
          </div>
          <button type="submit" className="btn">Alım Ekle</button>
        </form>
      </div>

      <div className="card">
        <h2>Alım Geçmişi</h2>
        <table>
          <thead><tr><th>Tarih</th><th>Tedarikçi</th><th>Ürün</th><th>Adet</th><th>Birim Maliyet</th><th>Toplam</th></tr></thead>
          <tbody>
            {data.purchases.length === 0 ? (<tr><td colSpan={6} style={{textAlign: 'center', padding: '2rem'}}>Henüz alım kaydı yok</td></tr>) : (
              data.purchases.slice().reverse().map((purchase: any) => (
                <tr key={purchase.id}>
                  <td>{new Date(purchase.date).toLocaleDateString('tr-TR')}</td>
                  <td>{purchase.supplier}</td>
                  <td>{purchase.product_name}</td>
                  <td>{purchase.quantity}</td>
                  <td>{formatCurrency(purchase.unit_cost)}</td>
                  <td>{formatCurrency(purchase.total_cost)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <style jsx>{`
        .header { margin-bottom: 2.5rem; }
        .header h1 { font-size: 2.5rem; margin-bottom: 0.5rem; }
        .card { background: var(--card); border-radius: 16px; padding: 2rem; box-shadow: 0 2px 12px rgba(0,0,0,0.04); border: 1px solid var(--border); margin-bottom: 1.5rem; }
        .card h2 { font-size: 1.75rem; margin-bottom: 1.5rem; }
        .form-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.25rem; margin-bottom: 1.5rem; }
        label { display: block; margin-bottom: 0.5rem; font-weight: 500; }
        input, select { width: 100%; padding: 0.875rem 1rem; border: 2px solid var(--border); border-radius: 10px; font-family: inherit; }
        .btn { padding: 0.875rem 2rem; border: none; border-radius: 10px; font-weight: 600; cursor: pointer; background: var(--primary); color: white; }
        table { width: 100%; border-collapse: collapse; }
        th { background: var(--secondary); padding: 1rem; text-align: left; font-weight: 600; border-bottom: 2px solid var(--border); font-size: 0.875rem; text-transform: uppercase; }
        td { padding: 1rem; border-bottom: 1px solid var(--border); }
      `}</style>
    </div>
  )
}
