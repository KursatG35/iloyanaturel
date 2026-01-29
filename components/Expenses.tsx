import { useState } from 'react'

export default function Expenses({ data, onRefresh }: any) {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    category: '',
    description: '',
    amount: 0
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await fetch('/api/expenses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
    setFormData({ date: new Date().toISOString().split('T')[0], category: '', description: '', amount: 0 })
    onRefresh()
    alert('✅ Gider kaydedildi!')
  }

  const formatCurrency = (amount: number) => new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(amount)

  return (
    <div>
      <div className="header"><h1>Gider Yönetimi</h1><p>Operasyonel giderlerinizi kaydedin</p></div>
      <div className="card">
        <h2>Yeni Gider Ekle</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div><label>Tarih</label><input type="date" value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} required /></div>
            <div><label>Kategori</label><select value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} required><option value="">Seçiniz</option><option value="Kira">Kira</option><option value="Elektrik">Elektrik</option><option value="Reklam">Reklam</option><option value="Kargo">Kargo</option><option value="Maaş">Maaş</option><option value="Diğer">Diğer</option></select></div>
            <div><label>Açıklama</label><input type="text" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} required /></div>
            <div><label>Tutar (₺)</label><input type="number" step="0.01" value={formData.amount} onChange={(e) => setFormData({...formData, amount: parseFloat(e.target.value)})} required /></div>
          </div>
          <button type="submit" className="btn">Gider Ekle</button>
        </form>
      </div>
      <div className="card">
        <h2>Gider Geçmişi</h2>
        <table>
          <thead><tr><th>Tarih</th><th>Kategori</th><th>Açıklama</th><th>Tutar</th></tr></thead>
          <tbody>
            {data.length === 0 ? (<tr><td colSpan={4} style={{textAlign: 'center', padding: '2rem'}}>Henüz gider kaydı yok</td></tr>) : (
              data.slice().reverse().map((expense: any) => (<tr key={expense.id}><td>{new Date(expense.date).toLocaleDateString('tr-TR')}</td><td><span className="badge">{expense.category}</span></td><td>{expense.description}</td><td>{formatCurrency(expense.amount)}</td></tr>))
            )}
          </tbody>
        </table>
      </div>
      <style jsx>{`.header { margin-bottom: 2.5rem; } .header h1 { font-size: 2.5rem; } .card { background: var(--card); border-radius: 16px; padding: 2rem; box-shadow: 0 2px 12px rgba(0,0,0,0.04); border: 1px solid var(--border); margin-bottom: 1.5rem; } .card h2 { font-size: 1.75rem; margin-bottom: 1.5rem; } .form-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.25rem; margin-bottom: 1.5rem; } label { display: block; margin-bottom: 0.5rem; font-weight: 500; } input, select { width: 100%; padding: 0.875rem 1rem; border: 2px solid var(--border); border-radius: 10px; font-family: inherit; } .btn { padding: 0.875rem 2rem; border: none; border-radius: 10px; font-weight: 600; cursor: pointer; background: var(--primary); color: white; } table { width: 100%; border-collapse: collapse; } th { background: var(--secondary); padding: 1rem; text-align: left; font-weight: 600; border-bottom: 2px solid var(--border); font-size: 0.875rem; text-transform: uppercase; } td { padding: 1rem; border-bottom: 1px solid var(--border); } .badge { background: rgba(224, 159, 62, 0.15); color: var(--warning); padding: 0.35rem 0.75rem; border-radius: 20px; font-size: 0.8rem; font-weight: 600; }`}</style>
    </div>
  )
}
