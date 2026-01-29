import { NextRequest, NextResponse } from 'next/server'
import { store } from '@/lib/store'

export async function GET() {
  const products = store.getProducts()
  return NextResponse.json(products)
}

export async function PUT(request: NextRequest) {
  const { id, ...updates } = await request.json()
  const product = store.updateProduct(id, updates)
  
  if (product) {
    return NextResponse.json(product)
  }
  
  return NextResponse.json({ error: 'Product not found' }, { status: 404 })
}
