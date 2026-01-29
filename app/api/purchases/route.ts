import { NextRequest, NextResponse } from 'next/server'
import { store } from '@/lib/store'

export async function GET() {
  const purchases = store.getPurchases()
  return NextResponse.json(purchases)
}

export async function POST(request: NextRequest) {
  const data = await request.json()
  const products = store.getProducts()
  
  const product = products.find((p: any) => p.id === data.product_id)
  if (!product) {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 })
  }
  
  const purchase = {
    id: crypto.randomUUID(),
    date: data.date,
    supplier: data.supplier,
    product_id: data.product_id,
    product_name: product.name,
    quantity: data.quantity,
    unit_cost: data.unit_cost,
    total_cost: data.quantity * data.unit_cost,
    payment_status: data.payment_status || 'Beklemede',
    notes: data.notes || ''
  }
  
  store.addPurchase(purchase)
  
  return NextResponse.json(purchase, { status: 201 })
}
