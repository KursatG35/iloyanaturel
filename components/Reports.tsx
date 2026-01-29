export default function Reports({ data }: any) {
  const { sales = [], expenses = [] } = data
  const totalSales = sales.reduce((sum: number, s: any) => sum + (s.total || 0), 0)
  const totalCost = sales.reduce((sum: number, s: any) => sum + (s.cost || 0), 0)
  const totalProfit = sales.reduce((sum: number, s: any) => sum + (s.profit || 0), 0)
  const totalExpenses = expenses.reduce((sum: number, e: any) => sum + (e.amount || 0), 0)
  const netProfit = totalProfit - totalExpenses
  
  const formatCurrency = (amount: number) => new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(amount)

  return (
    <div>
      <div className="header"><h1>Raporlar</h1><p>Detaylı analizler ve raporlar</p></div>
      <div className="card">
        <h2>Gelir-Gider Özeti</h2>
        <table>
          <thead><tr><th>Kalem</th><th style={{textAlign: 'right'}}>Tutar</th><th style={{textAlign: 'right'}}>Yüzde</th></tr></thead>
          <tbody>
            <tr style={{background: 'rgba(74, 155, 127, 0.1)'}}><td><strong>Toplam Satış Geliri</strong></td><td style={{textAlign: 'right'}}><strong>{formatCurrency(totalSales)}</strong></td><td style={{textAlign: 'right'}}>100%</td></tr>
            <tr><td style={{paddingLeft: '2rem'}}>Satılan Malın Maliyeti</td><td style={{textAlign: 'right'}}>{formatCurrency(totalCost)}</td><td style={{textAlign: 'right'}}>{totalSales > 0 ? ((totalCost / totalSales) * 100).toFixed(1) : 0}%</td></tr>
            <tr style={{background: 'rgba(212, 165, 116, 0.1)'}}><td><strong>Brüt Kar</strong></td><td style={{textAlign: 'right'}}><strong>{formatCurrency(totalProfit)}</strong></td><td style={{textAlign: 'right'}}><strong>{totalSales > 0 ? ((totalProfit / totalSales) * 100).toFixed(1) : 0}%</strong></td></tr>
            <tr><td style={{paddingLeft: '2rem'}}>Operasyonel Giderler</td><td style={{textAlign: 'right'}}>{formatCurrency(totalExpenses)}</td><td style={{textAlign: 'right'}}>{totalSales > 0 ? ((totalExpenses / totalSales) * 100).toFixed(1) : 0}%</td></tr>
            <tr style={{background: netProfit > 0 ? 'rgba(74, 155, 127, 0.2)' : 'rgba(200, 92, 92, 0.2)'}}><td><strong>Net Kar</strong></td><td style={{textAlign: 'right', color: netProfit > 0 ? 'var(--success)' : 'var(--danger)'}}><strong>{formatCurrency(netProfit)}</strong></td><td style={{textAlign: 'right'}}>{totalSales > 0 ? ((netProfit / totalSales) * 100).toFixed(1) : 0}%</td></tr>
          </tbody>
        </table>
      </div>
      <style jsx>{`.header { margin-bottom: 2.5rem; } .header h1 { font-size: 2.5rem; } .card { background: var(--card); border-radius: 16px; padding: 2rem; box-shadow: 0 2px 12px rgba(0,0,0,0.04); border: 1px solid var(--border); } .card h2 { font-size: 1.75rem; margin-bottom: 1.5rem; } table { width: 100%; border-collapse: collapse; } th { background: var(--secondary); padding: 1rem; text-align: left; font-weight: 600; border-bottom: 2px solid var(--border); font-size: 0.875rem; text-transform: uppercase; } td { padding: 1rem; border-bottom: 1px solid var(--border); }`}</style>
    </div>
  )
}
