import { NextRequest, NextResponse } from 'next/server'
import { store } from '@/lib/store'

export async function GET() {
  const expenses = store.getExpenses()
  return NextResponse.json(expenses)
}

export async function POST(request: NextRequest) {
  const data = await request.json()
  
  const expense = {
    id: crypto.randomUUID(),
    date: data.date,
    category: data.category,
    description: data.description,
    amount: data.amount,
    payment_method: data.payment_method || 'Nakit',
    status: data.status || 'Ödendi',
    notes: data.notes || ''
  }
  
  store.addExpense(expense)
  
  return NextResponse.json(expense, { status: 201 })
}
