import { NextRequest, NextResponse } from 'next/server'
import { store } from '@/lib/store'

export async function GET() {
  const sales = store.getSales()
  return NextResponse.json(sales)
}

export async function POST(request: NextRequest) {
  const data = await request.json()
  const products = store.getProducts()
  
  const product = products.find((p: any) => p.id === data.product_id)
  if (!product) {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 })
  }
  
  const sale = {
    id: crypto.randomUUID(),
    date: data.date,
    channel: data.channel,
    product_id: data.product_id,
    product_name: product.name,
    quantity: data.quantity,
    unit_price: product.discount_price || product.price,
    total: data.quantity * (product.discount_price || product.price),
    cost: data.quantity * product.cost,
    profit: (data.quantity * (product.discount_price || product.price)) - (data.quantity * product.cost),
    status: data.status || 'Tamamlandı',
    notes: data.notes || ''
  }
  
  store.addSale(sale)
  
  return NextResponse.json(sale, { status: 201 })
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  
  if (id) {
    store.deleteSale(id)
    return NextResponse.json({ success: true })
  }
  
  return NextResponse.json({ error: 'ID required' }, { status: 400 })
}
